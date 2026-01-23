---
template: blog-post
title: 3 Common Misconceptions about Software Test Automation
slug: /blog/common-misconceptions-about-software-test-automation
date: 2021-03-01 17:29
description: The more automation the better. Automate once and run forever. Lack
  of preparation for provisioning and managing test environments. These are the
  three most common misconceptions about software test automation.
featuredImage: /assets/3-common-misconceptions-about-software-test-automation.png
---
Some popular misconceptions about Software Test Automation.

# **\#1. The more automation the better**

Whenever we kick off a new project, we usually have high enthusiasm, high hopes, and high expectations. Same for automation projects. It’s only logical because if we don’t believe that a project would return high ROI, we’d not decide to take on the hassles anyway.

Such naïveté sometimes leads us to the wrong path: automate everything in front of us and strive for that unrealistic number of 100% automation coverage. The truth is we’ll never reach 100% automation coverage. And we do not need to either.

**Takeaway:** If a test case will be executed at least one time per month (12 times per year), you better not automate it and focus your energy on other priorities. Like a lot of things in life, automation also adheres to the law of Diminishing Returns.

![](https://qph.fs.quoracdn.net/main-qimg-ad88e3bd36344dea3e1ec9774fb5f249)

Graph of Diminishing Returns - Source: [Wikipedia](https://en.wikipedia.org/wiki/Diminishing_returns "en.wikipedia.org")

# **\#2. Automate once and run forever**

The most serious offender of them all is usually the Project Manager or other equivalent roles in management. They think setting up the initial automation framework and automating a few test cases are all there is. Now we can forget about it and get on with our life. Nah! It’s not that easy. That’s why on average, 63% of test automation projects fail.

**Takeaway:** The maintenance cost (debugging failed test cases, fixing flaky tests, rerunning failed tests to verify the fixes, etc.) usually exceeds the test creation cost, especially when the project matures (running for over 6 months).

![](https://qph.fs.quoracdn.net/main-qimg-d8d13274b4cc7db071fd3c02aeb1b778)

Cost of automation maintenance - Source: [https://arxiv.org/pdf/1602.01226.pdf](https://arxiv.org/pdf/1602.01226.pdf "arxiv.org")

# \#3. What are test environments anyway?

A significant proportion of companies don’t even give test environments a second thought. They overlook the time and energy spent on test environment provisioning like spinning up VMs on a cloud (AWS, Azure…), staging a Kubernetes cluster, connecting to a database, installing the necessary automation libraries, installing the app under test (for desktop or mobile apps), dispatching the automated tests to multiple machines/VMs, aggregating the test results, etc.

**Takeaway:** Don’t just automate the tests, automate the CI/CD pipeline including provisioning test environments and other infrastructure. Depending on how complicated your environment is, we’ll need to spend efforts on it proportionately.

![](https://qph.fs.quoracdn.net/main-qimg-54dfba7ea4a775fa3f94a6d95a28dbac)

Reference architecture for an e-commerce shop based on microservices - Source: [Microsoft](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/microservice-application-design "docs.microsoft.com")

Hope it helps. Happy automating!