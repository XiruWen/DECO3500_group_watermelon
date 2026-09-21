# Analysis — Interview 6 (domain expert)

| | |
|---|---|
| **Participant** | P6 (de-identified) — product planner at a major Chinese music streaming platform |
| **Interviewer / analysis** | Cristina Zhang |
| **Date** | 2026-09-21 |
| **Transcript** | [`Interview_Transcript6_CristinaZhang.md`](Interview_Transcript6_CristinaZhang.md) |
| **Method** | Semi-structured, conducted in Mandarin, translated by the interviewer. Coded per the Week 4 analysis method: story → problematisation → direction. |

> **Read the limitations first.** P6 is our only domain expert so far. Six of the seven
> questions produce second-hand evidence — expertise about *building* in this domain, not
> about *living* in it — and should be weighted differently from P2–P5.

## Research insights

| Evidence (translated, condensed) | Initial code | Theme |
|---|---|---|
| The platform's model rests on users sharing and content spreading by itself | Sharing designed in as the growth mechanism | **User-generated content is the supply, not a side effect** |
| Users were *incentivised* to comment, and the prompt was pinned to the lyric line that moved them | Contribution has to be prompted, and anchored to a specific moment | **A trace needs an anchor and a reason to leave it** |
| The anchor was a line of lyrics — a point inside the song, not a point in the world | Anchoring is done in content-space | **Existing products anchor in the song; place is still unused** |
| Contextual targeting exists, but the context is time of day and first-open, never location | Context = moment, not place | **Industry contextual computing is temporal, not spatial** |
| Morning / commute slot chosen explicitly so as not to intrude | Timing chosen as politeness | **Interruption cost governs when a prompt is allowed** |
| A personality test's characters were taken up by users into fan art and original storylines | Users extended the artefact past its designed end | **Conversation starts when there is something with a character to answer** |
| Malicious content appeared and was stopped by the safety system before it spread | Harm handled upstream by infrastructure | **Moderation is a precondition, not a later feature** |
| Everything is built on licences; when a licence expires, what the campaign produced "goes dark" — the link to the song dies | A pointer to a track is perishable | **Traces made of links decay when rights lapse** |
| Covers and other versions on the platform can stand in for the lost track | Substitution as a recovery path | **A trace can survive if it can degrade to an alternative version** |
| Wide reach with low interaction is read as failure, not success | Reach ≠ value | **Awareness alone is not the goal, in industry either** |
| High views with low interaction usually means one KOL blew up at the top | Top-down spread distrusted | **Peer-to-peer propagation is what is actually wanted** |
| What is wanted is a user bringing a friend into the campaign or the test | Invitation as the unit of success | **The success unit is one person bringing one person** |
| A song binds to an argument, a night, a walk — the participant reached for *when*, not *where* | Binding is to an episode, not a location | **Music binds to events; place is at most where the event happened** |
| Asked back what "stuck in a place" meant | The place↔song framing is not self-evident | **Our framing does not travel without explanation** |
| Reaction to the scenario: a location's shared taste could improve the recommender | Place read as a signal for the algorithm | **A planner's reflex is to feed place back into recommendation** |
| Suggests tying it to travel spots and the short video you could make there | Place read as a backdrop for content production | **Place as scenery, not as a channel between people** |

## Implications for EchoSpot

1. **Pointers rot.** `prototype-plan.md` treats "shared track = a pointer" as the safe route.
   P6 says the opposite from experience: when a licence lapses, everything built on that
   link goes dark. An EchoSpot place would silently empty out over time. Their own fix is
   worth stealing — **degrade to a substitute** (a cover, another version) rather than
   showing a dead echo. This is now a design requirement, not a technical footnote.
2. **Measure answers, not echoes.** P6 reached the course's own distinction independently:
   wide reach with no interaction counts as failure, and a spike driven from the top is not
   what they want. For our evaluation this means the number to report is **replies per
   echo** and **one person bringing one person** — not echoes left, not plays.
3. **Contextual computing in this industry is temporal.** Daily Fortune targets *when*
   (first open, morning, commute) and never *where*. Supply-side support for the gap claim
   in `design/domain-and-concepts.md`, from a planner rather than from us.
4. **Interruption budget.** Their rule — one moment a day, in the commute slot — is a usable
   constraint on how often EchoSpot may tell someone an echo is nearby.
5. **Someone has to be asked, and asked at an anchor.** Their comments feature did not fill
   itself: users were incentivised, and the prompt hung on a specific line of lyrics. Our
   cold-start question is therefore not only "who seeds the first echo" but "what does the
   screen say at the moment someone is standing there".
6. **Give people something with a character to answer.** What exceeded the design was users
   producing *more* around characters they could respond to. Supports our rejection of
   listen-only traces (`decision-log.md`).
7. **Open Question 2 moves again — towards the episode.** Asked as a person, P6 bound a song
   to an argument and a night walk, not to a location, and had to ask what a place-bound
   song even meant. With P2 saying the same thing, **two of six participants do not
   experience place as the carrier**. What both describe is an *episode* that happened to
   have a place in it. The live design question is whether an echo is anchored by
   coordinates or by the activity the place hosts (the gym, the commute) — which is exactly
   the place-vs-activity fork the team left open.
8. **Watch for the two misreadings.** Given the scenario, a professional immediately turned
   place into (a) a feature for the recommender and (b) scenery for short video. Both
   dissolve the concept: in each the place connects a person to *content*, never to another
   person. Our pitch has to close off both readings in its first sentence.

## Limitations

- **Second-hand evidence.** P6 speaks about users professionally. This is evidence about
  *building* in this domain, not about *living* in it — except Q7, which is first-hand and
  can be coded alongside P2–P5.
- **Q1–Q4 are brief and un-probed.** Q1 gives the mechanism but not the first week after
  launch; Q4 has no detail on what the content was, who noticed, or what changed.
- **The closing is a reaction, not a pre-mortem.** The participant said he did not follow
  the scenario, so his answer redirects to what he would build instead. Code it as a
  professional's default framing of place, not as a judgement on the concept.
- **Interviewer wording for the closing was not recorded.**
- Employer de-identified at the interviewer's discretion; the platform is named nowhere in
  the transcript or coding.
