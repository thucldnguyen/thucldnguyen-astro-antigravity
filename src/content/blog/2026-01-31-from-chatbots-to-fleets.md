---
template: blog-post
title: "From Chatbots to Fleets: How AI Changed the Way I Work"
slug: /blog/from-chatbots-to-fleets
date: 2026-01-31 17:00
description: "I stopped thinking of AI as an interactive chatbot, and started treating it as a zero-fatigue fleet of AI agents that work on my behalf, even when I'm sleeping."
featuredImage: ../../assets/from-chatbots-to-fleets.png
---

For a long time, I thought AI was mostly a productivity hack for engineers.

Useful, yes.
Impressive, sometimes.
But not core to how I worked as a product manager.

Nothing replaces humans when it comes to product discovery, right? No police department wants to be “interviewed” by an AI agent. VOC requires empathy, context, judgment — things machines don’t have.

That was my honest belief until mid-2025.

## The moment my mental model broke

The inflection point wasn’t a keynote or a research paper. It was [Cursor](https://www.cursor.com/).

I was working on my personal site and decided to finally fix a long list of security vulnerabilities. With AI-assisted coding, I upgraded everything to [Gatsby 4](https://www.gatsbyjs.com/) and [Node.js 22](https://nodejs.org/) in one sweep. What would normally take days of careful, tedious work took a fraction of the time — and the quality was better than my previous attempts.

That was the first crack.

The second crack was realizing that this wasn’t just about speed. It was about how work could be structured when cognitive labor was no longer scarce.

Around the same time, I found myself disagreeing with something I used to say confidently:

“AI can’t replace humans in cognitively demanding tasks.”

That statement aged badly — fast.
AI can now pass the [SAT](https://satsuite.collegeboard.org/sat) and the Bar. Those tests are no longer useful benchmarks. Even the [Humanity’s Last Exam](https://lastexam.ai/) is already being crushed.

The problem wasn’t AI.
It was my mental model.

## The mindset shift

I stopped thinking of AI as an interactive chatbot,
and started treating it as a zero-fatigue fleet of AI companions that work on my behalf — even when I sleep.

That single shift changed everything.

Instead of asking, “Can AI help me do this task faster?”
I started asking, “Should I be doing this task at all?”

If the work was repetitive, procedural, or pattern-heavy, I no longer jumped in immediately. I first asked how AI could do it — and whether it was worth turning that solution into a long-running agent.

This shift fundamentally changed how I approach PM work.

## My AI-first PM workflow (in practice, not theory)

### 1. Bug triage as an autonomous agent

Bug triage is necessary — and brutally expensive in cognitive load.

I built a bug-triage agent using [Glean](https://www.glean.com/) that:

- **Queries customer-reported [Jira](https://www.atlassian.com/software/jira) tickets**
- **Performs enterprise search across [Quip](https://quip.com/), [SharePoint](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration), Jira, [Slack](https://slack.com/)**
- **Retrieves relevant known issues, similar past bugs, and troubleshooting steps**
- **Proposes the next best action**: request repro steps, ask for artifacts (HAR, audit trails), or route to the correct team

Instead of reacting to every ticket, I now review decisions. The agent does the digging. I do the judgment.

That’s leverage.

### 2. Product discovery with AI as a research accelerator

There is still no substitute for direct customer interaction. I believe that deeply.

But AI can compress the pre-work dramatically.

I’ve used [GPT-5.2 Pro](https://openai.com/) in deep research mode with prompts like:

“Pretend you’re an investigator at a large police department. Let me interview you.”

I combine that with:

- **Crawling [Reddit](https://www.reddit.com/)** for real-world incidents and public reactions
- **Retrieving historical VOC** from internal knowledge bases
- **Sanity-checking specs and architectures** via [Glean](https://www.glean.com/)

The result isn’t “AI-designed products.”
It’s better-prepared conversations with real customers.

### 3. Prototyping that engineers actually take seriously

AI changed how fast I can go from idea → something runnable.

My flow looks like this:

- **Rapid throwaway prototypes** using [Figma Make](https://www.figma.com/ai/)
- **Exporting HTML/CSS/JS**
- **Refining via [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/setup), [Cursor](https://www.cursor.com/), [Copilot](https://github.com/features/copilot), [Antigravity](https://antigravity.google/) ([Gemini 3 Pro](https://deepmind.google/technologies/gemini/))**
- **Integrating directly into axon-ui**, using Axon's official UI components and design tokens
- **Running locally** against a real [Evidence.com](https://www.evidence.com/) instance with real BWC and Fleet videos

Engineers don’t get a figma fantasy.
They get a working dev server and a GitHub branch they can play with.

That changes the conversation.

### 4. Delivery: using AI to navigate legacy complexity

Legacy codebases are where productivity goes to die.

I regularly use [Claude](https://www.anthropic.com/claude) to:

- **Explain undocumented frontend behavior**
- **Trace legacy UI flows**
- **Fix low-hanging UI bugs safely**

This doesn’t replace engineers.
It lets me meet them closer to their level — faster.

## When AI failed me (and why that mattered)

AI is not magic. I learned this the hard way.

I once asked [Claude](https://www.anthropic.com/claude) to re-implement an entire vibe-coded prototype as a new page inside axon-ui.

It was a disaster.

The app crashed on load. I spent days debugging with no success. Eventually, I reverted everything and started over — this time adding Spark2 components one by one, fixing console errors incrementally, and validating each step before moving forward.

The lesson was painful but important:

AI doesn’t have enough context to safely modify a system with millions of lines of code and thousands of dependencies.

Vibe coding only works when you understand the architecture well enough to guide it. Otherwise, speed turns into fragility.

## What most PMs get wrong about AI

A few hard-earned beliefs I now hold:

- Most smart PMs underestimate AI because they think it’s “just a chatbot.”
- The biggest risk isn’t layoffs. It’s whether your role can be meaningfully AI-accelerated.
- If doing your job well slows everyone else down, your job is at risk — even if your output looks “high quality.”
- Vibe coding only works when you can describe systems succinctly. If you can’t explain it, AI can’t build it.
- AI doesn’t reward gatekeepers. It rewards people who increase the slope of progress.

## A recent moment that crystallized this for me

At [Axon’s](https://www.axon.com/) Tech Summit during Company Kickoff 2026, I had the chance to MC a panel with leaders across product, engineering, and AI research.

The theme was simple and uncomfortable:

- **AI in everything we build**
- **Build everything with AI**
- **The risk of adopting AI vs. the risk of not adopting it**

What struck me wasn’t the tech — it was the energy. Senior engineers and architects from companies like [Nvidia Vietnam](https://www.nvidia.com/), [NAB](https://www.nab.com.au/), [Ninja Van](https://www.ninjavan.co/), and others were visibly excited. Several candidates applied on the spot.

They weren’t excited about tools.
They were excited about velocity with purpose.

## Where this leaves me

I’m still learning. Constantly.

But I’m now convinced of one thing:
AI doesn’t replace PM judgment — it amplifies it.

If you treat AI as a chatbot, you’ll get faster answers.
If you treat it as a fleet, you get leverage.

And in complex systems, leverage is everything.
