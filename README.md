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
| **Prototype — live** | <https://xiruwen.github.io/DECO3500_group_watermelon/EchoSpot/> (works on a phone; no login) |
| **Prototype — source** | [`EchoSpot/`](EchoSpot/) — see [Running the prototype](#running-the-prototype) |
| **Prototype changelog** | [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Prototype-changelog) — what changed between versions, and why |
| **Evaluation** | [`evaluation/`](evaluation/) — round 1 findings and the round 2 plan |
| **Design Process Overview** | [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Design-Process-Overview) |
| **Ethical Considerations** | [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Ethical-Considerations) |
| **Stand-up records** | [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Stand%E2%80%90up-records) |
| **Task board** | GitHub Projects *(not set up)* |
| Poster & promotional material | A2 conference poster — tradeshow, Week 12 |
| Team Charter | [`Watermelon_Charter.pdf`](Watermelon_Charter.pdf) |

---

## Running the prototype

EchoSpot is a static web app — no build step, no backend, **no login**. On first launch you
pick a nickname and an avatar, and that is all.

**Use the deployed version** (recommended, and the only way to get real GPS on a phone —
browsers only hand out location over HTTPS):
<https://xiruwen.github.io/DECO3500_group_watermelon/EchoSpot/>

**Or run it locally** (ES modules, so opening `index.html` from the file system will not work):

```bash
cd EchoSpot
python3 -m http.server 8765
```

Then open <http://localhost:8765>.

### The one rule

An echo is **visible from anywhere, but only plays within 50 m of where it was left**.
Further away it stays locked: no audio and no preview, just a line telling you how far is left
to walk. There is no search radius. Every echo is on the map, and distance alone decides what you
can hear. The ring around your dot on the map is the 50 m you need to be inside.

### Getting around

On a phone the app is a bottom tab bar:

| Tab | What it does |
|---|---|
| **Map** | Where you are and the echoes around you. The ◎ button returns to your position. |
| **Nearby** | Every echo, closest first, each with its lock state. The badge counts the ones playable from where you stand. |
| **＋** | Leave an echo: attach a streaming link, record live, or choose an audio file. Add the audio type and one line on why you left it here. |
| **You** | The echoes you left, how many times they were played, and what came back. |
| **More** | Simulate location, reset data. |

On a laptop the list stays as a side panel and the header carries the same controls.

**Testing without going outside:** More → **Simulate location**, then tap the map to stand
there. Walking into and out of the 50 m ring is the thing worth testing.

**What is simulated, and what is real**

- Real: location, the 50 m unlock rule, recording, leaving and finding echoes, replies.
- Simulated: the demo echoes are generated locally, with synthesised audio and invented
  nicknames, so the map is never empty. Thirteen are placed at real UQ St Lucia spots (four each
  in ModWest, Building 11A, and the Advanced Engineering Building, the rest around campus). If you
  open the app somewhere else, a few more are scattered around you.
- Not built yet: echoes are stored **in this browser only** (IndexedDB), so two devices do
  not see each other's echoes. Multi-user interaction is demonstrated by handing one device
  over, and shared storage is the next piece of work.

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
  user-research-findings.md  Synthesis across the interviews
  Interview_Transcript*    De-identified transcripts with coding tables
evaluation/
  test-plan.md             Round 2 plan: paired sessions, two devices
  findings.md              Round 1 findings, evidence and the changes they forced
  Prototype_Test_*.md      Session records, reconstructed from field notes
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
| Interviews | ✅ 14 transcripts + synthesis — [`interviews/`](interviews/) |
| Prototype | 🔄 v3, deployed — [live](https://xiruwen.github.io/DECO3500_group_watermelon/EchoSpot/) · [`EchoSpot/`](EchoSpot/) |
| Evaluation | ✅ round 1 (6 in-situ sessions) — [`evaluation/`](evaluation/) · round 2 planned |
| Stand-up WIKI page (Week 9) | 🔄 records from Week 3 — [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Stand%E2%80%90up-records) |
| Ethical Considerations (WIKI) | ✅ [WIKI](https://github.com/XiruWen/DECO3500_group_watermelon/wiki/Ethical-Considerations) |
| Design Process Overview (WIKI) | ⬜ |
| Poster & pitch (Week 12) | 🔄 A2 poster drafted, pitch to rehearse |
