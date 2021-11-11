import { createGetApi, createPostApi } from '@friday/async'


export default class Apis {

    private prefix_config = '/user'
	
	// 用户登录
	public login = createGetApi({ url: `${this.prefix_config}/login`})

}

