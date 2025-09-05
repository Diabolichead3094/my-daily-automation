const puppeteer = require('puppeteer');

async function runAutomation() {
  console.log('🤖 Starting Kayan HR automation...');
  
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
    
    console.log('📱 Opening Kayan HR login page...');
    await page.goto(process.env.TARGET_URL, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Wait for the page to fully load
    await page.waitForTimeout(3000);

    console.log('🔑 Entering username/email...');
    await page.type('input[name="Username"]', process.env.USERNAME);
    
    await page.waitForTimeout(1000); // Small delay between fields
    
    console.log('🔒 Entering password...');
    await page.type('input[name="Password"]', process.env.PASSWORD);
    
    await page.waitForTimeout(1000); // Small delay before clicking
    
    console.log('👆 Clicking Log In button...');
    await page.click('#btnSignin');
    
    // Wait for login to complete and page to redirect
    console.log('⏳ Waiting for login to complete...');
    await page.waitForTimeout(8000);
    
    // Check if login was successful by looking at the URL or page content
    const currentUrl = page.url();
    console.log('📍 Current URL after login:', currentUrl);
    
    if (currentUrl !== process.env.TARGET_URL) {
      console.log('✅ Login successful! Redirected to dashboard.');
    } else {
      console.log('⚠️  Still on login page - please check credentials.');
    }
    
    console.log('✅ Kayan HR automation completed!');
    
  } catch (error) {
    console.log('❌ Something went wrong:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runAutomation();
