const { chromium } = require('C:/Users/Rahulsingh/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
  const { products } = await import('../src/lib/catalogue.ts');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:3000/checkout');
  await page.getByText('Your bag is empty.').waitFor();
  const items = [['oversized',0,'M',2],['regular',4,'L',1],['hoodie',3,'XL',1]].map(([id,colour,size,quantity]) => { const product = products.find(p => p.id === id); return { key: `${id}-${colour}-${size}`, product, colour, size, quantity }; });
  await page.evaluate(items => localStorage.setItem('starkvibe-bag', JSON.stringify(items)), items);
  await page.reload();
  await page.getByRole('heading', {name: 'Almost there.'}).waitFor();
  assert.match(await page.getByRole('complementary').innerText(), /₹1,225/);
  await page.screenshot({path:'artifacts/checkout-desktop.png',fullPage:true});
  await page.getByLabel('This is a business order').check();
  await page.getByLabel('GSTIN', {exact:true}).waitFor();
  await page.getByLabel('This is a business order').uncheck();
  await page.getByLabel('Express delivery').check();
  assert.match(await page.getByRole('complementary').innerText(), /Express delivery/);
  for (const method of ['Card', 'Netbanking', 'Cash on delivery', 'UPI']) {
    await page.getByRole('button', {name:method,exact:true}).click();
    assert.equal(await page.getByRole('button', {name:method,exact:true}).getAttribute('aria-pressed'), 'true');
  }
  await page.getByRole('button', {name:'Place order',exact:true}).click();
  assert.equal(await page.locator('#email').evaluate(el => el.validity.valid), false);
  for (const [id, value] of Object.entries({email:'customer@example.com',phone:'9876543210',first:'Test',last:'Customer',address:'12 Example Road',city:'Jaipur',state:'Rajasthan',pin:'302001'})) await page.locator('#'+id).fill(value);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', {name:'Place order',exact:true}).click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), 'starkvibe-order-request.txt');
  await download.saveAs('artifacts/checkout-test-request.txt');
  assert.match(fs.readFileSync('artifacts/checkout-test-request.txt','utf8'), /Delivery preference: Express delivery/);
  await page.getByRole('heading', {name:'Order request prepared.'}).waitFor();
  await page.getByRole('button', {name:'Edit checkout details'}).click();
  for (const width of [320,390,768,1024,1440]) {
    await page.setViewportSize({width,height:900});
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow at ${width}`);
    if (width === 390) await page.screenshot({path:'artifacts/checkout-mobile.png',fullPage:true});
  }
  await page.goto('http://localhost:3000/cart');
  await page.getByRole('link',{name:'Proceed to checkout'}).click();
  await page.waitForURL('**/checkout');
  assert.deepEqual(errors, []);
  fs.writeFileSync('artifacts/checkout-verification.json', JSON.stringify({referenceSubtotal:1225,emptyBag:true,cartNavigation:true,businessFields:true,shippingSelection:true,paymentTabs:true,requiredValidation:true,orderRequestDownload:true,noFalseOrderConfirmation:true,viewports:[320,390,768,1024,1440],horizontalOverflow:false,browserErrors:errors},null,2));
  await browser.close();
  console.log('Checkout verification passed');
})().catch(error => { console.error(error); process.exit(1); });
