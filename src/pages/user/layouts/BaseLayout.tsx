import React from 'react'
import { Layout, Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, LogoutOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Link } from '@friday/router'
import { useUserInfo } from 'src/hooks'
import { useLocation } from '@friday/router'

const { Header, Content, Footer, Sider } = Layout

import './index.less'


const Index = ({children}) => {

    const { pathname } = useLocation()

    const getkeys = () => {
        if (pathname.indexOf('product') > -1) return '2'
        if (pathname.indexOf('info') > -1) return '3'
        if (pathname.indexOf('password') > -1) return '4'
        return '2'
    }

    return (
        <Layout className='components-layout-demo-responsive'>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="m-logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[getkeys()]}>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        <Link to='/user/product'> 
                            作品列表
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        <Link to='/user/info'> 
                            个人信息
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<EyeInvisibleOutlined />}>
                        <Link to='/user/password'> 
                        修改密码
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<LogoutOutlined />}>
                        <Link to='/user/login'> 
                        退出登录
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{minHeight: '100vh' }}>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '16px 16px 0', minWidth: 328 }} >
                    <div className="site-layout-background" style={{ minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>洪合杯 ©2021 Created by front </Footer>
            </Layout>
        </Layout>)
}

export default Index