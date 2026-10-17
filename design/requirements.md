# EchoSpot — Experience Requirements

## 1. Overview

EchoSpot is a location-based interactive music sharing experience designed to help people discover and share independent or less-mainstream music through everyday places.

Instead of relying on text-based social interaction, EchoSpot uses **music itself as the main form of communication**. Users can discover songs connected to nearby EchoSpots and respond by sharing another song.

These requirements were developed from our user research, including interviews, transcript analysis, team discussion, and research findings.

---

## 2. Design Goal

The experience should make music discovery feel:

* **Easy** — users should be able to understand how to interact with EchoSpot without lengthy instructions.
* **Music-focused** — songs should remain the central form of interaction.
* **Contextual** — music discovery should feel connected to the user's current place or environment.
* **Low-pressure** — users should be able to participate without needing to start conversations with strangers.
* **Exploratory** — the experience should encourage users to discover music they may not normally encounter.
* **Social without being intrusive** — users should feel the presence of other listeners through music rather than direct messaging.

---

# 3. Experience Requirements

## ER1 — Simple and Low-Effort Interaction

### Requirement

Users should be able to understand the main EchoSpot interaction quickly and participate without completing a complicated setup process.

### Rationale

Our research suggests that users are less likely to engage with a public interactive system if the interaction requires too many steps or too much effort.

EchoSpot should therefore support quick interaction in everyday environments such as campus spaces, cafés, music venues, or other public locations.

### Design Implications

The system should:

* clearly indicate when an EchoSpot can be interacted with;
* use simple and recognisable interaction controls;
* minimise unnecessary screens and steps;
* allow users to listen to a song quickly;
* allow users to share a song through a short interaction flow.

### Success Criteria

A new user should be able to understand how to discover and interact with an EchoSpot without requiring detailed instructions from another person.

---

## ER2 — Music Should Be the Main Communication Medium

### Requirement

Users should communicate through **songs rather than written messages**.

### Rationale

EchoSpot is designed around music discovery rather than traditional social media communication.

Using songs as the primary communication method keeps the experience focused on music and reduces the social pressure associated with writing messages or directly contacting strangers.

### Design Implications

Users can:

* listen to songs shared at an EchoSpot;
* share a song to an EchoSpot;
* respond to an existing musical contribution with another song.

Users **cannot**:

* leave text messages;
* write comments;
* send private messages;
* attach written notes to songs.

### Success Criteria

Users should be able to understand another person's musical contribution without requiring accompanying text.

---

## ER3 — Location Should Influence Music Discovery

### Requirement

The experience should create a clear connection between **music and place**.

### Rationale

EchoSpot is intended to support contextual music discovery. Instead of browsing an unlimited online catalogue, users discover music associated with the environment they are currently in.

The physical location therefore becomes part of the music discovery experience.

### Design Implications

The system should:

* show EchoSpots associated with particular locations;
* allow users to discover songs connected to nearby EchoSpots;
* visually communicate which EchoSpot the user is currently interacting with;
* make the physical or environmental context noticeable within the interface.

### Success Criteria

Users should be able to understand that the songs they are discovering are connected to a particular location rather than appearing randomly.

---

## ER4 — Encourage Discovery Beyond Familiar Music

### Requirement

EchoSpot should encourage users to encounter music outside their normal listening habits.

### Rationale

One of the main opportunities identified by the project is supporting discovery of independent, emerging, or less-mainstream music that users may not encounter through conventional recommendation systems.

### Design Implications

The interface should:

* prioritise discovery over popularity rankings;
* make unfamiliar songs easy to preview;
* avoid relying entirely on existing listening history;
* expose users to contributions from other people in the same environment;
* allow users to explore music without needing to know the artist beforehand.

### Success Criteria

Users should feel that EchoSpot provides opportunities to discover songs or artists they would not normally encounter through their existing music platforms.

---

## ER5 — Low Social Pressure

### Requirement

Users should be able to participate without feeling forced to directly communicate with strangers.

### Rationale

Direct messaging or face-to-face interaction can create a barrier for users who are interested in other people's music but do not want to initiate a social conversation.

EchoSpot should allow lightweight social participation through shared music.

### Design Implications

The system should:

* avoid requiring direct messages;
* avoid requiring written introductions;
* allow users to participate anonymously or with minimal personal information where appropriate;
* allow users to listen without being required to contribute;
* allow musical responses without direct interpersonal conversation.

### Success Criteria

Users should feel comfortable exploring other people's musical contributions even when they do not know the contributors.

---

## ER6 — Users Should Feel the Presence of Other Listeners

### Requirement

Although direct messaging is not included, users should still feel that EchoSpot contains contributions from real people.

### Rationale

EchoSpot is not intended to feel like a normal algorithmic recommendation system.

