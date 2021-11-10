
import axios_middleware from './axiosMiddleware'
import antd_middleware from './antdMiddleware'
import { global_middleware } from './globalMiddleware'

const middlewares = [
	antd_middleware,
	axios_middleware,
	global_middleware,
]

export default middlewares
