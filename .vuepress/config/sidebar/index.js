module.exports = {
  'zh': Object.assign({}, {
    '/views/java/': [{
        title: '基础',
        collapsable: true,
        children: [
          '',
          'java-json',
          'java-bin',
          'java-jackson',
          'jvm-tenance',
          'jvm-tuning',
          'java-date-utils',
          'java-regular',
          'java-time-ordate',
          'date',
          'design-patterns',
        ]
      },
      {
        title: '面试',
        collapsable: true,
        children: [
          'interview-1',
          'interview-2',
        ]
      },
      {
        title: 'Spring',
        collapsable: true,
        children: [
          'spring-anno',
          'spring-aop',
          'spring-async',
          'spring-exception',
          'spring-https',
          'spring-logback',
          'spring-mvc',
          'spring-restTemplate',
          'spring-security',
          'spring-bean',
          // 'sidebar'
        ]
      },
      // {
      //   title: '默认主题配置',
      //   collapsable: false,
      //   children: [
      //     'abstract',
      //     'syntax',
      //     'customStyleAndScript'
      //   ]
      // },
      // {
      //   title: '其他',
      //   collapsable: false,
      //   children: [
      //     'updatetoone',
      //     'recommend'
      //   ]
      // }
    ],
    '/views/system/': [{
        title: 'kaili',
        collapsable: true,
        children: [
          '',
          'kaili-1',
          'kaili-2',
          'kaili-3',
        ]
      },
      {
        title: 'linux',
        collapsable: true,
        children: [
          'linux-chmod',
          'linux-command',
          'linux-crontabs',
          'linux-du',
          'linux-practice',
          'linux-systemctl',
          'linux-tar',
          'linux-top',
          'linux-user-group',
          'linux-apt-get',
          'linux-vim',
          'ssh-password',
        ]
      },
      {
        title: 'macos',
        collapsable: true,
        children: [
          'mac-launchctl',
          'macos',
          'mac-profile',
          'mac-brew'
        ]
      },
      // {
      //   title: '默认主题配置',
      //   collapsable: false,
      //   children: [
      //     'abstract',
      //     'syntax',
      //     'customStyleAndScript'
      //   ]
      // },
      // {
      //   title: '其他',
      //   collapsable: false,
      //   children: [
      //     'updatetoone',
      //     'recommend'
      //   ]
      // }
    ],
    '/views/basesoft/': [{
        title: 'apache',
        collapsable: true,
        children: [
          '',
          'apache-dav-virtual',
          'apache-dav',
        ]
      },
      {
        title: 'docker',
        collapsable: true,
        children: [
          'docker-1',
          'docker-2',
          'docker-3',
          'docker-4',
          'docker-5',
          'docker-6',
          'docker-7',
          'docker-8',
          'docker-compose',
          'docker-file',
        ]
      },
      {
        title: 'nginx',
        collapsable: true,
        children: [
          'nginx-all',
          'nginx-install',
          'nginx-start',
        ]
      },
      {
        title: 'rabbitmq',
        collapsable: true,
        children: [
          'rabbitmq-install',
          'rabbitmq-linux',
        ]
      },
      {
        title: 'redis',
        collapsable: true,
        children: [
          'redis-config',
          'redis-spring',
          'redis-start',
        ]
      },
      {
        title: 'tomcat',
        collapsable: true,
        children: [
          'tomcat-review',
        ]
      },
      {
        title: 'consul',
        collapsable: true,
        children: [
          'consul',
        ]
      },
      {
        title: 'idea',
        collapsable: true,
        children: [
          'idea-easycode',
          'idea-plugs',
        ]
      },
      {
        title: 'git',
        collapsable: false,
        children: [
          'git-start',
          'git-clean'
        ]
      }
    ],
    '/views/connect/': [{
        title: 'haproxy',
        collapsable: true,
        children: [
          '',
          'haproxy',
        ]
      },
      {
        title: 'frp',
        collapsable: true,
        children: [
          // 'mac-launchctl',
          // 'macos',
          // 'mac-profile'
        ]
      },
      {
        title: 'http',
        collapsable: false,
        children: [
          'http-content',
        ]
      },
      // {
      //   title: '其他',
      //   collapsable: false,
      //   children: [
      //     'updatetoone',
      //     'recommend'
      //   ]
      // }
    ],
    '/views/project/': [{
      title: 'genesis',
      collapsable: true,
      children: [
        '',
        'genesis-1',
        'genesis-2',
        'genesis-reply',
      ]
    },
    {
      title: 'mall',
      collapsable: true,
      children: [
        'mall-attr',
      ]
    },
    // {
    //   title: 'http',
    //   collapsable: false,
    //   children: [
    //     'http-content',
    //   ]
    // },
    // {
    //   title: '其他',
    //   collapsable: false,
    //   children: [
    //     'updatetoone',
    //     'recommend'
    //   ]
    // }
  ],
    '/views/0.x/': [{
        title: '基础',
        collapsable: false,
        children: [
          '',
          'installUse',
          'category',
          'tag',
        ]
      },
      {
        title: '进阶',
        collapsable: false,
        children: [
          'timeline',
          'valine',
          'password',
          'configJs',
          'home'
        ]
      },
      {
        title: '其他',
        collapsable: false,
        children: [
          'abstract',
        ]
      }
    ],
    '/views/plugins/': [{
      title: '插件',
      collapsable: true,
      children: [
        '',
        'backToTop',
        'pagation',
        'screenfull',
        'loadingPage',
        'kanbanniang',
        'comments',
        'extractCode',
        'rss',
        'bgmPlayer',
        'bulletinPopover'
      ]
    }]
  }),
  // 'en': Object.assign({}, {
  //   '/en/views/1.x/': [{
  //       title: 'Basic',
  //       collapsable: false,
  //       children: [
  //         '',
  //         'installUse',
  //         'blog',
  //         'frontMatter'
  //       ]
  //     },
  //     {
  //       title: 'Advanced',
  //       collapsable: false,
  //       children: [
  //         'timeline',
  //         'valine',
  //         'password',
  //         'configJs',
  //         'home',
  //         'notfound',
  //         'mode',
  //         'local',
  //         'codeTheme',
  //         'sidebar'
  //       ]
  //     },
  //     {
  //       title: 'Default Theme Config',
  //       collapsable: false,
  //       children: [
  //         'abstract',
  //         'syntax',
  //         'customStyleAndScript'
  //       ]
  //     },
  //     {
  //       title: 'Other',
  //       collapsable: false,
  //       children: [
  //         'updatetoone',
  //         'recommend'
  //       ]
  //     }
  //   ],
  //   '/en/views/plugins/': [{
  //     title: 'Plugins',
  //     collapsable: true,
  //     children: [
  //       '',
  //       'backToTop',
  //       'pagation',
  //       'screenfull',
  //       'loadingPage',
  //       'kanbanniang',
  //       'comments',
  //       'extractCode',
  //       'rss',
  //       'bgmPlayer',
  //       'bulletinPopover'
  //     ]
  //   }]
  // })
}