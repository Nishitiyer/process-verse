import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import http from 'http';

async function waitPort() {
  for(let i=0; i<30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get('http://localhost:4173', res => {
           res.resume();
           resolve(true);
        });
        req.on('error', reject);
      });
      return true;
    } catch(e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

async function run() {
  const vite = spawn('npm', ['run', 'preview'], { shell: true, stdio: 'pipe' });
  
  await waitPort();
  console.log('Server is running, launching Puppeteer...');
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
       console.log('BROWSER_ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('BROWSER_EXCEPTION:', err.toString());
  });
  
  await page.goto('http://localhost:4173');
  await new Promise(r => setTimeout(r, 2000));

  console.log('Clicking Sync tab...');
  const tabs = await page.$$('button.sidebar-item');
  if (tabs.length > 4) {
     await tabs[4].click(); // Sync is usually index 4
     await new Promise(r => setTimeout(r, 2000));
  } else {
     console.log('Could not find enough tabs');
  }

  console.log('Done.');
  await browser.close();
  vite.kill();
  process.exit(0);
}

run();
