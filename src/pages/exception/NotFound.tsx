import React from 'react'
import { Result, Button } from 'antd'
import { Link } from '@friday/router'

const Notfind = () => {
	return (
		<Result
			status="404"
			title="网站正在建设中"
			subTitle=""
			// extra={
			// 	<Button type="primary">
			// 		<Link to='/'>返回首页</Link>
			// 	</Button>
			// }
		/>
	)
}
export default Notfind