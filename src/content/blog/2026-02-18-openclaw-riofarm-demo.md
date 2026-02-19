---
template: blog-post
title: "OpenClaw rebuilding my family's farm website - Here's what surprised me"
slug: /blog/openclaw-riofarm-demo
date: 2026-02-18 23:00
description: "How OpenClaw's AI agent rebuilt riofarm.vn from scratch, proposed features I hadn't thought of, and managed it all via Telegram while I put my baby to sleep."
heroImage: ../../assets/openclaw-riofarm-hero.jpg
tags: ["OpenClaw", "AI", "Product Management", "Side Projects"]
---

I did most of this project one-handed.

My son Mino is five months old. He needs soothing to sleep — rocking, patting, slow pacing through a dim room. My other hand had my phone open to Telegram. That's where I was running the whole rebuild of [riofarm.vn](https://riofarm.vn), my sister-in-law's macadamia farm website.

The stack migration (Gatsby → Astro), the content strategy, the blog posts, the product pages, the bug fixes — all managed via chat. No laptop. No IDE. No "let me sit down and focus." Just short bursts of direction while doing something else entirely.

That's the part I couldn't have predicted going in. But it's not even the main surprise.

---

## The Ask I Thought Would Break It

My sister-in-law's site had been running on a Gatsby template for years. Slow, bloated, hard to maintain. I wanted to move it to Astro 5 — faster builds, better static output, cleaner codebase.

But I didn't want a rough port. I wanted zero feature parity losses: every product, every blog post, cart + checkout flow, mobile behavior, everything.

And I added one constraint I expected to cause problems:

> **Full test coverage. Playwright E2E tests and unit tests for all critical code paths, written alongside the implementation — and nothing ships without them passing.**

I wasn't asking for textbook TDD where tests precede every line of code. I was setting a bar: if you can't test it, you don't ship it. I expected the agent to either skip this entirely, or produce shallow tests that passed trivially.

I was wrong on both counts.

---

## What Actually Happened

It didn't fumble. It forked.

The agent spawned multiple sub-agents and ran them in parallel:

- **Sub-agent A**: analyzed the Gatsby codebase, extracted every route, every component interface, every cart behavior — then wrote the Playwright E2E specs (`homepage.spec.ts`, `products.spec.ts`, `cart-checkout.spec.ts`, `pages.spec.ts`, `blog.spec.ts`, `mobile.spec.ts`)
- **Sub-agent B**: scaffolded the Astro project structure and components
- **Sub-agent C**: inventoried all content — products, blog posts, images, metadata — and documented parity gaps

The tests were real: cart add/remove flows, checkout visibility on mobile, breadcrumb rendering, 404 handling. 62 E2E tests, 29 unit tests. All passing before domain cutover.

More importantly: the tests caught actual bugs. Cart scripts weren't executing properly on product pages — the tests found it. Checkout was clipping off-screen on some mobile viewports — the tests found it. Both required follow-up fix commits before the migration was called done.

That's tests doing their job, not just being decorative.

I reviewed the results like a PM reviewing pull requests. I sent corrections. Agents updated and re-ran. Back to sleep-patting.

The final result: 95% satisfactory on first review. The mental model shift: **I stopped writing code. I started writing briefs.**

---

## The Features I Didn't Ask For

This is the part I want to highlight, because it's what I mean by "exceeded expectations."

The original Gatsby site was a template — products, blog, contact form, a YouTube video. Standard e-commerce structure. What the agent did during the migration wasn't just port the existing features. It asked questions, understood context, and proposed additions I hadn't thought of.

**Zalo floating button.** I'd mentioned that riofarm.vn is built specifically for Vietnamese consumers, that the farm sells through Facebook and Zalo, that the customer relationship is personal and direct. The agent connected those dots and suggested a floating Zalo chat button — the Vietnamese equivalent of "chat with us on WhatsApp." It didn't exist anywhere in the Gatsby codebase. The agent proposed it, built it, styled it with the brand colors, and made it hide correctly when the cart drawer is open. One contextual insight → one shipped feature.

**Customer testimonials section.** Same pattern. The agent suggested that for a local Vietnamese farm selling by word-of-mouth, social proof in the voice of actual customers would matter. I had screenshots of customer chats — real messages from buyers, the kind of casual Vietnamese you can't fabricate ("Mít ngon lắm em. Bọn nhà chị ăn hết 2 cân rồi kk 😂"). I sent the screenshots. The agent read them, extracted the quotes, styled a testimonials grid with the farm's warm yellow palette, and published it to the homepage.

