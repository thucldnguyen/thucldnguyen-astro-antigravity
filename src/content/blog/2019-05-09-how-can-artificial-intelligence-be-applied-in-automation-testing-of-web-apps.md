---
template: blog-post
title: How Can Artificial Intelligence be Applied in Automation Testing of Web Apps?
slug: /blog/web-automation-testing/how-can-artificial-intelligence-be-applied-in-automation-testing-of-web-apps/
date: 2019-05-09 00:01
description: "There are several interesting web app automation scenarios that we
  can improve using AI: Increase test execution stability (self-healing
  automation) by letting AI to automatically locate web elements when the
  primary locators fail. This feature already appears in some cutting-edge
  automation tools like Mabl. Increase automation productivity by using Natural
  Language Processing (NLP) to automatically "
featuredImage: /assets/how-can-ai-can-be-applied.png
---
There are several interesting web app automation scenarios that we can improve using AI:

* **Increase test execution stability (self-healing automation)** by letting AI to automatically locate web elements when the primary locators fail. This feature already appears in some cutting-edge automation tools like [Mabl](http://mabl.com/).
* **Increase automation productivity** by using Natural Language Processing (NLP) to automatically translate manual test cases into automated test cases. In theory, this capability should be feasible but I haven’t seen any open-source or commercial solutions available on the market yet.
* **Increase test coverage** by auto-generate input parameters that could exhaustively test the API under test using advanced algorithms such as [Pairwise](https://www.logigear.com/magazine/API-testing/pairwise-api-testing-ci-cd-friendly-model-based-automation/).
* **Reduce test execution time** by only running the tests that are impacted by a certain code commit instead of exhaustively running all of them after every code commit. For instance, check out the [Test Impact Analysis feature of Microsoft Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/pipelines/test/test-impact-analysis?view=azure-devops).
* **Reduce failure debugging time** by auto analyzing test results and assigning them to categories like Environment Issues, Automation Problems, App Defects, etc. An outstanding example of this category is [Report Portal](http://reportportal.io/).
* **Perform visual validations** on web apps using OCR or image-recognition techniques. There are plenty of tools out there such as [TestArchitect](http://testarchitect.com/), [AppliTools](http://applitools.com/) and [SikuliX](http://sikulix.com/).

AI is just one trend in the industry. Read more about other trends and predictions here: [2019 Test Automation State-of-the-Practice and Trends | LogiGear Magazine](https://www.logigear.com/magazine/test-automation/2019-test-automation-state-of-the-practice-and-trends/)