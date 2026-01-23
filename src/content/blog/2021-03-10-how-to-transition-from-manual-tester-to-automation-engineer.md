---
template: blog-post
title: How to transition from "Manual Tester" to "Automation Engineer"?
slug: /blog/how-to-transition-from-manual-tester-to-automation-engineer
date: 2021-03-10 11:33
description: Some say Manual Testing is an old "mindset" that is impossible to
  "upgrade" to the Automation Testing mindset. I say no. Admittedly they are two
  different skill sets and we got to go the extra miles - like every other
  career move under the sun. But the good news is there's still a lot of overlap
  (transferable knowledge) and it's totally feasible to make this transition, if
  you want to.
featuredImage: /assets/how-to-transition-from-manual-tester-to-automation-engineer.png
---
Some say **Manual Testing** is an old "mindset" that is impossible to *upgrade* to the **Automation Testing** mindset. I say no. Admittedly they are two different *skill sets* and we got to go the extra miles -- like every other career move under the sun. But the difference is no where near the abstract level of "mindsets" or "domains". It's just about practical know-hows.

The good news is there's still a lot of overlap (*transferable knowledge*) between Manual Testing and Automation Testing. And of course, if we want to, we can totally to make a successful transition. Most of the time, you'll receive a better pay (a welcoming jump from ~$55K/year to **$79K/year** - source: [Glassdoor](https://www.glassdoor.com)), more room for career advancement, and more job satisfaction.

![Automation engineer is well compensated](/assets/automation-engineer-salary.png "Automation engineer is well compensated")

# Step #1- Retrospective

First, let's retrospect before we dive deep into what to learn and how to make a successful transition.

### What makes you (a Manual Tester) a value-add to your team?

Most of the time, you add value because you already know how to do Software Testing to ultimately ensure *Software Quality*. You've probably familiarized yourself with writing test cases for different testing types (component, integration, E2E, acceptances, usability, etc.), and applying different testing techniques (requirement breakdown, boundary analysis, exploratory testing, regression, etc.). 

Additionally, you also execute all those tests on the app in question manually on a regular basis, investigate the root cause of an error, report bugs and verify bug fixes. All these skills and experience are valuable and can be transferred to your new job as an Automation Engineer. So don’t be afraid that you’ll have to start from scratch. In fact, ***you are ahead of the game.*** 

### Besides the testing skills, what more do you have?

I bet you also possess the ***domain knowledge*** of the industry you're operating in such as banking, refinancing, energy, e-commerce, Salesforce, SAP, Oracle EBS, textile, supply chain inspection, etc. This is where you outshine a programmer who only has the tech stuff covered or someone who has just recently joined the project. Leverage your valuable domain expertise as a competitive advantage in a job interview.

# Step #2 - Learn Automation-specific Skills

Now that you understand your strengths, let's examine the areas of knowledge that you'll need to learn. I'm listing out some key areas of knowledge below. Of course, these points are by no means exhaustive. There are still a lot to learn if you want to advance to senior level. But they basically cover the foundation for an entry-level automation engineer.

### UI Element Locator

To automate an app, we'll need to understand how the app is built (JS/HTML, Java, WPF, UWP, [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/), etc.) so that we can choose a reliable locator to identify the app's UI elements. The automation framework ([Selenium](https://www.selenium.dev/), [Cypress](https://www.cypress.io/), [Appium](https://appium.io/), [Playwright](https://playwright.dev/), etc.) will use these element locators to interact (click, enter, check, etc.) with the app when you kick off an automated run. A useful tool to craft and test element locators for your web app would be: [POM Builder (Chrome extension)](https://chrome.google.com/webstore/detail/pom-builder-%E2%80%93-auto-genera/akcejfbfkkjnghlfngighgncolfaghco).

### Automation API 

An automation interaction consists of two 2 main steps : \[1] Element matching: the automation tool retrieves an "element locator" and matches it with a run-time UI element (usually some waits are applied), \[2] Invoking a UI event on that newly found UI element. As an Automation Engineer, we'll need to get familiar with the API that the automation library provides. For each platform, we have different techniques thus different API to learn:

* **Desktop:** Reflection, Windows API (use the SendInput() function to simulate a mouse click or key stroke), Microsoft UIA, [WinAppDriver API](https://github.com/microsoft/WinAppDriver), etc.
* **Web:** Invoking Javascript events, Selenium [WebDriver API](https://www.w3.org/TR/webdriver1/), [Playwright API](https://playwright.dev/docs/api/class-playwright), etc.
* **Mobile:** [Appium API](https://appium.io/docs/en/about-appium/api/), Android UIAutomator, iOS UIAutomation, etc.

### Result Report 

Usually when we pick an automation framework with a corresponding unit test framework (JUnit, TestNG, Mocha etc.), we already have a default result reporter like [Mochawesome](https://www.npmjs.com/package/mochawesome), [ExtentReports](https://www.extentreports.com/), Allure, ReportNG, etc. We just need to learn how to read them and investigate the root cause of a certain test failure.

### Reusability 

For web projects, go ahead with the *PageObject Model (POM)*. For other projects, try to wrap repetitive chunks of test steps into a higher-level reusable function so that you can call it over again and again instead of reinventing the wheel. Reusability is very beneficial because you can scale up fast while keeping the maintenance cost cheap.

### Data-Driven 

Sometimes we'll find that executing a test repeatedly with different parameter combinations each time is the best way to increase test coverage and ensure quality. Those tests are called "data-driven" tests. In such as case, we'll need to go through the whole test suite and cherry-pick them out, parameterize them (replace hard-coded values by variables), design a good set of test data, then apply the data-driven feature your framework of choice, e.g. TestNG

### Test Execution 

Automation runs are a bit different from manual test execution. We'll need to ensure that the test environment is stable so that we don't encounter environment issues (lack of dependencies, the wrong app under test, wrong OS, etc.) that have nothing to do with the quality of the app under test itself.

### CI/CD Integration 

Automation engineers don’t just automate tests, we also automate the Continuous Testing pipeline, a part of the CI/CD pipeline in DevOps. To do this, we'll usually rely on integration plugins of the automation framework or we must "plumb" the pipeline ourselves, e.g. spin up VM, install the app under test, install the test automation framework, dispatch the tests to the VM, collect all results, aggregate the results to generate a summary report that will be emailed to all stakeholders, etc.

> If you want to cement your knowledge even further, learn & practice everyday. Follow these useful resources to hone your skills: [Best Blogs to Learn and Evolve for Test Automation Engineer](https://www.thucldnguyen.com/blog/career-advice/best-blogs-to-learn-and-evolve-for-test-automation-engineers/). 

Now that we laid out the foundation for an automation engineer. Let's prepare for an actual career pivot.

# Step #3. Prepare for an Interview

Whether you're transferring to another department within your own company or getting a new job with a new employer, you'll need to prepare for a job interview. *Prepare a portfolio of automation projects that could impress your interviewer.* Ideally, a Github repo is the best way to share your works.

Besides the automation-specific questions, you should also prepare for the generic Software Testing beforehand. And don't forget the good old HR prompts like:

* *Why did you leave your last job?*
* *How much salary would you expect and why?*
* *How could you add value to the organization with your current skills and experience?*
* *Are you a good fit for our culture?*
* And ultimately, ***why should we hire you?***

Interviewers will not be so rude to ask that last question. But your answers should always be framed around this burning question. Sprinkle in some optimism and appetite for learning and you'll be gold.

# Conclusion

No doubt that career pivots are difficult and scary. But fortunately, transitioning from Manual Testing to **Automation Engineer** should not be among the hardest ones. The two roles overlap a lot as we analyzed above. So this pivot should be relatively easy. If you got any other ideas, feel free to leave a comment below. 

*Good luck and happy testing!*

> DISCLAIMER: I'm not affiliated with or sponsored by any of the tools mentioned in this article or the companies behind them. I receive no commission for directing traffic to those tools whatsoever. All product and company names are the registered trademarks of their original owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder or their brands.