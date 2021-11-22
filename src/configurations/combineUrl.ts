

const combineUrl = (upstream: string, baseName: string, ) => {

	if (!upstream) {
		throw new Error(`ConfigError upstream is empty`)
	}

	if (baseName) return `${window.location.protocol}//${upstream}/${baseName}`

	return `${window.location.protocol}//${upstream}`
}


export default combineUrl