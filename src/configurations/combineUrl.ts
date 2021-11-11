

const combineUrl = (upstream: string, baseName: string, ) => {

	if (!upstream) {
		throw new Error(`ConfigError upstream is empty`)
	}

	return `${window.location.protocol}//${upstream}/${baseName}`
}


export default combineUrl