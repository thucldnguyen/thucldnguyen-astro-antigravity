---
template: blog-post
title: Can we do automation testing without a framework?
slug: /blog/can-we-do-automation-testing-without-a-framework
date: 2021-03-08 17:30
description: "The question might sound mundane and the answer seems obvious but
  many automation engineers keep asking it again and again. So let's get to the
  bottom of it. Sure you can but it's not recommended. "
featuredImage: /assets/can-we-do-automation-testing-without-framework.png
---
***Sure, we can. Who’s there to stop us?*** Joking aside, although we can do automation testing without a framework, it’s not recommended. Don’t bring a knife to a gunfight. Clicking a button is easy. It’s just a few lines of code with Selenium WebDriver. But we’ll soon regret investing more in a framework from Day #1.

> Note: This post focuses on automation testing for web apps using Selenium. This assumption helps add specificity to the discussion. But in general, the main argument stays the same for web, desktop, mobile, and API testing: ***“A well-designed framework is crucial whenever you want to do something at scale”***.

![](https://qph.fs.quoracdn.net/main-qimg-037b135439a38c2d0cec55c2a9f31694)

*(Illustration of DriverManagerFactory - Source: LogiGear)*

Automation frameworks offer many benefits:

* **Reusability:** Modules that we can reuse over and over again to speed up test development and lower maintenance cost. You don’t have to duplicate a page object method every time a test needs it. Just reuse the pre-coded page object.
* **Abstraction:** The ability to not care too much about the browser of choice at runtime. So that we can focus on scripting the automated steps during test development. A framework should enable this "separation of concerns" via the *DriverManagerFactory* pattern (picture above).
* **Configurable Waits:** If you hardcode every “wait” step of a test case, you cannot run that test case in many environments. Waits should be configurable at runtime giving the control to the person executing the test - not the person developing it.
* **Parallel Execution:** Running tests on one browser instance is easy. But we’ll not receive test results fast enough. The solution is to dispatch the tests to as many nodes as possible. A framework with additional tools like Selenium Grid could help.
* **Easy to Debug Test Reports:** Automation testing is as valuable as its reports. We don’t run automation for fun. We do it because we want deep insights into the software quality. If the test reports are not easy to understand, we’re wasting time.
* **CI/CD Integration:** We reap the best benefits of automation testing by plugging it into a CI/CD pipeline. These capabilities are not available out of the box, at least for Selenium. So we have to build it ourselves.

If you’re interested in building a Selenium framework from scratch, check out this article: 

[Building a Selenium Framework from A to Z ](https://www.logigear.com/blog/test-automation/building-a-selenium-framework-from-a-to-z/)

An alternative to building a Selenium framework on your own is using [TestProject ](http://www.testproject.io/ "www.testproject.io")- an open-source & free-forever solution. It offers an **AI Test Recorder** that is very reliable IMO. Check out this analysis between TestProject and CloudQA:

[TestProject vs. CloudQA: Which One Better for Web Testing?](https://www.thucldnguyen.com/blog/testproject-cloudqa-which-one-better-for-web-testing)

> [](https://www.thucldnguyen.com/blog/testproject-cloudqa-which-one-better-for-web-testing "www.thucldnguyen.com")DISCLAIMER: I'm not affiliated with or sponsored by any of the tools mentioned in this article or the companies behind them. I receive no commission for directing traffic to those tools whatsoever. All product and company names are the registered trademarks of their original owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder or their brands.

Happy testing!