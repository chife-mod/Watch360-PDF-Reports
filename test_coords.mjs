import puppeteer from 'puppeteer';
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5173/');
await new Promise(r => setTimeout(r, 2000));
const rects = await page.evaluate(() => {
  const slides = Array.from(document.querySelectorAll('.slide-inner'));
  const wrSlide = slides.find(s => s.innerText.includes('WATCH REFERENCES'));
  if (!wrSlide) return { error: 'slide not found' };
  
  const headersContainer = Array.from(wrSlide.querySelectorAll('div')).find(div => div.innerText.includes('RANK') && div.innerText.includes('MODEL'));
  const headers = Array.from(headersContainer.children);
  const modelHeader = headers.find(c => c.innerText.includes('MODEL'));
  
  const firstRow = wrSlide.querySelector('div[style*="height: 62px"]');
  const modelTextDiv = Array.from(firstRow.children).find(c => c.style.width === '186px');
  
  return {
    modelHeaderX: modelHeader.getBoundingClientRect().left,
    modelTextX: modelTextDiv.getBoundingClientRect().left
  };
});
console.log(rects);
await browser.close();
