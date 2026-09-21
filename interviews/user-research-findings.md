# 用户研究发现（中文版）
**EchoSpot · DECO3500 Social & Mobile Computing · 西瓜队 · 15 场访谈 · 负责人：文茜茹**

## 关键词

<table>
<thead><tr><th>主题</th><th>关键词</th><th>意思 / 证据</th><th>功能设计指导</th></tr></thead>
<tbody>
<tr><td rowspan="2">情境计算</td><td>此刻驱动</td><td>听什么看当下心情、天气、在干嘛，不看固定品味</td><td>每条回声带心情和场景标签</td></tr>
<tr><td>环境声记忆</td><td>磨豆机、电梯声这些非音乐声，才是最牢的地点记忆</td><td>支持录自己的环境声，痕迹长期留</td></tr>
<tr><td>时空矩阵</td><td>地点绑定</td><td>发生过事的地方会把歌黏住（电梯、66路、公园、西湖）</td><td>歌钉在真实地点，地图落点</td></tr>
<tr><td rowspan="3">人策展非算法</td><td>人为策展</td><td>歌单乱七八糟才像人挑的，大家还挺吃这套</td><td>EchoVibe 共享队列，显示是谁选的</td></tr>
<tr><td>发现靠人</td><td>朋友、社群、小场地，信息太散</td><td>地点分发替代算法推荐</td></tr>
<tr><td>创作者难出头</td><td>独立音乐人最愁没人发现</td><td>让创作者在有意义地点留歌</td></tr>
<tr><td rowspan="2">社会性不是社交媒体</td><td>人加理由</td><td>没名没因的歌等于算法推荐</td><td>加一句为什么留这，匿名但给上下文</td></tr>
<tr><td>匿名好奇</td><td>陌生人的痕迹没社交压力，反而更认真听</td><td>只昵称头像，不暴露实时位置</td></tr>
<tr><td>觉察到对话</td><td>想回没回</td><td>想回应却因麻烦或尴尬咽回去了</td><td>一步式回应，点赞当破冰</td></tr>
<tr><td rowspan="2">隐私与自我呈现</td><td>留痕是表演</td><td>留歌是在秀品味，也怕暴露隐私（谁都能猜到我在哪）</td><td>留痕要刻意，能改能删</td></tr>
<tr><td>参与不对称</td><td>大家都多拿少给，还挑匿名的地方留</td><td>接受不对称，按匿名度选地点</td></tr>
<tr><td>冷启动</td><td>留存等于信任</td><td>痕迹没了就觉得这 app 废了</td><td>本地种子回声，校区范围保密度</td></tr>
</tbody>
</table>

**策划侧补一句：** 用户自己产的内容才长久有用，纯病毒没用。版权到期歌链会挂，所以只存引用不存音频。赶通勤这种场景化触达有效。

## 和 Social & Mobile 课程的对应

| 课程概念 | 研究里看到的 | EchoSpot 怎么答 |
|---|---|---|
| 时空矩阵 | 派对是同时同地，电梯歌是异时同地 | EchoNotes 正好落在技术真正需要的格子 |
| 觉察到对话到互相了解 | 很多痕迹被看到却没被回 | 我们补上回应这一步 |
| 情境计算 | 情绪天气活动夜间安全都是情境 | 情境是氛围和时刻，不是坐标 |
| 社会性不是社交媒体 | 要匿名，不想认识店员 | 没主页没关注，社会单元是地点不是人 |

## 口播稿（1 到 2 分钟）

我们做了 15 场访谈，有学生、音乐社团成员、三位创作者，还有一位做音乐 App 的策划。有四点每次都冒出来。

第一，大家是按此刻选歌的，看心情看天气看在干嘛，不是看固定品味。第二，歌会在发生过什么的地方黏住记忆，公交站、公园、甚至电梯。第三，一条痕迹背后得有人有理由才信，没有就跟算法推荐没两样，而且匿名反而让人更好奇。第四，人其实想回应一条痕迹，但常常没回，因为回应麻烦或者尴尬，而那次回应才是最关键的瞬间。

这四点每一个都变成了我们的一个设计决定：心情标签、地图落点、只用昵称、还有规划中的一步式回应。我们还听到创作者真正的难处，就是被对的人发现，而这正好是用地点、由人策展的分享能解决的。

## 样本说明

现有 15 份转录覆盖学生听众、音乐社团成员、业余创作者三人、音乐 App 策划。没看到明确的知名音乐制作人和资深付费用户视角，汇报时按没访谈处理，不写进结论。

---

# User Research Findings (English)
**EchoSpot · DECO3500 Social & Mobile Computing · Team Watermelon · 15 interviews · owner: Xiru Wen**

## Keywords

