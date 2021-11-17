import React from 'react'
import { Layout, Menu } from 'antd'
import { FileOutlined, FileDoneOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from '@friday/router'
import useUserInfo from 'src/hooks/useUserInfo'

const { Header, Content, Footer, Sider } = Layout

import './index.less'


const Index = ({children}) => {

    const { userInfo } = useUserInfo()

    const { type } = userInfo as any

    console.log(type, '111')

    return (
        <Layout>
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
                    
                    {type == 2 && 
                        <Menu.Item key="1" icon={<FileOutlined />} >
                            <Link to='/admin/reviewtreat'>
                                待评审作品
                            </Link>
                        </Menu.Item>
                    }
                    {type == 2 && 
                        <Menu.Item key="2" icon={<FileDoneOutlined />} >
                            <Link to='/admin/reviewhas'>
                            已评审作品
                            </Link>
                        </Menu.Item>
                    }
                    {type == 3 && 
                        <Menu.Item key="3" icon={<FileOutlined />} >
                            <Link to='/admin/managetreat'>
                            待评分作品
                            </Link>
                        </Menu.Item>
                    }
                    {type ==3 && 
                        <Menu.Item key="4" icon={<FileDoneOutlined />}>
                            <Link to='/admin/managehas'>
                            已评分作品
                            </Link>
                        </Menu.Item>
                    }
                    <Menu.Item key="5" icon={<LogoutOutlined />}>
                        <Link to='/admin/review/login'> 
                        退出登录
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{minHeight: '100vh'}}>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>洪合杯 ©2021 Created by front </Footer>
            </Layout>
        </Layout>)
}

export default Index