---
template: blog-post
title: "How I Became an AI-First Product Manager (without Replacing Human Judgement)"
slug: /blog/ai-first-pm
date: 2026-01-31 17:00
description: "Why I stopped thinking of AI as a chatbot and started building an AI-first PM workflow to protect my most valuable asset: human judgment."
featuredImage: ../../assets/from-chatbots-to-fleets.png
---

For a long time, I thought AI was mostly a productivity hack for engineers.

Useful, yes.  
Impressive, sometimes.  
But not core to how I worked as a product manager.

I still believe this today: **nothing replaces real customer conversations**. No customers (especially police agencies) want to be interviewed by an AI agent. Product discovery requires trust, context, and human judgment — things that fundamentally live in human relationships.

What changed for me wasn’t this belief.

What changed was my realization that I was spending far too much of my time **not doing that work**.

## The moment my old mental model broke

The inflection point wasn’t a keynote or a research paper. It was [Cursor](https://www.cursor.com/).

In mid-2025, I was fixing a long list of security vulnerabilities on my personal website — necessary work, but cognitively uninteresting. With AI-assisted coding, I upgraded everything to Gatsby 5 and Node.js 22 in one sweep. What would normally take days of careful, tedious work took a fraction of the time — and the quality was better than my previous attempts.

What surprised me wasn’t just the speed.  
It was the quality.

That was the first time I felt something click: **Senior attention was being wasted on work that no longer required it.**

Not long after, I discovered Claude Code during an internal AI-Hackathon at Axon. Watching it analyze a real codebase, propose architectural improvements (like switching from sequential to parallel processing), execute the plan, and then verify the outcome was genuinely mind-blowing.

The takeaway wasn’t “AI is smarter than humans.”

It was this: **I had been treating AI like a tool, when it should have been treated like leverage.**

## The AI-First PM Mindset

I stopped thinking of AI as an interactive chatbot, and started treating it as **a zero-fatigue fleet of AI companions** that work on my behalf — even when I sleep.

Not to replace my judgment, but to **protect it**.

I don’t want AI talking to my customers for me.  
I want AI doing everything else **so I can.**

That shift changed how I approach my work as a PM. It moved from "How do I do this?" to "How can an AI-first approach handle this?"

Whenever I encounter repetitive or procedural work — bug triage, Mixpanel data analysis, old VOC lookups, responding to comments in a spec doc — I no longer jump in immediately. Instead, I first ask:

- Can AI do this reliably?
- Can I automate it?
- Should this become a long-running agent instead of a recurring drain on attention?

If the answer is yes, I build for the future, not just the moment. This is what it means to be an **AI-First PM**.

## My AI-first PM workflow

### 1. Bug triage as an autonomous agent

Bug triage is necessary — and brutally expensive in cognitive load.

I built a bug-triage agent using [Glean](https://www.glean.com/) that:

- Queries customer-reported tickets in JIRA
- Performs enterprise search across Quip, SharePoint, Jira, and Slack
- Retrieves relevant known issues, similar past bugs, and troubleshooting steps
- Proposes the next best action: request reproducible steps, ask for artifacts (HAR, audit trails), provide a useful advice to support engineers, or route to the correct team

Instead of reacting to every ticket, I now review **decisions**. The agent does the digging. I apply my judgment.

That’s AI-first PM.

### 2. Product discovery with AI as a research accelerator

There is still no substitute for direct customer interaction. I believe that deeply.

What AI *has* changed is how well-prepared I am *before* those conversations.

I use GPT-5.2 Pro in deep research mode to:
- simulate interviews with domain experts (e.g. investigators at large police departments)
- crawl Reddit for real-world incidents and public reactions
- retrieve historical VOC from internal knowledge bases
- sanity-check specs and architectures using Glean

The result isn’t AI-designed products.  
It’s sharper hypotheses, better questions, and higher-quality conversations with real customers.

### 3. Prototyping that engineers actually take seriously

AI has radically compressed my path from idea to something runnable.

My flow looks like this:

- rapid throwaway prototypes using [Figma Make](https://www.figma.com/ai/)
- export HTML/CSS/JS from Figma Make to a local git repository
- refine the prototype via [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/setup) in [Cursor](https://www.cursor.com/), Visual Studio Code with [Copilot](https://github.com/features/copilot), and [Antigravity](https://antigravity.google/) with [Gemini 3 Pro](https://deepmind.google/technologies/gemini/)
- integrate the prototype directly into axon-ui, using Axon's official UI components and design tokens
- run a local dev server hosting the above code against a real [Evidence.com](https://www.evidence.com/) instance with real video evidence

![Prototype Demo](/assets/multicam-prototype.gif)

Engineers don’t get a figma fantasy.
They get working code in a GitHub branch they can explore.

That changes the conversation.

### 4. Delivery: using AI to navigate legacy complexity

Legacy codebases are where productivity goes to die.

I regularly use Claude to:

- explain legacy code left undocumented by the previous owners
- trace legacy UI flows to understand how the app works
- fix low-hanging UI bugs safely

This doesn’t replace engineers.
It lets me meet them closer to their level, faster.

## When AI failed me (and why that mattered)

AI is not magic. I learned this the hard way.

I once asked Claude to re-implement an entire vibe-coded prototype as a new page inside axon-ui.

It failed spectacularly.

The app crashed on load. After 2 days of debugging with no success, I reverted everything and started over — this time adding axon-ui components incrementally, fixing console errors one by one, and validating each step in my local dev environment before pushing my code to GitHub Enterprise.

The lesson was clear:

> AI doesn’t have enough context to safely modify systems with millions of code lines and thousands of dependencies.

Vibe coding only works when *you* understand the architecture well enough to guide it.

Speed without understanding turns into fragility.

## What most PMs get wrong about AI

A few hard-earned beliefs I now hold:

- Most smart PMs underestimate AI because they think it’s “just a chatbot.”
- The biggest risk isn’t layoffs. It’s whether your role can be meaningfully **AI-accelerated**.
- If doing your job well slows everyone else down, your job is at risk — even if your output looks “high quality.”
- Vibe coding only works when you can describe systems succinctly. If you can’t explain it, AI can’t build it.
- AI doesn’t reward gatekeepers. It rewards people who increase the slope of progress.

## A recent moment that crystallized this for me

At Axon Tech Summit in Jan 2026, I had the chance to MC a panel with leaders across product, engineering, and AI research.

The theme was simple and uncomfortable:

- AI in everything we build
- Build everything with AI
- The risk of adopting AI vs. the risk of not adopting it

What struck me wasn’t the tech — it was the energy. Senior engineers and architects from companies like Nvidia Vietnam, NAB, Ninja Van, and others were visibly excited. Several candidates applied on the spot.

They weren’t excited about tools.
They were excited about velocity with purpose.

## Where this leaves me

I’m still learning. Constantly.

But I’m now convinced of one thing:
AI doesn’t replace PM judgment — it amplifies it.

If you treat AI as a chatbot, you’ll get faster answers.
If you treat it as a fleet of long-running agents, you get leverage.

And in complex systems, leverage is everything.