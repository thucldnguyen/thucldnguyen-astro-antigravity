---
template: blog-post
title: "I Orchestrated 5 AI Agents to Refactor My Codebase in 22 Minutes"
slug: /blog/orchestrating-ai-teams
date: 2026-02-13 12:00
description: "How I used Claude Teams to achieve 4x speedup on a complex multi-variant feature parity task—and what it taught me about the future of product development."
heroImage: ../../assets/orchestrate-ai-teams.png
tags: ["Claude Agent Teams", "AI", "Product Management"]
---

**22 minutes. 4 codebases. 1.9 million tokens. Zero questions asked.**

That's what happened when I stopped treating AI as a chatbot and started treating it as a team.

---

## The Problem: Feature Parity Across 4 Design Variants

I was building a multicam evidence review tool—think body camera footage synced with CCTV and dashcam feeds. I had four design variants (A, B, C, D) with different layouts for customer validation. Each variant had ~1,500 lines of React code, and they'd diverged: Variant A had all 10 features, but B was missing search, C had broken event filtering, and D lacked metadata tabs.

The traditional approach? Pick one variant, manually diff the others, copy-paste code, test each one. Estimated time: 4-6 hours of tedious, error-prone work.

Instead, I wrote a mission brief and deployed an AI agent team.

---

## The Team Structure

I didn't just prompt Claude. I **designed a team**:

- **1 Dev Lead** (Opus 4.6): Coordinates, synthesizes reports, creates task graphs
- **3 Developers** (Sonnet 4.5): Each owns 1-2 variants, implements features
- **1 QA Tester** (Haiku): Verifies builds, catches behavioral bugs

Each agent had a specific role, model tier, and communication protocol. The Dev Lead never wrote code—only coordinated. The QA Tester used the cheapest model (Haiku) for read-only verification. The developers worked in parallel with dependency-aware task scheduling.

---

## The Execution: Silent, Autonomous, Logged

Here's what happened, minute by minute:

### Phase 1: Parallel Exploration (90 seconds)

All four agents launched simultaneously. No sequential startup delay.

```
02:12:05  LEAD → DEV1       SPAWN: "Explore Variant A"
02:12:05  LEAD → DEV2       SPAWN: "Explore Variant B"
02:12:05  LEAD → DEV3       SPAWN: "Explore Variants C & D"
02:12:05  LEAD → QA-TESTER  SPAWN: "Review CLAUDE.md files"
```

**The QA Tester finished first** (35 seconds)—Haiku's speed advantage on read-only tasks. It caught a critical bug the developers missed: Variant C was passing `demoEvents` (unfiltered) instead of `activeEvents` (filtered by grid). A one-line bug that would've broken production.

**Dev3 produced a comparison table** instead of two separate reports. This single decision saved 10+ minutes of manual diffing. The Dev Lead's gap matrix was essentially a merge of Dev3's table with the other reports.

### Phase 2: Gap Analysis (46 seconds)

The Dev Lead synthesized all four reports into a feature gap matrix:

| Feature         | A   | B   | C   | D   |
| --------------- | --- | --- | --- | --- |
| Canonical data  | ✓   | ✗   | ✗   | ✗   |
| Search syntax   | ✓   | ✗   | ✗   | ✓   |
| Event filtering | ✓   | ✓   | ✗   | ✓   |
| Metadata tabs   | ✓   | ✓   | ✓   | ✗   |

Six implementation tasks created. Dependency chain established: data porting before search porting (because search operates on data). No agent ever hit a merge conflict.

### Phase 3: Implementation (17 minutes)

Developers worked in parallel. Every decision was logged:

```
02:20:15  DEV2 → LEAD  DONE: Task #10 — data ported to B
                       (titles, categories, locations, timezones updated)
02:20:28  DEV2 → LEAD  DONE: Task #12 — searchStreams() ported to B
                       (adapted for B's local VideoStream interface)
```

**An unexpected collision happened**: Dev1 autonomously picked up Task #15 (add metadata tabs to Variant D) while Dev2 was being reassigned to it. Duplicate work?

