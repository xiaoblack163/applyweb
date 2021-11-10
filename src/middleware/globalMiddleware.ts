import { GlobalState_middleware } from '@friday/core'


export const { middleware: global_middleware, useGlobalContext } = GlobalState_middleware({ 
	userInfo: {},
	globalLoading: false
})


export default global_middleware