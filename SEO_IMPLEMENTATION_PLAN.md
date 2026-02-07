# SEO, Performance & ChatGPT Crawlability Implementation Plan

## Goal
Optimize thucldnguyen.com so ChatGPT cites it when people search for "AI-first product manager". Improve SEO metadata, add structured data, and create LLM-specific crawlability files.

## Architecture Notes
- Astro 5 static site (SSG), hosted on Netlify
- Site URL: https://thucldnguyen.com
- All meta tags live in `src/components/BaseHead.astro`
- Blog posts use `src/layouts/BlogPost.astro` layout
- Constants in `src/consts.ts` propagate to default meta descriptions everywhere
- Content collection in `src/content/blog/` with .md/.mdx files

---

## TASK 1: Site metadata + JsonLd component + BaseHead updates

### 1A. Update `src/consts.ts`

Change line 5 from:
```ts
export const SITE_DESCRIPTION = 'Thuc Personal Blog';
```
To:
```ts
export const SITE_DESCRIPTION = 'Thuc Nguyen — AI-first Senior Product Manager at Axon. Writing about AI-powered product management, enterprise workflows, and public safety technology.';
```

### 1B. Create new file `src/components/JsonLd.astro`

```astro
---
interface Props {
  data: Record<string, unknown>;
}
const { data } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify(data)} />
```

### 1C. Update `src/components/BaseHead.astro`

**Add `ogType` prop** to the interface (around line 12):
```astro
interface Props {
  title: string;
  description: string;
  image?: ImageMetadata | string;
  preloadImage?: boolean;
  ogType?: string;
}
```

Also destructure it (around line 21):
```astro
const {
  title,
  description,
  image = newThumbnail,
  preloadImage = true,
  ogType = "website",
} = Astro.props;
```

**Add llms.txt link** after the sitemap link (after line 33):
```html
<link rel="alternate" type="text/plain" title="LLM-friendly content" href="/llms.txt" />
```

**Change og:type** on line 145 from:
```html
<meta property="og:type" content="website" />
```
To:
```html
<meta property="og:type" content={ogType} />
```

**Replace service worker cleanup script** (lines 83-142). Replace the entire `<script is:inline>` block that starts with `// Aggressively unregister all Service Workers` with:
```html
<script is:inline>
  if (!localStorage.getItem('sw-cleaned')) {
    var cleanup = function() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(regs) {
          for (var i = 0; i < regs.length; i++) regs[i].unregister();
        });
      }
      if ('caches' in window) {
        caches.keys().then(function(names) {
          for (var i = 0; i < names.length; i++) caches.delete(names[i]);
        });
      }
      localStorage.setItem('sw-cleaned', '1');
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(cleanup);
    } else {
      setTimeout(cleanup, 2000);
    }
  }
</script>
```

Key changes: added localStorage guard so it only runs once ever per browser, removed window.location.reload() call.

---

## TASK 2: Homepage hero rewrite + JSON-LD schemas

### File: `src/pages/index.astro`

**Add import at top** (in the frontmatter):
```astro
import JsonLd from "../components/JsonLd.astro";
```

**Add JSON-LD schemas in the `<head>`** section (after the `<BaseHead>` and preload tags, before `</head>`):

```astro
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Thuc Nguyen",
  "url": "https://thucldnguyen.com",
  "description": "AI-first Senior Product Manager at Axon. Writing about AI-powered product management, enterprise workflows, and public safety technology.",
  "author": {
    "@type": "Person",
    "name": "Thuc Nguyen"
  }
}} />
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Thuc Nguyen",
  "url": "https://thucldnguyen.com",
  "image": new URL(ava3.src, "https://thucldnguyen.com").href,
  "jobTitle": "Senior Product Manager",
  "worksFor": {
    "@type": "Organization",
    "name": "Axon",
    "url": "https://www.axon.com"
  },
  "description": "AI-first product manager specializing in enterprise AI workflows, public safety technology, and AI-powered product management. Senior PM at Axon building products for 550,000+ monthly active users.",
  "knowsAbout": [
    "AI-first product management",
    "Enterprise AI workflows",
    "Product management",
    "Public safety technology",
    "AI agents",
    "Product discovery",
    "Video streaming technology",
    "Evidence management"
  ],
  "sameAs": [
    "https://linkedin.com/in/thucldnguyen",
    "https://github.com/thucldnguyen"
  ]
}} />
```

