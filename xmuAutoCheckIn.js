// version 1.0.0
const puppeteer = require('puppeteer');

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
            $button.click();
            console.log("进入登录页面中...\n");
        } else if (url.startsWith('https://ids.xmu.edu.cn/authserver/login?service=https://xmuxg.xmu.edu.cn/login/cas/xmu')) {
            console.log("进入登录页面成功\n");
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
            await browser.close();
            console.log("打卡成功\n");
        }
    });
    // 打开第一个页面
    await page.goto('https://xmuxg.xmu.edu.cn');
})();
