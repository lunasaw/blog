---
title: Jackson
date: 2021-05-16 20:36:22
banner_img: /img/java.jpg
index_img: /img/java.png
sidebar: 'auto'
isShowComments: true
tags: 
 - RestTemplate
categories:
 - java
 - json
---

# Jackson 使用篇

## 【简介】

日常开发过程中经常会使用json进行数据的传输，这就涉及到了对象和json的相互转化，常用的解决方案有：Jackson（推荐）、谷歌的Gson、阿里的Fastjson，详情见 Json【汇总】

因为SpringBoot默认的json解析格式就是Jackson，所以不需要额外的引入依赖

![在这里插入图片描述](https://tva1.sinaimg.cn/large/008i3skNgy1gqkjtgzf0lj30jh0bjgm5.jpg)

## 【常见配置】

### 方式一：yml配置

```java
spring.jackson.date-format指定日期格式，比如yyyy-MM-dd HH:mm:ss，或者具体的格式化类的全限定名

spring.jackson.time-zone指定日期格式化时区，比如America/Los_Angeles或者GMT+10.

spring.jackson.deserialization是否开启Jackson的反序列化

spring.jackson.generator是否开启json的generators.

spring.jackson.joda-date-time-format指定Joda date/time的格式，比如yyyy-MM-ddHH:mm:ss). 如果没有配置的话，dateformat会作为backup

spring.jackson.locale指定json使用的Locale.

spring.jackson.mapper是否开启Jackson通用的特性.

spring.jackson.parser是否开启jackson的parser特性.

spring.jackson.property-naming-strategy指定PropertyNamingStrategy(CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES)或者指定PropertyNamingStrategy子类的全限定类名.

spring.jackson.serialization是否开启jackson的序列化.

spring.jackson.serialization-inclusion指定序列化时属性的inclusion方式，具体查看JsonInclude.Include枚举.
```

```yaml
spring:
  jackson:
    #日期格式化
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    #设置空如何序列化
    default-property-inclusion: non_null    
    serialization:
       #格式化输出 
      indent_output: true
      #忽略无法转换的对象
      fail_on_empty_beans: false
    deserialization:
      #允许对象忽略json中不存在的属性
      fail_on_unknown_properties: false
    parser:
      #允许出现特殊字符和转义符
      allow_unquoted_control_chars: true
      #允许出现单引号
      allow_single_quotes: true
```

### 方式二：重新注入ObjectMapper

```java
@Bean
@Primary
@ConditionalOnMissingBean(ObjectMapper.class)
public ObjectMapper jacksonObjectMapper(Jackson2ObjectMapperBuilder builder{
   ObjectMapper objectMapper = builder.createXmlMapper(false).build();

   // 通过该方法对mapper对象进行设置，所有序列化的对象都将按改规则进行系列化
   // Include.Include.ALWAYS 默认
   // Include.NON_DEFAULT 属性为默认值不序列化
   // Include.NON_EMPTY 属性为 空（""） 或者为 NULL 都不序列化，则返回的json是没有这个字段的。这样对移动端会更省流量
   // Include.NON_NULL 属性为NULL 不序列化
   objectMapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
   objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
   // 允许出现特殊字符和转义符
   objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
   // 允许出现单引号
   objectMapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
   // 字段保留，将null值转为""
   objectMapper.getSerializerProvider().setNullValueSerializer(new JsonSerializer<Object>()
   {
       @Override
       public void serialize(Object o, JsonGenerator jsonGenerator,
                             SerializerProvider serializerProvider)
               throws IOException
       {
           jsonGenerator.writeString("");
       }
   });
   return objectMapper;
}
```

## 【常用 API】

因为日常开发最常用的api就是对象的序列化和反序列化，这里封装一个工具类，这里只展示部分API，其他API可参考 [JSON解析-Jackson](https://github.com/czy1024/luna-json-util/tree/master/json-jackson)

```java
@Slf4j
public class JsonUtils {

    private static ObjectMapper mapper = new ObjectMapper();

    static {
        // 对于空的对象转json的时候不抛出错误
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        // 允许属性名称没有引号
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        // 允许单引号
        mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
        // 设置输入时忽略在json字符串中存在但在java对象实际没有的属性
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        // 设置输出时包含属性的风格
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }


    /**
     * 序列化，将对象转化为json字符串
     *
     * @param data
     * @return
     */
    public static String toJsonString(Object data) {
        if (data == null) {
            return null;
        }

        String json = null;
        try {
            json = mapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            log.error("[{}] toJsonString error：{{}}", data.getClass().getSimpleName(), e);
        }
        return json;
    }


    /**
     * 反序列化，将json字符串转化为对象
     *
     * @param json
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> T parse(@NonNull String json, Class<T> clazz) {
        T t = null;
        try {
            t = mapper.readValue(json, clazz);
        } catch (Exception e) {
            log.error(" parse json [{}] to class [{}] error：{{}}", json, clazz.getSimpleName(), e);
        }
        return t;
    }

}
```

#### 定义一个Bean

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
    private Integer age;
    private Date birthday;
}
```

#### 测试

```java
@Slf4j
public class JacksonTest {
    public static void main(String[] args) {
        User user = User.builder()
                .id(1L)
                .name("tom")
                .age(23)
                .birthday(new Date())
                .build();

        String json = JsonUtils.toJsonString(user);
        log.info("obj toJsonString:[{}]", json);

        User u = JsonUtils.parse(json, User.class);
        log.info("parse json to obj: [{}]", u);

    }
}
```

```bash
16:44:01.871 [main] INFO com.it.jackson.test.JacksonTest - obj toJsonString:[{"id":1,"name":"tom","age":23,"birthday":1587890641047}]
16:44:01.941 [main] INFO com.it.jackson.test.JacksonTest - parse json to obj: [User(id=1, name=tom, age=23, birthday=Sun Apr 26 16:44:01 CST 2020)]
```

## 【常用 注解】

### 【@JsonProperty】类似于sql里字段的别名，用于序列化，使用注解字段属性，替代原字段属性

```java
@JsonProperty("userName")
private String name;
```

#### 序列化结果为：在序列化的json串中，userName替代了name

```json
{"userName":"tom"}
```

### 【@JsonIgnore】在序列化时忽略该字段

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @JsonIgnore
    private Long id;
    @JsonProperty("userName")
    private String name;
    @JsonIgnore
    private Integer age;
    @JsonIgnore
    private Date birthday;
}
```

#### 序列化结果为：

```json
{"userName":"tom"}
```

### 【@JsonIgnoreProperties】

1、序列化@JsonIgnoreProperties与@JsonIgnore类似，用于类上，注解使用的是字段别名

```java

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"id","userName","birthday"})
public class User {
    private Long id;
    @JsonProperty("userName")
    private String name;
    private Integer age;
    private Date birthday;
}
```

#### 序列化结果为：

```json
{"age":23}
```

2、@JsonIgnoreProperties(ignoreUnknown = true)用于忽略字段不匹配情况，相当于mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

### 【@JsonTypeName @JsonTypeInfo】用在类上，在序列化时增加一层

```java

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeName(value = "user")
@JsonTypeInfo(include = JsonTypeInfo.As.WRAPPER_OBJECT, use = JsonTypeInfo.Id.NAME)
public class User {
    private Long id;
    @JsonProperty("userName")
    private String name;
    private Integer age;
    private Date birthday;
}

```

序列化结果：

```json
{"user":{"id":1,"age":23,"birthday":1587891781603,"userName":"tom"}}
```

### 【@JsonRootName】

组合在序列化上等于类上注解@JsonRootName(“user”) 和 mapper.enable(SerializationFeature.WRAP_ROOT_VALUE),反序列化无用;

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    @JsonProperty("userName")
    private String name;
    private Integer age;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss:SSS", timezone = "GMT+8")
    private Date birthday;
}
```

序列化结果：

```json
{"id":1,"age":23,"birthday":"2020-04-26 17:09:32:818","userName":"tom"}
```

