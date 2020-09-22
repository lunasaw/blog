module.exports = [
	{ text: '首页', link: '/' },
	{ text: '指南', link: '/Guide/'},
	{ text: '前端', 
		items: [
			{ text: '基础部分',
				items: [
					{ text: 'html',link: '/FrontEnd/html/'},
					{ text: 'css',link: '/FrontEnd/CSS/'},
			 		{text: 'javascript',link: '/FrontEnd/JavaScript/#运行机制'}]
			},
			{ text: '框架',
				items: [
					{ text: 'Vue',link: '/FrontEnd/Vue/' },
					{ text: 'Jquery',link: '/FrontEnd/Jquery/'}]
			},
			{ text: '其他',
				items: [
					{text: '微信小程序',link: ''}]
			}
		]
	},
	{ text: '后端',
		items: [
			{ text: 'Node',link: '/BackEnd/Node/#安装'}]
	},
	{
		text: '软件工具', link: '/SoftwareTools/VsCode/',
		items: [
			{ text: 'VsCode', link: '/SoftwareTools/VsCode/'},
			{ text: 'Git', link: '/SoftwareTools/Git/'},
			{ text: 'WebStorm', link: '/SoftwareTools/WebStorm/'},
			{ text: 'Hbuilder x', link: '/SoftwareTools/Hbuilder/'}]
	},
	{ text: '操作系统', link: '/OperatingSystem/'},
	{ text: '其他', link: '/Others/'},
	{ text: '更多', link: '/More/Delivery/#vue-相关'},
	{ text: 'GitHub', link: 'https://www.baidu.com'}
]