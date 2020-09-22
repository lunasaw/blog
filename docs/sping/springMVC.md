---
title: springMVC
date: 2020-04-02
banner_img: /img/java1.jpg
tags: 
 - springmvc
categories:
 - spring
---

### 1.页面模板解析
可通过使用thymeleaf模板对应的spring配置，默认已经配置好，可手动配置其他路径
```
spring.thymeleaf.prefix=classpath:/templates/

```
并且引入依赖
```xml
 <!-- SpringBoot集成thymeleaf模板 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>

```
即可在控制层实现页面跳转
```Java
@Controller
@RequestMapping(path = "crud")
public class UserController extends BaseController {

	@Autowired
	private UserDAO userDAO;

	@Autowired
	private DepartmentDAO departmentDAO;

	/**
	 * 查询所有用户
	 *
	 * @return
	 */
	@GetMapping("/users")
	public String list(ModelMap map) {
		List<UserDO> all = userDAO.getAll();
		map.put("users", all);
		return "user/users"; //对应templates/user/users.html
	}


```
在页面访问 {ip：端口}/项目路径/curd/users 即可访问对应页面。其中若
注解 @@RequestMapping(path = "crud") 为 "/curd" 或者 @GetMapping("users")为"/users" 都可。
### 2. 重定向

重定向可带参数或者不带参数
1. 不带参数
```java
/**
	 * 添加用户请求
	 * SpringMVC 自动将属性绑定  入参名和对象属性名一样
	 *
	 * @return
	 */
	@PostMapping("/user")
	public String  addUser(UserDO userDO) {
		System.out.println("提交的用户信息" + userDO);
		userDAO.insert(userDO);
		//　TODO　添加完成后来到用户列表页面 redirect: 重定向地址  forward:转发地址 不能有空格
		return "redirect:/crud/users";
	}


```
2. 带参数传递
![image.png](http://111.229.114.126/upload/2020/3/image-3ba4e6b3f99d445aad0417be4b4d70d1.png)

redirect 目标有三种构建方式：
1. 使用 redirect: 前缀url方式构建目标url
2. 使用 RedirectView 类型指定目标, 推荐使用这个,
3. 使用 ModelAndView 类型指定目标, ModelAndView 视图名默认是forward, 所以对于redirect, 需要加上 redirect: 前缀

传参和取参方式:
1. 传参: 以字符串的形式构建目标url, 可以使用 query variable的格式拼url. 取参: @RequestParam()来fetch
2. 传参: redirectAttributes.addAttribute() 加的attr. 取参: @RequestParam()来fetch
3. 传参: redirectAttributes.addFlashAttribute() 加的attr. 取参: @ModelAttribute()来fetch

Flash attribute的特点:
1. addFlashAttribute() 可以是任意类型的数据(不局限在String等基本类型), addAttribute()只能加基本类型的参数.
2. addFlashAttribute() 加的 attr, 不会出现在url 地址栏上.
3. addFlashAttribute() 加的 attr, 一旦fetch后, 就会自动清空, 非常适合 form 提交后 feedback Message.
### 3. 请求转发
在Spring MVC 中, 构建forward 目标有两种方式:
1. 以字符串的形式构建目标url, url 需要加上 forward: 前缀
2. 使用 ModelAndView 对象来设置转发的forward目标, viewName 可以省略 forward: 前缀, viewName 应该是目标url, 而不是目标视图的函数名.
传参方式:
1. 以字符串的形式构建目标url, 可以使用 query variable的格式拼url
2. 使用 ModelAndView 对象来增加 attribute Object, 其结果也是在拼接url. 
取参的方式: 可以使用 @RequestParam 来取参. 

eg：Java代码
```java
@Controller
@RequestMapping("/")
public class DemoController {

    /*
     * forward 示例: 以字符串的形式构建目标url, url 需要加上 forward: 前缀
     * */
    @RequestMapping("/forwardTest1")
    public String forwardTest1() {
        return "forward:/forwardTarget?param1=v1&param2=v2";
    }


    /*
     * forward 示例: 使用 ModelAndView() 设置转发的目标url
     * */
    @RequestMapping("/forwardTest2")
    public ModelAndView forwardTest2() {
        ModelAndView mav=new ModelAndView("/forwardTarget"); // 绝对路径OK
        //ModelAndView mav=new ModelAndView("forwardTarget"); // 相对路径也OK
        mav.addObject("param1", "value1");
        mav.addObject("param2", "value2");
        return mav ;
    }

    @RequestMapping("/forwardTarget")
    public String forwardTargetView(Model model, @RequestParam("param1") String param1,
            @RequestParam("param2") String param2) {
        model.addAttribute("param1", param1);
        model.addAttribute("param2", param2);
        return "forwardTarget";
    }


    /*
     * redirect 目标有三种构建方式
     * 1. 使用 redirect: 前缀url方式构建目标url
     * 2. 使用 RedirectView 类型指定目标
     * 3. 使用 ModelAndView 类型指定目标, ModelAndView 视图名默认是forward, 所以对于redirect, 需要加上 redirect: 前缀
     * */
    @RequestMapping("/noParamRedirect")
    public RedirectView noParamTest() {
        RedirectView redirectTarget = new RedirectView();
        redirectTarget.setContextRelative(true);
        redirectTarget.setUrl("noParamTarget");
        return redirectTarget;
    }

    @RequestMapping("/noParamTarget")
    public String redirectTarget() {
        return "noParamTarget";
    }

    @RequestMapping("/withParamRedirect")
    public RedirectView withParamRedirect(RedirectAttributes redirectAttributes) {
        RedirectView redirectTarget = new RedirectView();
        redirectTarget.setContextRelative(true);
        redirectTarget.setUrl("withParamTarget");

        redirectAttributes.addAttribute("param1", "value1");
        redirectAttributes.addAttribute("param2", "value2");
        return redirectTarget;
    }

    @RequestMapping("/withParamTarget")
    public String withParamTarget(Model model, @RequestParam("param1") String param1,
            @RequestParam("param2") String param2) {
        model.addAttribute("param1", param1);
        model.addAttribute("param2", param2);
        return "withParamTarget";
    }

    @RequestMapping("/withFlashRedirect")
    public RedirectView withFlashTest(RedirectAttributes redirectAttributes) {
        RedirectView redirectTarget = new RedirectView();
        redirectTarget.setContextRelative(true);
        redirectTarget.setUrl("withFlashTarget");

        redirectAttributes.addAttribute("param", "value");
        redirectAttributes.addFlashAttribute("flashParam", "flashValue");
        return redirectTarget;
    }


    /*
     * redirectAttributes.addAttribute加的attr, 使用 @RequestParam()来fetch
     * redirectAttributes.addFlashAttribute()加的attr, 使用 @ModelAttribute()来fetch
     * */
    @RequestMapping("/withFlashTarget")
    public String withFlashTarget(Model model, @RequestParam("param") String param,
            @ModelAttribute("flashParam") String flashParam) {
        model.addAttribute("param", param);
        model.addAttribute("flashParam", flashParam);
        return "withFlashTarget";
    }



    @GetMapping("/input")
    public String input() {
        return "input";
    }

    /*
     * form 提交后, 如果form数据有问题, 使用redirectAttributes.addFlashAttribute()加上 flash message.
     * addFlashAttribute()可以是任意类型的数据(不局限在String等基本类型)
     * addFlashAttribute() 加的 attr, 不会出现在url 地址栏上.
     * addFlashAttribute() 加的 attr, 一旦fetch后, 就会自动清空, 非常适合 form 提交后 feedback Message.
     * */
    @PostMapping("/submit")
    public RedirectView submit(RedirectAttributes redirectAttributes) {
        boolean passed = false;
        if (passed==false) {
            RedirectView redirectTarget = new RedirectView();
            redirectTarget.setContextRelative(true);
            redirectTarget.setUrl("input");
            redirectAttributes.addFlashAttribute("errorMessage", "some error information here");
            return redirectTarget;
        }else {
            RedirectView redirectTarget = new RedirectView();
            redirectTarget.setContextRelative(true);
            redirectTarget.setUrl("inputOK");
            return redirectTarget;
        }
    }
}

```