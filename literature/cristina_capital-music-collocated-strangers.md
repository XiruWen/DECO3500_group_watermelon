# The sound of music: Sharing song selections between collocated strangers in public urban places

**Citation:** Seeburger, J., Foth, M., & Tjondronegoro, D. (2012). *The sound of music: Sharing song selections between collocated strangers in public urban places*. In Proceedings of the 11th International Conference on Mobile and Ubiquitous Multimedia (MUM '12), pp. 1–10. ACM. https://doi.org/10.1145/2406367.2406409
**Reviewer:** Cristina · **Date:** 2026-09-09
**Word count of critique:** ~430

> Source note: all quotes checked against the ACM published version.

---

## Why this paper is useful to EchoSpot

It is the closest precedent we have: a mobile app that lets strangers in the same public place see each other's music and send a "like" or a message, tested with 13 participants recruited at the authors' university (QUT, Brisbane). It gives us evidence on the two things our prototype currently leaves open — **anonymity** and **what happens after awareness** — and a test method that solves our cold-start problem.

## Insight 1 — Anonymity made sharing feel safe and made people curious

**What the paper shows:**
Participants were comfortable sharing because "all they get from me is a nickname and my song selection". Not knowing who was behind a song made all but two participants curious: they scanned the space and tried to match songs to the people around them. But anonymity also raised worries: one participant feared offensive messages and being asked where she was, and the authors conclude that blocking is needed.

**Design implication for EchoSpot:**
Keep **nickname-only, no profiles** (the current prototype already does this). Never show where the person who left an echo is *now*, and add **block/report** before any testing with strangers. The "who left this?" curiosity is something to design for, not a gap to close.

## Insight 2 — The valued moment was the reply, not the like

**What the paper shows:**
In 10 of 13 sessions participants started exchanging messages, and the "like" was seen as an easy icebreaker. One participant named the best part: "someone sends something back and you reply and they say something else". Being seen also changed what people played: some picked "edgier or cooler tracks" to get reactions.

**Design implication for EchoSpot:**
A like is where the interaction *starts*, not where it should end. Our prototype stops at the like, which is the "listen-only trace" our decision log already rejected. Add **one lightweight way to answer an echo** (a track or a short sound). We should also expect echoes to be chosen for an audience, not only as honest records of a moment.

## Method we can borrow

Because the app needs many people in one place at once, the authors used **Wizard of Oz**: one participant in the field, with a researcher sending song updates from 20 iPods and 4 iPads. We can test EchoSpot the same way by **seeding echoes before a single participant arrives**. We should not copy their deception, though (participants were not told the other users were fake) — see Ethical Considerations.

## Social / mobile opportunities identified

| # | Opportunity | Time–space cell |
|---|---|---|
| 1 | A "who is listening here right now" layer, as in Capital Music (our EchoVibe) | Synchronous + Co-located |
| 2 | An echo left at a spot, found later, and answered with a track | Asynchronous + Co-located |
| 3 | The person who left the echo is told it was answered, wherever they are | Asynchronous + Distributed |

## Where this paper does not help us

Each session lasted **15 minutes**, so it tells us nothing about whether people come back, or how a place's traces build up over weeks — the core of EchoNotes. It also studies **same-time** sharing only, so its findings about curiosity may not carry over to traces left by someone who has already gone.

---

## Extra notes for the team (not part of the ~400-word critique)

- **Content rights precedent.** Capital Music shares only the song's **metadata and album artwork**; people cannot play each other's songs. Even so, participants said they discovered music this way. This supports the "share a pointer, not the audio" rule in [`prototype-plan.md`](../design/prototype-plan.md), which the current prototype breaks by allowing audio uploads.
- **People want to say *why*.** In the earlier 5-person trial, participants **repurposed the nickname field** to describe "their motivation, mood, or activity behind their music choices" (e.g. "I have awesome artwork <3"). This is independent support for the mood tags in Prototype v1 and for the mood finding in our first interview.
- **A cheap early-prototype method.** Before building anything, the authors ran a **paper-based study**: participants wrote the song they were listening to on a post-it and stuck it on a shared wall. Just knowing others would see it **changed how people chose songs**. We could run the same kind of low-fi test before Week 9.
- **How they defined "here".** A "place" was a nearby **Foursquare landmark** (café, bus stop, park) within a radius the user set, not a raw coordinate. This is a useful reference for our open geofence question.
- **A closer precedent to follow up.** The related work describes **Undersound** (Bassoli et al., 2007, *IEEE Pervasive Computing* 6(3)): artists upload songs at fixed upload points in the London Underground. It is very close to the EchoNotes mechanism, with artists as the people leaving songs. The paper notes it was never implemented or evaluated. **Not in the ACM DL**, but citable in project documentation.

*AI use: drafted with AI assistance (Claude) from the full text; reviewed and edited by the reviewer.*