No brief for that one. Just: *here are screenshots, you figure out what to do with them.* It did.

That's the gap between "tool that executes" and "collaborator that thinks." The Zalo button and testimonials were both the agent's ideas. I just said yes.

---

## The Parallel Agents Are the Point

When tasks were large — write 6 blog posts, enrich 9 product pages, build the Korean market post — I didn't wait. The agent spawned sub-agents. I'd get pings as tasks resolved.

In one session I had three things running simultaneously:
- Three educational blog posts being drafted from documentary source material
- Product pages getting nutrition tables and key benefit sections
- A Korean market post being assembled with a photo sourced directly from a Báo Lâm Đồng news article

All building, testing, pushing independently. I reviewed outputs like a PM with a PR queue — not like a developer waiting on a compile.

That's the real unlock: **persistent, parallelizable work that I review, don't execute.**

---

## The Documentary Transcript

One more moment worth noting for how it illustrates the agent's approach to sourcing.

The farm's homepage had an embedded YouTube documentary — a local news segment about Rio Macca. I asked the agent to extract facts from it for blog post content.

Instead of opening a browser, it ran a Python script:

```python
from youtube_transcript_api import YouTubeTranscriptApi
transcript = api.fetch('BUKddHPS3pk', languages=['vi'])
```

YouTube auto-generates Vietnamese captions. Full transcript in under 3 seconds. Direct quotes, production details, the founder's story — all cited.

Later, cross-referencing a Báo Lâm Đồng article, it found facts the documentary was missing: **20 tons/year** (the documentary said 10 — the farm had grown since filming) and **OCOP 3-star certification**, a Vietnamese government quality mark I hadn't known to add to the site.

Those corrections propagated across three blog posts and the homepage trust badge. One cross-reference. Zero manual diffs.

The constraint I gave: *don't fabricate anything. If you don't have the data, flag it.* When I asked about harvest season (not mentioned in either source), it flagged the gap instead of guessing.

That's the part that mattered: it knew what it didn't know.

---

## Vibe Coding Is a Real Thing

I've been a PM long enough to be skeptical of "AI will replace engineers." What I didn't anticipate was something more specific: AI makes asynchronous, mobile-native development genuinely practical for people who can already reason about systems.

Not "write bad code on your phone." More like: if you can write a clear brief, specify what done looks like, and review output with judgment — you can ship real features from Telegram while your baby sleeps on your shoulder.

The riofarm.vn rebuild took about two weeks of sessions. Live site, real products, real users. Not a toy project. Most of it happened in 10-minute bursts, one-handed, in a dark room.

---

## What It's Not

It still makes mistakes.

Early sub-agents reused the same image across multiple blog posts. One didn't verify mobile viewport on the cart. The Zalo icon initially rendered as a plain "Z" on some devices before being corrected to a proper SVG badge.

The pattern I found: the agent follows the brief it's given. Vague brief, vague output. Specific constraints, specific results. That's how I'd describe working with any good junior engineer — the discipline is in the framing.

The difference is that when the agent misses something, I say so in chat and it fixes it immediately. No ticket, no sprint, no context-setting from scratch. It already has the full codebase in context.

---

## If You're a PM Reading This

The riofarm project is useful as a test case because it wasn't a greenfield demo. Live site. Real constraints. Accurate content that couldn't be fabricated. A domain cutover that needed confirmed visual parity.

The AI had to read existing code before changing it, cite sources for factual claims, propagate changes consistently across files, stay within explicit constraints, and recover from its own errors.

That's closer to how real product work goes than most AI demos.

If you haven't thought about what it means to have a persistent, context-aware agent working in the background — not just answering questions but *proposing, building, and shipping* — I'd suggest starting somewhere low-stakes but real. A side project. Something you care about but doesn't have a production SLA.

See how far you get before you have to take back the wheel.

For me, the answer was: further than I expected, faster than I expected, with ideas I didn't ask for — and almost entirely from my phone.

---

*[OpenClaw](https://openclaw.ai) is an open-source self-hosted AI gateway. [riofarm.vn](https://riofarm.vn) is live.*
