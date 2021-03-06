import { IConfiguration } from '@friday/core'

import { upstreams, BaseUrl } from './constants'

import combineUrl from './combineUrl'

const configuration: IConfiguration = {
	whiteHosts: [
		'localhost:3000',
		'localhost:3001',
	],
	publicUrl: {
		OPEN_API_URL: combineUrl(upstreams.development.OPEN_API_URL, BaseUrl.OPEN_API_URL),
		OPEN_IMG_URL: combineUrl(upstreams.development.OPEN_API_URL, '')
	}
}

export default configuration
