import React from 'react'
import { Layout, Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, LogoutOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Link } from '@friday/router'

const { Header, Content, Footer, Sider } = Layout

import './index.less'


const Index = ({children}) => {
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UploadOutlined />}>
                        <Link to='/user/product'> 
                            上传作品
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        <Link to='/user/product/list'> 
                            我的作品
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
            <Layout style={{height: '100vh' }}>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0', }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 540 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>洪合杯 ©2021 Created by front </Footer>
            </Layout>
        </Layout>)
}

export default Index