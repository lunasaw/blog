module.exports = {
  'zh': [
    { text: '文档', 
      icon: 'reco-api',
      items: [
        { 
          text: '运维', items: [
            { text: 'SYSTEM', link: '/views/system/' },
            { text: 'Other', link: '/views/preserve/' },
            { text: '0.x', link: '/views/0.x/' }
          ],
        },
        {
          text: '开发', items: [
            { text: 'JAVA', link: '/views/java/' },
            { text: 'PYTHON', link: '/views/python/' },
            { text: 'VUE', link: '/views/vue/' }
          ]
        },
        {
          text: '软件', items: [
            { text: 'CONNECT', link: '/views/connect/' },
            { text: 'PROJECT', link: '/views/project/' },
            { text: 'BASE-SOFT', link: '/views/basesoft/' }
          ]
        }
      ]
    },
    { text: '常见问题', link: '/views/other/question', icon: 'reco-faq' },
    { text: '博客', link: '/categories/blog/', icon: 'reco-blog'},
    // { text: '案例', link: '/views/other/theme-example.html', icon: 'reco-category'},
    // { text: '订阅', link: 'https://vuepress-theme-reco.recoluan.com/rss.xml', icon: 'reco-rss'},
    { text: '留言板', link: '/views/other/messageBoard.html', icon: 'reco-suggestion'},
    { text: 'GitHub', link: 'https://github.com/lunasaw/lunasaw', icon: 'reco-github'}
  ],
  'en': [
    { text: 'Documents', 
      icon: 'reco-api',
      items: [
        { 
          text: 'maintenance', items: [
            { text: 'Linux', link: '/views/linux/' },
            { text: 'Other', link: '/views/preserve/' },
            { text: '0.x', link: '/views/0.x/' }
          ],
        },
        {
          text: 'development', items: [
            { text: 'JAVA', link: '/views/java/' },
            { text: 'PYTHON', link: '/views/python/' }
          ]
        },
        {
          text: 'software', items: [
            { text: 'CONNECT', link: '/views/connect/' },
            { text: 'PROJECT', link: '/views/project/' },
            { text: 'BASE-SOFT', link: '/views/basesoft/' }
          ]
        }
      ]
    },
    { text: 'FAQ', link: '/en/views/other/question', icon: 'reco-faq' },
    { text: 'Examples', link: '/en/views/other/theme-example.html', icon: 'reco-category'},
    { text: 'RSS', link: 'https://vuepress-theme-reco.recoluan.com/rss.xml', icon: 'reco-rss'},
    { text: 'GitHub', link: 'https://github.com/lunasaw/blog', icon: 'reco-github'}
  ]
}