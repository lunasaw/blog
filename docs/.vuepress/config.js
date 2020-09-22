module.exports = {
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'luna-blog',
      description: '一枚"即将"成型的程序猿.大三生'
    }
  },
    base: '/blog/',     // 仓库名字是blog
    description: ' 世界上只有一种真正的英雄主义,那就是认清生活真相依旧热爱生活。-罗曼·罗兰Romain Rolland',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    dest: './dist',
    ga: '',
    evergreen: true,
    // 主题配置
    theme: 'reco',
    themeConfig: {
    logo: '/images/xiaoxin.jpg',
      //sidebar,
      lastUpdated: '更新于', // string | boolean
      //displayAllHeaders: true, // 默认值：false
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,      
      // author
      author: 'luna',
      // 项目开始时间
      startYear: '2020',
      nav: [
        { text: '首页', link: '/' },
        { text: 'readme', link: '/forme.md' },
        { text: '日志', link: '/categories/日志/' },
        { text: '个人', link: '/categories/个人/' },
        { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
        { text: '本站源码', link: 'https://gitee.com/luna_nov/blog' },
        // {
        //   text: 'Languages',
        //   items: [
        //     { text: 'Chinese', link: '/language/chinese' },
        //     { text: 'English', link: '/language/english' }
        //   ]
        // },
        { text: 'luna', link: 'http://iszychen.club' },
      ],
      valineConfig: {
        appId: 'hk05YO1Jj6sBC0iIM10sy3Sd-gzGzoHsz',// your appId
        appKey: '045YhsXYodGytw7RzVEexBFz', // your appKey
      },
        blogConfig: {
          category: {
            location: 2,     // 在导航栏菜单中所占的位置，默认2
            text: '分类' // 默认文案 “分类”
          },
          tag: {
            location: 3,     // 在导航栏菜单中所占的位置，默认3
            text: '关键字'      // 默认文案 “标签”
          }
        }        
    },
  markdown: {
    lineNumbers: true
  },

  //插件配置
  plugins: [
    [
      "@vuepress-reco/vuepress-plugin-bgm-player",
      {
        audios: [
          {
            name: 'Sasha Sloan - Dancing With Your Ghost',
            artist: 'Sasha Sloan',
            url: '/audio/DancingWithYourGhost.mp3',
            cover: '/images/DancingWithYourGhost.jpg'
          }
        ], 
        position: {
          left: "10px",
          bottom: "10px",
          zIndex: 99999
        }, 
        shrinkMode: 'mini',
        floatPosition: 'left',
        floatStyle:{ 
          bottom: '200px',
          'z-index': '999999'
        },
      }
    ],
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        messages: {
          welcome: 'luna-message',
          home: '一定要谦虚',
          theme: '不能让别人吃亏',
          close: '失败了没事，我们还会再来，有手有脚就不怕。'
        },
        messageStyle: {
          right: '10px',
          bottom: '190px'
        },
        modelStyle: {
          right: '90px',
          bottom: '-20px',
          opacity: '0.9'
        },
        btnStyle:{
          right: '90px',
          bottom: '40px',
        },
      },
    ],
    [
      "vuepress-plugin-auto-sidebar",
    ],

  ] 
}

