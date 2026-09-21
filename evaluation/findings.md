# Evaluation findings — EchoSpot v1

| | |
|---|---|
| **Dates** | 16, 17 and 19 September 2026 |
| **Prototype** | EchoSpot v1 (web, local-only storage) |
| **Method** | In-situ task sessions with think-aloud, run in the real places; sharer and finder roles run separately, adapted from the groupware walkthrough (Pinelle & Gutwin, 2002) |
| **Sessions** | 6 — three sharing scenarios, three finding scenarios |
| **Run by** | Cristina Zhang |
| **Records** | `evaluation/Prototype_Test_Transcript1–6_*.md` — reconstructed from field notes, not verbatim |

| # | Role | Place | What was left / found |
|---|---|---|---|
| S1 | Sharer | Brisbane Jazz Club, Kangaroo Point | 12 s recording of a saxophone solo from that night |
| S2 | Sharer | UQ Lakes lawn | The instrumental track already playing in their headphones |
| S3 | Sharer | Route 199 stop, Adelaide Street | Prince, *1999*, left for people who catch the 199 |
| F1 | Finder | Brisbane Jazz Club | "That solo by the river" — played it, liked it |
| F2 | Finder | Brunswick Street Mall | "Midnight in the Valley" — humming; closed it without responding |
| F3 | Finder | Outside UQ Library | "You've done enough today" — played it in full, liked it |

## Findings

### F-1. Being there is the value. The radius slider gives that value away.

All three finders noticed the 1 km search radius and all three refused to widen it.

> "If I drag the range farther out, then I'm just browsing songs from random parts of Brisbane.
> I could do that in any music app." — F3

> "I'm interested because this marker is right beside the place I'm already at." — F1

Both finders who engaged were standing 20–30 m from the drop point, and both stayed to finish
the clip. F1 looked back at the venue while listening; F3 stopped walking to hear the rest.

This answers the question we had left open — whether having to walk to a place reads as reward
or as friction. In these sessions it read as reward, and the value disappeared as soon as
distant echoes became reachable. The prototype currently lets anyone play anything within 5 km.

**Change:** gate playback on arrival, cut the default radius to tens of metres, and remove the
kilometre slider.

### F-2. The title is carrying the whole experience, and it cannot.

Every finder chose an echo from the title and mood icon alone, and each of them asked for the
same missing thing afterwards.

> "Tell me what kind of audio it is before I open it — released song, live performance, voice
> note, humming, ambient sound." — F2

> "I would show a short description before playing — something like 'live jazz recording from
> Saturday night.'" — F1

> "Show the track name and let me save it. The custom title is good because it explains the
> place, but it shouldn't replace the real song information. I want both." — F3

F2 expected a song, found nine seconds of humming, and that single disappointment ended the
session: they would not open a second echo. One mismatched expectation cost us every later
interaction.

**Change:** each echo carries an audio-type label, the real track name where there is one, and
a one-line "why I left this here" from the sharer.

### F-3. People cannot share the music they actually want to share.

S3 set out to leave a streaming track and could not: the upload screen only accepts files
already on the phone.

> "The song is in Spotify, not in my Files app... I haven't had MP3s on my phone for years."
> — S3

The workaround — playing the track on a second phone and re-recording it — produced traffic
noise, and S3 immediately named the cost: "the upload process was annoying enough that I
probably wouldn't do this often. If I could just choose a song from a catalogue and attach it,
then yes, I'd leave more." S2 only managed because a file had been pre-saved to the test phone,
and asked the same question unprompted.

**Change:** an echo should reference a track (link or catalogue ID) rather than host audio;
recording stays for a person's own sounds. This is the route already written into
`design/prototype-plan.md`, and these sessions show it is not optional.

### F-4. The response loop stops at a heart, and both sides feel it.

Finders wanted to answer, but only in one gesture, and only at arm's length.

> "If there were a reply option, I might say 'I love this song too,' or leave another jazz
> track. I don't need to contact them properly. That would be too much for a stranger." — F1

> "I might reply with another calm song, but only if replying was easy." — F3

Sharers wanted exactly the same shape of answer — and no more:

> "Reply with another little moment from a different night... I'd probably prefer they didn't
> [contact me]." — S1

> "Reply with another route-related song or a better joke. I don't want direct contact." — S3

Sharers also said the absence of any signal would end their contribution:

> "If I left two or three and there was never any reaction at all — not even a play count or a
> like — I would probably stop." — S1

S2 needed less: "If the app showed that one person listened, that would be enough."

**Change:** one-tap reply with a track, plus a play count visible to the sharer. No direct
messaging — nobody asked for it and three participants explicitly refused it.

### F-5. Identity is settled; context is not.

All six wanted a nickname and none wanted a real name, for three different reasons: S1 because
the recording is the band's work and not theirs, S2 because they did not want coursemates to
see them idle by the lake, S3 because they were unsure the re-recording was legal.

The finders went further — identity is not what is missing:

> "A stranger's name doesn't change the recording. A short note about why they left it would
> help more than their identity." — F2

This **contradicts** an earlier interview finding, where a participant said they would replay a
song they disliked if a friend had sent it. Reading both together: identity carries the meaning
between friends; between strangers, context does. EchoSpot is a strangers' system, so the
design should invest in context, not in identity.

**Change:** pseudonymous by default, with no real-name option, and the "why" note treated as a
required field rather than a nice-to-have.

### F-6. Copyright and performer consent came up unprompted, from the participants.

> "I wouldn't want the musicians to find it and think I was uploading their work without asking
> ... It was recorded on my phone, but it isn't my music." — S1

S3 raised the same worry about re-recording a commercial track. Neither was asked about
copyright; both volunteered it, and for S1 it changed what they left — they chose a shorter
instrumental section partly because it "felt worse to upload a recognisable chunk of the
performance".

**Change:** this belongs on the Ethical Considerations page, not only in the backlog. The
prototype currently accepts any audio file, which is the configuration our participants were
uneasy about.

### F-7. Smaller breakdowns

- All three sharers read latitude and longitude at the drop screen and all three wanted a place
  name instead. For S3 the place *was* the point: "The route number is the whole reason I'm
  leaving it."
- The mood icons do not cover what people record. S1 looked for a saxophone and settled for a
  piano; S2 chose 🌊 for the lake even though the sound was a violin track.
- The drop modal opens on **Upload audio**, which pushed S1 — who had just recorded something
  live — down the wrong path first.

## What we are changing next

| Priority | Change | From |
|---|---|---|
| 1 | Playback unlocks on arrival; default radius in tens of metres; no km slider | F-1 |
| 2 | Echo references a track instead of hosting audio | F-3, F-6 |
| 3 | Audio-type label + required "why I left this" note + real track name | F-2, F-5 |
| 4 | One-tap reply with a track; play count shown to the sharer | F-4 |
| 5 | Place name instead of coordinates | F-7 |

## Limitations

- Six participants, recruited through the researcher's own networks, one session each. These
  sessions locate problems; they do not measure how often those problems occur.
- The session records were reconstructed from field notes rather than transcribed word for word,
  so quotations are close paraphrases of what was said.
- Sharers and finders were tested separately and never formed a pair, so no session followed a
  single echo from the person who left it to the person who answered it.
- One device was used throughout, so no session tested genuinely simultaneous multi-user use.
- The gap between leaving and finding an echo was minutes, not days; nobody experienced the
  long silence that S1 said would make them stop.
- Playback distance and replying were simulated by the facilitator, not implemented.

**Next round:** run `evaluation/test-plan.md` in pairs, on two devices, once the arrival gate
exists — and close the loop by returning to the sharer with whatever the finder did.
