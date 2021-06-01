---
title: JavaCV调用
date: 2020-05-29
banner_img: /img/opencv.jpg
tags: 
 - video
categories:
 - java
 - javacv
---

### JavaCV调用摄像, javacv 包含了opencv ,ffmpeg 等图像处理包 使用javacpp 转为C 文件后执行

1. 首先需要引入依赖，当然，也可以使用Jar包，推荐使用maven管理

```xml
<dependency>
            <groupId>org.bytedeco</groupId>
            <artifactId>javacpp</artifactId>
            <version>1.5.3</version>
        </dependency>

        <!-- javacv -->
        <dependency>
            <groupId>org.bytedeco</groupId>
            <artifactId>javacv</artifactId>
            <version>1.5.3</version>
        </dependency>

        <dependency>
            <groupId>org.bytedeco</groupId>
            <artifactId>javacv-platform</artifactId>
            <version>1.5.3</version>
        </dependency>

        <!-- opencv -->
        <!-- https://mvnrepository.com/artifact/org.bytedeco/opencv -->
        <dependency>
            <groupId>org.bytedeco</groupId>
            <artifactId>opencv</artifactId>
            <version>4.3.0-1.5.3</version>
        </dependency>
```

2. 开始测试
   - 首先测试获取摄像

```java
 /**
     * 预览摄像
     * 本机摄像头默认0，这里使用javacv的抓取器，至于使用的是ffmpeg还是opencv，请自行查看源码
     *
     * @param number
     * @throws Exception
     */
    public static void getScreenshots(Integer number) throws Exception {
        if (number == null) {
            number = 0;
        }
        OpenCVFrameGrabber grabber = new OpenCVFrameGrabber(number);
        grabber.start(); // 开始获取摄像头数据
        CanvasFrame canvas = new CanvasFrame("摄像头");
        // 新建一个窗口
        canvas.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        canvas.setAlwaysOnTop(true);
        while (true) {
            if (!canvas.isDisplayable()) {
                grabber.stop();
                // 停止抓取
                System.exit(2);
                // 退出
                break;
            }
            canvas.showImage(grabber.grab());
            // 获取摄像头图像并放到窗口上显示， 这里的Frame frame=grabber.grab(); frame是一帧视频图像
            Thread.sleep(50);
            // 50毫秒刷新一次图像
        }
    }

```

3. 视频录制

```java
/**
     * 按帧录制本机摄像头视频（边预览边录制，停止预览即停止录制）
     *
     * @author eguid
     * @param outputFile -录制的文件路径，也可以是rtsp或者rtmp等流媒体服务器发布地址
     * @param frameRate - 视频帧率
     * @throws Exception
     * @throws InterruptedException
     * @throws org.bytedeco.javacv.FrameRecorder.Exception
     */
    public static void recordCamera(String outputFile, double frameRate)
        throws Exception {
        Loader.load(opencv_objdetect.class);
        FrameGrabber grabber = FrameGrabber.createDefault(0);
        // 本机摄像头默认0，这里使用javacv的抓取器，至于使用的是ffmpeg还是opencv，请自行查看源码
        grabber.start();
        // 转换器
        IplImage grabbedImage = JavaCvUtils.converter.convert(grabber.grab());
        // 抓取一帧视频并将其转换为图像，至于用这个图像用来做什么？加水印，人脸识别等等自行添加
        int width = grabbedImage.width();
        int height = grabbedImage.height();

        FrameRecorder recorder = FrameRecorder.createDefault(outputFile, width, height);
        recorder.setVideoCodec(avcodec.AV_CODEC_ID_H264);
        // avcodec.AV_CODEC_ID_H264，编码
        recorder.setFormat("flv");
        // 封装格式，如果是推送到rtmp就必须是flv封装格式
        recorder.setFrameRate(frameRate);

        recorder.start();
        // 开启录制器
        long startTime = 0;
        long videoTS = 0;
        CanvasFrame frame = new CanvasFrame("camera", CanvasFrame.getDefaultGamma() / grabber.getGamma());
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setAlwaysOnTop(true);
        // 不知道为什么这里不做转换就不能推到rtmp
        while (frame.isVisible() && (grabbedImage = JavaCvUtils.converter.convert(grabber.grab())) != null) {
            Frame rotatedFrame = JavaCvUtils.converter.convert(grabbedImage);
            frame.showImage(rotatedFrame);
            if (startTime == 0) {
                startTime = System.currentTimeMillis();
            }
            videoTS = 1000 * (System.currentTimeMillis() - startTime);
            recorder.setTimestamp(videoTS);
            recorder.record(rotatedFrame);
            Thread.sleep(40);
        }
        frame.dispose();
        recorder.stop();
        recorder.release();
        grabber.stop();
    }  
```

