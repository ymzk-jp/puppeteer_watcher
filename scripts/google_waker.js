const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const path = require('path');
const screenshotPath = path.resolve('./out/screenshot/') + '/';
console.log(screenshotPath);


try {
  (async () => {
    // init
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    let targetElement = "";
    await page.emulate(devices['iPhone X']);
    await page.setUserAgent('Mozilla/5.0 ..');

    const google_url='https://google.co.jp/search?q='

    await page.goto(`${google_url}カレー`);
    targetElement = '#main > div > div > div.searchResultContainer_main > div > div.searchResult_main > h1 > a';
    await page.waitFor(targetElement)
    
    const list = await page.$$(targetElement);
    const datas = [];
    for (let i = 0; i < list.length; i++) {
      var data = {
        href: await (await list[i].getProperty('href')).jsonValue(),
        textContent: await (await list[i].getProperty('textContent')).jsonValue(),
        innerHTML: await (await list[i].getProperty('innerHTML')).jsonValue()
      };
      datas.push(data);
    }

    // 全記事を取得
    for (let item of datas) {
    await page.goto(item.href);
    for (let i = 0; i < 3; i++) {
      await page.waitForSelector('.p-items_main', {
        waitUntil: 'domcontentloaded'
      });
      await page.screenshot({
        path: `${screenshotPath}${item.textContent}_result_${i}.png`,
        fullPage: true
      });
    }
  }

    await browser.close();
  })();
} catch (err) {
  console.error(err)
}