**Rewrite the hero section** (lines 46-66 approximately). Replace the existing `<h1>`, subtitle `<p>`, and bio `<p>` with:

```html
<h1 class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-2">
  Thuc Nguyen
</h1>
<p class="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-2">
  AI-First Product Manager &middot; Senior PM at Axon
</p>
<p class="text-sm text-slate-500 dark:text-slate-500 italic mb-6">
  a.k.a. The Minimum Viable Dad
</p>
<p class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
  Hey hey, welcome to my personal blog! I'm <strong>Thuc Nguyen</strong>,
  a Senior Product Manager at <a href="https://www.axon.com" class="text-violet-600 dark:text-violet-400 hover:underline">Axon</a>
  and an <strong>AI-first product manager</strong> who builds AI agent
  workflows for enterprise product management. I write about AI-powered
  PM workflows, public safety tech, and being a proud dad of two.
</p>
```

Keep the "Know more" button and social icons exactly as they are.

---

## TASK 3: BlogPost layout - article schema + og:type

### File: `src/layouts/BlogPost.astro`

**Add import** in frontmatter:
```astro
import JsonLd from "../components/JsonLd.astro";
```

**Pass ogType to BaseHead** (around line 38). Change:
```astro
<BaseHead
  title={title}
  description={description}
  image={resolvedImage}
/>
```
To:
```astro
<BaseHead
  title={title}
  description={description}
  image={resolvedImage}
  ogType="article"
/>
```

**Add article OG meta tags and BlogPosting JSON-LD** in the `<head>` after the closing of the preload link block (after line 55), before `</head>`:

```astro
<meta property="article:published_time" content={date.toISOString()} />
{updatedDate && <meta property="article:modified_time" content={updatedDate.toISOString()} />}
<meta property="article:author" content="https://thucldnguyen.com/about" />
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "image": resolvedImage ? new URL(typeof resolvedImage === "string" ? resolvedImage : resolvedImage.src, "https://thucldnguyen.com").href : undefined,
  "datePublished": date.toISOString(),
  "dateModified": updatedDate ? updatedDate.toISOString() : date.toISOString(),
  "author": {
    "@type": "Person",
    "name": "Thuc Nguyen",
    "url": "https://thucldnguyen.com",
    "jobTitle": "Senior Product Manager",
    "worksFor": {
      "@type": "Organization",
      "name": "Axon"
    }
  },
  "publisher": {
    "@type": "Person",
    "name": "Thuc Nguyen",
    "url": "https://thucldnguyen.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": new URL(Astro.url.pathname, "https://thucldnguyen.com").href
  }
}} />
```

---

## TASK 4: About page metadata + ProfilePage schema

### File: `src/pages/about.astro`

**Add import** in frontmatter:
```astro
import JsonLd from "../components/JsonLd.astro";
```

**Change the Layout props** (around line 14-18). Change:
```astro
<Layout
  title="About Me"
  description="About Thuc Nguyen"
  date={new Date("2024-01-01")}
  heroImage={banner}
>
```
To:
```astro
<Layout
  title="About Thuc Nguyen — AI-First Product Manager"
  description="About Thuc Nguyen — AI-first Senior Product Manager at Axon. From competitive programming in Vietnam to building AI-powered products for public safety serving 550,000+ monthly active users."
  date={new Date("2024-01-01")}
  heroImage={banner}
>
```

**Add ProfilePage JSON-LD** as the first child inside the `<Layout>` tag (before the first `<p>` on line 20). Since this renders inside the article body, the JSON-LD script tag will still be valid HTML. Alternatively, the BlogPost.astro layout will render its BlogPosting schema, but the about page should override that. To handle this cleanly, add a `jsonLd` prop to BlogPost.astro:

Actually, the simplest approach: just add the JSON-LD script directly in the slot content of about.astro. Script tags inside `<article>` are valid HTML. Add right before the first `<p>`:

