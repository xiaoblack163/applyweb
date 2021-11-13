
import React from 'react'
import banner from './images/banner.png'
import pic_one from './images/pic_01.jpeg'
import pic_two from './images/pic_02.jpeg'
import './home.less'

const Home = () => {

	return (
		<div className='m-home-wrapper'>
			<div className='m-home-banner'>
				<img src={banner} />
			</div>
			<div className='m-home-nav'>
				<ul>
					<li>
						<a>大赛简介</a>
					</li>
					<li>
						<a>参赛要求</a>
					</li>
					<li>
						<a>奖项设置</a>
					</li>
					<li>
						<a>大赛流程</a>
					</li>
					<li>
						<a>组织机构</a>
					</li>
					<li>
						<a href='/user'>立即参赛</a>
					</li>
					<li>
						<a href='/admin/review/login'>评委入口</a>
					</li>
					<li>
						<a href='/admin/manage/login'>管理员</a>
					</li>
				</ul>
			</div>
			<div className='m-home-main'>
				<div className='m-home-section'>
					<h3>大赛简介</h3>
					<p>
						文明如火，烛照人类前行；
						针线跃动，开启设计新景。

						不论你是天马行空、才华横溢的设计师；

						还是寻求突破、勇于挑战的创作者，引领时尚风潮的前沿者；

						亦或是热衷探索服装价值的的品牌人，

						这里有一封来自“洪合杯”的邀请信，

						有才，你就来！

						首届“2022“洪合杯”毛衫设计大赛”邀请你报名啦！

						2021年11月8日正式启动，截稿2022年4月15日24:00。
					</p>
				</div>
				<div className='m-home-section'>
					<h3>参赛要求</h3>
					<p>
					1.国内外注册服装设计生产企业、设计师，服装设计机构、品牌设计师，高校服装、设计类师生，以及热爱毛针织服装设计的社会各界人士均可参赛（所有参赛企业及参赛者无不良记录）。

					2.院校学生个人及团队参赛均需指定至少1名参赛指导教师。

					3.拥有设计能力的个体组成团队参赛：团队核心成员至少2人但不超过5人。

					4.参赛作品未进入市场，具有良好的市场潜力；参赛作品的创意、款式、色彩、工艺及相关专利拥有自主知识产权且无知识产权纠纷。
					</p>
				</div>
				<div className='m-home-section'>
					<h3>作品要求</h3>
					<p>
					参赛作品必须是作者本人或团队原创设计作品，不得侵犯他人知识产权。创作过程及作品本身不得摹仿、抄袭、拷贝国内外的作品或创意，不得侵犯他人的知识产权。

					所有因参赛作品引发的版权或知识产权纠纷均与大赛组委会无关。参赛者按要求签署作品《原创承诺书》，后一经发现有抄袭作品、发生知识产权或版权纠纷等情况，将取消作者参赛资格，并由作者承担相应后果。

					大赛设置“系列服饰类、经典套装类、毛衫文化品牌类”三个征集方向。

					1.系列服饰类：以数字、未来、时尚、文化为主题设计的系列毛针织服装参赛。包括精梳类、粗梳类和花色纱类系列男装、女装。自己搭配（编织）首饰、包、围巾、帽等饰品。参赛作品以男/女羊绒、羊毛、混纺针织系列服装为主，每个系列参赛作品不少于4件/套。

					2.经典套装类：以数字、未来、时尚、文化为主题设计的单套毛针织服装参赛。包括精梳类、粗梳类和花色纱类系列男装、女装。自己搭配（编织）首饰、包、围巾、帽等饰品。参赛作品以男/女羊绒、羊毛、混纺针织服装为主，每套作品包括上装和下装或连身服装及配饰。

					3.毛衫文化品牌类：围绕毛衫品牌logo、海报、包装、吉祥物及相关品牌识别的视觉形象进行设计。品牌参赛作品必须按套/系列参赛。

					注：

					(1)参赛作品必须是毛针织工艺服装，参赛作品按所属类别报名参赛；无法确定归属类别或归类不正确的由组委会给予判定。

					(2)横机针织面料可以与其他面料拼接(其中横机针织面料不能少于80%），要求作品主题明确、系列完整、概念清晰，服饰配套齐全。

					(3)独创钩编可作为配饰与服装一起列入参赛范围（加分项）。
					</p>
				</div>
				<div className='m-home-section'>
					<h3>奖项设置</h3>
					<p className='tc'>
						<img src={pic_one} />
					</p>
				</div>
				<div className='m-home-section'>
					<h3>大赛流程</h3>
					
					<p className='tc'>参赛者通过以下步骤进行作品上传，作品提交成功即报名成功</p>
					<ul className='tc'>
						<li>注册登录</li>
						<li>作品上传</li>
						<li>作品提交</li>
						<li>报名成功</li>
					</ul>
				</div>
				<div className='m-home-section'>
					<h3>组织机构</h3>
					<p className='tc'>
						<img src={pic_two} />
					</p>
				</div>
			</div>
		</div>
	)

}

export default Home