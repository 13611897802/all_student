# all_student
打开文件阅览。

1.毕业学生年届
如果增加届名，在static/template/year.json里面添加，仿造原来格式。新的html网页放入template中



主页视频增加维护static/home_video/video.json,将对应的视频放进home_video这个文件夹


2.新增****届.html内容参考
      
      2.1新增视频：


      
      <div class="video-container">
                <p class="video-title"><em>Test Video</em></p>
                <video controls width="100%" height="auto" playsinline muted>
                    <source src="static/home_video/video.mp4" type="video/mp4">
                    <source src="static/home_video/video.webm" type="video/webm">
                    <p>您的设备不支持HTML5视频，请下载<a href="static/home_video/video.mp4">MP4视频</a></p>
                </video>
            </div>

      2.2新增图片：
          <div class="image-gallery">
                <img src="static/****class***/gate_of_school.png" alt="展示图片">
                <img src="static/****class***/logo.png" alt="展示图片">
         </div>

      或者
