# Plan of work — towards the proof-of-concept

> **Proof-of-concept prototype** (course definition): an advanced prototype balancing
> simulation and real functionality — users can meaningfully interact with the key parts
> of the concept, while still getting a sense of the whole.
>
> For EchoSpot this means the **location-triggered interaction must be real**. Peripheral
> parts (accounts, catalogue size, content volume) may be simulated.

## Open questions

| # | Open question | Method | When |
|---|---|---|---|
| 1 | **Sharing motivation** — what makes listeners want to share or discover music? | Semi-structured interviews (6–8 listeners, recruited through campus music societies and independent record stores) | Weeks 5–6 |
| 2 | **Role of context** — does place or activity make music discovery more meaningful? | Contextual interviews & scenario comparison (place-based vs activity-based) | Weeks 5–6 |
| 3 | **Social experience** — what kind of interaction feels useful, safe and low-pressure? | Co-design & storyboard testing (anonymity, privacy, responding, control over shared content) | Weeks 6–7 |
| 4 | **Prototype direction** — which concept should become our proof of concept? | Low-fi prototyping & user testing | Weeks 7–9 |

Each question is scoped by **type of uncertainty**, not by concept — so this plan holds
whichever concept the team selects.

## Concepts still in contention

They differ in **what role place plays**:

| Concept | Place is… | Time–space cell |
|---|---|---|
| **EchoNotes** | a **container** — it holds what someone left; you must come to hear it | different time / same place |
| **EchoVibe** | a **room** — it gathers whoever is in it right now | same time / same place |
| **EchoTrail** | a **path** — it accumulates along a route someone travels daily | different time / same place |

### Selection criteria

| # | Criterion |
|---|---|
| 1 | Does it need technology? (*different time / same place* is where technology is genuinely required) |
| 2 | Does it survive "why not Spotify?" |
| 3 | Does it reach past **awareness** into **conversation**? |
| 4 | Can the core interaction genuinely be built, not simulated? |
| 5 | Cold start — can five people seed enough content for a stranger to have a real experience? |
| 6 | Content rights — see below |

> **Method note.** In the storyboard session, compare **dimensions** rather than named concepts
> (e.g. a *decaying* version vs an *accumulating* version of the same idea). Dimensional findings
> transfer to whichever concept we pick; "they liked number three" does not.

## Content rights

We cannot host or redistribute copyrighted audio. Two routes, both safe:

- **Shared track = a pointer** — a platform link/ID plus a line about why it was left here.
  We store the reference, never the audio.
- **Recording = the user's own material** — hummed, played, spoken, ambient.

## Technical notes to resolve

| Question | Why it matters |
|---|---|
| **Geofence radius** — a building, a room, a bench? | This is a concept question, not a technical detail. Too large and "you have to walk there" collapses into "it is just there when you open the app". |
| **Scope of the deployment** | Restricting the prototype to the **UQ St Lucia campus** keeps trace density high enough to be felt, and makes recruitment and testing feasible. |
| **Demonstrating multi-user interaction** | The course requires the prototype to demonstrate interaction *between* users' perspectives. We must be able to show: A leaves → time passes → B arrives and picks it up → B answers → A finds the answer later. |
| **Cold start** | A location is empty before anyone has been there. Who seeds the first content? |
