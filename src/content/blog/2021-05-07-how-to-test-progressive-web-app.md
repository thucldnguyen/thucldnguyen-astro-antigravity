---
template: blog-post
title: How to Test Progressive Web App
slug: /blog/how-to-test-progressive-web-app
date: 2021-05-07 15:48
description: Unlike normal web apps, PWA poses its own unique challenges that
  test engineers and automation engineers must pay attention to. This article
  discusses these unique testing requirements of PWA and how to approach them.
featuredImage: /assets/how-to-test-progressive-web-app-center.png
---
Of course, you can test **Progressive Web App (PWA)** *manually* just like any other web app by going through the test scenarios step by step and validating the app’s functionalities along the way. In terms of *automated testing*, you can easily automate PWA using the usual automation frameworks such as [Selenium](http://selenium.dev/ "selenium.dev"), [Cypress](http://cypress.io/ "cypress.io"), [Puppeteer](https://developers.google.com/web/tools/puppeteer "developers.google.com"), [Playwright](https://playwright.dev/ "playwright.dev"), [Robot](https://robotframework.org/ "robotframework.org"), [Protractor](https://www.protractortest.org/ "www.protractortest.org"), [TestProject](http://testproject.io/ "testproject.io"), etc. However, there are some unique aspects of PWA that you have to pay attention to compared to normal web apps.

> NOTE: When testing PWA, Google Lighthouse is your best friend. So make sure you use it extensively (DevTool).

## **\#1. Offline Caching & Installability**

Unlike normal web apps, PWA is expected to function normally despite being offline (no internet connection). PWA can pull off this magic thanks to a service worker. You should make sure that this offline requirement is satisfied by simulating degraded or no network connectivity. 

Being installable is another big advantage of PWA compared to normal web apps. Users who install your PWA on their mobile devices tend to engage with it more often. So make sure that it’s installable whenever you release a new version of your PWA.

![Screenshot from Lighthouse - Installability](/assets/installability.png "Screenshot from Lighthouse - Installability")

## **\#2. Sensor Integration**

Can your PWA work normally with a camera and mic within a browser? Integrating with sensors is a big advantage of PWA and if your PWA makes use of sensors, make sure you don’t miss that part in your testing & automation.

## **\#3. Push Notifications**

Can your PWA perform push notifications successfully within a browser? Unlike normal web apps, the ability to deploy push notifications is a big advantage of PWA. If your PWA makes use of push notifications, make sure you don’t miss them in your testing & automation.

## **\#4. Validate PWA Splash Screen**

When end-users open up your PWA from their home screen after installation, they’ll see a [splash screen](https://web.dev/splash-screen/ "web.dev"). This splash screen helps make your PWA feel like a native app. Make sure you configure a custom splash screen for your PWA.

## **\#5. PWA Manifest**

Make sure that your PWA has a valid web manifest. This can be done manually once in a while but it’s quite unique to PWA compared to normal web apps. Check out this [manifest validator](https://manifest-validator.appspot.com/ "manifest-validator.appspot.com").

## **\#6. Always HTTPS**

Make sure that your PWA always redirects HTTP traffic to HTTPS. This is a must-have for PWA because PWA has to enable secure web features for all your users.

## **\#7. Responsiveness**

Of course, normal web apps must display correctly in many form factors and on many screen sizes too. This is not unique to PWA but unlike web apps, the bar for PWA is much higher which means you must increase your test coverage.

## **\#8. Client-side Performance Testing**

Take full advantage of Google Lighthouse to measure the performance of your PWA on the client-side (not to be confused with traditional performance testing that involves the responsiveness of the server).

## **\#9. Accessibility Testing**

Unlike normal web apps which don’t involve strict accessibility requirements, PWA must pass these accessibility tests. Again, Lighthouse is your best guide. Check out this [blog post](https://altitudemarketing.com/blog/easy-guide-website-accessibility/ "altitudemarketing.com"). The picture below shows some example accessibility problems.

![Accessibility problem examples - Screenshot from Lighthouse](/assets/accessibility-problems.png "Accessibility problem examples - Screenshot from Lighthouse")

## **\#10. Coverage Matrix**

When testing PWA, you must cover a huge matrix of browser versions, desktop OS versions, mobile OS versions, form factors, and screen sizes. Test execution must occur continuously whenever a new browser version comes out. Thus, automation is unavoidable.

![Coverage Matrix](https://qph.fs.quoracdn.net/main-qimg-0183ef339578774147a014df254a26f7 "Coverage Matrix")

*Credit: Perfecto - [The 2021 Guide to Progressive Web App Testing](https://www.perfecto.io/resources/web-app-testing "www.perfecto.io")*

## Conclusion

Testing PWA has a lot of common ground with testing normal web apps. You can reuse all your testing knowledge, tools, and skillsets so no worry. You just need to go some extra miles to check for unique PWA requirements like we examined above.

*Hope it helps. Happy testing!*

> DISCLAIMER: I'm not affiliated with or sponsored by any of the tools mentioned in this article or the companies behind them. I receive no commission for directing traffic to those tools whatsoever. All product and company names are the registered trademarks of their original owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder or their brands.