module.exports = {
	// 指南
	'/blog/': [{ title: 'blog', collapsable: false, sidebarDepth: 2,
		children: [
			{ title: 'xxx', path: '/blog/xxx'},
			{ title: 'xx', path: '/blog/xx'},
			{ title: 'xx', path: '/blog/xx'}]
	}],
	// 前端
	// JavaScript
	'/FrontEnd/JavaScript/': [{ title: 'JavaScript', collapsable: false, sidebarDepth: 2,
		children: [
			{ title: '底层机制', path: '/FrontEnd/JavaScript/#运行机制'},
			{ title: '基础知识', path: '/FrontEnd/JavaScript/one'},
			{ path: '/FrontEnd/JavaScript/two'}]
	}],
	// 后端
	// Node
	'/BackEnd/Node/': [{ title: 'Node', collapsable: false, sidebarDepth: 2,
		children: [
			{ title: '安装与配置', path: '/BackEnd/Node/#安装'}]
	}],
	// 软件工具
	'/SoftwareTools/': [
		{ title: 'VsCode',collapsable: true, sidebarDepth: 2,	
				children:[{ title: '介绍', path: '/SoftwareTools/VsCode/'}]},
		{ title: 'Git', path: '/SoftwareTools/Git/'},
		{ title: 'WebStorm', path: '/SoftwareTools/WebStorm/'},
		{ title: 'Hbuilder X', path: '/SoftwareTools/Hbuilder/'}],
	'/More/': [{ title: 'MORE', collapsable: false, sidebarDepth: 2,
		children: [
			{ title: '传送门', path: '/More/Delivery/'},
			{ title: '传送门2', path: '/More/Delivery/one'}]}
		]
}