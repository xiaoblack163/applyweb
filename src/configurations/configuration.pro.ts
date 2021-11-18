import { IConfiguration } from '@friday/core'
import { upstreams, BaseUrl, protocol } from './constants'
import combineUrl from './combineUrl'

const configuration: IConfiguration = {
	whiteHosts: [
		'localhost:3009',
		'101.42.95.249:9005'
	],
	publicUrl: {
		OPEN_API_URL: combineUrl(upstreams.production.OPEN_API_URL, BaseUrl.OPEN_API_URL),
		OPEN_IMG_URL: combineUrl(upstreams.production.OPEN_API_URL, '')
	}
}

export default configuration
