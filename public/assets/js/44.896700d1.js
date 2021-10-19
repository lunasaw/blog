(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{604:function(_,v,r){_.exports=r.p+"assets/img/docker-compare-virtual.0dc37df3.png"},710:function(_,v,r){"use strict";r.r(v);var t=r(7),e=Object(t.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h3",{attrs:{id:"_1-前言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-前言"}},[_._v("#")]),_._v(" 1. 前言")]),_._v(" "),t("p",[_._v("​\tDocker 是基于 Linux 内核的 "),t("strong",[_._v("Namespace")]),_._v(" 技术实现资源隔离的，"),t("strong",[_._v("所有的容器都共享主机的内核")]),_._v("。其实这与以虚拟机为代表的云计算时代还是有很多区别的，比如虚拟机有着更好的隔离性和安全性，而容器的隔离性和安全性则相对较弱。")]),_._v(" "),t("p",[_._v("​\t在讨论容器的安全性之前，我们先了解下容器与虚拟机的区别，这样可以帮助我们更好地了解容器的安全隐患以及如何加固容器安全。")]),_._v(" "),t("h3",{attrs:{id:"_2-docker与虚拟机的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-docker与虚拟机的区别"}},[_._v("#")]),_._v(" 2. docker与虚拟机的区别")]),_._v(" "),t("p",[_._v("​\t虚拟机是通过**管理系统(Hypervisor)"),t("strong",[_._v("模拟出 CPU、内存、网络等硬件，然后在这些模拟的硬件上创建客户内核和操作系统。这样做的好处")]),_._v("就是虚拟机有自己的内核和操作系统，并且硬件都是通过虚拟机管理系统模拟出来的，用户程序无法直接使用到主机的操作系统和硬件资源，**因此虚拟机也对隔离性和安全性有着更好的保证。")]),_._v(" "),t("p",[_._v("​\t而 Docker 容器则是通过 Linux 内核("),t("strong",[_._v("kernel")]),_._v(")的 "),t("strong",[_._v("Namespace 技术实现了文件系统、进程、设备以及网络的隔离")]),_._v("，然后再通过 "),t("strong",[_._v("Cgroups 对 CPU、 内存等资源进行限制")]),_._v("，最终实现了容器之间相互不受影响，由于容器的隔离性仅仅依靠内核来提供，因此容器的隔离性也远弱于虚拟机。")]),_._v(" "),t("p",[t("img",{attrs:{src:r(604),alt:""}})]),_._v(" "),t("p",[_._v("​\t容器与虚拟机相比，"),t("strong",[_._v("容器的性能损耗非常小，并且镜像也非常小")]),_._v("，而且在业务快速开发和迭代的今天，容器秒级的启动等特性也非常匹配业务快速迭代的业务场景。")]),_._v(" "),t("p",[_._v("​\t既然我们要利用容器的优点，那就需要尽量弥补"),t("strong",[_._v("容器弱隔离的安全性缺点")]),_._v("呢？要了解如何解决容器的安全问题，我们首先需要了解下容器目前存在的安全问题。")]),_._v(" "),t("h3",{attrs:{id:"_3-docker的安全性问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-docker的安全性问题"}},[_._v("#")]),_._v(" "),t("strong",[_._v("3. docker的安全性问题")])]),_._v(" "),t("h5",{attrs:{id:"_1-docker自身安全"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-docker自身安全"}},[_._v("#")]),_._v(" 1）docker自身安全")]),_._v(" "),t("p",[_._v("​\tDocker 作为一款容器引擎，本身也会存在一些安全漏洞。安全漏洞可以通过CVE（Common Vulnerabilities and Exposures）又称常见漏洞与披露，是一个与信息安全有关的数据库，收集各种信息安全弱点及漏洞并给予编号以便于公众查阅。")]),_._v(" "),t("p",[t("strong",[_._v("2）镜像安全")]),_._v("\n​\t由于 Docker 容器是基于镜像创建并启动，因此镜像的安全直接影响到容器的安全。具体影响镜像安全的总结如下。")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("镜像软件存在安全漏洞：由于容器需要安装基础的软件包，如果软件包存在漏洞，则可能会被不法分子利用并且侵入容器，影响其他容器或主机安全。")])]),_._v(" "),t("li",[t("p",[_._v("仓库漏洞：无论是 Docker 官方的镜像仓库还是我们私有的镜像仓库，都有可能被攻击，然后篡改镜像，当我们使用镜像时，就可能成为攻击者的目标对象。")])]),_._v(" "),t("li",[t("p",[_._v("用户程序漏洞：用户自己构建的软件包可能存在漏洞或者被植入恶意脚本，这样会导致运行时提权影响其他容器或主机安全。")])])]),_._v(" "),t("p",[t("strong",[_._v("3）Linux 内核隔离性不够")])]),_._v(" "),t("p",[_._v("​\t尽管目前 "),t("strong",[_._v("Namespace")]),_._v(" 已经提供了非常多的资源隔离类型，但是仍有部分关键内容没有被完全隔离，其中包括一些系统的关键性目录（如 /sys、/proc 等），这些关键性的目录可能会泄露主机上一些关键性的信息，让攻击者利用这些信息对整个主机甚至云计算中心发起攻击。")]),_._v(" "),t("p",[_._v("​\t而且仅仅依靠 Namespace 的隔离是远远不够的，因为一旦内核的 Namespace 被突破，使用者就有可能直接提权获取到主机的超级权限，从而影响主机安全。")]),_._v(" "),t("p",[t("strong",[_._v("4) 所有容器共享主机内核")])]),_._v(" "),t("p",[_._v("​\t由于"),t("strong",[_._v("同一宿主机上所有容器共享主机内核")]),_._v("，所以攻击者可以利用一些特殊手段导致内核崩溃，进而导致主机宕机影响主机上其他服务。")]),_._v(" "),t("h3",{attrs:{id:"_4-docker安全问题解决"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-docker安全问题解决"}},[_._v("#")]),_._v(" 4. Docker安全问题解决")]),_._v(" "),t("p",[t("strong",[_._v("1) Docker 自身安全性改进")]),_._v("\n​\t事实上，Docker 从 2013 年诞生到现在，在安全性上面已经做了非常多的努力。目前 Docker 在默认配置和默认行为下是足够安全的。")]),_._v(" "),t("p",[_._v("​\tDocker 自身是基于 Linux 的多种 Namespace 实现的，其中有一个"),t("strong",[_._v("很重要的 Namespace 叫作 User Namespace")]),_._v("，User Namespace 主要是用来做容器内用户和主机的用户隔离的。在过去容器里的 root 用户就是主机上的 root 用户，如果容器受到攻击，或者容器本身含有恶意程序，在容器内就可以直接获取到主机 root 权限。Docker 从 1.10 版本开始，使用 "),t("strong",[_._v("User Namespace 做用户隔离，实现了容器中的 root 用户映射到主机上的非 root 用户，从而大大减轻了容器被突破的风险。")])]),_._v(" "),t("p",[_._v("因此，我们尽可能地使用 Docker 最新版本就可以得到更好的安全保障。")]),_._v(" "),t("p",[t("strong",[_._v("2) 保障镜像安全")])]),_._v(" "),t("p",[_._v("​\t为保障镜像安全，我们可以在"),t("strong",[_._v("私有镜像仓库安装镜像安全扫描组件")]),_._v("，对上传的镜像进行检查，通过与 CVE 数据库对比，一旦发现有漏洞的镜像及时通知用户或阻止非安全镜像继续构建和分发。同时为了确保我们使用的镜像足够安全，在拉取镜像时，要确保只从受信任的镜像仓库拉取，并且与镜像仓库通信一定要使用 HTTPS 协议。")]),_._v(" "),t("p",[t("strong",[_._v("3) 加强内核安全和管理")])]),_._v(" "),t("p",[_._v("​\t由于仅仅依赖内核的隔离可能会引发安全问题，因此我们对于内核的安全应该更加重视。可以从以下几个方面进行加强。")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("宿主机及时升级内核漏洞")])]),_._v(" "),t("li",[t("p",[_._v("宿主机内核应该尽量安装最新补丁，因为更新的内核补丁往往有着更好的安全性和稳定性。")])]),_._v(" "),t("li",[t("p",[_._v("使用 Capabilities 划分权限")])])]),_._v(" "),t("p",[_._v("Capabilities 是 Linux 内核的概念，Linux 将系统权限分为了多个 Capabilities，它们都可以单独地开启或关闭，Capabilities 实现了系统更细粒度的访问控制。在执行docker run命令启动容器时，如非特殊可控情况，--privileged 参数不允许设置为 true，其他特殊权限可以使用 --cap-add 参数，根据使用场景适当添加相应的权限。")]),_._v(" "),t("p",[t("strong",[_._v("4) 使用安全加固组件")])]),_._v(" "),t("p",[_._v("​\tLinux 的 "),t("strong",[_._v("SELinux、AppArmor、GRSecurity组件都是 Docker 官方推荐的安全加固组件")]),_._v("。")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("SELinux (Secure Enhanced Linux): 是 Linux 的一个内核安全模块，提供了安全访问的策略机制，通过设置 SELinux 策略可以实现某些进程允许访问某些文件。")])]),_._v(" "),t("li",[t("p",[_._v("AppArmor: 类似于 SELinux，也是一个 Linux 的内核安全模块，普通的访问控制仅能控制到用户的访问权限，而 AppArmor 可以控制到用户程序的访问权限。")])]),_._v(" "),t("li",[t("p",[_._v("GRSecurity: 是一个对内核的安全扩展，可通过智能访问控制，提供内存破坏防御，文件系统增强等多种防御形式。")])])]),_._v(" "),t("p",[_._v("这三个组件可以限制一个容器对主机的内核或其他资源的访问控制。目前，容器报告的一些安全漏洞中，很多都是通过对内核进行加强访问和隔离来实现的。")]),_._v(" "),t("p",[t("strong",[_._v("5) 资源限制")])]),_._v(" "),t("p",[_._v("​\t在生产环境中，建议每个容器都添加相应的资源限制。下面给出一些执行docker run命令启动容器时可以传递的资源限制参数：")]),_._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[_._v("  --cpus                          限制 CPU 配额\n  -m, --memory                    限制内存配额\n  --pids-limit                    限制容器的 PID 个数\n")])])]),t("p",[_._v("例如我想要启动一个 1 核 2G 的容器，并且限制在容器内最多只能创建 1000 个 PID，启动命令如下：")]),_._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[_._v("$ docker run -it --cpus=1 -m=2048m --pids-limit=1000 busybox /bin/bash\n")])])]),t("p",[_._v("推荐在生产环境中限制 CPU、内存、PID 等资源，这样即便应用程序有漏洞，也不会导致主机的资源完全耗尽，最大限度降低安全风险。")]),_._v(" "),t("p",[t("strong",[_._v("6) 使用安全容器")])]),_._v(" "),t("p",[_._v("​\t容器有着轻便快速启动的优点，虚拟机有着安全隔离的优点，有没有一种技术可以兼顾两者的优点，做到既轻量又安全呢？")]),_._v(" "),t("p",[_._v("​\t答案是有，那就是"),t("strong",[_._v("安全容器。安全容器是相较于普通容器的，安全容器与普通容器的主要区别在于，安全容器中的每个容器都运行在一个单独的微型虚拟机中，拥有独立的操作系统和内核，并且有虚拟化层的安全隔离。")])]),_._v(" "),t("p",[_._v("安全容器目前推荐的技术方案是 : "),t("strong",[_._v("Kata Containers")])])])}),[],!1,null,null,null);v.default=e.exports}}]);