const puppeteer = require('puppeteer');

async function runAutomation() {
  console.log('🤖 Starting automation...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  try {
    const page = await browser.newPage();
    
    console.log('📱 Opening website...');
    await page.goto(process.env.TARGET_URL, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    console.log('🔑 Entering username...');
    // You'll need to replace 'input[name="username"]' with the actual selector from your website
    await page.type('input[name="username"]', process.env.USERNAME);
    
    console.log('🔒 Entering password...');
    // You'll need to replace 'input[name="password"]' with the actual selector from your website
    await page.type('input[name="password"]', process.env.PASSWORD);
    
    console.log('👆 Clicking login button...');
    // You'll need to replace 'button[type="submit"]' with the actual selector from your website
    await page.click('button[type="submit"]');
    
    // Wait 5 seconds for the page to load after clicking
    await page.waitForTimeout(5000);
    
    console.log('✅ Task completed successfully!');
    
  } catch (error) {
    console.log('❌ Something went wrong:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runAutomation();
