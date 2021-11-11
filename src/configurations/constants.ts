

export const protocol = document.location.protocol
export const upstreams = {
	development: {
		OPEN_API_URL: '101.42.95.249:8088',
	},
	production: {
		OPEN_API_URL: '101.42.95.249:8088',
	}

}

export enum BaseUrl {
	OPEN_API_URL = 'api',
}
