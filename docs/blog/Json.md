---
title: Json处理
date: 2020-04-02
banner_img: /img/json.png
index_img: /img/json.png
tags: 
 - json
categories:
 - java
---

### FastJSON
1. 引入依赖或者Jar包
```xml
<dependency>
     <groupId>com.alibaba</groupId>
     <artifactId>fastjson</artifactId>
     <version>1.1.23</version>
 </dependency>

```
2. 将Map转成JSON
```java
	Map<String, Object> map = new HashMap<String, Object>();
		map.put("key1", "value1");
		map.put("key2", "value2");
		String mapJson = JSON.toJSONString(map);
		System.out.println(mapJson);
		//输出{"key1":"value1","key2":"value2"}

		//TODO 泛型的反序列化（使用TypeReference传入类型信息）
		Map<String, Object> map2 = JSON.parseObject(mapJson, new TypeReference<Map<String, Object>>(){});
		System.out.println(map2);

```

3. 将List<Map转成JSON
```java
List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> map1 = new HashMap<String, Object>();
		map1.put("key1", "value1");
		map1.put("key2", "value2");

		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("key1", "value3");
		map2.put("key2", "value4");
		list.add(map1);
		list.add(map2);

		String jsonstr = JSON.toJSONString(list);
		System.out.println(jsonstr);
		System.out.println("==========================================");

		//输出 [{"key1":"value1","key2":"value2"},{"key1":"value3","key2":"value4"}]
		// TODO String objJson = JSON.toJSONString(Object object, boolean prettyFormat)
		//TODO 传入一个对象和一个布尔类型（是否格式化），将对象转成格式化后的JSON字符串。
		String listJson1 = JSONArray.toJSONString(list, true);
		System.out.println(listJson1);
		System.out.println("==========================================");
		String listJson2 = JSONArray.toJSONString(list, false);
		System.out.println(listJson2);
		System.out.println("==========================================");

		//TODO 使用单引号
		String listJson = JSON.toJSONString(list, SerializerFeature.UseSingleQuotes);
		//输出 [{'key1':'value1','key2':'value2'},{'key1':'value3','key2':'value4'}]
		System.out.println(listJson);
		System.out.println("==========================================");

		//TODO	集合反序列化
		List<Map> list1 = JSON.parseArray(listJson, Map.class);
		for(Map<String, Object> map : list1){
			System.out.println(map.get("key1"));
			System.out.println(map.get("key2"));
		}
		//输出 value1 value2 value3 value4
```
4. Java bean
```java
UserDO userDO = new UserDO();
		userDO.setId(1);
		userDO.setName("乐乐");
		userDO.setAge(12);
		String userJson = JSON.toJSONString(userDO);
		System.out.println(userJson);
		//输出 {"age":12,"id":1,"username":"乐乐"}

		//TODO 普通序列化
		UserDO user1 = (UserDO) JSON.parse(userJson);
		System.out.println(user1.getAge());
		//输出 12

		//TODO 指定Class信息反序列化
		UserDO user2 = JSON.parseObject(userJson,UserDO.class);
		System.out.println(user2.getName());
		//输出 乐乐

```
5. 时间
```java
//TODO （1）FastJSON将java.util.Date转成long。
		String dateJson1 = JSON.toJSONString(new Date());
		System.out.println(dateJson1);
		System.out.println("==========================================");

		//输出 1547900848449
		//TODO（2）使用SerializerFeature特性格式化日期。
		String dateJson2 = JSON.toJSONString(new Date(), SerializerFeature.WriteDateUseDateFormat);
		System.out.println(dateJson2);
		System.out.println("==========================================");

		//输出 "2019-01-19 20:29:24"
		//TODO（3）指定输出日期格式
		String dateJson3 = JSON.toJSONStringWithDateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
		System.out.println(dateJson3);
		System.out.println("==========================================");
		//输出"2019-01-19 20:32:34"

```