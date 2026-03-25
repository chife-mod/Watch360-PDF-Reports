const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const http = require('http');

(async () => {
  const browser = await puppeteer.launch();
  const queries = [
    "Zenith Defy Revival A3643 watch",
    "Panerai Luminor Marina Bronzo PAM01678 frontal",
    "Ressence Type 3 Marc Newson watch",
    "Panerai Radiomir Platinumtech PAM01730 frontal",
    "Panerai Radiomir California Bronzo PAM01729 frontal"
  ];
  for (let i = 0; i < queries.length; i++) {
    const page = await browser.newPage();
    try {
      await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(queries[i])}&t=h_&iar=images&iax=images&ia=images`);
      await page.waitForSelector('.tile--img__img', {timeout: 5000});
      const src = await page.evaluate(() => document.querySelector('.tile--img__img').src);
      console.log(`Fetched ${i+1}: ${src}`);
      const client = src.startsWith('https') ? https : http;
      await new Promise(resolve => {
        client.get(src, res => {
          const file = fs.createWriteStream(`src/assets/watches/watch${i+1}.jpg`);
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        });
      });
    } catch (e) {
      console.log(`Failed ${i+1}:`, e.message);
    }
  }
  await browser.close();
})();
