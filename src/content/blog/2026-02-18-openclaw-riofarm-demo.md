---
template: blog-post
title: "OpenClaw rebuilding my family's farm website - Here's what surprised me"
slug: /blog/openclaw-riofarm-demo
date: 2026-02-18 23:00
description: "How OpenClaw's AI agent diagnosed a build failure, recommended scrapping Gatsby, and rebuilt riofarm.vn in four days — all managed from Telegram on my phone while putting my baby to sleep."
heroImage: ../../assets/openclaw-riofarm-hero.jpg
tags: ["OpenClaw", "AI", "Product Management", "Side Projects"]
---

I did most of this project one-handed.

My son Mino is five months old. He needs soothing to sleep — rocking, patting, slow pacing through a dim room. My other hand had my phone open to Telegram. That's where I was running the whole rebuild of [riofarm.vn](https://riofarm.vn), my sister-in-law's macadamia farm website, over four days.

The stack migration (Gatsby → Astro), the content strategy, the blog posts, the product pages, the bug fixes — all managed via chat. No laptop. No IDE. No "let me sit down and focus."

---

## It Started With a Build Failure

I didn't plan to rebuild the site. I asked the agent to fix a Netlify build error.

The Gatsby site had broken — a native binary dependency (`sharp`) was failing on Netlify's build environment. I asked for a fix. What I got back was a diagnosis and two options:

- **Option A**: Pin Node 20 LTS and force the sharp resolution — the quick fix
- **Option B**: Migrate to Astro — *"a farm landing page doesn't need a full React SPA framework. Gatsby is massively over-engineered for this."*

The recommendation was explicit: *Option B is honestly the right call.* Not "here are your choices" — an actual opinion with reasoning. I agreed. That one exchange changed the scope of the whole project.

---

## The Ask

Once I chose Option B, I added constraints:

<figure class="chat-screenshot">
  <img src="/blog/chat-tdd-brief.jpg" alt="Telegram screenshot of Thuc's brief: write tests before code, 100% coverage, no downtime, glassmorphism styling" />
  <figcaption>The actual brief. "Write the tests before you code. Tests must cover 100% of code paths."</figcaption>
</figure>

Zero downtime. Tests before code, 100% coverage. Keep the old Gatsby code intact as a backup. SEO with sitemap. Style parity with the yellow/glassmorphism theme.

The agent's response: *"This is a substantial project — TDD migration with full test coverage, SEO, zero downtime, and style parity. Let me read the coding agent skill first before diving in."* Then: *"This is a big, precise job — perfect for a coding agent. I'll spawn Claude Code in the background with a comprehensive brief, then check back on progress."*

It paused, read its own documentation on how to delegate, then handed the task to a coding sub-agent with a written brief. Twenty-one minutes later, it pinged back with the result.

---

## The First Attempt Failed

Here's the part I didn't see coming — and not in a good way.

The sub-agent completed the migration and committed everything locally. But it hadn't pushed to GitHub, hadn't confirmed the Netlify deploy, and I had no way to actually see the result. At midnight, I asked for a status check.

The reply was confused — referencing tasks that may or may not have completed, asking me to run commands, not giving me a straight answer. I pushed back:

> *"You did exhaust all of my Claude Code tokens on the TDD project to migrate 100% functionalities of the gatsby site to astro. And you're telling me you wasted all of those tokens on nothing? No astro site for riofarm at all? Wth, not cool man."*

The honest answer came back: the Astro project *did* exist locally, the tests *did* pass (62 E2E, 29 unit), but it hadn't been properly surfaced. The work was real; the handoff was broken.

That failure is worth including because it's representative. The agent can do substantial technical work in the background, but "done" to a coding agent means "committed locally." Getting it deployed, reviewed, and actually usable required a second loop. The workflow demands a human closing that gap.

After sorting out the GitHub push and Netlify deploy, the site was up — but underwhelming. The cart feature wasn't there. Product pages redirected to the contact form instead of adding to cart. The domain stayed on the old Gatsby site until visual and functional parity was confirmed, which took another full day of parity sprints.

---

## How Sub-Agents Actually Work

The blog post version I initially drafted described "three sub-agents running in parallel" — that's not what happened, and the real pattern is worth understanding correctly.

Sub-agents run sequentially. You give a task, a sub-agent runs it in the background (minutes to an hour depending on scope), you get pinged when it's done, you review, you give the next task. It's not parallelism — it's async delegation with a review loop.

Over four days the project used roughly a dozen sub-agents:
- Initial Gatsby → Astro migration
- Multiple parity sprint passes (cart, UI polish, checkout flow)
- Content enrichment (6 new products, testimonials, Zalo button)
- Blog posts batch 1 (3 educational posts)
- Blog posts batch 2 (3 documentary-based posts)
- Tết booth post + Korean market post
- Product nutrition tables

Each one had a scoped brief, ran independently, and delivered a git commit. The mental model isn't "parallel workforce" — it's "a contractor who takes your brief, disappears for 20 minutes, and comes back with a PR."