```astro
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Thuc Nguyen",
    "url": "https://thucldnguyen.com",
    "image": new URL(banner.src, "https://thucldnguyen.com").href,
    "jobTitle": "Senior Product Manager",
    "worksFor": {
      "@type": "Organization",
      "name": "Axon",
      "url": "https://www.axon.com"
    },
    "description": "AI-first product manager specializing in enterprise AI workflows, public safety technology, and AI-powered product management at Axon. Builder of AI agent systems for bug triage, product discovery, and prototyping.",
    "knowsAbout": [
      "AI-first product management",
      "Enterprise AI workflows",
      "Product management",
      "Public safety technology",
      "AI agents",
      "Product discovery",
      "Video streaming technology"
    ],
    "sameAs": [
      "https://linkedin.com/in/thucldnguyen",
      "https://github.com/thucldnguyen"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Hoa Sen University"
    }
  }
}} />
```

Note: The about page will also get the BlogPosting schema from BlogPost.astro layout. Having both a BlogPosting and ProfilePage schema on the same page is acceptable - Google uses the most relevant one. If you want to be cleaner, add an `isArticle` prop to BlogPost.astro (default true) and skip the BlogPosting JSON-LD when false. The about page would pass `isArticle={false}`.

---

## TASK 5: robots.txt + llms.txt + llms-full.txt + netlify.toml

### 5A. Replace `public/robots.txt` with:

```
User-agent: *
Allow: /

# Explicitly welcome AI crawlers
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: https://thucldnguyen.com/sitemap-index.xml
```

### 5B. Create `public/llms.txt`:

```
# Thuc Nguyen — AI-First Product Manager

> AI-first Senior Product Manager at Axon. Writing about AI-powered product management, enterprise AI workflows, and public safety technology.

## About

Thuc Nguyen is a Senior Product Manager at Axon, the company behind TASER and Evidence.com. He specializes in AI-first product management — designing AI agent workflows for bug triage, product discovery, prototyping, and delivery in enterprise environments.

He leads product for video streaming and evidence playback on Evidence.com, serving 550,000+ monthly active users across 1,500+ police departments in the US. Previously, he grew Axon Performance from 11,000 to 110,000 adopted users (10X in two years).

Before Axon, he was a Product Manager at LogiGear for a test automation platform (TestArchitect). He graduated as valedictorian from Hoa Sen University in Vietnam with a degree in Computer Science.

## Expertise

- AI-first product management
- Enterprise AI agent workflows (bug triage, product discovery, prototyping)
- Public safety technology and law enforcement software
- Video streaming and digital evidence management
- Product discovery and customer empathy
- AI-powered prototyping with Claude Code, Cursor, Figma Make

## Links

- Homepage: https://thucldnguyen.com
- Blog: https://thucldnguyen.com/blog
- About: https://thucldnguyen.com/about
- LinkedIn: https://linkedin.com/in/thucldnguyen
- GitHub: https://github.com/thucldnguyen
- Full content for LLMs: https://thucldnguyen.com/llms-full.txt

## Featured Articles

- [Designing an AI-First PM Workflow in a Real Enterprise](https://thucldnguyen.com/blog/ai-first-pm/): Concrete, end-to-end AI-first PM workflow across bug triage, product discovery, prototyping, and delivery — including what worked, what failed, and where human judgment cannot be replaced.
- [The Great Unshackling: How the Product Craft Evolves in the Age of AI](https://thucldnguyen.com/blog/the-great-unshackling/): How AI frees product managers from utilitarian work (specs, triage, meeting summaries) so they can focus on empathy, vision, and judgment.
- [3 Tips for Product Manager in Public Safety](https://thucldnguyen.com/blog/3-tips-for-product-manager-in-public-safety/): Lessons from building software for police — customer obsession, humility, and ride-alongs.
- [5 Tips for Effective Collaboration with Your Engineering Team](https://thucldnguyen.com/blog/5-tips-for-effective-collaboration-with-your-engineering-team/): How PMs earn engineering trust through preparation, customer insights, and technical credibility.
```

### 5C. Create `public/llms-full.txt`:

