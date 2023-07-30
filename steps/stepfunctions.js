var { By, until, Key } = require('selenium-webdriver')
var webdriver = require('selenium-webdriver')
var chrome    = require('selenium-webdriver/chrome')
var options   = new chrome.Options();
const { selectors } = require('./selectors.js');
var driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options.addArguments("--headless=new","--window-size=1920,1080","--disable-logging","--disable-gpu","--disable-crash-reporter","--disable-extensions","--disable-in-process-stack-traces","--disable-dev-shm-usage","--log-level=3","--output=/dev/null"))
        .build();

class StepFunctions{
    async sleep(milliseconds) {  
        return new Promise(resolve => setTimeout(resolve, milliseconds));  
    }
      
    async acceptCookies() {
        try {
            await this.waitForElement(selectors.cookies)
            return await driver.findElement(selectors.cookies).click()
        } catch (ex) {
            //do nothing
        }
    }
    
    async searchWithTextandEnter(text) {
        const enterText = await driver.findElement(selectors.searchInput)
        await enterText.sendKeys(`${text}`, Key.RETURN);
    }

    async takeScreenshot() {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        await driver.takeScreenshot().then(
            function(image) {
                require('fs').writeFileSync(`./screenshots/captured_image_${result}.png`, image, 'base64');
                console.log("Screenshot has taken and saved under screenshots folder")
            }
        );
    }

    async switchToNexttabByIndex(i) {
        const chandles = await driver.getWindowHandle()
        const ahandles = await driver.getAllWindowHandles()
        const targetindex = ahandles.indexOf(chandles) + i
        const targethandle = ahandles[targetindex]
        if (targethandle) {
            await driver.switchTo().window(targethandle)
            console.log(`Switch to tab ${targetindex + 1}`)
            return targethandle
        } else {
            return console.log(new Error('Next tab is not present'))
        }
    }
    
    async switchToPrevioustab() {
        const chandles = await driver.getWindowHandle()
        const ahandles = await driver.getAllWindowHandles()
        const targetindex = ahandles.indexOf(chandles) - 1
        const targethandle = ahandles[targetindex]
        if (targethandle) {
            await driver.switchTo().window(targethandle)
            console.log(`Switch to tab ${targetindex + 1}`)
            return targethandle
        } else {
            return console.log(new Error('Previous tab is not present'))
        }
    }
    
    async waitForTitle(expectedTitle) {
        try {
            await driver.wait(until.elementLocated(By.xpath(`//title[contains(text(),'${expectedTitle}')]`)), 30000);
            const actualPageTitle = await driver.getTitle();
            if(actualPageTitle == expectedTitle) {
                console.log("On Expected page ",expectedTitle)
                return actualPageTitle
            }
        } catch (ex) {
            return console.log(new Error,("Expected page is not shown"))
        }
    }
    
    async waitForElement(xSelector) {
        try {
            await driver.wait(until.elementLocated(xSelector), 30000);
        } catch (ex) {
            console.log(new Error('Expected element not found') )
        }
    }
}
module.exports = {StepFunctions, driver }