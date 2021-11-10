import React from 'react'
import { dispatchAsync } from '@friday/async'
import { useApiSelector } from 'src/hooks'
import { useGlobalContext } from 'src/middleware/globalMiddleware'
import * as Cookie from 'js-cookie'


const useUserInfo = () => {

	const { state, dispatch } = useGlobalContext()

	const apis = useApiSelector()

	const dispatchUserInfo = (value: {}) => {
		dispatch({type: 'userInfo', value})
	}

	// 获取用户信息
	const fetchUserInfo = async () => {
		const { dataJson, error } = await dispatchAsync(apis.home.getTest({}))
		if (error) return
		dispatchUserInfo(dataJson)
	}
	
	return {
		userInfo: state.userInfo || {} ,
		fetchUserInfo,
		dispatchUserInfo
	}
}

export default useUserInfo