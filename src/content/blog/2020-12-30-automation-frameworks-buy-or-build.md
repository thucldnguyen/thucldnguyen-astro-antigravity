---
template: blog-post
title: "Automation Frameworks: Buy or Build?"
slug: /blog/test-automation-tools/automation-frameworks-buy-or-build/
date: 2020-12-30 12:00
description: Free open-source automation frameworks are not actually zero cost.
  Their costs are just hidden out of sight. And we still have to pay somehow.
  This article discusses the merits of BUILD versus BUY when it comes to picking
  your Automation Framework.
featuredImage: /assets/buy-or-build-3.png
---
Have you ever wondered about whether you should **BUY** or **BUILD**? Over the years, I’ve seen many test teams at non-tech enterprises struggled with the same dilemma.  

* _Should we adopt an open-source automation library like Selenium, WebDriverIO, Protractor, etc. to build our own framework?_
* _Should we go shopping and finally settle down with a commercial out-of-the-box solution and risk vendor lock-in?_

These **BUY or BUILD** questions usually came from developers, especially senior developers or Engineering Managers. At their core, developers are builders. So it’s only natural for them to lean on the **BUILD** option. And they love everything open-source. 

However, there are some downsides if we go down that open-source path. With open-source, you would have to headbutt many big problems. Thus for big enterprises, nine out of ten, the answer is a firm **BUY**. Let me explain why.

# Problem #1. The Tangible Cost of Ownership

As a QA Manager, you have to think about **Capability Development** for the teams you supervise. If they lack a certain useful skill set, we have to train them, sponsor their online courses or go out and hire more people to fill in those skill gaps.

With this economy and this highly-competitive labor market, it’s a big headache to find and hire an all-star team of Typescript/Javascript programmers or any language for that matter. That’s why head hunting firms are everywhere, readily providing their services and taking a cut out of each and every recruit.

Finding developers is hard. But what’s even harder? Paying them a hefty sum every month so that they can code & maintain each and every automated script day in and day out. Skillful developers, SDIT (Software Developer in Test) or Automation Engineers are like diamonds, you don’t simply pick them up on the street. 

**Extensive coding demands expensive resources.**

![Javascript developer salary](/assets/javascript-dev-salary.png "Javascript developer salary")

When it comes down to dollars (cost of ownership – TCO),  commercial tools or even outright outsourcing to a tech services firm hyper-specialized in Test Automation become a much more attractive alternative. 

Why don’t we let them deal with all this craziness so that we can get on with our life in peace?

# Problem #2.The Intangible Cost of Opportunity

Besides the dollar values (TCO – Total Cost of Ownership), you have to pay another intangible cost: Opportunity Cost. Developers love building stuff and that’s all well and good. But not everything should be built by you.

I’m a Product Manager but let’s say I’m also relatively good at carpentry (fictional) and I can decently make a DIY chair for fun. But should I craft each and every wood item in my house, including that huge kitchen cabinets, the king-size beds, wood nightstands and those wood bookshelves… on my own? It’s probably less fun now.

![Fun vs. Less Fun (not my house anyway)](/assets/fun-less-fun.png "Fun vs. Less Fun (disclaimer: not my house)")

One hour you spend on maintaining the automation frameworks or fixing flaky scripts is another hour you could’ve used to do something else. Should you rather spend that hour on building stuff that are directly valuable to your Core business? 

If you’re a bank, you better write code that improves your Customer Experience and see your bottom line getting fatter and fatter. If you’re a Oil & Gas company, you better write software that multiplies the productivity of your exploration & drilling operations. If you are… You know where I’m heading now. 😉

# Problem #3. Continuous Support

Who is going to fix framework bugs? Let’s say the most basic click() & sendKeys() functions don’t work on a peculiar environment (e.g. iPad simulator), you cannot scream at the Protractor or Selenium community and demand them to fix it immediately.

To be fair, these community developers churn out code for free. They’re already doing a pro-bono for society so we should thank them and patiently wait for the bug fixes, as long as it takes… maybe years. 

Otherwise, you have to fork the project and fix them on your own. That leads back to [Problem #1](#problem-1-the-tangible-cost-of-ownership).

<img src="/assets/developer-fix-bug.gif" alt="Fastest way to fix bugs (source: The IT Crowd)"/>

With a commercial tool, you have a Customer Support team to yell at and some engineers behind the scene to fix bugs for you. Customers are king so even when your test requirements are quite far away from the traditional paths, you can still ask the vendors to customize their solution for you. Better right?

# Conclusion

I’ll add more problems and solutions to this article continuously. There might be a lot more concerns to address but these three are the most noticeable headaches. Free open-source solutions are not actually zero cost. We still have to pay somehow. If you notice anything missing, let me know in the comment.