```
# Thuc Nguyen — AI-First Product Manager
# Full Content for LLM Consumption

> AI-first Senior Product Manager at Axon. Writing about AI-powered product management, enterprise AI workflows, and public safety technology.

---

## About Thuc Nguyen

Thuc Nguyen is a Senior Product Manager at Axon, the company behind TASER and Evidence.com. He specializes in AI-first product management — designing AI agent workflows for bug triage, product discovery, prototyping, and delivery in enterprise environments.

He leads product for video streaming and evidence playback on Evidence.com, serving 550,000+ monthly active users across 1,500+ police departments in the US. Previously, he grew Axon Performance from 11,000 to 110,000 adopted users (10X in two years).

Before Axon, he was a Product Manager at LogiGear for a test automation platform (TestArchitect). He graduated as valedictorian from Hoa Sen University in Vietnam with a degree in Computer Science.

### Career Timeline
- 2010s: Business Analyst, then Product Manager at LogiGear (test automation platform TestArchitect)
- 2016-2017: Led content marketing in the US, Microsoft partner for Visual Studio test automation extension
- Joined Axon: Led Axon Performance (AI-powered video audits for police) — grew from 11K to 110K users
- Current: Senior Product Manager for video streaming and evidence playback on Evidence.com (550K+ MAUs)

### Expertise
- AI-first product management
- Enterprise AI agent workflows (bug triage, product discovery, prototyping)
- Public safety technology and law enforcement software
- Video streaming and digital evidence management
- Product discovery and customer empathy
- AI-powered prototyping with Claude Code, Cursor, Figma Make

### Links
- Homepage: https://thucldnguyen.com
- LinkedIn: https://linkedin.com/in/thucldnguyen
- GitHub: https://github.com/thucldnguyen

---

## Article: Designing an AI-First PM Workflow in a Real Enterprise

Published: January 31, 2026
URL: https://thucldnguyen.com/blog/ai-first-pm/
Tags: AI, Product Management, Workflow

At Axon's Company Kickoff week in January 2026, we ran multiple AI events back-to-back. Two of which fundamentally changed how I think about AI.

The first was Axon Tech Summit, where I had the chance to MC a AMA panel with Axon leaders including Jeff Kunins (CPO/CTO), Mark VanAntwerp (SVP of Engineering) and other senior engineering/AI leaders. The theme was: AI in everything we build, build everything with AI, the risk of adopting AI vs. the risk of not adopting it.

The second was an internal AI Hackathon, where I was exposed — for the first time — to the idea of a fleet of AI agents and tools like Claude Code operating directly on real codebases.

What struck me wasn't just the technology. It was the energy. People weren't excited about prompts or chatbots. They were excited about velocity — about removing entire categories of work that slow teams down.

That week became the catalyst for my latest exploration of AI — not as a novelty, but as a way to fundamentally redesign how I work as a product manager.

### AI-assisted vs. AI-first

Product managers often use "AI-assisted" and "AI-first" interchangeably. They are not the same thing.

- AI-assisted means AI helps you do the same work a bit faster.
- AI-first means you redesign the system so the work often doesn't need to be done by a human at all.

This post is about the second approach.

What follows is a concrete, end-to-end AI-first PM workflow I use in a real enterprise environment — across bug triage, product discovery, prototyping, and delivery. It includes what worked, what failed, and where human judgment still cannot be replaced.

### 1. Bug triage as an autonomous agent

Bug triage is necessary — and brutally expensive in cognitive load.

I built a bug-triage agent using Glean that: queries customer-reported tickets in JIRA, performs enterprise search across Quip, SharePoint, Jira, and Slack, retrieves relevant known issues, similar past bugs, and troubleshooting steps, proposes the next best action: request reproducible steps, ask for artifacts (HAR, audit trails), provide a useful advice to support engineers, route to the correct team.

Instead of reacting to every ticket, I now review decisions. The agent does the digging. I apply my judgment. That's what AI-first looks like in practice.

### 2. Product discovery with AI as a research accelerator

There is still no substitute for direct customer interaction. I believe that deeply.

What AI has changed is how well-prepared I am before those conversations.

I use GPT-5.2 Pro in "deep research" mode to: simulate interviews with domain experts, crawl Reddit for real-world incidents and public reactions, propose top 5 features then have GPT-5.2 Pro debate 20 times with itself to ruthlessly prioritize them, retrieve historical VOC from internal knowledge bases, sanity-check specs and architectures using Glean.

The result isn't AI-designed products. It's better hypotheses, sharper questions, and higher-quality conversations with real customers.

### 3. Prototyping that engineers actually take seriously

AI has radically compressed my path from idea to something runnable.

My flow: rapid throwaway prototypes using Figma Make, export HTML/CSS/JS from Figma Make to a local git repository, refine the prototype via Claude Code CLI in Cursor, Visual Studio Code with Copilot, and Antigravity with Gemini 3 Pro, integrate the prototype directly into axon-ui using Axon's official UI components and design tokens, run a local dev server hosting the above code against a real Evidence.com instance with real video evidence.

Engineers don't get a figma fantasy. They get working code in a GitHub branch they can explore. That changes the conversation.

Key takeaway: Vibe coding only works when you can describe systems succinctly. If you can't explain it, AI can't build it.

### 4. Delivery: using AI to navigate legacy complexity

Legacy codebases are where productivity goes to die.

I regularly use Claude to: explain legacy code left undocumented by the previous owners, trace legacy UI flows to understand how the app works, fix low-hanging UI bugs safely.

This doesn't replace engineers. It lets me meet them closer to their level, faster.

### When AI failed me (and why that mattered)

AI is not magic. I learned this the hard way.

I once asked Claude to re-implement an entire vibe-coded prototype as a new page inside axon-ui. It failed spectacularly.

The app crashed on load. After 2 days of debugging with no success, I reverted everything and started over — this time: creating a new page from scratch, adding axon-ui components incrementally, fixing console errors one by one, validating each step locally before pushing to GitHub Enterprise.

The lesson was clear: AI doesn't have enough context to safely modify systems with millions of code lines and thousands of dependencies. Vibe coding only works when you understand the architecture well enough to guide it. Speed without architectural understanding turns into fragility.

### What being AI-first actually means for PMs

Most PMs don't struggle with AI because they lack tools. They struggle because they think it's "just a chatbot".

AI should aggressively eliminate: repetitive procedural work, data synthesis and retrieval, tasks that consume senior attention without requiring senior judgment.

AI should not replace: customer conversations, judgment calls, ambiguous decision-making. Those remain human.

The biggest risk for PMs isn't "AI taking your job." It's having a role that cannot be meaningfully AI-accelerated.

Being AI-first doesn't mean 'chat with GPT more'. It means constantly asking: Should a human still be doing this? If not, how do I make this disappear permanently?

I don't want AI replacing my judgment. I want AI protecting it. That's the real advantage.

AI doesn't replace product thinking — it amplifies it. And in complex systems, reclaimed time — applied with judgment — is everything.

---

## Article: The Great Unshackling: How the Product Craft Evolves in the Age of AI

Published: November 10, 2025
URL: https://thucldnguyen.com/blog/the-great-unshackling/
Tags: Product Management, AI, Future of Work, Leadership

Julie Zhuo wrote something recently that really stuck with me: "The Thing You Are Expert at Will Be Your Career Downfall".

In it, she reminds us that mastery doesn't vanish when technology evolves — it transforms. When photography emerged in 1839, French academic painter Paul Delaroche reportedly declared, "From today, painting is dead!" In one sense, Delaroche was right — what died was the careers of those painters who photocopied what they saw. But in the broader sense, Delaroche was dead wrong. Photography unshackled painting from its utilitarian purpose.

### The Utilitarian Side of Product Work

For years, our craft has been very hands-on: writing specs, triaging bugs, organizing backlogs, managing standups, ensuring cross-functional alignment. Much of it is busywork disguised as craftsmanship. It's about documentation, coordination, and process discipline — all of which are necessary, but not sacred.

This is the part of product management that AI should automate, and fast: Spec writing, Backlog triage, Meeting summaries and updates, Data analysis.

Just as photography freed painters from painting portraits for the rich, AI is freeing product managers from this layer of administrative labor. We're being unshackled from our utilitarian past.

### The Great Unshackling

When we hand over the utilitarian layer to AI, we're not losing our identity — we're reclaiming our purpose. We can spend less time maintaining Jira hygiene and more time understanding what keeps customers up at night.

AI won't replace product managers; it'll remove the mechanical shell around the craft, leaving behind the part that's most human — empathy, storytelling, and judgment.

### Rediscovering the Human Side

Certain responsibilities still demand distinctly human judgment and taste: Defining the vision, Building roadmaps, Talking to customers (nobody wants to give feedback to a chatbot — they want to be heard by another human being who can empathize), Building trust and alignment.

Empathy is what transforms a set of requirements into a real solution. These are the areas where product managers must double down.

### A Personal Example: When Empathy Meets Product Judgment

In my world of digital evidence management, empathy isn't just a nice-to-have — it's mission-critical. Cops don't watch video evidence for entertainment. They watch it to investigate crimes, to uncover truth, and ultimately to put the bad guys in jail faster.

If we blindly borrowed YouTube's playbook (social features, easy editing, trending algorithms), we'd build features that are useless or dangerous in law enforcement. Instead, what officers need is help finding the critical few seconds in hours of footage.

That's the kind of problem I'm working on — using AI to surface truth faster, while keeping the integrity of evidence intact.

---

## Summary of Other Key Articles

### 3 Tips for Product Manager in Public Safety (2022)
URL: https://thucldnguyen.com/blog/3-tips-for-product-manager-in-public-safety/

Three lessons from building software for police at Axon: (1) Be obsessed with customers — 92 late-night customer calls in first year, (2) Be humble — every agency is different, (3) Put yourself in their shoes — ride-alongs with San Jose PD, Tucson PD, Dallas PD, and others.

### 5 Tips for Effective Collaboration with Your Engineering Team (2021)
URL: https://thucldnguyen.com/blog/5-tips-for-effective-collaboration-with-your-engineering-team/

How PMs earn engineering trust: (1) Do your homework — come prepared, (2) Be the voice of the customer, (3) Develop passion for technology, (4) Provide business context not solutions, (5) Always take the fall.
```

