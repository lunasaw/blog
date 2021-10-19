const path = require('path')
const themeConfig = require('./config/theme/')

module.exports = {
  dest: 'public',
  base: '/blog/',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }],
    ['meta', {
      name: 'author',
      content: 'reco_luan'
    }],
    ['meta', {
      name: 'keywords',
      content: 'vuepress,reco,reco_luan,vuepress-reco,vuepress-theme-reco,theme,blog,主题'
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#42b983'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: '/icon_vuepress_reco.png'
    }],
    ['link', {
      rel: 'mask-icon',
      href: '/icon_vuepress_reco.svg',
      color: '#42b983'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/icon_vuepress_reco.png'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }],
  ],
  theme: 'reco',
  themeConfig,
  valineConfig: {
    showComment: true,
    appId: 'hk05YO1Jj6sBC0iIM10sy3Sd-gzGzoHsz', // your appId
    appKey: '045YhsXYodGytw7RzVEexBFz', // your appKey
  },
  // 评论
  vssueConfig: {
    platform: 'github',
    owner: 'lunasaw',
    repo: 'https://github.com/lunasaw/blog',
    clientId: 'd4956041ca71223c491d',
    clientSecret: 'fc16d5c77c31c0c9f4a9322b125d870d6ddad803',
  },
  locales: {
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: "Gezelligheid",
      description: ' 世界上只有一种真正的英雄主义,那就是认清生活真相依旧热爱生活。-罗曼·罗兰Romain Rolland',
    },
    '/en/': {
      lang: 'en-US',
      title: "Gezelligheid",
      description: 'There is only one true heroism in the world, and that is to recognize the truth of life and still love life.'
    }
  },
  lastUpdated: '更新于', // string | boolean
  //displayAllHeaders: true, // 默认值：false
  // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
  nextLinks: true,
  // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
  prevLinks: true,
  markdown: {
    // lineNumbers: true
  },
  plugins: [
    [
      "@vuepress-reco/vuepress-plugin-bgm-player",
      {
        audios: [{
          name: 'Sasha Sloan - Dancing With Your Ghost',
          artist: 'Sasha Sloan',
          url: '/audio/DancingWithYourGhost.mp3',
          cover: '/audio/DancingWithYourGhost.jpg'
        }],
        position: {
          left: "10px",
          bottom: "10px",
          zIndex: 99999
        },
        shrinkMode: 'mini',
        floatPosition: 'left',
        floatStyle: {
          bottom: '200px',
          'z-index': '999999'
        },
      }
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-149716079-2'
      }
    ],
    [
      '@vuepress/plugin-register-components',
      {
        components: [{
          name: 'reco-home-page-one',
          path: path.resolve(__dirname, './components/HomePageOne.vue')
        }],
        componentsDir: path.resolve(__dirname, './demo')
      }
    ],
    '@vuepress-reco/extract-code',
    'flowchart',
    ['sitemap', {
      hostname: 'https://www.isczy.tk/blog'
    }],
    ['@vuepress-reco/rss', {
      site_url: 'https://www.isczy.tk/blog',
      copyright: ''
    }],
    // ['@vuepress-reco/bulletin-popover', {
    //   body: [
    //     {
    //       type: 'title',
    //       content: '欢迎加入QQ交流群 🎉🎉🎉',
    //     },
    //     {
    //       type: 'text',
    //       content: 'QQ群1：1037296104',
    //       style: 'text-align: center;'
    //     },
    //     {
    //       type: 'text',
    //       content: 'QQ群2：1061561395',
    //       style: 'text-align: center;'
    //     },
    //     {
    //       type: 'text',
    //       content: `🎉🎉🎉 reco 主题 2.x 已经发布 alpha 版本，此版本仅为尝鲜版本，功能不完整，且 UI 及功能在 latest 版本之前均为做出较大，谨慎用于生产环境。
    //       <ul>
    //         <li><a href="/views/2.x/">Usage<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: 'font-size: 12px;'
    //     },
    //     {
    //       type: 'image',
    //       src: '/rvcode_qq.png'
    //     }
    //   ],
    //   footer: [{
    //     type: 'button',
    //     text: '打赏',
    //     link: '/views/other/donate.html'
    //   }]
    // }],
    '@vuepress-reco/extract-code'
  ]
}