# Listening in: Practices surrounding iTunes music sharing

**Citation:** Voida, A., Grinter, R. E., Ducheneaut, N., Edwards, W. K., & Newman, M. W. (2005). *Listening in: Practices surrounding iTunes music sharing*. In Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '05), pp. 191–200. ACM. https://doi.org/10.1145/1054972.1054999
**Reviewer:** Cristina · **Date:** 2026-09-09
**Word count of critique:** ~420

---

## Why this paper is useful to EchoSpot

This paper shows that when people make their music visible to others nearby, **sharing music becomes a way of presenting yourself**. It is based on 13 interviews at one company, where iTunes let coworkers on the same network browse each other's music. It explains why people will be careful about what they leave in EchoSpot, and why "who left this?" matters to the person listening. That is the same tension our first interview raised.

## Insight 1 — People curate what they share for their audience

**What the paper shows:**
The authors call this **impression management** (Goffman). People asked themselves what image their library gave. One participant ripped more CDs to "rebalance" his collection across genres. Another hid Hindi music he did not expect coworkers to "relate to". People renamed their shared libraries when managers joined. Sharing was off by default, and one participant said he would have "strongly resented" it being turned on automatically.

**Design implication for EchoSpot:**
An echo is a **performance of taste**, not a neutral log. EchoSpot must **never share what someone is listening to automatically**. Leaving an echo should always be a deliberate act, and people should be able to **edit or remove** echoes they have left. The Ethical Considerations page should cover this.

## Insight 2 — Not knowing who shared is engaging but also frustrating, and it runs one way

**What the paper shows:**
An unclear library name ("SmallieBiggs") led one participant to spend 15–20 minutes on "enjoyable detective work", while another just wished he knew who these people were. Knowing who owned a library affected whether people listened, and a first look led to a quick yes/no decision about ever coming back. Awareness was **asymmetric**: listeners knew whose music they were playing, but providers never knew who was listening. A new library appearing on the network was treated as "an event".

**Design implication for EchoSpot:**
(a) How much a nickname reveals is a **design choice to test**, not settle in advance. Our interview participant said she would give a song "another chance because I know that person". (b) **Fix the asymmetry:** tell the person who left an echo that it was found. This is the step from awareness towards conversation.

## Social / mobile opportunities identified

| # | Opportunity | Time–space cell |
|---|---|---|
| 1 | A place highlights a new echo to the next person who arrives there | Asynchronous + Co-located |
| 2 | The person who left an echo is notified later, from anywhere, that someone found it | Asynchronous + Distributed |

## Where this paper does not help us

The participants were **coworkers, not strangers**, so the social stakes (for example, managers) are different from ours. They shared **whole libraries**, not single songs tied to a place, and **location plays no part**. The study is from 2005, before streaming and algorithmic feeds, so its account of how people discover music is out of date. What still holds is its account of how people present themselves through music.

---

## Extra notes for the team (not part of the ~400-word critique)

- ⚠️ **A trace alone rarely leads to discovery.** In the section on disparate music tastes, the authors report that discovery "rarely happened" inside iTunes. People glanced at unfamiliar music and never came back. The discovery that did happen was sparked by **social contact outside the system**: one participant tried Bollywood music after being invited to film screenings, another tried an artist after being lent a book about him. The authors call for "increased scaffolding for the exploration of new music". **For EchoSpot, an echo needs context — at least a line on why it was left here — or strangers will skip it.** This is the strongest challenge in the paper to our discovery claim.
- **The authors themselves suggest "traces".** When people left the company, their music left a "hole". The authors propose "leaving 'traces' of those missing playlists" so others can keep discovering from them. This is independent support for the idea behind EchoNotes: what someone leaves behind stays useful after they have gone.
- ⚠️ **The riskiest audience is the one in between.** The authors found impression management hardest in the **grey area between intimacy and anonymity**. One participant said he could talk about music with perfect strangers, or with close friends who know him, but people in between "can form misguided perceptions and you'll have to interact with them again". **A campus-only deployment puts EchoSpot users exactly there**: not friends, but people they may meet again. Worth an interview probe and a line on the Ethical Considerations page.
- **Closure matters.** People felt bad cutting off a colleague mid-song without being able to say anything; the authors suggest "listening to music might be like having a conversation; appropriate closure is needed".
- **A new library appearing was "an event"** that triggered the deepest browsing. For us: surface **new echoes at a place** to the next person who arrives.

*AI use: drafted with AI assistance (Claude) from the full text; reviewed and edited by the reviewer.*