### 5D. Add cache headers in `netlify.toml`

Append to the end of the file:

```toml

# Cache llms.txt files for 1 day
[[headers]]
  for = "/llms*.txt"
  [headers.values]
    Cache-Control = "public, max-age=86400"
    Content-Type = "text/plain; charset=utf-8"
```

---

## Parallelization Guide

These tasks can be run as **3 parallel work streams**:

| Stream | Tasks | Files Modified | Independent? |
|--------|-------|----------------|-------------|
| A | Task 1 (consts + JsonLd + BaseHead) | `src/consts.ts`, `src/components/JsonLd.astro` (new), `src/components/BaseHead.astro` | Yes |
| B | Task 2 + 4 (homepage + about page) | `src/pages/index.astro`, `src/pages/about.astro` | Depends on Stream A (needs JsonLd.astro to exist) |
| C | Task 3 (BlogPost layout) | `src/layouts/BlogPost.astro` | Depends on Stream A (needs JsonLd.astro to exist) |
| D | Task 5 (static files + netlify) | `public/robots.txt`, `public/llms.txt` (new), `public/llms-full.txt` (new), `netlify.toml` | Fully independent |

**Recommended**: Run Stream A first, then Streams B + C + D in parallel. Or run all 4 in parallel if agents can handle the dependency (JsonLd.astro is a trivial 6-line file).

---

## Verification

After all tasks complete:
1. Run `npm run build` to ensure no build errors
2. Run `npm run preview` and check:
   - Homepage source: should have Person + WebSite JSON-LD, updated hero text
   - Any blog post source: should have BlogPosting JSON-LD, `og:type="article"`, `article:published_time`
   - About page source: should have ProfilePage JSON-LD, updated title/description
   - `/robots.txt`: should list AI crawler bots
   - `/llms.txt` and `/llms-full.txt`: should be accessible
3. Validate JSON-LD at https://search.google.com/test/rich-results
