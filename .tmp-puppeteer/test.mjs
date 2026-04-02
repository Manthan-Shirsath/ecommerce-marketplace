import puppeteer from 'puppeteer';
const run = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('DEBUG CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('DEBUG ERR:', err));
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
  } catch(e) {}
  await browser.close();
};
run();