The value of the system comes from understanding that another listener has intentionally shared music in that place.

### Design Implications

The interface may communicate social presence through:

* the number of songs contributed;
* recent musical activity;
* visual indicators showing that songs were contributed by other listeners;
* relationships between an existing song and a song shared in response.

Personal information should not be required simply to create this feeling of social presence.

### Success Criteria

Users should recognise that music in EchoSpot comes from community participation rather than being automatically generated by the system.

---

## ER7 — Users Should Have Control Over Participation

### Requirement

Users should be able to choose how actively they participate in EchoSpot.

### Rationale

Different users may want different levels of engagement. Some users may only want to listen, while others may want to contribute songs.

Requiring contribution before allowing discovery could discourage participation.

### Design Implications

Users should be able to:

* browse or listen without contributing;
* decide whether to share a song;
* leave an EchoSpot interaction at any time;
* avoid unnecessary personal disclosure.

### Success Criteria

Users should not feel forced to contribute content in order to access the core music discovery experience.

---

## ER8 — The Interface Should Support Quick Public Use

### Requirement

EchoSpot should be usable in short, everyday moments.

### Rationale

The system may be used while people are moving through public environments rather than sitting down specifically to use the application.

The interaction therefore needs to accommodate limited attention and short interaction periods.

### Design Implications

The system should:

* present important information clearly;
* avoid long text-heavy screens;
* make the primary action visually obvious;
* minimise the number of decisions required at each step;
* provide immediate feedback after an action.

### Success Criteria

Users should be able to complete the main interaction — discovering a song or sharing a song — within a short interaction session.

---

# 4. Functional Requirements

The following functional requirements support the experience requirements.

| ID   | Functional Requirement                                                                           | Related Experience Requirement |
| ---- | ------------------------------------------------------------------------------------------------ | ------------------------------ |
| FR1  | The system should allow users to identify or access a nearby EchoSpot.                           | ER1, ER3                       |
| FR2  | The system should display songs associated with an EchoSpot.                                     | ER3, ER4                       |
| FR3  | The system should allow users to play or preview a shared song.                                  | ER1, ER4                       |
| FR4  | The system should allow users to contribute a song to an EchoSpot.                               | ER1, ER2                       |
| FR5  | The system should allow a user to respond to music through another song.                         | ER2, ER6                       |
| FR6  | The system should indicate that songs were contributed by other listeners.                       | ER6                            |
| FR7  | The system should allow users to listen without requiring them to contribute.                    | ER5, ER7                       |
| FR8  | The system should provide clear feedback after a song is successfully shared.                    | ER1, ER8                       |
| FR9  | The system should associate shared songs with the relevant EchoSpot/location.                    | ER3                            |
| FR10 | The system should support exiting or cancelling an interaction without requiring a contribution. | ER7                            |

---

# 5. Interaction Boundaries

To maintain the intended EchoSpot experience, the current concept intentionally excludes several conventional social-media features.

EchoSpot does **not** require:

* text comments;
* written messages;
* private messaging;
* public discussion threads;
* text captions attached to songs;
* follower counts;
* popularity-based social ranking.

The focus remains on:

**Place → Music Discovery → Listening → Musical Response**

rather than:

**Profile → Text Conversation → Social Networking**

---

# 6. Core User Experience Flow

A typical EchoSpot interaction should follow a simple flow:

1. The user encounters or discovers an EchoSpot.
2. The user opens the EchoSpot.
3. The user sees music associated with that location.
4. The user selects and listens to a song.
5. The user may continue exploring other songs.
6. If they want to participate, they can share a song.
7. Their song becomes part of the musical activity associated with that EchoSpot.
8. Other users can later discover or respond to that contribution through music.

The user is never required to write a message in order to participate.

---

# 7. Priority Requirements

For the current prototype, the highest-priority experience requirements are:

### High Priority

* **ER1 — Simple and Low-Effort Interaction**
* **ER2 — Music Should Be the Main Communication Medium**
* **ER3 — Location Should Influence Music Discovery**
* **ER4 — Encourage Discovery Beyond Familiar Music**
* **ER5 — Low Social Pressure**

### Supporting Requirements

* **ER6 — Users Should Feel the Presence of Other Listeners**
* **ER7 — Users Should Have Control Over Participation**
* **ER8 — The Interface Should Support Quick Public Use**

These requirements should guide future prototype development and evaluation.

---

# 8. Requirement Summary

EchoSpot should provide a lightweight, location-based music discovery experience where people can connect indirectly through music.

The experience should not recreate a traditional social media platform. Instead, it should allow users to discover the musical presence of other people in a place and participate by contributing music of their own.

The central design principle is:

> **People communicate through the music they leave behind, not through written messages.**

These requirements will be used to guide the next stage of prototype development and evaluation.

