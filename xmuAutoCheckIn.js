// version 1.3.1

const puppeteer = require('puppeteer');
let steps = ['进入登录页面', '进入学工系统', '点击保存'];
let flag = 0;
let errorTimer;
let email;
email = process.env.EMAIL;

function getBeijingtime() {
    //获得当前运行环境时间
    var d = new Date();
    let currentDate = new Date();
    let tmpHours = currentDate.getHours();
    //算得时区
    var time_zone = -d.getTimezoneOffset() / 60;
    if (time_zone < 0) {
        time_zone = Math.abs(time_zone) + 8; currentDate.setHours(tmpHours + time_zone);
    } else {
        time_zone -= 8; currentDate.setHours(tmpHours - time_zone);
    }
    return currentDate;
}

function sendEmail(title, content){
    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
        user: 'commander_bao@163.com', //邮箱的账号
        pass: 'XEYMUNNXEUWZAGHR'//邮箱的密码
        }
    });
    let mailOptions = {
        from: '"commander-bao" <commander_bao@163.com>',
        to: email, 
        subject: title,
        text: content
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        return console.log(error);
        }
    });
}


(async () => {
    const browser = await puppeteer.launch({headless: process.platform !== 'win32', args: ['--start-maximized'], defaultViewport: null});
    //const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
    const page = await browser.newPage();
    page.on('load', async () => {
        // 打开或跳转页面完成，都会触发 load 事件
        // 取得页面的网址
        const url = page.url();
        if (url.startsWith('https://xmuxg.xmu.edu.cn/login')) {
            // 选择登录方式的页面
            const $button = await page.waitForSelector('.buttonBox > .btn:nth-child(3)');
            let time;
            time = Math.round(Math.random()*3600);
            time *= 1000;
            console.log("延后%d分钟执行", parseInt(time / 60000));
            await page.waitForTimeout(time);
            errorTimer = setTimeout( async () => {
                sendEmail('健康打卡失败', '步骤 ' + steps[flag] + ' 失败\n\n请检查是否为学校服务器问题，我这边也会第一时间维护哦\n\n来自commander-bao');
                await page.waitForTimeout(5000);
                browser.close();
            }, 180 * 1000);
            $button.click();
            console.log("进入登录页面中...\n");
        } else if (url.startsWith('https://ids.xmu.edu.cn/authserver/login?service=https://xmuxg.xmu.edu.cn/login/cas/xmu')) {
            console.log("进入登录页面成功\n");
            flag = 1;
            // 账号登录的页面
            const StudentNum = await page.waitForSelector('#username');
            const PasswordVpn = await page.waitForSelector('#password');
            const Login = await page.waitForSelector('#casLoginForm > p:nth-child(4) > button');
            await page.waitForTimeout(1000);
            let username, password;
            username = process.env.USERNAME;
            password = process.env.PASSWORD;
            StudentNum.type(username);
            console.log("输入账号成功\n");
            await page.waitForTimeout(1000);
            PasswordVpn.type(password);
            console.log("输入密码成功\n");
            await page.waitForTimeout(1000);
            Login.click();
            console.log("进入学工系统中...\n");
        } else if (url.startsWith('https://xmuxg.xmu.edu.cn/platform')) {
            // 其他页面
            console.log("进入学工系统成功\n");
            flag = 2;
            page.goto('https://xmuxg.xmu.edu.cn/app/214');
            const MyForms = await page.waitForXPath('//*[@id="mainM"]/div/div/div/div[1]/div[2]/div/div[3]/div[2]');
            await page.waitForTimeout(1000);
            MyForms.click();
            console.log("点击 '我的表单' 成功\n");
            await page.waitForTimeout(3000);
            const choose = await page.waitForXPath('//*[@id="select_1582538939790"]/div/div/span[2]/i');
            const itext = await page.evaluate(() => {
                const text = document.querySelector("#select_1582538939790 > div > div > span.btn-content");
                return text.textContent;
            });
            if (itext === '请选择') {
                choose.click();
                await page.waitForTimeout(1000);
                const yes = await page.waitForSelector('.dropdown-items .btn-block');
                yes.click();
                await page.waitForTimeout(1000);
            }
            const sure = await page.waitForSelector('.preview-page .form-save');
            await page.waitForTimeout(3000);
            sure.click();
            console.log("点击 '保存' 成功\n");
            page.on('dialog', async dialog => {
                console.log(dialog.message());
                await dialog.accept();
            });
            await page.waitForTimeout(5000);
            console.log("打卡成功\n");
            clearTimeout(errorTimer);
            const currentDate = getBeijingtime();
            const text = currentDate.getFullYear() + '年' +
                        (currentDate.getMonth() + 1) + '月' +
                        currentDate.getDate() + '日' +
                        currentDate.getHours() + '时' +
                        currentDate.getMinutes() + '分' +
                        '\n\n' + '感谢使用，如果觉得好用麻烦在GitHub上给个小星星哦https://github.com/Commander-bao/XMU_Daily_Health_Report\n\n如果遇到问题，请检查是否为学校服务器问题，我这边也会第一时间维护哦\n\n来自commander-bao'
            sendEmail('健康打卡成功', text);
            await browser.close();
        }
    });
    // 打开第一个页面
    await page.goto('https://xmuxg.xmu.edu.cn');
})();
