/**
 * 
	1. qiitaトップページに飛ぶ
	2. 
検索フォームをタップ
	3. 
検索フォームにMake ITと入力
	4. 
検索
	5. 
一番上の記事を探す
	6. 
クリック
	7. 
スクショを取る
 */


const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const path = require('path');
const appRoot = path.resolve('./');
const screenshotPath = `${appRoot}/out/screenshot/`;
console.log(screenshotPath);

// スクショを取る
const screenshot = async (page, funcName) => {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < 3; i++) {
      await page.screenshot({
        path: `${screenshotPath}${funcName}_${i}.png`,
        fullPage: true
      });
    }
    resolve(page);
  });
}

// qiitaトップページに飛ぶ
const showTopPage = async (page) => {
  const funcName = 'showTopPage';
  return new Promise(async (resolve, reject) => {
    const TARGET_URL = 'https://qiita.com/';
    await page.goto(TARGET_URL, {
      waitUntil: 'domcontentloaded'
    }).then(async () => {
      await screenshot(page, funcName);
    });
    resolve(page);
  });
}

// 検索フォームをタップ
const tapSearchForm = async (page) => {
  return new Promise(async (resolve, reject) => {
    const funcName = 'tapSearchForm';
    const targetElement = '#globalHeader>div>div.st-Header_start>div.st-Header_searchButton';
    await page.waitFor(targetElement, {
      waitUntil: 'domcontentloaded'
    }).then(async () => {
      await page.tap(targetElement, {
        waitUntil: 'domcontentloaded'
      });
    }).then(async () => {
      await screenshot(page, funcName);
    });
    resolve(page);
  });
}

// 検索フォームにMake ITと入力して検索
const writeMakeIT = async (page) => {
  const funcName = 'writeMakeIT';
  return new Promise(async (resolve, reject) => {
    const targetElement = '#globalHeader>div>form>input';
    await page.waitFor(targetElement, {
      waitUntil: 'domcontentloaded'
    }).then(async () => {
      await page.type(targetElement,'MakeIT', {
        waitUntil: 'domcontentloaded'
      });
    }).then(async () => {
      const p = await page.$(targetElement);
      await p.press('Enter', {
        waitUntil: 'domcontentloaded'
      });
    }).then(async () => {
      await screenshot(page, funcName);
    });
    resolve(page);
  });
}

// 一番上の記事を選択
const selectFirstTopic = async (page) => {
  const funcName = 'selectFirstTopic';
  return new Promise(async (resolve, reject) => {
    const targetElement = '#main > div > div > div.searchResultContainer_main > div:nth-child(3) > div.searchResult_main > h1 > a';
    await page.waitFor(targetElement, {
      waitUntil: 'domcontentloaded'
    }).then(async () => {
      await page.click(targetElement, {
        waitUntil: 'domcontentloaded'
      }).then(async () => {
        await screenshot(page, funcName);
        console.log(1);
      });
    });
    resolve(page);
  });
}

// 

// main関数
try{
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 30
  });
  process.on('uncaughtException', (err) => {
    console.log(1111111111111111);
    fs.writeSync(1, `Caught exception: ${err}\n`);
    browser.close();
  });
  const page = await browser.newPage();
  await page.emulate(devices['iPhone X']);
  await page.setUserAgent('Mozilla/5.0 ..');

  await showTopPage(page);
  await tapSearchForm(page);
  await writeMakeIT(page);
  await selectFirstTopic(page);

  await browser.close();
})();
} catch (err) {
  console.error(err)
}





// await page.click('a[href^="/ranking"]');

// await page.screenshot({
//   path: `rank_${i}.png`,
//   fullPage: true
// });
// }