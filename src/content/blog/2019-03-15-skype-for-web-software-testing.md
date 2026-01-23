---
template: blog-post
title: "Skype for Web Only Works on Chrome and Edge: What Does it Mean for Testers?"
slug: /blog/tech-news/skype-for-web-software-testing/
date: 2019-03-15 08:00
description: On March 7, 2019, Microsoft released a fresh version of Skype for
  Web (source). The new Skype features many gems such as HD video calling, call
  recording and finding messages within conversations. The caveat? It only works
  for Chrome and Edge.
featuredImage: /assets/browser-not-supported.png
---
**On March 7, 2019,** Microsoft released a fresh version of Skype for Web ([source](https://blogs.skype.com/news/2019/03/07/the-new-skype-for-web-is-here/)). The new Skype features many gems such as HD video calling, call recording and finding messages within conversations. The caveat? It only works for Chrome and Edge.

What does it mean for automation testers, and software testers in general?

## Automated web testing prevails

It’s no new observation. Ever since Satya Nadella’s [reorganization announcement](https://news.microsoft.com/2018/03/29/satya-nadella-email-to-employees-embracing-our-future-intelligent-cloud-and-intelligent-edge/) on 29-Mar 2018, Windows is no longer an independent division. The Windows division was split into the core engineering group placed under Azure, and the rest of the division working under Office 365. Windows is still a standalone product but it’s no longer a standalone business.

This means Windows as a platform is facing a sharp decline in popularity. And Microsoft’s CEO acknowledged it. This news in conjunction with the new Skype for Web above assures us that desktop app testing is a shrinking market thanks to the rise of the mobile and web platforms.

> Windows: Joe Belfiore will continue leading our Windows experiences and will drive Windows innovation in partnership with the PC and device ecosystem. The future of Windows is bright as we continue to innovate across new scenarios and device form factors, and more deeply connect to our Microsoft 365 offerings. Joe will share more about the Windows roadmap at Build. – Satya Nadella, CEO of Microsoft

For testers, this decline of Windows means we now have to shift our attention to mobile and web apps. That’s why we’ve seen the steady rising of Selenium’s adoption in comparison to legacy proprietary tools like UFT and TestComplete. **If you’re still spending 100% of your time testing desktop apps, you’re at serious risk of losing your job. Consider learning Selenium, Protractor, Cypress, and other web & mobile testing tools.**

## Cross-browser testing is losing its bite

Microsoft ditched its own EdgeHTML rendering engine and switched to Chromium (Chrome’s opensource engine) in Dec-2018 ([source](https://www.windowscentral.com/microsoft-building-chromium-powered-web-browser-windows-10)). Now Microsoft doesn’t allow you to use Skype for Web on Firefox, Safari, Opera, Vivaldi, etc. Is Microsoft cooperating with Google to slowly kill other browser competitors?

Maybe. Maybe not. I’d suspect the move was not intentionally malicious. Like other corporations, Microsoft’s utmost mission is profitability. They cut off testing on other browsers not because they wanted to support Chrome, but because they wanted to cut cost.

While it’s good news for automation testing on web apps (you don’t have to do cross-browser testing in a Chrome-dominated world), it’s dire news for us as consumers. The world wide web which was once a beautiful and diverse network has been monopolized by Google. Chrome has become the exact enemy it swore to defeat (IE at one point occupied 95% of market share).

![Chrome market share](/assets/chrome-market-share.png "Chrome market share")

If cross-browser testing is still in your work agenda, don’t throw them tests away, just yet. However, don’t spend too much effort into maintaining those tests either. **If you have limited time and resources (like everybody else on Earth), focus on making sure that your web apps work perfectly on Chrome first. It’s the simple 80/20 rule.**

## Final thoughts

The fact that Chrome is slowly eating up the diversity of the world wide web is unsettling. However, there’s nothing much we can do. It’s human nature to standardize and converge into whichever means most convenient. Firefox, Safari, Opera and other browsers will soon be a thing in the past. As testers, our web testing job will definitely become easier.

However, don’t fall into the trap of complacent. Continue sharpening your skills and learning new techs. Continuous learning is the best weapon against the ever-changing world of software testing.