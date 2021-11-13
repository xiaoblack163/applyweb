
import { getConfiguration } from '@friday/core'
import { httpAxios, request_middleware } from '@friday/async'
import TokenService from 'src/services/tokenService'
import { message } from 'antd'
import { debounce, get, includes } from 'lodash'

const { publicUrl, history } = getConfiguration()

export const axiosConifg = {
	baseURL: publicUrl.OPEN_API_URL,
	timeout: 20000,
	headers: {
		'Accept': 'application/json;charset=utf-8',
		'Content-Type': 'application/json;charset=utf-8',
	}
}

const errorNotice = debounce((text, response?) => {
	message.error(text)
	// sentry 上报
}, 500)

const AUTH_PATH = '/auth/login'

export const isApiTimeout = (error): boolean => {
	return error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1
}

export const isNetworkError = (error): boolean => {
	return error.message === 'Network Error'
}

const redirect = debounce(() => {
	const nextUrl = `${AUTH_PATH}?path=${location.pathname}`
	return history.replace(nextUrl)
}, 500)


export const axiosInstance = httpAxios(axiosConifg, {
	requestSuccessHook(config) {
		return { ...config, headers: { ...config.headers, token: TokenService.get() } }
	},
	responseErrorHooks(error) {
		const status = error.response.status
		// 超时、网络异常
		if (isApiTimeout(error)) {
			// eslint-disable-next-line
			errorNotice('接口请求超时')
		}

		if (isNetworkError(error)) {
			errorNotice('网络异常')
		}

		if (error.response && status === 401 && !includes(window.location.href, AUTH_PATH)) {
			errorNotice('登录超时')
			redirect()
			return Promise.reject(error)
		}

		// 系统错误
		if (error.response && status >= 400) {
			const { data } = error.response
			// blob to  json
			if (Object.prototype.toString.call(data) === "[object Blob]" && (data.type === 'application/json')) {
				let reader = new FileReader() as any
				reader.readAsText(data, 'utf-8');
				reader.onload = () => {
					const text = JSON.parse(reader.result)
					message.error(text.message)
				}
			} else {
				const notice = get(error, 'response.data.msg') || '系统异常'
				errorNotice(notice, error.response)
				console.error(error.response, 'system error')
			}
		}
		return Promise.reject(error)
	}
})

const axios_middleware = request_middleware({axiosInstance})

export default axios_middleware
