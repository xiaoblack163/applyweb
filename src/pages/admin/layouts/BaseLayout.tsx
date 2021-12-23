import React from 'react'
import { Layout, Menu } from 'antd'
import { FileOutlined, FileDoneOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, useLocation} from '@friday/router'
import useUserInfo from 'src/hooks/useUserInfo'
import menuLogo from '../../home/images/menu_logo.png'

const { Header, Content, Footer, Sider } = Layout

import './index.less'


const Index = ({children}) => {

    const { userInfo } = useUserInfo()

    const { type } = userInfo as any

    const { pathname } = useLocation()


    const getkeys = () => {
        if (pathname.indexOf('reviewtreat') > -1) return '1'
        if (pathname.indexOf('reviewhas') > -1) return '2'
        if (pathname.indexOf('managetreat') > -1) return '3'
        if (pathname.indexOf('managehas') > -1) return '4'
        return '4'
    }

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
                <div className="m-logo" >
                    <img src={menuLogo} />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[getkeys()]}>
                    
                    {type == 2 && 
                        <Menu.Item key="1" icon={<FileOutlined />} >
                            <Link to='/admin/reviewtreat'>
                                未评审作品
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
                            未评分作品
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
            <Layout style={{minHeight: '100vh'}} className='sider-main'>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '16px 16px 0', minWidth: 328 }} >
                    <div className="site-layout-background" style={{ minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>洪合杯 ©2021 Created by front </Footer> */}
            </Layout>
        </Layout>)
}

export default Index