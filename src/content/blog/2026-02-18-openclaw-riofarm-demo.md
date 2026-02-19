---
template: blog-post
title: "OpenClaw rebuilding my family's farm website - Here's what surprised me"
slug: /blog/openclaw-riofarm-demo
date: 2026-02-18 23:00
description: "How OpenClaw's AI agent diagnosed a build failure, recommended scrapping Gatsby, rebuilt riofarm.vn with TDD and parallel sub-agents — all managed from Telegram on my phone while putting my baby to sleep."
heroImage: ../../assets/openclaw-riofarm-hero.jpg
tags: ["OpenClaw", "AI", "Product Management", "Side Projects"]
---

I did most of this project one-handed.

My son Mino is five months old. He needs soothing to sleep — rocking, patting, slow pacing through a dim room. My other hand had my phone open to Telegram. That's where I was running the whole rebuild of [riofarm.vn](https://riofarm.vn), my sister-in-law's macadamia farm website.

The stack migration (Gatsby → Astro), the content strategy, the blog posts, the product pages, the bug fixes — all managed via chat. No laptop. No IDE. No "let me sit down and focus." Just short bursts of direction while doing something else entirely.

That's the part I couldn't have predicted going in. But it's not even the main surprise.

---

## It Started With a Build Failure

I didn't plan to rebuild the site. I asked the agent to fix a Netlify build error.

The Gatsby site had broken — a native binary dependency (`sharp`) was failing on Netlify's build environment. I asked for a fix. What I got back was a diagnosis and two options:

- **Option A**: Pin Node 20 LTS and force the sharp resolution — the quick fix
- **Option B**: Migrate to Astro — *"a farm landing page doesn't need a full React SPA framework. Gatsby is massively over-engineered for this."*

The agent's recommendation was explicit: *Option B is honestly the right call.* Not "here are your choices" — an actual recommendation with reasoning. I agreed. That one exchange changed the scope of the whole project.

---

## The Ask I Thought Would Break It

Once I chose Option B, I added constraints I expected would cause problems:

<figure class="chat-screenshot">
  <img src="/blog/chat-tdd-brief.jpg" alt="Telegram screenshot: Thuc's TDD brief — write tests before code, 100% coverage, no downtime, glassmorphism styling" />
  <figcaption>The actual brief, sent from Telegram at 20:52. "Write the tests before you code. Tests must cover 100% of code paths."</figcaption>
</figure>

Zero downtime. Tests before code, 100% coverage. Keep the old Gatsby code intact as a backup. Perfect SEO with sitemap. Style parity with the existing yellow/glassmorphism theme.

This is a demanding brief even for a senior engineer. For an AI agent running in the background while I'm patting a baby, I expected it to cut corners somewhere.

The agent's immediate response: *"This is a substantial project — TDD migration with full test coverage, SEO, zero downtime, and style parity. Let me read the coding agent skill first before diving in."* Then: *"This is a big, precise job — perfect for a coding agent. I'll spawn Claude Code in the background with a comprehensive brief, then check back on progress."*

It didn't start building. It paused, read its own documentation on how to delegate, then spawned a sub-agent. That discipline — knowing when to hand off rather than just charge ahead — was the first sign this would go differently than expected.

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

I reviewed the results like an orchestrator. I sent corrections. Agents updated and re-ran.

Final result: 95% satisfactory on first review. **I stopped writing code. I started writing briefs.**

---

## The Features I Didn't Ask For

This is the part I want to highlight, because it's what I mean by "exceeded expectations."

After the core migration, I asked a simple question: *"Help me enrich the content of the astro site. What more info should be displayed there? Be mindful that it's a Vietnamese site tailor fit to Vietnamese consumers."*

I expected suggestions. I got an unsolicited gap analysis:

<div class="chat-screenshot-pair">
  <figure>
    <img src="/blog/chat-gap-analysis-1.jpg" alt="Telegram screenshot: Thuc asks about enriching the site for Vietnamese consumers" />
    <figcaption>The trigger: "Be mindful that it's a Vietnamese site tailor fit to Vietnamese consumers."</figcaption>
  </figure>
  <figure>
    <img src="/blog/chat-gap-analysis-2.jpg" alt="Telegram screenshot: Clawy's gap analysis — Zalo CTA, testimonials, combo sets as high-priority items" />
    <figcaption>The response: an unprompted priority-ranked gap analysis before touching a single file.</figcaption>
  </figure>
</div>

The agent couldn't even load the Facebook page I'd shared (login wall). It worked from the site alone, the brief, and the context of what "Vietnamese e-commerce" means. Then it ranked what was missing by business impact:

**High priority:**
1. Missing product pages (dried mango, dried jackfruit weren't on the site)
2. **Zalo CTA** — *"Vietnamese consumers use Zalo more than any other channel. The site only shows a phone number buried in the footer. A sticky Zalo button would meaningfully increase conversions."*
3. **Customer testimonials** — *"Social proof is critical for Vietnamese e-commerce. 'Khách hàng nói gì' section with 4–6 authentic quotes + location (Hà Nội, TPHCM...)."*
4. Combo/gift sets for Tết

None of this was in my brief.

**On the Zalo button:** The original Gatsby site had zero Zalo integration. The agent proposed it, built it with brand colors and a pulse animation, and made it correctly hide behind the cart drawer. One contextual insight → one shipped feature.

**On the testimonials:** The initial proposal was for placeholder quotes. I pushed back and sent real screenshots of actual customer chats instead. The agent read them, extracted the genuine quotes, styled a testimonials grid with the farm's warm yellow palette, and published it to the homepage. The quotes stayed authentic — casual Vietnamese, emojis and all (*"Mít ngon lắm em. Bọn nhà chị ăn hết 2 cân rồi kk 😂"*).

That two-step — proposal → push back → better execution — is how good collaboration actually works.

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

One more moment worth noting for how the agent handles sourcing.

The farm's homepage had an embedded YouTube documentary — a local news segment about Rio Macca. I asked the agent to extract facts for blog post content.

I thought it'd spin up a browser instance and watch the video from start to end. Instead, it radically simplified by running a Python script:

```python
from youtube_transcript_api import YouTubeTranscriptApi
transcript = api.fetch('BUKddHPS3pk', languages=['vi'])
```

YouTube auto-generates Vietnamese captions. Full transcript in under 3 seconds. Direct quotes, production details, the founder's story — all cited.

Later, cross-referencing a Báo Lâm Đồng article, it found facts the documentary was missing: **20 tons/year** (the documentary said 10 — the farm had grown since filming) and **OCOP 3-star certification**, a Vietnamese government quality mark that wasn't on the site anywhere.

Those corrections propagated across three blog posts and the homepage trust badge. One cross-reference. Zero manual diffs.

The constraint I gave: *don't fabricate anything. If you don't have the data, flag it.* When the agent hit gaps — harvest season months, macca oil specs — it stopped and asked me directly rather than guessing. When I said I didn't have the facts handy, I told it to skip those topics and just work from what the documentary had. It pivoted without pushback: *"Smart pivot — that's exactly the right use of this content. The documentary already did the hard work; we're just making it accessible for people who won't sit through 8 minutes of video."*

That's the right disposition: flag the gap, accept the redirect, execute cleanly.

---

## Vibe Coding Is a Real Thing

I've been a PM long enough to be skeptical of "AI will replace engineers." What I didn't anticipate was something more specific: AI makes asynchronous, mobile-native development genuinely practical for people who can already reason about systems.

Not "write bad code on your phone." More like: if you can write a clear brief, specify what done looks like, and review output with judgment — you can ship real features from Telegram while your baby sleeps on your shoulder.

The riofarm.vn rebuild took about two weeks of sessions. Live site, real products, real users. Not a toy project. Most of it happened in 10-minute bursts, one-handed, in a dark room.

---

## What It's Not

It still makes mistakes — and the tests don't catch everything.

Early sub-agents reused the same image across multiple blog posts. The Zalo button I'd asked for shipped with a plain letter "Z" as the icon. The floating button covered the cart checkout button when the drawer was open. The checkout button itself was off-screen on mobile. None of these were caught by the test suite — I found them by opening the site on my phone.

<figure class="chat-screenshot">
  <img src="/blog/chat-bug-report.jpg" alt="Telegram screenshot: Thuc reports 4 bugs including Zalo Z icon, all fixed in one commit d4a8cb1" />
  <figcaption>Four bugs caught by eye, not by tests. Fixed in a single commit 4 minutes after the report.</figcaption>
</figure>

The feedback loop looked like this: I open the site, spot something broken, describe it in chat, get a fix commit in minutes. That's genuinely fast — but the catching was mine, not the agent's.

The pattern: the agent follows the brief it's given. Vague brief, vague output. Specific constraints, specific results. Tests cover the logic you spec out in advance; they don't replace a human actually using the thing.

---

## If You're a PM Reading This

The riofarm project is useful as a test case because it wasn't a greenfield demo. Live site. Real constraints. Accurate content that couldn't be fabricated. A domain cutover that needed confirmed visual parity.

The AI had to read existing code before changing it, cite sources for factual claims, propagate changes consistently across files, stay within explicit constraints, and recover from its own errors.

That's closer to how real product work goes than most AI demos.

If you haven't thought about what it means to have a persistent, context-aware agent working in the background — not just answering questions but *diagnosing, proposing, building, and shipping* — I'd suggest starting somewhere low-stakes but real. A side project. Something you care about but doesn't have a production SLA.

See how far you get before you have to take back the wheel.

For me, the answer was: further than I expected, faster than I expected, with ideas I didn't ask for — and almost entirely from my phone.

---

*[OpenClaw](https://openclaw.ai) is an open-source self-hosted AI gateway. [riofarm.vn](https://riofarm.vn) is live.*
