
import React from 'react'
import {Affix, Divider, Row, Col} from  'antd'
import banner from './images/banner.jpg'
import AnchorDetect from 'react-anchor-scroll-detect'
import pic_two from './images/pic_02.jpeg'
import logo from './images/logo.png'
import bonus from './images/bonus.jpg'
import setUp from './images/setup.jpg'
import './home.less'

const Home = () => {

	return (
		<div className='m-home-wrapper'>
			<div className='m-home-banner'>
				<img src={banner} />
				<a href='/user/login'></a>
			</div>
			<Affix>
				<div className='m-home-nav'>
					<AnchorDetect className="m-nav-main" items={['p1', 'p2', 'p3', 'p4', 'p5']} activeClass="active" offsetTop={50}>
						<li>大赛简介</li>
						<li>参赛要求</li>
						<li>奖项设置</li>
						<li>大赛流程</li>
						<li>组织机构</li>
					</AnchorDetect>
					
					{/* <Row gutter={16}>
						<Col xs={5} md={3} className='tc'>
							<a href='#p1'>大赛简介</a>
						</Col>
						<Col xs={5} md={3}   className='tc'>
							<a href='#p2'>参赛要求</a>
						</Col>
						<Col xs={5} md={3}  className='tc'>
							<a href='#p3'>奖项设置</a>
						</Col>
						<Col xs={5} md={3} className='tc'>
							<a href='#p4'>大赛流程</a>
						</Col>
						<Col xs={5} md={3} className='tc'>
							<a href='#p5'>组织机构</a>
						</Col>
						<Col xs={6} md={3} className='tc'>
							<a href='/user/login'>立即参赛</a>
						</Col>
						<Col xs={6} md={3}  className='tc'>
							<a href='/admin/review/login'>评委入口</a>
						</Col>
						<Col xs={6} md={3} className='tc'>
							<a href='/admin/manage/login'>管理员</a>
						</Col>
					</Row> */}
				</div>
			</Affix>
			<div className='m-home-main'>
				<div className='m-home-wrapper'>
				<img src={logo} className='logo' />
 				<div className='m-home-section mg-b-40' id='p1'>
					<h3>大赛简介</h3>
					<div className='m-home-tag'>Introduction to the competition</div>
					<Divider />
					<p>
						文明如火，烛照人类前行；针线跃动，开启设计新景。不论你是天马行空、才华横溢的设计师；还是寻求突破、勇于挑战的创作者，引时尚风潮的前沿者；亦或是热衷探索服装价值的的品牌人，这里有一封来自洪合杯的邀请信，有オ，你就来！首届“2022 洪合杯”毛衫设计大赛”邀请你报名啦！
					</p>
					<p className='mg-t-10'>2021年11月8日正式启动，<span className='m-home-tips'>截稿2022年4月15日24:00。</span></p>
				</div>
				<div className='m-home-section mg-b-40' id='p2'>
					<h3>参赛要求</h3>
					<div className='m-home-tag'>Competition reauirements</div>
					<Divider />
					<p>
						1、国内外注册服装设计生产企业、设计师，服装设计机构、品牌设计师，高校服装、设计类师生，以及热爱毛针织服装设计的社会各界人士均可参赛（所有参赛企业及参赛者无不良记录）。<br />
						2、院校学生个人及团队参赛均需指定至少1名参赛指导教师。<br />
						3、拥有设计能力的个体组成团队参赛：团队核心成员至少2人但不超过5人。<br />
						4、参赛作品未进入市场，具有良好的市场潜力；参赛作品的创意、款式、色彩、工艺及相关专利拥有自主知识产权且无知识产权纠纷。
					</p>
				</div>
				<div className='m-home-section mg-b-40'>
					<h3>作品要求</h3>
					<div className='m-home-tag'>Work requirements</div>
					<Divider />
					<p>
						参赛作品必须是作者本人或团队原创设计作品，不得侵犯他人知识产权。创作过程及作品本身不得摹仿、抄袭、拷贝国内外的作品或创意，不得侵犯他人的知识产权。所有因参赛作品引发的版权或知识产权纠纷均与大赛组委会无关。参赛者按要求签署作品《原创承诺书》，后一经发现有抄袭作品、发生知识产权或版权纠纷等情况，将取消作者参赛资格，并由作者承担相应后果。
					</p>
					<Row gutter={16} className='mg-tb-10'>
						<Col xs={24} md={8} className='mg-b-10'>
							<div className='m-work-list'>
								<h4>系列服饰类</h4>
								<div>
									以数字、未来、时尚、文化为主题设计的系列毛针织服装参赛。包括精梳类、粗梳类和花色纱类系列男装、女装。自己搭配（编织）首饰、包、围巾、帽等饰品。参赛作品以男/女羊绒、羊毛、混纺针织系列服装为主，每个系列参赛作品不少于4件/套。
								</div>
							</div>
						</Col>
						<Col xs={24} md={8} className='mg-b-10'>
							<div className='m-work-list'>
								<h4>经典套装类</h4>
								<div>
									以数字、未来、时尚、文化为主题设计的单套毛针织服装参赛。包括精梳类、粗梳类和花色纱类系列男装、女装。自己搭配（编织）首饰、包、围巾、帽等饰品。参赛作品以男/女羊绒、羊毛、混纺针织服装为主，每套作品包括上装和下装或连身服装及配饰。
								</div>
							</div>
						</Col>
						<Col xs={24} md={8} >
							<div className='m-work-list'>
								<h4>毛衫文化品牌类</h4>
								<div>
									围绕毛衫品牌logo、海报、包装、吉祥物及相关品牌识别的视觉形象进行设计。品牌参赛作品必须按套/系列参赛。
								</div>
							</div>
						</Col>
					</Row>
					<p className='m-home-w'>
						注：
						(1)参赛作品必须是毛针织工艺服装，参赛作品按所属类别报名参赛；无法确定归属类别或归类不正确的由组委会给予判定。<br />
						(2)横机针织面料可以与其他面料拼接(其中横机针织面料不能少于80%），要求作品主题明确、系列完整、概念清晰，服饰配套齐全。
						<br />
						(3)独创钩编可作为配饰与服装一起列入参赛范围（加分项）。
					</p>
					
				</div>
				<div className='m-home-section mg-b-40' id='p3'>
					<h3>奖项设置</h3>
					<div className='m-home-tag'>Bonus setting</div>
					<p className='tc mg-t-30'>
						<img src={bonus} style={{width: '100%'}} />
					</p>
					<p className='m-home-w'>注：奖金为税前</p>
				</div>
				<div className='m-home-section mg-b-40' id='p4'>
					<h3>大赛流程</h3>
					<div className='m-home-tag'>Competition process</div>
					<Divider />
					<p className='tc mg-t-30'>
						<img src={setUp} style={{width: '100%'}} />
					</p>
				</div>
				<div className='m-home-section mg-b-10 pd-b-20' id='p5'>
					<h3>组织机构</h3>
					<div className='m-home-tag'>Organization</div>
					<Divider />
					<dl className='m-home-dl'>
						<dt><span>◆</span>主办单位</dt>
						<dd>
							<Row>
								<Col xs={24} md={6}>工业和信息化部工业文化发展中心</Col>
								<Col xs={24} md={6}>中国服装设计师协会</Col>
								<Col xs={24} md={6}>嘉兴市秀洲区人民政府</Col>
							</Row>
						</dd>
						<dt><span>◆</span>承办单位</dt>
						<dd>
							<Row>
								<Col xs={24} md={6}>嘉兴市秀洲区洪合镇人民政府</Col>
								<Col xs={24} md={6}>嘉兴市秀洲洪合毛衫商会</Col>
								<Col xs={24} md={6}>嘉兴毛衫城投资开发有限公司</Col>
								<Col xs={24} md={6}>北京三达经済技术合作开发中心</Col>
								<Col xs={24} md={6}>京合物品牌设计有限公司</Col>
								<Col xs={24} md={6}>东方宾利文化传媒有限公司</Col>
							</Row>
						</dd>
						<dt><span>◆</span>协办单位</dt>
						<dd>
							<Row>
								<Col xs={24} md={6}>北京服装学院服装艺术与工程学院</Col>
								<Col xs={24} md={6}>北京工业大学艺术设计学院</Col>
								<Col xs={24} md={6}>北京科技大学机械工程学院</Col>
								<Col xs={24} md={6}>北京理工大学珠海学院</Col>
								<Col xs={24} md={6}>北京城市学院艺术设计学部</Col>
								<Col xs={24} md={6}>中关村工业设计产业协会</Col>
								<Col xs={24} md={6}>华大学服装与艺术设计学院</Col>
								<Col xs={24} md={6}>北京设计学会</Col>
							</Row>
						</dd>
						<dt><span>◆</span>支持单位</dt>
						<dd>
							<Row>
								<Col xs={24} md={6}>北京联合大学艺术设计学院</Col>
								<Col xs={24} md={6}>上海工艺美术职业学院</Col>
								<Col xs={24} md={6}>上海工程技术大学</Col>
								<Col xs={24} md={6}>上海视觉艺术学院</Col>
								<Col xs={24} md={6}>上海杉达学院</Col>
								<Col xs={24} md={6}>中国农林高校设计艺术联盟</Col>
							</Row>
						</dd>
					</dl>
				</div>
				</div>
			</div>
			<div className='m-home-footer'>
				<div className='tc'>
					<div className='m-pc'>组委会电话：0573-83688792（嘉兴）/01068209904（北京）报名参赛电话：13681490652（李老师）</div>
					<Row className='m-phone'>
						<Col xs={24} md={12}>组委会电话：0573-83688792（嘉兴）/01068209904（北京）</Col>
						<Col xs={24} md={12}>报名参赛电话：13681490652（李老师）</Col>
					</Row>
				</div>
				<div className='tc'>
					<div className='m-pc'>秘书处电话：01068209904/18600562869（冯老师）邮箱：honghemaoshandasai@163.com</div>
					<Row className='m-phone'>
						<Col xs={24} md={12}>秘书处电话：01068209904/18600562869（冯老师）</Col>
						<Col xs={24} md={12}>邮箱：honghemaoshandasai@163.com</Col>
					</Row>
				</div>
			</div>
		</div>
	)

}

export default Home