# 厦大每日健康打卡，由commander-bao本人独立完成

## 免责声明

### 如果您配置了此项目，请于测试后删除，作为xmu学子，为防疫安全，必须坚持每日手动打卡

本项目的开发者完全出于以下目的而进行开发：

1. 学习、熟悉JavaScriopt，学习、练习使用puppeteer的爬虫技术
2. 学习完整的开源项目流程，包括开发、测试、维护等
3. 掌握 GitHub Actions 等相关知识

本项目承诺：

1. 该项目的所有代码、文档、示例等均是以学习全过程软件开发与学习交流为目的，所有开发者除了必要的功能测试以外，没有在任何时间下使用过这个项目。
2. 该项目仓库的 Actions 均采用了测试用配置，仅仅用于监控软件状态以确认维护工作的任务，没有真正用于打卡。
3. 本项目不会也无法保存您的所有个人信息，个人信息都保存在您本地且加密，不必担心隐私泄露。

## 如果要测试使用本打卡系统，下面是配置教程

### 首先，点击Fork
![](images/clickFork.jpg)
### 然后，点击Create fork
![](images/fork.jpg)
### fork成功之后，你就有了一个自己的仓库啦，点击Settings
![](images/settings.jpg)
### 跳转后，点击secrets，随后点击下拉框中的Actions
![](images/secrets.jpg)
### 随后点击New repository secret
![](images/newSecrets.jpg)
### 首先在name栏里输入USERNAME，大写的，和我的一样，然后在value里输入你的学号，纯数字，完成后点击Add secret
![](images/username.jpg)
### 这时你发现USERNAME已经配置好了，再点击New repository secret
![](images/newSecrets2.jpg)
### 然后在name栏里输入PASSWORD，大写的，和我的一样，然后再value里输入你的登录密码，是什么就输入什么，别多加一个符号，随后点击Add secret
![](images/password.jpg)
### 这时如果你显示的和我一样，证明你配置成功了！
![](images/finish.jpg)

## 如果想在本地配置puppeteer，下面是教程
### 首先进入nodejs的官网 https://nodejs.org/en/
![](images/1.jpg)
### 点击下载，这里我没有选最新版本，看个人
![](images/2.jpg)
### Windows 64位机下载x64.smi文件
### 下载完后找个文件夹安装，一路next就行，它会自动添加path路径
![](images/3.jpg)
### 安装完的样子
![](images/4.jpg)
### 开个终端看看npm是不是安装成功了
![](images/5.jpg)
### 成功之后建个文件夹，我命名成了puppeteer
### 然后输入npm init，一路回车就行
![](images/6.jpg)
### 再输入npm install puppeteer，回车
![](images/7.jpg)
### 到此puppeteer安装完成
### 最后，把我的xmuAutoCheckIn.js文件放进这个文件夹,用vscode就能运行了

## 树莓派安装 https://zhuanlan.zhihu.com/p/127757097
