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

    // Qiit Topページへ
    await page.goto('https://qiita.com/');
    targetElement = '#globalHeader>div>div.st-Header_start>div.st-Header_searchButton';
    await page.waitFor(targetElement);

    // 検索虫眼鏡をタップ
    await page.tap(targetElement);
    targetElement = '#globalHeader>div>form>input';
    await page.waitFor(targetElement);

    // 検索フォームにMakeITと入力して検索
    await page.type(targetElement, 'MakeIT');
    const p = await page.$(targetElement);
    await p.press('Enter');
    targetElement = '#main > div > div > div.searchResultContainer_main > div:nth-child(3) > div.searchResult_main > h1 > a';
    await page.waitFor(targetElement)

    // 一番上の記事をClick
    await page.tap(targetElement)
    for(let i = 0 ; i<3; i++){
      await page.waitForSelector('.p-items_main', {waitUntil: 'domcontentloaded'});
      await page.screenshot({path:`${screenshotPath}result_${i}.png`,fullPage: true});
    }

    await browser.close();
  })();
} catch (err) {
  console.error(err)
}