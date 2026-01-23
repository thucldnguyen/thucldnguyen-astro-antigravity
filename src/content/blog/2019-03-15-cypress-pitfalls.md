---
template: blog-post
title: 5 Pitfalls You Should Consider Before Adopting Cypress
slug: /blog/web-automation-testing/cypress-pitfalls/
date: 2019-03-15 12:00
description: Cypress is by no doubts on the rise. It got 318,244 weekly
  downloads as of the week of 8-Mar-2019. Aside from a short deep dive in the
  21-Dec-2018 (Christmas?), Cypress’ popularity has been increasing steadily.
  The chart from npm below clearly corroborates the claim. That said, there’s
  certainly no tool that fits every team.
featuredImage: /assets/cypress-code2.png
---
**Cypress** is by no doubts on the rise. It got **318,244** weekly downloads as of the week of 8-Mar-2019. Aside from a short deep dive in the 21-Dec-2018 (Christmas?), Cypress’ popularity has been increasing steadily. The chart from **npm** below clearly corroborates the claim.

![Cypress weekly downloads on npm](/assets/cypress-npm.png "Cypress weekly downloads on npm")

That said, there’s certainly no tool that fits every team. Like any other test automation frameworks, Cypress has its own pitfalls. Consider the Cypress pitfalls below when you have to decide whether Cypress is the perfect match for you and your team.

## \#1. You must be a pro coder

For front-end developers, Cypress is the ideal replacement for Selenium. Selenium runs slow and its technology is old while Cypress is fast and modern. On top of that, Cypress tests are written in JavaScript – the beloved language of all front-end developers. The creators of Cypress indeed designed the framework with front-end developers as their primary target persona.

What does it mean? It means you have to be a professional JavaScript developer to even kick start your project, let alone reaping the full benefits of Cypress. I’ve seen less-technical testers struggle to evaluate Cypress. When they created their first experimental test, they couldn’t get it compiled although the test got nothing but **expect(true).to.equal(true)**.

The picture below shows a typical error. Could you figure out why?

![Cypress cryptic error](/assets/cypress-error.png "Cypress cryptic error")

This cryptic error message actually results from missing a closing round bracket at line 9. But less-technical testers would probably be confused since Cypress said there was something wrong at line 10.

Do you have the coding instinct to instantly recognize the root cause of this type of errors? Are you knowledgeable enough to understand the nuances of JavaScript? Could you troubleshoot exceptions and errors effectively? **If you’re hesitant answering this question, I’d suggest considering [Keyword-Driven Testing](https://en.wikipedia.org/wiki/Keyword-driven_testing) instead.**

## \#2. You cannot parallelize test execution

Read through this [thread](https://github.com/cypress-io/cypress/issues/64) to understand the perspective of Cypress creators. In short, they don’t think that parallelizing test runs would be worth it.

> It complicates the reporter, and there needs to be configuration around this specific behavior… – Brian Mann, founder of Cypress

Brian offers another solution: parallelize browser tests “at the operating system level”. That means you have to use Docker containers to spin up multiple browser instances and run tests simultaneously. Needless to say, cloning Docker containers consumes a lot more computing power than the good old Selenium Grid solution we all know and love.

**If speeding up test automation through parallelizing test runs is a must-have requirement of your job, consider Selenium, Protractor or other test automation tools that support test execution parallelization instead.**

## \#3. You cannot run other browsers besides Chrome

Cypress doesn’t support any other browsers such as Firefox, Safari, or Edge. Albeit Chrome is the most popular browser (with +70% market share) right now, ensuring that your web apps run smoothly across browsers is still a must-have requirement for many test projects.

That said, there are even inconsistencies among Chromium-based browsers that Cypress claims to support like Chrome and Electron due to differences between these code branches.

**If your boss asks you to run tests on other browsers besides Chrome, he probably doesn’t like Cypress.**

## \#4. You must jump through hoops to create business-level tests

For those of us who work in enterprise environments, we don’t have the luxury of writing low-level GUI interaction tests all the time. Low-level tests like the below code snippet are for small-scale projects only. Large-scale projects require a slightly different approach.

```
describe('My First Test', function() {
  it('Gets, types and asserts', function() {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify that the value has been updated
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})
```

<!--StartFragment-->

To deal with sophisticated and lengthy tests, we must create high-level or business-level steps such as `create new oil well`, `add new casing`, `load drilling data`, `print well reports to pdf` and `check well status`. I didn’t pull all these high-level steps out of my imagination. They actually came from one of our oil & gas clients.

Although my client wrote tests in high-level steps, they have countless of tests that span +1,000 steps. If this client has to rewrite those tests in low-level GUI interactions, their acceptance tests would occupy tens of thousands of code lines. Nightmare for them, and for me!

That said, creating business-level commands in Cypress using **custom commands** ([source](https://docs.cypress.io/api/cypress-api/custom-commands.html)) is hard. Unlike procedural paradigm of programming, you cannot simply group a bunch of code lines together to form a new ‘procedure’ (business-level step). Cypress forces you to understand new concepts like parent command, child command, dual command, and chaining commands. The world would be a better place if Cypress would allow us to select a chunk of code and create a new custom command in only one click.

**If you usually write high-level test steps or you must present your tests to business stakeholders who couldn’t care less about programming, consider other test methods to increase the readability of your tests.**

## \#5. No out-of-the-box support for Page Object Model

While Page Object Model (POM) is the universal standard for Selenium projects, Cypress doesn’t encourage us to separate element locators into a different layer of page objects. We’re told to leave the CSS selectors inside the tests. As many of us would agree, storing element locators in the tests themselves is a surefire way to make the tests more brittle. One minor change to the GUI would break automated tests in droves.

Some solutions to this problem of Cypress have been proposed such as using a dictionary of prefixes in place of real locator values, or inventing your own page objects. This [Medium article](https://medium.com/reactbrasil/deep-diving-pageobject-pattern-and-using-it-with-cypress-e60b9d7d0d91) from Felippe Rodrigo Puhle is a very useful place to get started. That said, creating your own page objects is not straightforward. And you always have to remember to import those page objects into the \*.js and \*.ts files that reference those page objects.

Cypress could’ve made our life easier by adding some dependency injection to dynamically load those page objects so that testers like us won’t have to do the importing ourselves. **If you hold POM dear to your heart, Cypress might not be the tool for you.**

## Conclusion

Pick Cypress if you’re:

1. Comfortable with coding in JavaScript or Typescript
2. Happy with no parallelized test execution 
3. Okay with testing on Chrome only
4. Not required to write too many business-level tests
5. Content with no page objects or importing page objects by hand

**This article doesn’t intend to undermine the hard work and value of Cypress.** I’m just trying to uncover some hidden sides of Cypress so that the testing community in general would make wiser decisions. _If you’re a fan of Cypress, don’t let me discourage you. If you think some of the points I made were unfair or not substantial, please feel free to say so in the comment section below._ 

Happy testing!