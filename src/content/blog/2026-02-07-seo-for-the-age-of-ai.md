---
template: blog-post
title: "SEO for the Age of AI: Making Your Site Visible to ChatGPT"
slug: /blog/seo-for-the-age-of-ai
date: 2026-02-07 12:00
description: "How I optimized my personal site so ChatGPT and other AI search engines can find, understand, and cite it — and why every PM with a personal brand should care."
heroImage: ../../assets/seo-optimization.png
tags: ["AI", "Agent UX", "SEO"]
---

I stumbled upon an [A16Z podcast](https://podcasts.apple.com/vn/podcast/anyone-can-code-now-netlify-ceo-talks-ai-agents/id842818711?i=1000747336451) where Matt Biilmann, the CEO of Netlify, shared about the concept of "Agent UX" and how Netlify is optimizing for both coding agents as well as user agents.

It dawned on me that I can do the same Agent UX optimization for my personal site. 

Google still matters. But increasingly, people are getting answers from ChatGPT, Perplexity, and Claude. These AI engines don't just crawl your site — they need to *understand* it. And the way they understand content is fundamentally different from how Google's PageRank works.

So I spent an afternoon fixing that. Here's what I did and why.

---
## The problem: invisible to AI search

Traditional SEO optimizes for Google's crawler — keywords, backlinks, meta descriptions, page speed. That still matters.

But AI search engines like ChatGPT work differently. They don't rank pages. They synthesize answers from sources they trust. To get cited, your content needs to be:

1. **Crawlable** — AI bots need explicit permission to access your site
2. **Understandable** — structured data helps AI parse who you are and what you do
3. **Digestible** — LLMs work best with clean, plain-text content they can ingest wholesale

Most personal sites fail on all three counts. Mine did too.

---
## What I changed (in one afternoon)

### 1. Welcomed AI crawlers explicitly

My `robots.txt` was a single line: `Allow: /`. Technically permissive, but AI crawlers like GPTBot, ClaudeBot, and PerplexityBot often default to *not crawling* unless they see an explicit welcome.

I added named rules for every major AI crawler — GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Anthropic-ai, PerplexityBot, Google-Extended, and Bytespider. A small file change. A massive visibility shift.

### 2. Created llms.txt files

This is the move most people don't know about yet. The `llms.txt` standard (think of it as `robots.txt` for LLMs) gives AI systems a structured, plain-text summary of your site — who you are, what you're expert in, and links to your best content.

I created two files:
- **`/llms.txt`** — a concise bio, expertise list, and links to my featured articles
- **`/llms-full.txt`** — full article content in clean plain text, optimized for LLM ingestion

When ChatGPT or Claude crawl my site, they now find a purpose-built document that says: *"Here's exactly who this person is, what they know, and what they've written."* No HTML parsing required.

### 3. Added structured data (JSON-LD) everywhere

Search engines — both traditional and AI — love structured data. I added JSON-LD schemas across my site:

- **Homepage**: `Person` schema (name, title, employer, expertise areas) and `WebSite` schema
- **Blog posts**: `BlogPosting` schema (headline, date, author, publisher)
- **About page**: `ProfilePage` schema with full career details

This is how you tell Google's Knowledge Graph and AI search engines: *"This isn't just a random blog. This is Thuc Nguyen, Senior PM at Axon, writing about AI-first product management."* Structured data turns your site from a collection of pages into an entity that AI systems can reason about.

### 4. Rewrote meta descriptions with intent

My old site description was literally "Thuc Personal Blog." It said nothing about what I do or why anyone should care.

Every meta description, page title, and hero section now contains the keywords I want to be known for: **AI-first product manager**, **enterprise AI workflows**, **public safety technology**. Not stuffed unnaturally — woven into real sentences that describe what I actually do.

### 5. Cleaned up performance bottlenecks

A legacy service worker cleanup script was running on every single page load — unregistering workers, clearing caches, and then *reloading the page*. Every visit. Forever.

I wrapped it in a `localStorage` guard so it runs once and never again. Small fix, but page reload loops are the kind of thing that makes both users and crawlers give up on your site.

---
## Why PMs should care about this

If you're a product manager building a personal brand, your site is your product. And like any product, you need to understand your distribution channels.

The distribution channel for professional visibility is shifting from "Google ranks your page" to "ChatGPT cites you as a source." This isn't hypothetical — it's happening now. When a hiring manager asks ChatGPT *"Who writes about AI product management?"*, you either show up or you don't.

The bar to get started is surprisingly low. You don't need to be a frontend engineer. I built my site with Astro (a static site generator), host it for free on Netlify, and made all the SEO changes described above in a single morning using Claude Code. The total cost was zero dollars and about two hours of focused work.

---
## The AI-first PM pattern

This is the same pattern from my [AI-first PM workflow](/blog/ai-first-pm): identify work that a human shouldn't be doing manually, then design a system where AI handles it.

Writing JSON-LD by hand? Tedious. Figuring out which AI crawlers exist and their exact `User-agent` strings? Annoying. Generating a plain-text version of your entire blog for LLM consumption? Nobody wants to maintain that.

But describing *what you want* to an AI coding tool and letting it execute? That's a morning project.

The meta lesson: **the same AI-first mindset that makes you a better PM also makes you more visible to the AI systems that are increasingly deciding who gets discovered.**

---

*If you want to do this for your own site, search for "llms.txt standard", "JSON-LD structured data", and "robots.txt AI crawlers." The ecosystem is moving fast — by the time you read this, there will be even more AI search engines to optimize for.*

*That's the fun part. Start now, and you're early.*
