#### 基于node-socket、vue的仿微信聊天室

基于node-socket、vue的聊天室，实现了基本的文字聊天、发送表情、发送图片、发送窗口抖动、私聊和群聊，可以删除聊天记录、修改字体字号、修改聊天背景颜色、字体颜色、搜索用户；发送图片是将图片转base64发送的，只限于发送大小小于5MB的图片；其中表情是字符串来的，并不是图片；窗口抖动使用了animate.css库，动态的添加删除类来实现；登录前系统会自动分配昵称（有2-5个中文字组成），也会自动分配头像，点击头像可以切换自己想要的图片；登录进入聊天界面也可以切换头像（点击左上角头像），可以修改昵称（点击左上角昵称）；右下角使用了风车旋转动画、背景是放烟花的动画。

##### 进入文件夹 `weChat-server`

1. 安装依赖

   ```shell
   npm install
   ```

2. 运行后台服务器(运行在3001端口)

   ```shell
   npm start
   ```

##### 进入文件夹`weChat-page`

1. 安装依赖

   ```shell
   npm install
   ```

   

2. 运行项目（默认端口号为8080）

   ```shell
   npm start
   ```

3. 打开页面

   ```
   http://localhost:8080/
   ```

#### 如果觉得好用，欢迎向我投币

<img src=".\赞赏码\958bdbbc690c9044f3ec5decf7ba9ff.jpg" alt="958bdbbc690c9044f3ec5decf7ba9ff" style="zoom:20%;" />

<img src=".\赞赏码\ed82d20a6f5c049a566b9cd9d9551d3.png" alt="ed82d20a6f5c049a566b9cd9d9551d3" style="zoom:20%;" />