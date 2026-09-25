---
template: blog-post
title: "Courtroom Playback Should Not Depend on Wi-Fi"
slug: /blog/courtroom-playback-without-wifi
date: 2026-09-25
pubDate: 2026-09-25
heroImage: ../../assets/courtroom-playback-hero.png
description: "Evidence should not get dumber just because it leaves the cloud. A portable Axon Video Player could bring rich, interactive evidence playback into court without relying on Wi-Fi."
tags: ["ai", "product", "public-safety", "evidence"]
---

*Opinions are my own. Everything referenced here is public information.*

Imagine an officer walking into court to testify about a traffic stop.

Back at the station, the evidence is rich.

Body-camera video. Vehicle speed. GPS. Transcript. Markers highlighting important moments. Maybe multiple camera angles showing the same stop.

Then court starts.

The officer opens an MP4 in VLC.

The video is still there.

Most of the context is not.

That is the gap I want to close.

## Evidence gets flatter when it leaves the cloud

Modern digital evidence is no longer just pixels and audio.

Inside an evidence platform, a video can carry useful context around it:

- synchronized multicam playback
- transcripts
- markers
- maps and GPS
- timestamps
- officer and device metadata
- vehicle telemetry and other overlays

Axon Evidence already provides a rich experience for reviewing evidence online.

But when evidence leaves that environment for courtroom presentation, the experience often collapses into a collection of files.

The video survives.

The experience around the video does not.

Court is exactly where that context can matter.

## Courtroom Wi-Fi is not a strategy

The obvious answer is: just open Evidence.com in court.

I would not bet a hearing on that.

Courtroom technology varies wildly.

Some courtrooms have reliable internet. [Some don't.](https://www.nynd.uscourts.gov/courtroom-technology-faq) Some provide Wi-Fi but [discourage using it for evidence streaming](https://www.moed.uscourts.gov/attorney-courtroom-wifi-service). Some expect attorneys and officers to arrive with [everything stored locally and ready to play](https://www.nvb.uscourts.gov/judges/courtroom-technology/evidence-presentation/las-vegas/).

And when something goes wrong, nobody wants to be debugging Wi-Fi while the judge waits.

Courtroom presentation should work offline by design.

## What if the Axon Video Player could leave Evidence.com?

Here is the idea.

An officer prepares for court in Axon Assistant:

"Prepare the evidence from this traffic stop for court."

Axon Assistant assembles a portable package containing exactly what the officer needs:

- selected video evidence
- single-camera or synchronized multicam playback
- supported overlays
- transcripts
- markers
- maps
- relevant metadata

But instead of exporting a pile of disconnected files, it packages the Axon Video Player experience with them.

Open the package on a laptop.

The Axon Video Player runs locally.

No Evidence.com connection.

No streaming.

No dependency on courtroom Wi-Fi.

The officer can still switch camera angles, toggle overlays, jump to markers, follow the transcript, inspect the map and review relevant metadata.

The evidence leaves the cloud.

The experience travels with it.

## The AI part should be boring

I don't think the interesting innovation here is a chatbot.

The useful AI disappears into the workflow.

Preparing for court can involve finding the right evidence, downloading files, creating the right derivatives, collecting transcripts, organizing everything and making sure the final package actually works.

That is exactly the kind of repetitive assembly work an agent should absorb.

The user states the intent:

"Get this traffic stop ready for court."

The system assembles the package.

The human reviews it.

Done.

AI should remove preparation work, not become another tool an officer has to operate while standing in front of a judge.

## A portable player is more useful than a smarter MP4

Another approach would be to keep burning more information directly into exported video.

Put the speed on the video.

Put GPS on the video.

Put officer information on the video.

Put timestamps on the video.

That works until somebody wants a different combination.

Then we need another extraction.

And another.

And another.

Flattening interactive evidence into pixels turns presentation choices into permanent copies.

A portable player preserves optionality.

Want speed visible? Turn it on.

Need the clean video? Turn it off.

Jump directly to the marker where the vehicle entered the intersection.

Search the transcript for what the driver said.

Switch from body camera to Fleet without opening another application.

The evidence remains the evidence.

The presentation layer remains flexible.

That is a much cleaner model.

## Start with traffic court

I would not start by trying to reinvent courtroom presentation for every type of case.

Start with one sharp workflow.

A patrol officer makes a traffic stop.

A citation gets contested.

Months later, the officer has to testify about what happened.

The evidence set is usually manageable.

A few videos.

A few moments that matter.

And an officer who absolutely does not want to troubleshoot software in front of a judge.

That is a good constraint.

Make that workflow excellent first.

## The hard problems aren't playback

Playing an MP4 offline is easy.

The interesting problems sit around it.

Can the package run without administrator access?

Can we prove none of the evidence inside it changed?

How do permissions and sensitive metadata behave once the package leaves the cloud?

Should the package expire?

Can it move safely from an agency to a prosecutor?

How large can a multicam package become before "portable" stops being portable?

And most importantly:

Which parts of the rich evidence experience actually matter in court?

Maps sound useful.

Searchable transcripts sound useful.

Markers sound useful.

But usefulness has to be demonstrated, not assumed.

The workflow has to earn every feature.

## The success metric is not “the offline player launched”

It is preparation time.

Today:

Find evidence → download videos → create extractions → export supporting information → organize files → test playback → go to court.

Future:

Select evidence → Prepare for court → review package → go to court.

If that compresses a tedious preparation workflow into a couple of minutes, that is valuable.

If officers still export the MP4 and ignore everything else, that is valuable information too.

Maybe they do not need the entire rich experience offline.

Maybe they need a simpler portable player.

Maybe they just need a dramatically better export.

That is why I would start narrow and measure the workflow.

The technology is almost beside the point.

The principle is simpler:

**Evidence should not get dumber just because it leaves the cloud.**
