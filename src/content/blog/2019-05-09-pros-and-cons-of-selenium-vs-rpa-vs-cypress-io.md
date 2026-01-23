---
template: blog-post
title: Pros and cons of Selenium vs RPA vs Cypress.io
slug: /blog/test-automation-tools/pros-and-cons-of-selenium-vs-rpa-vs-cypress-io/
date: 2019-05-09 12:00
description: Pros and cons of Selenium vs RPA vs Cypress.io
featuredImage: /assets/sel-cy-uip.png
---
# [Selenium](http://seleniumhq.org/)

### Pros

* **Cross-browser testing:** One test case can be configured to run on different browsers thus we can increase our test coverage.
* **Industry standard:** Selenium is becoming a W3C standard thus you’ll face fewer inconsistencies among browsers. Since it’s popular, you can also find a lot of online resources for free.
* **Multiple language bindings:** You can code in your programming language of choice whether it’s C#, Java, Javascript, Python, Ruby or whatnot.
* **Cloud execution:** You can run your tests on clouds like [SauceLabs](http://saucelabs.com/), [BrowserStack](http://browserstack.com/) and [Remote TestKit](https://appkitbox.com/en/testkit/).
* **Parallel execution:** Thanks to unit test frameworks like [TestNG](http://testng.org/) and tools like **Selenium Grid**, we can shorten test execution time dramatically.

### Cons

* **Performance:** Selenium is relatively slow compared to Cypress.io since it has many layers between the test code and the browser running the code.
* **No out-of-browser support:** You cannot interact with popups, browser dialogs or desktop windows without additional tools.
* **Hard to architect right:** If you don’t have enough experience designing a Selenium framework, you’ll ultimately have to rebuild it from scratch after a while because updating test assets has become too painful. Read more about building a good Selenium framework [here](https://www.logigear.com/blog/test-automation/building-a-selenium-framework-from-a-to-z/).

# [Cypress.io](http://cypress.io/)

### Pros

* **Fast:** Cypress doesn’t have as many architectural layers as Selenium. It basically lives inside Chrome just like Chrome DevTools. That’s why we see an impressive boost in test execution speed compared to Selenium.
* **Time traveling:** you can time travel back to the point when the test failed to debug it easily since Cypress takes snapshots of the DOM tree at every test step.

### Cons

* **No cross-browser testing:** this is the biggest complaint since it limits your test coverage. You cannot automate other browsers besides Chrome.
* **No parallel execution:** you can only run one test at a time. The development team doesn’t intend to implement this feature any time soon. They suggest us to parallelize at “operating system level”, aka using Docker containers.
* **Only one language support:** either you like Javascript or you’re out. This doesn’t bother front-end developers much since they’re JS experts anyways. But for the rest of us who have diverse technical background, this could be a problem. Read more about the hidden traps of Cypress here: [5 Pitfalls You Should Consider Before Adopting Cypress – Thuc Nguyen](https://thucldnguyen.com/web-automation-testing/cypress-pitfalls/)

# UiPath

### Pros

* **Computer vision (AI):** automate work flows using computer vision or OCR.
* **OOTB activity library:** you have a bunch of prebuilt activities that you can use right away such as element interactions, OCR, image, app integrations (Excel, CSV, Mail), etc.
* **Strong community support:** they got extensive online resources such as UiPath Academy and many YouTube channels. Automating enterprise business processes is on the rise: UiPath is currently raising $400M at the valuation of $7B ([source](https://techcrunch.com/2019/03/21/robotics-process-automation-startup-uipath-raising-400m-at-more-than-7b-valuation/)). So you could expect stronger support and more freebies.

### Cons

* **Fragile automation for QA engineers:** work flows are easily broken due to dynamic UI elements. UiPath invents its own element locator syntax, e.g. `<html app='chrome.exe' title='Get Started with UiPath'/>` . This syntax is obscure. If you want to use industry standards like XPath, you can’t.
* **Required browser extensions to automate web:** this is a rather old-fashioned technology to automate web apps compared to Selenium and Cypress.
* **Hard to extend capabilities:** if you know how to code and want to extend certain capabilities, I don’t see an easy way out yet.

I’d suggest QA engineers to invest their time in learning specialized test automation tools such as Selenium, Cypress, Puppeteer, TestArchitect, Ranorex, TestComplete, etc. instead of trying to apply RPA to test automation.

Attempting to use RPA to automate software testing is fruitless. It’s like fitting a square peg into a round hole since test automation tools and RPA are two entirely different product categories. Hopefully you would get a clearer picture now.