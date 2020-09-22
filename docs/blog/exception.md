---
title: SpringBoot 统一异常处理
date: 2020-06-07
banner_img: /img/exception.jpg
tags: 
 - exception
categories:
 - 日志
---

## springBoot 统一异常处理

### 异常处理反例

- #### 捕获异常后只输出到控制台

```javascript
前端
$.ajax({
    type: "GET",
    url: "/user/add",
    dataType: "json",
    success: function(data){
        alert("添加成功");
    }
});
后端
try {
    // do something
} catch (Exception e) {
    e.printStackTrace();
}
```

 这是见过最多的异常处理方式了, 如果这是一个添加商品的方法, 前台通过 ajax 发送请求到后端, 期望返回 json 信息表示添加结果. 但如果这段代码出现了异常:

  - 那么用户看到的场景就是点击了添加按钮, 但没有任何反应(其实是返回了 500 错误页面, 但这里前端没有监听 error 事件, 只监听了 success 事件. 但即使加上了`error: function(data) {alert("添加失败");}`) 又如何呢? 到底因为啥失败了呢, 用户也不得而知.
  - 后台 `e.printStackTrace()` 打印在控制台的日志也会在漫漫的日志中被埋没, 很可能会看不到输出的异常. 但这并不是最糟的情况, 更糟糕的事情是连 `e.printStackTrace()` 都没有, `catch` 块中是空的, 这样后端的控制台中更是什么都看不到了, 这段代码会像一个隐形的炸弹一样一直埋伏在系统中.

#### 混乱的返回方式

```javascript
$.ajax({
    type: "GET",
    url: "/goods/add",
    dataType: "json",
    success: function(data) {
        if (data.flag) {
            alert("添加成功");
        } else {
            alert(data.message);
        }
    },
    error: function(data){
        alert("添加失败");
    }
});

后端
@RequestMapping("/goods/add")
@ResponseBody
public Map add(Goods goods) {
    Map map = new HashMap();
    try {
        // do something
        map.put(flag, true);
    } catch (Exception e) {
        e.printStackTrace();
        map.put("flag", false);
        map.put("message", e.getMessage());
    }
    reutrn map;
}
```

- 这种方式捕获异常后, 返回了错误信息, 且前台做了一定的处理, 看起来很完善? 但用 `HashMap` 中的 `flag` 和 `message` 这种字符串来当键很容易处理, 例如你这里叫 `message`, 别人起名叫 `msg`, 甚至有时手抖打错了, 怎么办? 前台再改成 `msg` 或其他的字符?, 前端后端这样一直来回改?

  更有甚者在情况 A 的情况下, 返回 json, 在情况 B 的情况下, 重定向到某个页面, 这就更乱了. 对于这种不统一的结构处理起来非常麻烦.

### 异常处理规范

- #### 不要捕获任何异常

  对的, 不要在**业务代码中**进行捕获异常, 即 dao、service、controller 层的所以异常都全部抛出到上层. 这样不会导致业务代码中的一堆 `try-catch` 会混乱业务代码.

- #### 统一返回结果集

  不要使用 Map 来返回结果, Map 不易控制且容易犯错, 应该定义一个 Java 实体类. 来表示统一结果来返回, 如定义实体类:

```java
package com.xkcoding.exception.handler.model;

import com.xkcoding.exception.handler.constant.Status;
import com.xkcoding.exception.handler.exception.BaseException;
import lombok.Data;


@Data
public class ApiResponse {
	/**
	 * 状态码
	 */
	private Integer code;

	/**
	 * 返回内容
	 */
	private String message;

	/**
	 * 返回数据
	 */
	private Object data;

	/**
	 * 无参构造函数
	 */
	private ApiResponse() {

	}

	/**
	 * 全参构造函数
	 *
	 * @param code    状态码
	 * @param message 返回内容
	 * @param data    返回数据
	 */
	private ApiResponse(Integer code, String message, Object data) {
		this.code = code;
		this.message = message;
		this.data = data;
	}

	/**
	 * 构造一个自定义的API返回
	 *
	 * @param code    状态码
	 * @param message 返回内容
	 * @param data    返回数据
	 * @return ApiResponse
	 */
	public static ApiResponse of(Integer code, String message, Object data) {
		return new ApiResponse(code, message, data);
	}

	/**
	 * 构造一个成功且带数据的API返回
	 *
	 * @param data 返回数据
	 * @return ApiResponse
	 */
	public static ApiResponse ofSuccess(Object data) {
		return ofStatus(Status.OK, data);
	}

	/**
	 * 构造一个成功且自定义消息的API返回
	 *
	 * @param message 返回内容
	 * @return ApiResponse
	 */
	public static ApiResponse ofMessage(String message) {
		return of(Status.OK.getCode(), message, null);
	}

	/**
	 * 构造一个有状态的API返回
	 *
	 * @param status 状态 {@link Status}
	 * @return ApiResponse
	 */
	public static ApiResponse ofStatus(Status status) {
		return ofStatus(status, null);
	}

	/**
	 * 构造一个有状态且带数据的API返回
	 *
	 * @param status 状态 {@link Status}
	 * @param data   返回数据
	 * @return ApiResponse
	 */
	public static ApiResponse ofStatus(Status status, Object data) {
		return of(status.getCode(), status.getMessage(), data);
	}

	/**
	 * 构造一个异常且带数据的API返回
	 *
	 * @param t    异常
	 * @param data 返回数据
	 * @param <T>  {@link BaseException} 的子类
	 * @return ApiResponse
	 */
	public static <T extends BaseException> ApiResponse ofException(T t, Object data) {
		return of(t.getCode(), t.getMessage(), data);
	}

	/**
	 * 构造一个异常且带数据的API返回
	 *
	 * @param t   异常
	 * @param <T> {@link BaseException} 的子类
	 * @return ApiResponse
	 */
	public static <T extends BaseException> ApiResponse ofException(T t) {
		return ofException(t, null);
	}
}

```

### 异常处理类

```java
@ControllerAdvice
@Slf4j
public class DemoExceptionHandler {
	private static final String DEFAULT_ERROR_VIEW = "error";

	/**
	 * 统一 json 异常处理
	 *
	 * @param exception JsonException
	 * @return 统一返回 json 格式
	 */
	@ExceptionHandler(value = JsonException.class)
	@ResponseBody
	public ApiResponse jsonErrorHandler(JsonException exception) {
		log.error("【JsonException】:{}", exception.getMessage());
		return ApiResponse.ofException(exception);
	}

	/**
	 * 统一 页面 异常处理
	 *
	 * @param exception PageException
	 * @return 统一跳转到异常页面
	 */
	@ExceptionHandler(value = PageException.class)
	public ModelAndView pageErrorHandler(PageException exception) {
		log.error("【DemoPageException】:{}", exception.getMessage());
		ModelAndView view = new ModelAndView();
		view.addObject("message", exception.getMessage());
		view.setViewName(DEFAULT_ERROR_VIEW);
		return view;
	}
}

```

意思由代码进入Controller层之后由@ControllerAdvice进行AOP包围处理,可自定义接受异常后跳转页面或者返回API调用信息。