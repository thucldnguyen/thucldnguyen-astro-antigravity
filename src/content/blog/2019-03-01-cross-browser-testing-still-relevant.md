---
template: blog-post
title: "Cross Browser Testing: Why is It Still Relevant Although Some May Say Otherwise?"
slug: /blog/web-automation-testing/cross-browser-testing-still-relevant/
date: 2019-03-01 16:00
description: A wave of new test automation tools argue that Cross Browser
  Testing is no longer relevant. Their reason? Due to the law of diminishing
  returns, adding more browser coverage only marginally increases your
  confidence. The argument further explains that since only a small proportion
  of your failures actually result from inconsistencies between browsers, you’re
  safe if you stick with Chrome – the most popular browser on planet Earth.
featuredImage: /assets/web-browser-icons.png
---
# Understanding the Argument

A wave of new test automation tools argue that Cross Browser Testing is no longer relevant. Their reason? Due to the law of diminishing returns, adding more browser coverage only marginally increases your confidence.

The argument further explains that since only a small proportion of your failures actually result from inconsistencies between browsers, you’re safe if you stick with Chrome – the most popular browser on planet Earth.

![Chrome Market Share](/assets/chrome-market-share.png "Chrome Market Share")

The <www.statista.com> chart above shows that Chrome occupied **70.95%** as of December 2018. That blew my mind. The antifans of cross browser testing certainly got their math right.

# Technical Differences

Different browsers interpret the code of your web apps differently. That’s for granted.

As you might already know, at the core of each browser is a browser engine, or some may call rendering engine. The browser engine parses the HTML documents, creates the DOM (Document Object Model) tree, draws the web elements on your screen, then exposes the DOM objects to the manipulation of your page scripts (JavaScript). Albeit less popular, Gecko (Firefox), Trident (IE) and WebKit (Safari) are strong contenders to Blink (Chrome).

Another big difference among browsers is the JavaScript engine. Chrome uses V8 while Firefox uses SpiderMonkey. These JavaScript engines compiles your page scripts directly into native machine code before execution. They also optimize code dynamically at runtime. These JavaScript engines in conjunction with other compiling utilities like Crankshaft, Ignition, TurboFan, etc. offer a speed boost in the performance of your web apps.

Hopefully now we can all agree that each browser is a complex beast. There’s no warranty that your web apps will behave exactly the same between browsers.

# Return on Investment (ROI)

Yes, the law of diminishing returns applies here. However, it only applies to the probability that a bug would happen. No one said anything about the impact of that highly improbable bug. The picture illustrates what I mean.

![Risk](/assets/risk.jpeg "Risk")

Enterprises sometimes cannot afford the luxury of ignoring these risks.

# Conclusion

Cross Browser Testing is still relevant, at least at the moment. Do you think differently? Let me know in the comment section.