No—**accidental peer review**. Dev2 arrived second and verified Dev1's implementation: build passed, all 3 tabs worked, layout preserved. A race condition turned into a quality gate.

### Phase 4: QA Verification (60 seconds)

The QA Tester ran `npm run build` in all four directories. 4/4 builds passed. 7/8 spot-checks passed. One false alarm (pre-existing uncommitted changes in Variant A).

Total wall clock: **22 minutes** from team creation to shutdown.

---

## The Numbers That Matter

| Metric                  | Value              |
| ----------------------- | ------------------ |
| **Wall clock time**     | 22 minutes         |
| **Estimated solo time** | 4-6 hours          |
| **Speedup**             | ~4x                |
| **Total tokens**        | ~1.9M              |
| **Estimated cost**      | $15-25             |
| **Files modified**      | 8 (across B, C, D) |
| **Build failures**      | 0                  |
| **Merge conflicts**     | 0                  |

**Dev1 was the most expensive agent** (~740K tokens) despite completing fewer tasks. Why? Variant A had a 1,585-line `App.tsx` that required extensive reading. Context is expensive.

**The QA Tester cost 5-10x less** (~85K tokens) than the developers. Read-only tasks don't need the most capable model.

---

## Three Insights That Changed How I Think About AI

### 1. Comparative Outputs > Independent Reports

When Dev3 explored Variants C and D, they produced a **side-by-side comparison table** instead of two separate inventories. This single decision made the gap identification trivial. The Dev Lead's task list was generated in under 60 seconds.

**Takeaway**: When agents explore related codebases, instruct them to produce diffs, not documents.

### 2. The Cheapest Model Caught the Most Critical Bug

The QA Tester (Haiku) was the first to finish and the only one to catch the `demoEvents` vs `activeEvents` bug. The developers focused on "does this component exist?" The QA Tester focused on "does this component behave correctly?"

**Takeaway**: Read-only QA/analyst roles catch different classes of bugs than implementers. Assign QA agents to behavior-first analysis, not code inventory.

### 3. Accidental Peer Review Is a Feature, Not a Bug

When Dev1 and Dev2 both completed Task #15, I thought I'd wasted tokens. But Dev2's verification confirmed the implementation was correct without requiring a full QA cycle. The cost of reading and verifying is much lower than implementing.

**Takeaway**: Build verification into the task graph explicitly. Create paired tasks: "Implement X" (Dev A) + "Verify X" (Dev B).

---

## What This Means for Product Managers

I'm not a software engineer by training. I'm a PM who learned to code because I got tired of waiting for engineers to validate my ideas. But here's the thing: **I didn't write a single line of code in this session**. I wrote a mission brief.

The skills that mattered:
- **System design**: Structuring the team hierarchy and communication protocol
- **Task decomposition**: Breaking the problem into parallelizable chunks
- **Dependency mapping**: Ensuring data flows in the right direction
- **Quality gates**: Designing verification into the workflow, not bolting it on after

These are **PM skills**. The AI did the implementation.

---

## The Future Is Weirder Than You Think

We're not heading toward "AI replaces engineers." We're heading toward "PMs who can orchestrate AI teams ship faster than traditional engineering teams."

The bottleneck isn't coding anymore. It's **knowing what to build and how to structure the work**.

If you're a PM who thinks AI is just ChatGPT for writing PRDs, you're already behind. The people who win in the next 3 years are the ones who learn to:
1. Write mission briefs, not prompts
2. Design task graphs, not to-do lists
3. Instrument workflows with verification gates
4. Treat AI as a team, not a tool

---

## Try It Yourself

You don't need Claude Teams to start. You can simulate this with:
- **Multiple Claude conversations** (one per "agent")
- **Explicit role definitions** in your prompts
- **Structured outputs** (comparison tables, gap matrices)
- **Dependency-aware sequencing** (don't start Task B until Task A is done)

The magic isn't in the tool. It's in the **orchestration**.

---

**Want the full mission brief and agent transcripts?** I've open-sourced the entire setup. [Link to repo coming soon.]

**Questions? Challenges? Want to collaborate?** I'm always up for talking about agentic AI, product development, and the weird future we're building. Let's connect.

