import { createGetApi, createPostApi } from '@friday/async'


export default class Apis {

    private prefix_config = '/user'
	
	// 用户登录
	public login = createPostApi({ url: `${this.prefix_config}/login`})

    // 用户信息
    public fetchUserInfo = createGetApi<any>({ url: `${this.prefix_config}/info`})

    // 用户注册
    public register = createPostApi<{}>({ url: `${this.prefix_config}/register`})

    // 发送验证码
    public sendCode = createPostApi<any>({url: '/phone/codeSend'})

    // 找回密码
    public reset = createPostApi<any>({url: `${this.prefix_config}/pwd/reset`})

    // 修改密码
    public updatePassword = createPostApi<any>({url: `${this.prefix_config}/pwd/update`})

    // 完善个人信息
    public completeInfo = createPostApi<any>({url: `${this.prefix_config}/complete`})

    // 添加作品
    public addProduct = createPostApi<any>({url: `${this.prefix_config}/signup`})

    // 作品列表
    public productList = createGetApi<any>({url: `${this.prefix_config}/signup/info`})

}
