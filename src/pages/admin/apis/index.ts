import { createGetApi, createPostApi } from '@friday/async'


export default class Apis {

    private manage_config = '/manage'

    private review_config = 'review'
	
	// 管理员登录
	public manageLogin = createPostApi({ url: `${this.manage_config}/login`})

    // 评审登录
    public reviewLogin = createPostApi({ url: `${this.review_config}/login`})

}

