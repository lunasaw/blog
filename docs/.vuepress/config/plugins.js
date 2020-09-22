const moment = require('moment');
moment.locale('zh-cn') //设置最后更新的显示日期格式

const secret = require('./secret')

module.exports = {
	'@vuepress/back-to-top': true,
	'@vuepress/last-updated': {
		transformer: (timestamp) => moment(timestamp).format('LLLL')
	},
	'@vuepress/search': {
		search: true,
		searchMaxSuggestions: 10
	},
	'@vuepress/pwa': {
		serviceWorker: true,
		updatePopup: {
			message: "作者更新了新内容哦！",
			buttonText: "刷新"
		}
	},
	'@vssue/vuepress-plugin-vssue': {
		// 设置 `platform` 而不是 `api`
		platform: 'github-v4',
		// 其他的 Vssue 配置
		owner: 'dreampasss',
		repo: 'docs',
		clientId: secret.clientId,
		clientSecret: secret.clientSecret,
		autoCreateIssue: true,
		locale:'zh'
	},
	'@vuepress/medium-zoom': {
		selector: 'img.current',
	}
}