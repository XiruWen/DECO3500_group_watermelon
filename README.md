# EchoSpot — Team Watermelon

**DECO3500 Social & Mobile Computing · Semester 2, 2026 · Team 10**

EchoSpot explores how a private listening moment might become something meaningful
for the next listener — music left behind in the everyday places where listening
already happens.

> **Domain statement**
> We are interested in enhancing the way people discover music and connect with each
> other through what previous listeners leave behind at the same everyday places and
> activities (gyms, study spaces, commutes, live venues) — turning solitary listening
> into a shared experience — with the possibilities of social and/or contextual computing.

---

## Quick links

| What | Where |
|---|---|
| **Prototype** | [`EchoSpot/`](EchoSpot/) — see [Running the prototype](#running-the-prototype) |
| **Design Process Overview** | [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Design-Process-Overview) |
| **Ethical Considerations** | [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Ethical-Considerations) |
| **Stand-up records** | [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Stand%E2%80%90up-records) |
| **Task board** | GitHub Projects *(to be set up)* |
| Poster & promotional material | *(Week 12)* |
| Team Charter | [`Watermelon_Charter.pdf`](Watermelon_Charter.pdf) |

---

## Running the prototype

EchoSpot v1 is a static web app. There is **no login** — on first launch you pick a
nickname and an avatar, and that is all.

**Run locally** (the app uses ES modules, so opening `index.html` directly will not work):

```bash
cd EchoSpot
python3 -m http.server 8765
```

Then open <http://localhost:8765> in a browser.

**Using it**

- Allow location access when asked. If you cannot (or are testing away from campus),
  click **Simulate location**, then click anywhere on the map to set your position.
- **＋** leaves an echo at your current position (record live or choose an audio file).
- **Nearby Echoes** lists echoes within the search radius; tap one to play or like it.
- **Reset data** clears everything stored by the app in this browser.

**Known limitations (v1)**

- All data is stored **in the current browser only** (IndexedDB). Echoes left on one
  device are not visible on another yet, so multi-user testing currently happens on a
  single device.
- Demo echoes are generated locally with synthesised audio.

---

## Repository map

```
README.md                  This guide
Watermelon_Charter.pdf     Team Charter
EchoSpot/                  Interactive prototype (HTML/CSS/JS)
design/
  domain-and-concepts.md   Domain, problem framing, concepts, existing solutions
  decision-log.md          Decisions, open questions, rejected directions
  prototype-plan.md        Plan of work, selection criteria, content rights
interviews/
  interview-guide.md       Question criteria, core questions, probes, analysis method
  Interview_Transcript*    De-identified transcripts with coding tables
  Interview_Notes*         Interviewer notes (paraphrased, not verbatim)
literature/
  _TEMPLATE_paper-critique.md
  <name>_<paper-slug>.md   Paper critiques (~400 words each)
```

Research evidence (quotes, survey results, photos, sketches, wireframes) is added to the
matching folder as we gather it. Process narrative, meeting records and ethics live in
the **WIKI**.

---

## Team

| Name | Preferred | Role |
|---|---|---|
| Yiqin Cai | Rach | Front-end & UI lead; team coordinator |
| Lingjie Ruan | Jay | Programming (Python) & collaboration |
| Xiru Wen | Lily | User research & stakeholder interviews |
| Jie Wen | Cho | Interaction design & visual communication |
| Chuxin Zhang | Cristina | Research synthesis & audio-visual prototyping |

## How we work

- **Branches:** work on a branch named `<name>/<topic>`, then open a Pull Request into
  `main` — as agreed in our Charter.
- **Tasks:** tracked as issues on GitHub Projects, one per task, assigned to a person,
  closed by the PR that finishes it.
- **Meetings:** in class + online weekly. Decisions are made in class and recorded in the
  WIKI stand-up records.
- **Daily communication:** WeChat, response expected within 24 hours.

## Assessment artefacts

| Item | Status |
|---|---|
| Team Charter | ✅ [`Watermelon_Charter.pdf`](Watermelon_Charter.pdf) |
| Design Proposal presentation | ✅ delivered Week 5 |
| Literature critiques | 🔄 in progress — [`literature/`](literature/) |
| Interviews | 🔄 1 transcript + 1 set of interviewer notes — [`interviews/`](interviews/) |
| Prototype | 🔄 v1 — [`EchoSpot/`](EchoSpot/) |
| Stand-up WIKI page (Week 9) | 🔄 records from Week 3 — [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Stand%E2%80%90up-records) |
| Ethical Considerations (WIKI) | ⬜ |
| Design Process Overview (WIKI) | ⬜ |
| Poster & pitch (Week 12) | ⬜ |
