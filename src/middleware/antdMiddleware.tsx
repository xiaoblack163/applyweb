import React from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import 'moment/locale/zh-cn'
import { ConfigProvider } from 'antd'


const validateMessages = {
  required: "请填写，该字段是必填字段！",
  // ...
};

const antd_middleware = ({ App, config }) => {

	return {
		App(props) {
			return (
				<ConfigProvider form={{validateMessages}} locale = {zhCN}>
					<App { ...props } />
				</ConfigProvider>
			)
		},
		config
	}
}

export default antd_middleware