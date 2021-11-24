import { createGetApi, createPostApi } from '@friday/async'


export default class Apis {

    private manage_config = '/manage'

    private review_config = '/review'

    private admin_config = '/admin'
	
	// 管理员登录
	public manageLogin = createPostApi({ url: `${this.manage_config}/login`})

    // 评审登录
    public reviewLogin = createPostApi({ url: `${this.review_config}/login`})

    // 作品列表
    public reviewList = createGetApi({ url: `${this.review_config}/list`})

    // 作品信息
    public reviewDetail = createGetApi({ url: `${this.review_config}/userSignInfo`})

    // 评分提交
    public signupScoringInfo = createGetApi({ url: `${this.review_config}/signupScoringInfo/save`})


    // 评分更新
    public saveOrUpdate = createPostApi({ url: `${this.review_config}/userSignInfo/saveOrUpdate`})

    // 管理评分列表
    public manageList = createGetApi({ url: `${this.admin_config}/signInfo/list`})

    // 下载
    public manageListDownload = createGetApi({ url: `${this.admin_config}/signInfo/exportExcel`, responseType: 'blob'})

    // 查看评分详细
    public manageInfo = createGetApi({ url: `${this.admin_config}/signupScoringInfo/query`})

}

