---
template: blog-post
title: "TestProject vs. CloudQA: Which One Better for Web Testing?"
slug: /blog/testproject-cloudqa-which-one-better-for-web-testing
date: 2021-03-05 14:48
description: TestProject and CloudQA are both new kids on the block competing
  with strong incumbents in the web testing market. If you're looking for tools
  to jump start your your web testing project, which one is better? This article
  discusses the pros and cons of each tool and deliver a somewhat biased
  verdict.
featuredImage: /assets/testproject-vs-cloudqa.png
---
A lot of ink and paper have been spent on popular tools like [Selenium](https://www.selenium.dev), [Cypress](https://www.cypress.io), [Robot Framework](https://www.robotframework.org), [WebDriverIO](http://webdriver.io), etc. but not so much about these two new and underrated kids on the block: [TestProject ](https://www.testproject.io)and [CloudQA](https://www.cloudqa.io). Today let's analyze the **Pros** and **Cons** of these tools to help you select the winner for your upcoming web testing project.

> TestProject and CloudQA are both empowered by Selenium. If you look for other alternatives to Selenium, check out this article: [Best Alternatives to Selenium WebDriver to Web Testing](https://www.thucldnguyen.com/blog/web-automation-testing/best-alternatives-to-selenium/).

# TestProject

I'm absolutely impressed and pleasantly delighted by the UX of TestProject. New users like me are onboarded smoothly. Except for a quite "fat" **TestProject Agent** (weighing *267 MB*), the installation process is a breeze. You can get up to speed quickly. 

## Pros

* FREE FOREVER
* AI Self-Healing is very smart so it helps the test run very smooth
* Adaptive waits make my tests extremely stable
* Supports XPath and CSS selector with many fallback locators

## Cons

* A lot of unnecessary scrolling recorded 
* Web Recorder is embedded within the web app so you might encounter conflicts with the web app under test
* You have to manage the test execution infrastructure
* Very frustrating when adding assertions

![TestProject supports a lot more platforms than CloudQA](/assets/testproject-2.png "TestProject supports a lot more platforms than CloudQA")

# CloudQA

The strongest selling point for CloudQA is of course its cloud nature. Test execution happens on CloudQA's infrastructure so you don't have to manage that infrastructure yourself. One less task to worry about. Besides, creating assertions is very easy, unlike TestProject. You simply click the **"Assertion"** button and hold the mouse over an element.

However, I have to be honest that CloudQA is quite flaky. A simple record & playback on [www.amazon.com](https://www.amazon.com) doesn't work. The CSS selectors (worth mentioning that they only support CSS, no XPath) recorded by CloudQA's Chrome extension don't work. On top of that, you cannot specify the location that your test will be run from. It auto starts in **Virginia, USA**. This causes my test to fail since Amazon displays different products and promotions for different locations.

## Pros

* They provide infrastructure on the cloud
* Automatically detect the app under test instead of having to create the app beforehand in TestProject
* Allow users to mark a step as optional which is convenient if you don't care whether that step passes or fails (normal step must pass to continue the test run - a fail will stop it immediately)
* Easy to add assertions using the Chrome extension

## Cons

* Only supports Chrome and Firefox while TestProject offers a lot more, e.g. Docker, Headless Chrome, Headless Firefox, Edge, IE, etc.
* Automatic suggestion of CSS selector is bad (too long and does not work)
* Only supports CSS selector, no XPath
* Constantly got interrupted a lot by an annoying salesy offer
* Don’t auto highlight elements during recording
* Cannot select the location that the test will be run from (always Virginia, USA)

![CloudQA interrupts your test run constantly with this annoying salesy message](/assets/cloudqa-1.png "CloudQA interrupts your test run constantly with this annoying salesy message")

# Verdict

The clear winner between these two tools is of course: **TestProject**. Its stable automation is admirable and much appreciated. I'd argue that their **Adaptive Waits** and **AI Self-Healing** are the state-of-the-art best-in-class technology on the market right now, even compared with commercial incumbents like *Tricentis Tosca, Ranorex, TestComplete, etc.* If you're searching for a tool for your next web testing project, pick TestProject. If you disagree with any point or have more tool suggestions, feel free to put them in the **Comment** section below.

> DISCLAIMER: I'm not affiliated with or sponsored by any of the tools mentioned in this article or the companies behind them. I receive no commission for directing traffic to those tools whatsoever. All product and company names are the registered trademarks of their original owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder or their brands.