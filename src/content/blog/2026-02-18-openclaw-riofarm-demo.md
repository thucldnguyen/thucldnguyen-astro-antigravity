---
template: blog-post
title: "I Let an AI Agent Rebuild My Family's Farm Website — Here's What Surprised Me"
slug: /blog/openclaw-riofarm-demo
date: 2026-02-18 23:00
description: "How OpenClaw's AI agent helped me rebuild riofarm.vn from Gatsby to Astro, extract facts from a documentary, source images from the web, and deploy a full content strategy — all from Telegram on my phone."
heroImage: ../../assets/orchestrate-ai-2.png
tags: ["OpenClaw", "AI", "Product Management", "Side Projects"]
---

**The moment that stopped me was when it transcribed a documentary it had never seen.**

I asked my AI assistant (running on [OpenClaw](https://openclaw.ai)) to analyze a YouTube video on the homepage of my sister-in-law's macadamia farm website. It was a local news documentary about Rio Macca — a small farm business in Lâm Hà, Lâm Đồng. I expected it to open a browser, scrape a transcript, maybe get something partial.

Instead, it ran a Python script in seconds:

```python
from youtube_transcript_api import YouTubeTranscriptApi
api = YouTubeTranscriptApi()
transcript = api.fetch('BUKddHPS3pk', languages=['vi'])
```

YouTube auto-generates Vietnamese captions for the video. The library pulls them directly. No browser. No scraping. Full transcript in under 3 seconds.

What came out of that transcript was the real surprise.

---

## The Backstory

I'd been migrating [riofarm.vn](https://riofarm.vn) from a Gatsby template to Astro — cleaner stack, faster builds, better SEO. A side project to help out family. The site sells macadamia nuts, macca oil, and dried fruits, all produced at a small facility in the highlands of Lâm Đồng.

I was running the whole project through OpenClaw — a self-hosted AI gateway that gives you a persistent Claude agent accessible via Telegram. Think of it as Claude with memory, tool access, and the ability to work in the background while you're doing something else.

The migration was mostly code. But at some point the project became something larger: rebuilding the content strategy, writing blog posts, enriching product pages, fixing UI bugs — all driven by a conversation on my phone.

---

## What the Documentary Unlocked

The transcript gave us facts we didn't have.

Before the video, the website said Rio Macca produced "over 10 tons/year." The documentary said the same. But I'd shared a link to a Báo Lâm Đồng newspaper article later in the session — and the agent, fetching the page, found a newer figure: **over 20 tons/year**, and something I didn't know existed: **OCOP 3-star certification**.

OCOP (One Commune One Product) is a Vietnamese government quality certification. It's a meaningful trust signal for local consumers. We didn't have it anywhere on the site.

Within a few minutes:
- The `10 tấn` references across 3 blog posts were corrected to `20 tấn`
- OCOP 3 sao was added to the production process post, the founder story post, and the homepage attribute grid
- The "Đạt chuẩn VSATP" badge became "🏅 OCOP 3 Sao"

One conversation. Zero manual diffs.

---

## Three Blog Posts From a Documentary

The transcript also became the source material for three new blog posts — written entirely from verified facts, no fabrication.

I'd asked the agent to write posts about Rio Macca's founder (Nguyễn Thị Ánh, a 9x-generation entrepreneur from a farming family), the farm-to-hand production process, and why Lâm Hà macadamia is called "nữ hoàng quả khô" (queen of dried fruits).

The constraint I gave: *don't fabricate anything. If you don't have the data, ask me.*

The agent pulled all three posts directly from the documentary transcript — Ánh's direct quotes, the production steps, the partnership model with local farms, the certifications. It then cited the source. When I asked about harvest season (not mentioned in the video), it flagged it instead of guessing.

That's the part that mattered: it knew what it didn't know.

---

## The Image I Didn't Have to Find

For the Korean market blog post, I wanted the photo of Ánh from the Báo Lâm Đồng article — her standing at the Rio Macca trade booth at an event in Đà Lạt connecting Lâm Đồng producers with Korean supermarket chains.

I didn't have the file. I didn't have the URL.

The agent ran `curl` on the article HTML, grepped for image URLs, found the CDN path, downloaded the 1920×975 JPEG directly into the repo's `public/blogs/` folder, committed it, and used it as the hero image for the new post.

```bash
curl -s "https://baolamdong.vn/..." | grep -oE 'https?://[^"]+\.(jpg|jpeg)[^"]*'
# → https://daknong.1cdn.vn/2025/11/26/thuong-hieu-mac-ca-rio...jpg
```

I mentioned the article. It found the image. That was the whole interaction.

---

## Bugs Fixed From a Phone Screenshot

Midway through the project, I opened riofarm.vn on Chrome Android and sent a screenshot to Telegram. The breadcrumb on a blog post was broken — "Trang chủ" was wrapping onto its own line, and the post title was spilling off screen.

The agent:
1. Located the `.breadcrumbs` CSS class in `global.css`
2. Diagnosed the issue: `flex-wrap` not set, no truncation on the last segment
3. Fixed it with `flex-wrap: nowrap`, `text-overflow: ellipsis` on the last `span`, and `flex-shrink: 0` on the static crumbs
4. Applied the fix across all 10 blog posts simultaneously (the separator `<span>` needed a class to avoid being caught by the truncation rule)
5. Built, passed tests, pushed

The fix was global. I sent one screenshot. The whole thing took about 90 seconds.

---

## The Sub-Agent Pattern

The biggest productivity unlock wasn't any single feature — it was background agents.

When tasks were long (write 6 blog posts, enrich 8 product pages, build a Tết booth post), I'd say "go" and the agent would spawn a sub-agent. I'd get a ping when it was done. Meanwhile I was doing something else.

In one session I had:
- Sub-agent A: writing 3 educational blog posts (comparison article, recipes, storage tips)
- Sub-agent B: adding nutrition tables + key benefits to 8 product pages
- Sub-agent C: creating the Korean market post with the sourced image

All running in parallel. All building, testing, pushing independently. I reviewed the results like a PM reviewing pull requests.

The mental model shift: I stopped writing code and started writing briefs.

---

## What It's Not

It's not magic. The agent still makes mistakes.

Early in the project, sub-agents reused images across blog posts — the same `coso2.jpeg` appeared on three different pages. The Zalo button icon rendered as a plain "Z" letter on mobile. The cart checkout button was off-screen on small phones. These weren't caught before pushing.

The fix was adding explicit constraints in task briefs: *each post must have a unique image*, *test on mobile*, *confirm checkout is visible without scrolling*. The agent follows the brief it's given. A vague brief produces vague output.

The discipline is the same as managing any engineer: specificity matters.

---

## The Part That's Hard to Explain

Somewhere between "translate the documentary into blog posts" and "find the newspaper image and download it into the repo," the project stopped feeling like a tool-assisted task and started feeling like working with someone who was actually invested in the outcome.

That could be a projection. It probably is.

But when I asked it not to fabricate facts — and it replied by listing exactly which questions it needed answered before writing — that was genuinely useful. Not just as a guardrail, but as a collaborator who understood the stakes. A small family farm's credibility is fragile. Getting facts wrong would be worse than having fewer posts.

It understood that. Or at least, it behaved as if it did.

---

## If You're a PM Thinking About This

The riofarm project is a useful test case because it wasn't a greenfield toy. It was a live site, real users, real products, real content that needed to be accurate. The AI had to:

- Read existing code before changing it
- Cite sources for factual claims
- Propagate changes consistently across multiple files
- Work within a constraint (don't cut over the domain until visual parity is confirmed)
- Recover from its own mistakes without losing the thread

That's closer to how real product work goes than most AI demos.

If you're a PM and you haven't thought about what it would mean to have a persistent, context-aware agent working in the background — not just answering questions but *doing things* — I'd suggest starting with something low-stakes but real. A side project. Something you care about but doesn't have a production SLA.

See how far you get before you have to take back the wheel.

---

*OpenClaw is an open-source AI gateway. The riofarm.vn rebuild is ongoing — domain is live, all code is on GitHub.*
