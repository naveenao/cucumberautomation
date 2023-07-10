const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber')
const { StepFunctions, driver } = require('./stepfunctions.js')
const { selectors } = require('./selectors.js')
setDefaultTimeout(100 * 1000);
const { Key } = require('selenium-webdriver')
const stepfunctions = new StepFunctions()

When('the user launch website {string}', async function (url) {
  await driver.get(url)
  await driver.manage().window().maximize();
  console.log("Opened browser url ", url)
});

Then('the user does the cucumber flow', async function () {
  await stepfunctions.waitForTitle("BDD Testing & Collaboration Tools for Teams | Cucumber")
  await stepfunctions.waitForElement(selectors.viewDocs)
  await driver.findElement(selectors.viewDocs).click()
  await stepfunctions.acceptCookies()
  await stepfunctions.waitForElement(selectors.guides)
  await driver.findElement(selectors.guides).click()
  await stepfunctions.waitForElement(selectors.upgrading)
  await driver.findElement(selectors.upgrading).click()
  await stepfunctions.waitForElement(selectors.swagger)
  const clickSwagger = await driver.findElement(selectors.swagger)
  await driver.executeScript("arguments[0].click();", clickSwagger)
});

Then('the user does the amazon flow', async function () {
  // await stepfunctions.waitForTitle("BDD Testing & Collaboration Tools for Teams | Cucumber")
  await stepfunctions.waitForElement(selectors.amazonMenu)
  await driver.findElement(selectors.amazonMenu).click()
  await stepfunctions.waitForElement(selectors.selectMobiles)
  await driver.findElement(selectors.selectMobiles).click()
  await stepfunctions.waitForElement(selectors.selectAllMobiles)
  await driver.findElement(selectors.selectAllMobiles).click()
  await stepfunctions.waitForTitle("Mobile Phones: Buy New Mobiles Online at Best Prices in India | Buy Cell Phones Online - Amazon.in")
  await stepfunctions.waitForElement(selectors.fourStarsAndUp)
  const fourStars = await driver.findElement(selectors.fourStarsAndUp)
  await driver.executeScript("arguments[0].click();", fourStars)
  await stepfunctions.waitForElement(selectors.budget10kTo20k)
  const budget = await driver.findElement(selectors.budget10kTo20k)
  await driver.executeScript("arguments[0].click();", budget)
  await stepfunctions.waitForElement(selectors.selectOneplusNord)
  await driver.findElement(selectors.selectOneplusNord).click()
});

Then('the user continues mobile buying flow', async function () {
  await stepfunctions.waitForElement(selectors.priceToPay)
  const phonePrice = await driver.findElement(selectors.priceToPay)
  const price = await phonePrice.getText()
  console.log("Price of the mobile phone is ", price)
  await stepfunctions.waitForElement(selectors.buyNow)
  await driver.findElement(selectors.buyNow).click()
  const signInPage = await driver.getTitle()
  console.log("Should be sign in page", signInPage)
  if ( signInPage == "Amazon Sign In" ) {
    const username = await driver.findElement(selectors.userName)
    await username.sendKeys("9865680845", Key.RETURN);
    const passw = await driver.findElement(selectors.password)
    await passw.sendKeys("neevanuhdnis", Key.RETURN);
  }
  await stepfunctions.waitForElement(selectors.selectCashPayment)
  await driver.findElement(selectors.selectCashPayment).click()
  await stepfunctions.waitForElement(selectors.useThisPaymentMethod)
  const selectPayment = await driver.findElement(selectors.useThisPaymentMethod)
  await driver.executeScript("arguments[0].click();", selectPayment)
  await stepfunctions.waitForTitle("Amazon.in Checkout")
});

Then('the user navigates to next tab by index {int}', async function (i) {
  await stepfunctions.switchToNexttabByIndex(i)
});

Then('the user continues flow in swagger', async function () {
  await stepfunctions.waitForTitle("OpenAPI Design & Documentation Tools | Swagger")
  await stepfunctions.acceptCookies()
  await stepfunctions.waitForElement(selectors.swaggerJs)
  await driver.findElement(selectors.swaggerJs).click()
});

Then('the user opens gitlab', async function () {
  await stepfunctions.waitForElement(selectors.signUp)
  await driver.findElement(selectors.signUp).click()
  await stepfunctions.waitForTitle("Join GitHub · GitHub")
});

Then('the user navigates to previous tab', async function () {
  await stepfunctions.switchToPrevioustab()
});

Then('the user clicks editor', async function () {
  await stepfunctions.waitForElement(selectors.editor)
  await driver.findElement(selectors.editor).click()
  driver.executeScript("window.scrollBy(0,document.body.scrollHeight)");
  await stepfunctions.waitForElement(selectors.soapUi)
  await driver.findElement(selectors.soapUi).click()
});

Then('the user starts the soap ui flow and search {string}', async function (text) {
  await stepfunctions.waitForElement(selectors.soapUiSearch)
  await driver.findElement(selectors.soapUiSearch).click()
  await stepfunctions.waitForElement(selectors.searchInput)
  await stepfunctions.searchWithTextandEnter(text)
  await stepfunctions.acceptCookies() 
  await stepfunctions.waitForElement(selectors.clickNodeJS)
  await driver.findElement(selectors.clickNodeJS).click()
  await stepfunctions.acceptCookies()
  await stepfunctions.waitForTitle("Home - SmartBear Community")
});

Then('the user close the browser', async function () {
  driver.close()
  driver.quit()
});