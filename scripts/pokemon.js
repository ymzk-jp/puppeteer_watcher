

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const path = require('path');
const fs=require('fs');
const screenshotPath = path.resolve('./out/screenshot/') + '/';
console.log(screenshotPath);


try {
  (async () => {
    // init
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    let targetElement = '';
    let targetUrl='';
    await page.emulate(devices['iPhone X']);
    await page.setUserAgent('Mozilla/5.0 ..');

    targetUrl='https://wiki.xn--rckteqa2e.com/wiki/%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E4%B8%80%E8%A6%A7';
    await page.goto(targetUrl);
    targetElement = '#mw-content-text > table.bluetable.c.sortable.jquery-tablesorter > tbody > tr:nth-child(1) > td:nth-child(2)';
    await page.waitFor(targetElement)
    
    const list = await page.$$(targetElement);
    const datas = [];
    for (let i = 0; i < list.length; i++) {
      var data = {
        href: await (await list[i].getProperty('href')).jsonValue(),
        textContent: await (await list[i].getProperty('textContent')).jsonValue(),
        innerHTML: await (await list[i].getProperty('innerHTML')).jsonValue(),
        title: await (await list[i].getProperty('title')).jsonValue()
      };
      datas.push(data);
    }

    // 全記事を取得
//     for (let item of datas) {
//     await page.goto(item.href);
//     for (let i = 0; i < 3; i++) {
//       await page.waitForSelector('.p-items_main', {
//         waitUntil: 'domcontentloaded'
//       });
//       await page.screenshot({
//         path: `${screenshotPath}${item.textContent}_result_${i}.png`,
//         fullPage: true
//       });
//     }
//   }

    await browser.close();
  })();
} catch (err) {
  console.error(err)
}