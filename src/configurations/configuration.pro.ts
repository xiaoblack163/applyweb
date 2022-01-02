/*
 * @Author: your name
 * @Date: 2021-12-04 17:46:21
 * @LastEditTime: 2022-01-02 17:15:20
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /applyweb/src/configurations/configuration.pro.ts
 */
import { IConfiguration } from '@friday/core'
import { upstreams, BaseUrl, protocol } from './constants'
import combineUrl from './combineUrl'

const configuration: IConfiguration = {
	whiteHosts: [
		'localhost:3009',
		'101.42.95.249:9005',
		'test.ruien.work',
		'test.ruien.work:9005',
		'101.35.52.7',
		'joinust.hoo-woo.cn',
		'joinus.hoo-woo.cn'
	],
	publicUrl: {
		OPEN_API_URL: combineUrl(upstreams.production.OPEN_API_URL, BaseUrl.OPEN_API_URL),
		OPEN_IMG_URL: combineUrl(upstreams.production.OPEN_API_URL, '')
	}
}

export default configuration
