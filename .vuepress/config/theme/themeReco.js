module.exports = {
  type: 'HomePageOne',
  // logo: '/icon_vuepress_reco.png',
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebar: 'auto',
  // 密钥
  keyPage: {
    keys: ['ba8a48b0e34226a2992d871c65600a7c'], // 1.3.0 版本后需要设置为密文
    color: '#42b983', // 登录页动画球的颜色
    lineColor: '#42b983' // 登录页动画线的颜色
  },
  // 最后更新时间
  lastUpdated: 'Last Updated', // string | boolean
  // 作者
  author: 'luna',
  authorAvatar: '/head.png',
  // 备案号
  // record: '京ICP备17067634号-1',
  // 项目开始时间
  startYear: '2018',
  algolia: {
    apiKey: '97357e58cac743c6de62036cb152f18b',
    indexName: 'Lunasaw'
    // inputSelector: '### REPLACE ME ####',
    // algoliaOptions: { 'facetFilters': ["lang:$LANG"] },
    // debug: false // Set debug to true if you want to inspect the dropdown
  },
  // valine 设置
  valineConfig: {
    appId: 'jvc9s4BkJYQNOcpsbVTPMePe-gzGzoHsz',
    appKey: 'Js91M9DfM9vPwVaUj7xdkbxh',
    placeholder: '填写邮箱可以收到回复提醒哦！',
    verify: true, // 验证码服务
    // notify: true, // 
    recordIP: true,
    showComment: false
  },
  vssueConfig: {
    admins: ['recoluan'],
    platform: 'github',
    owner: 'lunasaw',
    repo: 'https://github.com/lunasaw/blog',
    clientId: 'd4956041ca71223c491d',
    clientSecret: 'fc16d5c77c31c0c9f4a9322b125d870d6ddad803',
  },
  // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
  repo: 'vuepress-reco/vuepress-reco.github.io',
  // // 假如文档不是放在仓库的根目录下：
  docsDir: 'docs',
  // // 假如文档放在一个特定的分支下：
  docsBranch: 'gh-pages-source',
  // // 默认是 false, 设置为 true 来启用
  editLinks: true,
  mode: 'light',
  codeTheme: 'tomorrow'
}