---
template: blog-post
title: Three Reasons Why Cypress is Heading in the Right Direction
slug: /blog/test-automation-tools/three-reasons-why-cypress-is-heading-in-the-right-direction/
date: 2019-12-04 00:01
description: Cypress has its own unique approach to web automation and there are
  good reasons they chose to approach it that way
featuredImage: /assets/cypress-2.jpg
---
# 1. Cypress Made Bold Trade-off

Bold trade-offs show the strength, and confidence of a product team. They eliminate ambiguity and help the team laser-focus on what’s most important. But making trade-offs is easier said than done. Most product teams avoid or worse, defer making trade-offs because like all other human beings, we’re afraid to be wrong and criticized.

Take [Cypress ](https://www.cypress.io/)as an example. Right from the start, they’ve been supporting only Chrome and Chromium-based browsers (Canary and Electron). This decision has been booed by many critics. Cross-browser testing is the de-facto must-have in web testing. It’s hard to imagine that an automation tool not supporting cross-browser testing would survive. However, Cypress team put up with all the criticism and kept plowing ahead.

![Cypress only supports Chrome, Canary and Electron](/assets/cypress-1.png "Cypress only supports Chrome, Canary and Electron")

I must admit I was one of those who doubted Cypress when I first stumbled upon it. However, later on, it dawned on me that they got a solid point here. Chrome eats up over [60% of the browser market share ](https://gs.statcounter.com/browser-market-share). Thanks to their predominant presence on the market, other browsers must play by its rules. Developers also prioritize making web apps that run smoothly on Chrome. Cross-browser testing became less and less important.

Cypress made a good choice here. That’s why I believe they’ll go places in the future.

# 2. Cypress Focuses on The Right Problems

A lot have changed since the early-days of test automation. Back then, clicking a UI element on a particular platform was a serious technical challenge. Teams must spend time and effort in building the automation technologies that were fragile because platform owners (Microsoft, Apple, Android…) didn’t invest adequately in app testability. Whenever they made a disrupt API change, our automation frameworks were screwed.

Nowadays, all platform owners recognized the importance of automation and testability. And more engineers start automating their apps to maximize test coverage and speed. [WebDriver ](https://www.w3.org/TR/webdriver/)unprecedentedly became the first industry standard for web automation. Thus, clicking a button is no longer a big issue.

The attention now shifts to other problems:

1. Smart waits
2. Speed
3. Maintainability
4. Debugability
5. Object mocking

Cypress has solved these problems very cleverly. For instance, since Cypress basically lives inside Chrome, it knows the ins and outs of every intricacy within Chrome. Thus it can intelligently wait for UI elements to be ready before asserting them. Besides, Cypress automatically retries when it fails to carry out the interaction or assertion. With Selenium, you have to do this yourself.

<iframe width="560" height="315" src="https://www.youtube.com/embed/0ZzKdjK1Buc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

How Cypress solves other problems are also brilliant. But let’s save those topics for another blog post.

# 3. Cypress Adds its Own Highlight

[Time travel ](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Time-travel)helps Cypress shine. No other tools have this capability. Basically, you can step back to a past state of the web app to debug your test and your app.

![Cypress Time Travel](/assets/cypress-3.png "Cypress Time Travel")



## Conclusion

Cypress has done a good job in making the automation experience more delightful. I can’t wait to see what they have up their sleeves in the near future. Happy testing!