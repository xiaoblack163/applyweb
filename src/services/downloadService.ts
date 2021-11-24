import {message} from 'antd'

const isBlob = target => {
	if (Object.prototype.toString.call(target) == '[object Blob]') {
		return true
	}
	return false
}


export default class DownloadService {
    donwloadfn (response, name) {
        const aTag: any = document.createElement("a")
        if (!isBlob(response)) {
            return message.warn('文件格式不对')
        }
        const url = window.URL.createObjectURL(response)
        document.body.appendChild(aTag)
        aTag.style = "display: none"
        aTag.href = url
        aTag.download = name
        aTag.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(aTag)
    }
}