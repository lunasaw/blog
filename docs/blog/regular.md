---
title: 正则表达式
date: 2020-04-05
banner_img: /img/regular.jpg
tags: 
 - regular
categories:
 - 日志
---

### 1. 构建正则表达式

   - pattern() 返回正则表达式的字符串形式,其实就是返回Pattern.complile(String regex)的regex参数

     `p.pattern();//返回 \d+`

   - split(CharSequence input)方法,用于分隔字符串,并返回一个String[]

     `String[] str = p.split("我的QQ是:456456我的电话是:0532214我的邮箱是:aaa@aaa.com");
     		System.out.println(Arrays.toString(str));`

   - Pattern.matchers(String regex,CharSequence input)是一个静态方法,用于快速匹配字符串,该方法适合用于只匹配一次,且匹配全部字符串.

```java
   		System.out.println(Pattern.matches("\\d+", "2223"));
   		//返回true
   		System.out.println(Pattern.matches("\\d+", "2223aa"));
   		//返回false,需要匹配到所有字符串才能返回true,这里aa不能匹配到
   		System.out.println(Pattern.matches("\\d+", "22bb23"));
   		//返回false,需要匹配到所有字符串才能返回true,这里bb不能匹配到
```

   - //Pattern.matcher(CharSequence input)返回一个Matcher对象.

```java
   	Matcher mq = p.matcher("22bb23");
   		Pattern mx = mq.pattern();
   		//返回 p 也就是返回该 Matcher 对象是由哪个 Pattern 对象的创建的
   		System.out.println(p.toString());
   		System.out.println(mx.equals(p));
```

### 2. 常用方法

   Matcher.matches()/ Matcher.lookingAt()/ Matcher.find() * 三个方法均返回boolean类型,当匹配到时返回true,没匹配到则返回false

```java
   //TODO matches()对整个字符串进行匹配,只有整个字符串都匹配了才返回true
   		Matcher m1 = p.matcher("22bb23");
   		System.out.println(m1.matches());
   		//返回false,因为bb不能被\d+匹配,导致整个字符串匹配未成功.
   		Matcher m2 = p.matcher("2223");
   		System.out.println(m2.matches());
   		//返回true,因为\d+匹配到了整个字符串
   
   		//TODO lookingAt()对前面的字符串进行匹配,只有匹配到的字符串在最前面才返回true
   		Matcher m3 = p.matcher("22bb23");
   		System.out.println(m3.lookingAt());
   		//返回true,因为\d+匹配到了前面的22
   		Matcher m4 = p.matcher("aa2223");
   		System.out.println(m4.lookingAt());
   		//返回false,因为\d+不能匹配前面的aa
   
   		// TODO find()对字符串进行匹配,匹配到的字符串可以在任何位置.
   		Matcher m5 = p.matcher("22bb23");
   		System.out.println(m5.find());
   		//返回true
   		Matcher m6 = p.matcher("aa2223");
   		System.out.println(m6.find());
   		//返回true
   		Matcher m7 = p.matcher("aa2223bb");
   		System.out.println(m7.find());
   		//返回true
   		Matcher m8 = p.matcher("aabb");
   		System.out.println(m8.find());
   		//返回false
```

### 3. 获取位置方法

   Mathcer.start()/ Matcher.end()/ Matcher.group() * * 当使用matches(),lookingAt(),find()执行匹配操作后,就可以利用以上三个方法得到更详细的信息. 

```java
   //TODO start()返回匹配到的子字符串在字符串中的索引位置.
   		//TODO end()返回匹配到的子字符串的最后一个字符在字符串中的索引位置.
   		//TODO group()返回匹配到的子字符串
   		Matcher mz = p.matcher("aaa2223bb");
   		System.out.println(mz.find());
   		//匹配2223
   		System.out.println(mz.start());
   		//返回3
   		System.out.println(mz.end());
   		//返回7,返回的是2223后的索引号
   		System.out.println(mz.group());
   		//返回2223
   
   		Matcher mw = p.matcher("2223bb");
   		System.out.println(mw.lookingAt());
   		//匹配2223
   		System.out.println(mw.start());
   		//返回0,由于lookingAt()只能匹配前面的字符串,所以当使用lookingAt()匹配时,start()方法总是返回0
   		System.out.println(mw.end());
   		//返回4
   		System.out.println(mw.group());
   		//返回2223
   
   		Matcher mn = p.matcher("123213");
   		System.out.println(mn.matches());
   		//匹配整个字符串
   		System.out.println(mn.start());
   		//匹配成功返回0 ,异常,因为没有匹配到
   		System.out.println(mn.end());
   		//匹配成功返回结尾数,因为matches()需要匹配所有字符串 不成功抛出异常
   		System.out.println(mn.group());
   		//成功返回字符 失败抛出异常
   
   		/**
   		 * 正则表达式的分组在java中是怎么使用的.
   		 * start(),end(),group()均有一个重载方法它们是start(int i),end(int i),group(int i)专用于分组操作,Mathcer 类还有一个groupCount()用于返回有多少组.
   		 */
   		Pattern p=Pattern.compile("([a-z]+)(\\d+)");
   		Matcher m=p.matcher("aaa2223bb");
   		System.out.println(m.find());
   		//匹配aaa2223
   		System.out.println(m.groupCount());
   		//返回2,因为有2组
   		System.out.println(m.start(1));
   		//返回0 返回第一组匹配到的子字符串在字符串中的索引号
   		System.out.println(m.start(2));
   		//返回3
   		System.out.println(m.end(1));
   		//返回3 返回第一组匹配到的子字符串的最后一个字符在字符串中的索引位置.
   		System.out.println(m.end(2));
   		//返回7
   		System.out.println(m.group(1));
   		//返回aaa,返回第一组匹配到的子字符串
   		System.out.println(m.group(2));
   		//返回2223,返回第二组匹配到的子字符串
```

### 4. 分组的使用

   一段文本,里面有很多数字,而且这些数字是分开的,我们现在要将文本中所有数字都取出

```java
   Pattern p=Pattern.compile("\\d+");
   		Matcher m=p.matcher("我的QQ是:456456 我的电话是:0532214 我的邮箱是:aaa123@aaa.com");
   //		while(m.find()) {
   //			System.out.println(m.group());
   //		}
   		// TODO 或者
   		while(m.find()) {
   			System.out.println(m.group());
   			System.out.print("start:"+m.start());
   			System.out.println(" end:"+m.end());
   		}
```

   