<table>
<thead><tr><th>Theme</th><th>Keyword</th><th>Meaning / evidence</th><th>Design guidance</th></tr></thead>
<tbody>
<tr><td rowspan="2">Contextual computing</td><td>Moment-driven</td><td>People pick by mood, weather, what they're doing, not a fixed taste</td><td>Each echo carries a mood and scene tag</td></tr>
<tr><td>Ambient sound memory</td><td>Grinder, lift, mahjong sounds are the strongest place anchors</td><td>Let users record their own ambient sound, keep traces</td></tr>
<tr><td>Time-space matrix</td><td>Place-binding</td><td>A song sticks to a place once something happens there (lift, bus 66, park, lake)</td><td>Song pinned to a real spot on the map</td></tr>
<tr><td rowspan="3">Curation over algorithm</td><td>Human curation</td><td>A messy playlist proves a human chose it, and people love that</td><td>EchoVibe shared queue that shows who picked it</td></tr>
<tr><td>Discovery through people</td><td>Friends, communities, small venues; info is scattered</td><td>Place based distribution instead of algorithm feed</td></tr>
<tr><td>Creator discovery gap</td><td>Indie makers most worry about being found by the right people</td><td>Let creators drop tracks at meaningful places</td></tr>
<tr><td rowspan="2">Social, not social media</td><td>Person plus reason</td><td>A song with no name and no why is just an algorithm</td><td>Add a why line, anonymous but with context</td></tr>
<tr><td>Anonymous curiosity</td><td>A stranger's trace has zero social pressure, so people listen harder</td><td>Nickname and avatar only, no live location</td></tr>
<tr><td>Awareness to conversation</td><td>Want to reply but don't</td><td>They hold back because it's effort or awkward</td><td>One-step reply, like as icebreaker</td></tr>
<tr><td rowspan="2">Privacy and self-presentation</td><td>Leaving is performing taste</td><td>Dropping a song shows your taste and risks privacy (anyone can guess where I am)</td><td>Leaving stays deliberate, allow edit and remove</td></tr>
<tr><td>Asymmetric use</td><td>Everyone takes more than they give, and picks anonymous spots</td><td>Accept the imbalance, let people pick by anonymity</td></tr>
<tr><td>Cold start</td><td>Persistence is trust</td><td>If a trace vanishes, the app feels dead</td><td>Seed local echoes, keep density within campus</td></tr>
</tbody>
</table>

**Planner side note:** User made content is the only kind that lasts; pure virality does not. When a licence expires the song link dies, so we store a reference, never the audio. Contextual reach like the morning commute works.

## Social & Mobile Computing mapping（和社会与移动计算课对上号）

这门课不是教你写个 App，而是让你证明：你做的东西，正好用上了"社会 + 手机/移动"这两个能力去解决一个真实问题。下面四点是课上的核心概念，我先把每个概念翻译成人话，再说我们访谈里看到了什么，最后说 EchoSpot 怎么对应上。

**中文对照**

| 课程概念（人话版） | 访谈里看到的 | EchoSpot 怎么回应 |
|---|---|---|
| **时间 × 空间**：同一时刻还是不同时刻、同一地点还是不同地点，组合出四种情况。手机 App 最该帮的是"不同时间、同一地点"这种（你不在场时，别人留下的东西你之后才看到） | 派对是"同时在场同地"；但电梯里、66 路公交上那些歌，是"不同时间、同一地点"才被发现的 | EchoSpot 的主玩法就落在"不同时间、同一地点"这一格，也就是技术真正该出力的地方 |
| **觉察 → 对话 → 互相了解**：先注意到一个痕迹（觉察），再回应它（对话），久了这条痕迹串成一段公共记忆（互相了解） | 很多痕迹大家"看到了"却没回，对话这一步断在半路 | 我们专门补上"回应"这一步，让一条回声能从被看到变成被接话 |
| **情境计算**：App 要懂得"此时此地"的背景，而不是只给个 GPS 坐标 | 心情、天气、在干嘛、晚上安不安全，这些才是真正的背景 | 我们把情境当成"气氛 + 当下这一刻"，不只是经纬度；所以回声带心情标签和一句为什么 |
| **社会性，不是社交媒体**：让人和人有真实互动，而不是搞成又一个要涨粉、要人设的社交平台 | 大家想要匿名，根本不想加咖啡师好友 | 没有个人主页、没有关注、没有信息流；社交单位是"地点"，不是"某个人" |

**English**

| Course concept (in plain words) | What the research shows | How EchoSpot answers |
|---|---|---|
| **Time-space**: same vs different time, same vs different place, makes four cases. A phone app is most useful for "different time, same place" (you see what someone left after they're gone) | Parties are same time same place; but lift songs and bus 66 songs are found "different time, same place" | EchoSpot's main mode sits in that "different time, same place" cell, where tech actually earns its keep |
| **Awareness to conversation to mutual learning**: first you notice a trace, then you reply, then over time the trace builds into shared memory | Many traces get seen but not answered, the conversation step breaks | We add the reply step on purpose, so an echo can go from noticed to answered |
| **Contextual computing**: the app should know the "here and now" background, not just a GPS pin | Mood, weather, what you're doing, night safety are the real background | We treat context as atmosphere plus the moment, not coordinates; so an echo carries a mood tag and a why line |
| **Social, not social media**: real human interaction, not another platform to grow followers and a persona | People want anonymity, they don't want to be friends with the barista | No profile, no follows, no feed; the social unit is a place, not a person |

## Oral script (1 to 2 minutes)

We ran 15 interviews with students, a music club member, three creators, and one music app planner. Four things came up every single time.

One, people choose music by the moment, by their mood, the weather, what they're doing, not by a fixed taste. Two, a song sticks to a place once something happens there, a bus stop, a park, even a lift. Three, a trace is only trusted if there's a person and a reason behind it. Without that it's just an algorithm, and anonymity actually makes people more curious. Four, people want to reply to a trace but often don't, because replying is effort or awkward, and that reply is the moment that matters.

Each of those became a design call: the mood tag, the pin on the map, nickname only, and a planned one-step reply. We also heard creators' real pain, being found by the right people, and that's exactly what place based, human curated sharing solves.

## Coverage note

The 15 transcripts cover student listeners, a music club member, three hobbyist creators, and one music app planner. There is no clear view from a well known producer or a heavy paying user, so we treat those as not interviewed and keep them out of the conclusions.
