---
template: blog-post
title: "OpenClaw rebuilding my family's farm website - Here's what surprised me"
slug: /blog/openclaw-riofarm-demo
date: 2026-02-18 23:00
description: "How OpenClaw's AI agent rebuilt riofarm.vn from scratch using TDD and parallel sub-agents — all managed from Telegram on my phone while putting my baby to sleep."
heroImage: ../../assets/openclaw-riofarm-hero.jpg
tags: ["OpenClaw", "AI", "Product Management", "Side Projects"]
---

I did most of this project one-handed.

My son Mino is five months old. He needs soothing to sleep — rocking, patting, slow pacing through a dim room. My other hand had my phone open to Telegram. That's where I was running the whole rebuild of [riofarm.vn](https://riofarm.vn), my sister-in-law's macadamia farm website.

The stack migration (Gatsby → Astro), the content strategy, the blog posts, the product pages, the bug fixes — all managed via chat. No laptop. No IDE. No "let me sit down and focus." Just short bursts of direction while doing something else entirely.

That's the part I couldn't have predicted going in.

---

## The Ask I Thought Would Break It

My sister-in-law's site had been running on a Gatsby template for years. Slow, bloated, hard to maintain. I wanted to move it to Astro 5 — faster builds, better static output, cleaner codebase.

But I didn't want a rough port. I wanted zero feature parity losses: every product, every blog post, cart + checkout flow, mobile behavior, the Zalo floating button, everything.

So I gave the agent a constraint I expected would cause problems:

> **Write the tests first. Unit tests and Playwright E2E tests covering 100% of the critical code paths. Don't write a single line of Astro code until the test suite exists.**

Test-Driven Development on an AI-directed rewrite felt like a stretch. TDD requires upfront discipline — you're writing tests for code that doesn't exist yet, based on specs you have to reason out in advance. I'd seen AI tools fumble at much simpler things.

I half expected it to skip the tests, or write them after the fact, or produce a test file so shallow it was effectively useless.

---

## What Actually Happened

It didn't fumble. It forked.

The agent spawned multiple sub-agents and ran them in parallel:

- **Sub-agent A**: analyzed the Gatsby codebase, extracted every route, every component interface, every cart behavior — and wrote the Playwright E2E specs (`homepage.spec.ts`, `products.spec.ts`, `cart-checkout.spec.ts`, `pages.spec.ts`)
- **Sub-agent B**: started scaffolding the Astro project structure while A was still running
- **Sub-agent C**: inventoried all the content — products, blog posts, images, metadata

I got a ping when the tests were done. I reviewed them like PR comments. They were real tests — cart add/remove flows, checkout visibility on mobile, breadcrumb rendering, Zalo button behavior, 404 handling. Not mocks.

Then the implementation agents started running against those specs. Build → test → fix → push. I'd get a summary. I'd reply with a correction or a new constraint. Back to sleep-patting.

The result: 95% satisfactory on first review. A few edge cases (duplicate images across blog posts, mobile checkout clipping) caught by the tests themselves, not by me.

The mental model shift was immediate: **I stopped writing code. I started writing briefs.**

---

## The Parallel Agents Are the Point

This is what I think people miss when they talk about "AI coding tools." The unlock isn't speed — it's parallelism.

When I gave a large task (write 6 blog posts, enrich 8 product pages, build the Korean market post), I didn't wait. The agent spawned sub-agents. I went and did something else. The pings came back as the tasks resolved.

In one session I had three things running simultaneously:
- Three educational blog posts being written from documentary source material
- Product pages getting nutrition tables and benefit sections
- A Korean market post being built with a photo sourced from a newspaper article

All building, testing, pushing independently. I reviewed the outputs like a PM reviewing pull requests — not like a developer waiting on a compile.

That's the real capability: **persistent, parallelizable work that I review, don't execute.**

---

## The Documentary Transcript

One moment worth noting, because it illustrates how the agent handles sourcing.

The farm's homepage had an embedded YouTube documentary — a local news segment about Rio Macca. I asked the agent to extract facts from it for blog post content.

I expected it to open a browser and scrape what it could.

Instead, it ran a Python script:

```python
from youtube_transcript_api import YouTubeTranscriptApi
api = YouTubeTranscriptApi()
transcript = api.fetch('BUKddHPS3pk', languages=['vi'])
```

YouTube auto-generates Vietnamese captions. Full transcript in under 3 seconds. Then it pulled direct quotes, production details, and the founder's background — all cited to the source.

Later, cross-referencing a Báo Lâm Đồng newspaper article, it found a newer figure the documentary didn't have: **20 tons/year** (the documentary said 10 — the farm had grown). And **OCOP 3-star certification**, a Vietnamese government quality mark I hadn't known to add.

Those facts propagated across three blog posts and the homepage badge. One conversation. Zero manual diffs.

The constraint I gave: *don't fabricate anything. If you don't have the data, flag it.*

When I asked about harvest season (not mentioned in either source), it flagged the gap instead of guessing. That's the part that actually mattered — knowing what it didn't know.

---

## Vibe Coding Is a Real Thing

I've been a PM long enough to know that "AI will replace engineers" is mostly hype. What I didn't expect was something more specific: AI makes asynchronous, mobile-native development genuinely practical for people who can already reason about systems.

I don't mean "write bad code on your phone." I mean: if you can write a clear brief, specify what done looks like, and review output with some judgment — you can ship real features from Telegram while your baby sleeps on your shoulder.

That's new. That's different from "here's a code autocomplete."

The riofarm.vn rebuild took about two weeks of sessions. Live site, real products, real users. It's not a toy project. And most of it happened in 10-minute bursts, one-handed, in a dark room.

---

## What It's Not

It still makes mistakes.

Early sub-agents reused the same image across multiple blog posts. One didn't check mobile viewport for the cart. The Zalo icon rendered as a plain "Z" on some devices. These weren't caught before pushing.

The pattern I found: the agent follows the brief it's given. A vague brief produces vague output. Specific constraints get specific results. That's exactly how I'd describe working with a junior engineer — the discipline is in the framing, not the execution.

---

## If You're a PM Reading This

The riofarm project is useful as a test case because it wasn't a greenfield demo. It was a live site with real constraints: accurate content, a working cart, a domain cutover that needed visual parity before going live.

The AI had to read existing code before changing it, cite sources, propagate changes consistently, work within explicit constraints, and recover from its own errors.

That's closer to how real product work goes.

If you haven't thought about what it means to have a persistent, context-aware agent doing actual work in the background — not just answering questions — I'd suggest starting somewhere low-stakes but real. A side project. Something you care about but doesn't have a production SLA.

See how far you get before you have to take back the wheel.

For me, the answer was: further than I expected, faster than I expected, and almost entirely from my phone.

---

*[OpenClaw](https://openclaw.ai) is an open-source self-hosted AI gateway. [riofarm.vn](https://riofarm.vn) is live — code on GitHub.*
