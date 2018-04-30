const puppeteer = require('puppeteer');

const fs = require('fs');
const dir = './tmp';

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: `${dir}/mockUserDataDir`
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForFunction('document.querySelector("p").innerHTML.length > 0').catch(err => console.log('something\'s wrong', err));
  await page.screenshot({path: `${dir}/localhost3000-4.png`});

  console.log('saved screenshot');
  await browser.close();
  process.exit(0);
})();
