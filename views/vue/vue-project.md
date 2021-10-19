---
title: vue-project
date: 2020-09-27
tags: 
 - vue
categories:
 - vue
---

# 项目一些思路

### 一. 项目基本设置

#### 1.1. 目录结构

- network
- components -> common/content
- pages -> 路由分层
- common 
- assets
- router
- store



#### 1.2. 设置CSS初始化和全局样式

- initialize.css
- base.css



#### 1.3. tabbar的封装

- 封装HYTabbar
- 封装HYTabbarItem
- 响应点击切换的设计
- 封装完成后，使用时对HYTabbar重新包装



#### 1.4. axios的封装

- 创建axios实例
- 拦截响应，返回.data数据
- 根据传入的options发送请求，并且调用对应resolve和reject



### 二. 首先开发

#### 2.1. navbar的封装和使用

- 封装navbar包含三个插槽：left、center、right
- 设置navbar相关的样式
- 使用navbar实现首页的导航栏



#### 2.2. 请求首页数据

- 封装请求首页更多数据
- 将banner数据放在banners变量中
- 将recommend数据放在recommends变量中



#### 2.3. 根据Swiper封装HomeSwiper

- 使用Swiper和SwiperItem
- 传入banners进行展示



#### 2.4. 封装FeatureView

- 传入recommends数据，进行展示



#### 2.5. 封装RecommendView

- 展示一张图片即可



#### 2.6. 封装tabControl

- 基本结构的封装
- 监听点击



#### 2.7. 请求和保存商品数据

- 定义goodsList变量，用于存储请求到的商品数据
- 根据type和page请求商品数据
- 将商品数据保存起来



#### 2.8. 封装GoodsList和GoodsListItem

- 展示商品列表，封装GoodsList
- 列表中每一个商品，封装GoodsListItem
- 注意CSS属性的设置即可



#### 2.9. 滚动的封装Scroll

- 学习BetterScroll的使用
- 安装better-scroll
- 封装一个独立的组件，用于作为滚动组件：Scroll
- 组件内代码的封装：
  - 1.创建BetterScroll对象，并且传入DOM和选项（probeType、click、pullUpLoad）
  - 2.监听scroll事件，该事件会返回一个position
  - 3.监听pullingUp事件，监听到该事件进行上拉加载更多
  - 4.封装刷新的方法：this.scroll.refresh()
  - 5.封装滚动的方法：this.scroll.scrollTo(x, y, time)
  - 6.封装完成刷新的方法：this.scroll.finishedPullUp



#### 2.10. 上拉加载更多

- 通过Scroll监听上拉加载更多。
- 在Home中加载更多的数据。
- 请求数据完成后，调动finishedPullUp



#### 2.11. 返回顶部

- 封装BackTop组件
- 定义一个常量，用于决定在什么数值下显示BackTop组件
- 监听滚动，决定BackTop的显示和隐藏
- 监听BackTop的点击，点击时，调用scrollTo返回顶部



#### 2.12. tabControl的停留

- 重新添加一个tabControl组件（需要设置定位，否则会被盖住）
- 在updated钩子中获取tabControl的offsetTop
- 判断是否滚动超过了offsetTop来决定是否显示新添加的tabControl