That's still genuinely useful when you're managing it one-handed in a dark room. But it's different from what the AI hype cycle usually describes.

---

## The Features That Weren't in the Brief

After the core migration, I asked: *"Help me enrich the content of the astro site. What more info should be displayed there? Be mindful that it's a Vietnamese site tailor fit to Vietnamese consumers."*

<div class="chat-screenshot-pair">
  <figure>
    <img src="/blog/chat-gap-analysis-1.jpg" alt="Telegram screenshot: Thuc asks about enriching the site for Vietnamese consumers" />
    <figcaption>The prompt. No specific asks — just context about the audience.</figcaption>
  </figure>
  <figure>
    <img src="/blog/chat-gap-analysis-2.jpg" alt="Telegram screenshot: gap analysis listing Zalo CTA, testimonials, combo sets as high-priority" />
    <figcaption>The response: a prioritized gap analysis before touching a single file.</figcaption>
  </figure>
</div>

The agent couldn't load the Facebook page I'd linked (login wall). It worked from the site alone and the market context. The response was a priority-ranked list:

**High priority — things that directly drive sales:**
1. Missing product pages (dried mango, dried jackfruit weren't on the site)
2. **Zalo CTA** — *"Vietnamese consumers use Zalo more than any other channel. The site only shows a phone number buried in the footer. A sticky Zalo button would meaningfully increase conversions."*
3. **Customer testimonials** — *"Social proof is critical for Vietnamese e-commerce. 'Khách hàng nói gì' section with 4–6 authentic quotes."*

The original Gatsby site had no Zalo widget anywhere — Zalo appeared only as text in a blog post. The agent connected "Vietnamese consumers" → "Zalo is their primary messaging app" → "there should be a direct contact button" without being prompted.

On testimonials: the initial proposal was for placeholder quotes. I had screenshots of real customer chat messages and sent them instead. The agent extracted the quotes, styled a grid with the brand colors, published it to the homepage. The quotes stayed as-is — casual Vietnamese, emojis intact.

This is the pattern that's harder to articulate: the agent read the context, identified what was missing, and proposed it before being asked. That's different from "executes what you tell it."

---

## Sourcing Facts Without Fabricating

One more moment worth describing for how it handled a constraint that matters for real content.

The farm's homepage had an embedded YouTube documentary — a local news segment. I asked for blog posts using facts from it. The instruction: *don't fabricate anything — if you don't have the data, flag it.*

Instead of watching the video, it ran a script:

```python
from youtube_transcript_api import YouTubeTranscriptApi
transcript = api.fetch('BUKddHPS3pk', languages=['vi'])
```

YouTube auto-generates Vietnamese captions. Full transcript in seconds. When I asked about harvest season months — not covered in the video — it asked me directly rather than guessing. I didn't have the answer either, so I told it to skip that topic and work from what the documentary had. It did.

Later it cross-referenced a Báo Lâm Đồng newspaper article and found two facts the documentary missed: **20 tons/year** (the documentary said 10 — the farm had grown since filming) and **OCOP 3-star certification**, a Vietnamese government quality mark that wasn't anywhere on the site. Those corrections propagated across three blog posts and the homepage automatically.

For a small business where credibility is fragile, "I don't have that data, what do you want to do?" is more useful than a confident wrong answer.

---

## What the Tests Don't Catch

The test suite passed before domain cutover — 62 E2E tests, 29 unit tests, all green. The tests covered cart flows, routing, form validation, mobile nav.

What they didn't catch: the Zalo icon rendering as a plain letter "Z." The floating Zalo button covering the cart checkout button when the drawer was open. The checkout button scrolling off-screen on mobile. A CTA link pointing to a 404.

All four of those were found by opening the site on a phone. The fix took four minutes once reported. But the catching required a human actually using the product — not a test suite.

Tests cover the logic you spec in advance. They don't replace someone actually tapping through the UI on the device your users have.

---

## What This Changes for PMs

The honest capability isn't "AI builds your product while you sleep." It's more specific: if you can write a clear brief, you can delegate substantial technical work to a background process and come back to a reviewable output — from your phone, while doing something else.

The discipline shifts from writing code to writing briefs. The constraints that matter: be specific about what done looks like, define what you won't accept (no fabricated facts, no pushing until tests pass, no domain cutover until visual parity), and close the loop yourself on things that require actual human judgment — which includes looking at your site on a phone.

The riofarm.vn rebuild ran from Feb 16 to Feb 19. Live site, real products, real users. Not a toy project.

If you're a PM and you haven't thought seriously about what this kind of workflow enables — not AI answering questions, but AI doing scoped work in the background while you review the output — the gap between you and someone who has is widening faster than most people realize.

---

*[OpenClaw](https://openclaw.ai) is an open-source self-hosted AI gateway. [riofarm.vn](https://riofarm.vn) is live.*
