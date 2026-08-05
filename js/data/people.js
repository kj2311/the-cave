/* ============================================================
   people.js — reading-people and influence content.

   A deliberate stance runs through this file: isolated "tells"
   do not detect lying. Decades of research puts people at about
   chance when they try. What *is* trainable is noticing that a
   person has departed from their own baseline — which tells you
   where to look next, not what the answer is.
   ============================================================ */

export const BASELINES = [
  {
    id: 'b-desk',
    baseline: 'Across two earlier conversations, Marcus talks with his hands constantly, leans back in his chair, and interrupts himself to chase tangents. He laughs easily and loudly.',
    moment: 'You ask him where the shipment invoices went. He keeps talking at the same speed and volume — but his hands come to rest flat on the table and stay there for the rest of the answer.',
    question: 'What is the meaningful signal here?',
    options: [
      { t: 'Stillness in a habitually animated person, timed to a specific question.', ok: true },
      { t: 'He is lying about the invoices.', ok: false },
      { t: 'Hands flat on a table is a well-known dominance display.', ok: false },
      { t: 'Nothing — hand position is noise.', ok: false },
    ],
    explain: 'The content is unchanged; the channel he does not think about went quiet. Sudden stillness in someone whose baseline is motion is a real deviation, and the timing points at the invoices. What it means is still open — it could be fear, concentration, grief, or a lie. It marks the spot. It does not answer the question.',
    myth: 'There is no gesture that means "lying". Meta-analyses of deception cues find effects near zero for almost every popular tell. Deviation tells you where to dig, never what you will find.',
  },
  {
    id: 'b-quiet',
    baseline: 'Priya is precise and quiet. She thinks before she speaks, leaves long pauses, and rarely gestures.',
    moment: 'Asked about the budget overrun, she answers immediately, at length, and volunteers two details you did not ask for.',
    question: 'What is the meaningful signal here?',
    options: [
      { t: 'A normally deliberate speaker becoming fast and over-complete.', ok: true },
      { t: 'She is nervous, since she is talking too much.', ok: false },
      { t: 'Volunteering extra detail is a classic sign of a rehearsed story.', ok: false },
      { t: 'Nothing — she knows this topic well, so fluency is expected.', ok: false },
    ],
    explain: 'The direction of the deviation does not matter; the fact of it does. For Marcus the tell was going still, for Priya it is going fluent. This is why baselines are per-person: the same behaviour is a signal in one and noise in another. Note that option 4 is a real possibility — but you establish that by asking, not by assuming.',
    myth: '"Too much detail means rehearsed" and "too little means evasive" cannot both be reliable. Any rule that fires in both directions is not a rule.',
  },
  {
    id: 'b-hands',
    baseline: 'At the start of the interview, Tom keeps his arms folded, sits back, and answers in short sentences. He has been like this for forty minutes.',
    moment: 'When you shift to asking about his daughter, he unfolds his arms, leans forward, and starts elaborating.',
    question: 'What have you actually learned?',
    options: [
      { t: 'That this topic changes his state — and that folded arms were his baseline, not a defensive signal.', ok: true },
      { t: 'That he was closed off earlier and has now opened up honestly.', ok: false },
      { t: 'That he is more likely to lie about his daughter, since he is now performing warmth.', ok: false },
      { t: 'That the room was cold and he has warmed up.', ok: false },
    ],
    explain: 'The folded arms carried no meaning until the moment they changed. This is the most common error in reading people: treating a *steady state* as a signal. A posture held for forty minutes is furniture. The information is in the transition and in what triggered it.',
    myth: 'Folded arms is the most over-read posture in existence. It usually means the person is cold, the chair has no armrests, or that is simply how they sit.',
  },
  {
    id: 'b-latency',
    baseline: 'Every question so far has been answered after a beat of about half a second — consistent, comfortable, unhurried.',
    moment: 'You ask a question that requires only recall — "which entrance did you use?" — and the pause stretches to four seconds before a short answer.',
    question: 'Why is this pause worth noticing when others were not?',
    options: [
      { t: 'The question needed retrieval, not construction, so the extra time is unaccounted for.', ok: true },
      { t: 'Long pauses before answering indicate deception.', ok: false },
      { t: 'Short answers after long pauses indicate deception.', ok: false },
      { t: 'It is not worth noticing; four seconds is within normal range.', ok: false },
    ],
    explain: 'Latency only means something relative to the cognitive work the question demands. "Which entrance did you use" is a lookup — for an honest witness it is fast even when the rest of the account is slow. The deviation is between the *expected* cost of the question and the time actually taken. That gap is the observation.',
    myth: 'Raw pause length is close to useless. Pause length relative to question difficulty is where the information lives.',
  },
  {
    id: 'b-group',
    baseline: 'A team of five meets weekly. The manager speaks first, then the senior engineer, then the others. Nobody interrupts the manager.',
    moment: 'This week, when the manager finishes, the room stays silent for several seconds and two people glance at the junior designer before anyone speaks.',
    question: 'What does the glance tell you?',
    options: [
      { t: 'The room believes the designer holds information relevant to what was just said.', ok: true },
      { t: 'The designer has done something wrong.', ok: false },
      { t: 'The designer is the real decision-maker in the group.', ok: false },
      { t: 'The team disagrees with the manager.', ok: false },
    ],
    explain: 'Groups point. When a topic lands, eyes move toward whoever the room associates with it — faster than anyone decides to look, and usually without anyone noticing they did. It reliably identifies *association*, not guilt, authority, or agreement. Reading more than association into a glance is where people go wrong.',
    myth: 'Nobody in a room controls where their eyes go in the first half second. That is exactly why the first half second is the only part worth reading.',
  },
  {
    id: 'b-smile',
    baseline: 'Anna smiles frequently — a quick, wide, easy smile that appears and disappears fast.',
    moment: 'Told she has been passed over for the promotion, she smiles. It arrives a beat late, climbs more slowly than her usual, holds far longer, and fades in steps rather than all at once.',
    question: 'What is the most defensible reading?',
    options: [
      { t: 'The timing is off for her — worth noting, and not much more than that.', ok: true },
      { t: 'This is a fake smile, so she is concealing her real reaction.', ok: false },
      { t: 'She is secretly pleased about the outcome.', ok: false },
      { t: 'She is hiding anger.', ok: false },
    ],
    explain: 'The *dynamics* — onset speed, duration, how it decays — are the part with reasonable support, and they are off her own baseline of quick-on, quick-off. That earns you "this one is different", which is a modest claim. It does not earn you "fake", and it certainly does not tell you which feeling sits underneath. Notice how tempting option 2 is, and how much it assumes.',
    myth: 'The famous test — a real smile crinkles the eyes, a fake one does not — does not hold. The eye muscle turns out to be voluntarily controllable by most people, and studies find the "genuine" marker present in somewhere between 56% and 71% of deliberately posed smiles. It is one of the most confidently repeated and least reliable cues in circulation.',
  },
  {
    id: 'b-pronoun',
    baseline: 'Describing his week, Daniel says "I" constantly — I went, I told him, I decided. It is his normal register.',
    moment: 'Describing the evening in question, the account shifts: "the car was taken round the back", "then there was a conversation", "things got heated".',
    question: 'What has changed?',
    options: [
      { t: 'He has removed himself grammatically from the events he is describing.', ok: true },
      { t: 'He is lying about the evening.', ok: false },
      { t: 'He does not remember the evening clearly.', ok: false },
      { t: 'He is protecting someone else who was present.', ok: false },
    ],
    explain: 'What you can say is narrow and it is the only thing worth saying: his register changed at a specific point in the account. That is an observation about *language*, and it marks which minutes to go back to. Options 2, 3 and 4 all leap to a cause, and the evidence does not reach any of them.',
    myth: 'You will read that liars drop first-person pronouns to distance themselves. The literature is far shakier than the confident version suggests: results are inconsistent across studies, several find no significant pronoun effect at all, and there is real concern that earlier successes were artefacts of particular datasets rather than a genuine signal. Treat a shift in register as a place to ask another question — never as a cue to deception.',
  },
  {
    id: 'b-cluster',
    baseline: 'Throughout the meeting Sam has been relaxed, open, consistent.',
    moment: 'On one question, three things happen within two seconds: his foot turns toward the door, he swallows, and he asks you to repeat the question.',
    question: 'Why does this carry more weight than any one of those alone?',
    options: [
      { t: 'Independent channels shifting simultaneously is far less likely to be coincidence.', ok: true },
      { t: 'Feet pointing at exits is a proven indicator of a desire to escape.', ok: false },
      { t: 'Asking for a repeat is a stalling tactic used to buy time.', ok: false },
      { t: 'Swallowing indicates a dry mouth caused by stress.', ok: false },
    ],
    explain: 'Each of those behaviours alone is background noise — everyone swallows, everyone shifts, everyone mishears. Three landing together on one stimulus is simply less likely to be coincidence, which makes it worth a follow-up question. That is the entire claim.',
    myth: 'Be careful not to upgrade this. "Clusters are reliable where single cues are not" is a popular move in training courses, and the evidence for it is thin — stacking weak indicators does not reliably produce a strong one. A cluster earns you a better question, not a verdict.',
  },
  {
    id: 'b-comfort',
    baseline: 'The conversation has been easy for ten minutes. She has been leaning slightly toward you.',
    moment: 'You mention her business partner by name. Her posture does not change, but she picks up her coffee — which is empty — and holds it with both hands.',
    question: 'What is this?',
    options: [
      { t: 'A self-soothing move using an object as a barrier, cued by the name.', ok: true },
      { t: 'A sign she dislikes her business partner.', ok: false },
      { t: 'Thirst.', ok: false },
      { t: 'A deliberate stalling tactic.', ok: false },
    ],
    explain: 'Reaching for an empty cup is the detail that matters: the action has no functional purpose, so it is being performed for its own sake — hands occupied, something held between you and her. Pacifying behaviours are common and reliable as indicators of *raised arousal*. The name is the trigger. What the name means to her is the next question, not this one.',
    myth: 'Barrier and self-soothing behaviours indicate discomfort, full stop. Discomfort has a hundred causes and dislike is only one of them.',
  },
  {
    id: 'b-story',
    baseline: 'Her account of the day has run chronologically, with rich sensory detail — what the room smelled like, what someone was wearing.',
    moment: 'For one twenty-minute window, the detail thins to a summary — "we sorted out the paperwork and then left" — before richness returns.',
    question: 'What is the observation?',
    options: [
      { t: 'A local drop in detail density, inconsistent with the rest of her recall.', ok: true },
      { t: 'She is concealing what happened in that window.', ok: false },
      { t: 'Nothing happened in that window worth describing.', ok: false },
      { t: 'She is compressing a boring administrative task, which is normal.', ok: false },
    ],
    explain: 'Detail density is a channel most people never think to control, so it varies honestly — and a sharp local drop against a rich baseline is a real anomaly. Options 3 and 4 are entirely plausible explanations *for* that anomaly, which is the point: you have found a question, not an answer. The correct next move is to ask her to walk through those twenty minutes again, in reverse.',
    myth: 'Asking for the account again in reverse order is a good move — but for a duller reason than you will read elsewhere. Early studies suggested it exposed liars by loading them cognitively; later replications did not reproduce the effect, and meta-analytic work does not support it as a lie-detection technique. It survives because it is a genuine memory aid: a different retrieval route surfaces detail the first pass missed.',
  },
];

/* ------------------------------------------------------------
   Influence / cold reading.

   Taught here as a defensive skill first: these are the exact
   mechanics used by psychics, fraudsters and bad-faith
   negotiators. Knowing the shape of the trick is what makes
   you immune to it.
   ------------------------------------------------------------ */

export const TECHNIQUES = {
  barnum:  { name: 'Barnum statement', note: 'A claim broad enough to fit almost anyone, phrased so it feels specific and personal.' },
  rainbow: { name: 'Rainbow ruse',     note: 'Asserts a trait and its opposite at once, so any self-image finds a match.' },
  fork:    { name: 'Fork',             note: 'A statement built so either response confirms it; the reader claims the branch that lands.' },
  fuzzy:   { name: 'Fuzzy fact',       note: 'A vague hit that the subject fills in with real detail — and then remembers as the reader\'s.' },
  vanish:  { name: 'Vanishing negative', note: 'A negative framed so a "no" becomes confirmation of insight.' },
  mine:    { name: 'Fishing',          note: 'A question disguised as a statement, harvesting detail to be replayed later as knowledge.' },
};

export const COLDREADS = [
  {
    id: 'cr-barnum',
    subject: 'A stranger in their late twenties, at a party, who has just asked what you do.',
    question: 'Which line is engineered to land on almost anyone?',
    options: [
      { t: '"You come across as very open, but there is a part of you that you keep well back from people."', ok: true },
      { t: '"You are the eldest of three and your father worked with his hands."', ok: false },
      { t: '"You had a difficult conversation this morning."', ok: false },
      { t: '"You don\'t enjoy parties like this one."', ok: false },
    ],
    tech: 'barnum',
    explain: 'It flatters, it is unfalsifiable, and essentially every adult believes it about themselves — everyone experiences an inner life richer than what they show. The others are specific and can be wrong out loud, which is exactly what a cold reader avoids.',
  },
  {
    id: 'cr-rainbow',
    subject: 'A quiet man who has said almost nothing for ten minutes.',
    question: 'Which statement is a rainbow ruse — covering a trait and its opposite?',
    options: [
      { t: '"You are mostly reserved, but with people you trust, you are the loudest in the room."', ok: true },
      { t: '"You are a naturally reserved person."', ok: false },
      { t: '"You are quiet tonight because something is on your mind."', ok: false },
      { t: '"You prefer listening to talking."', ok: false },
    ],
    tech: 'rainbow',
    explain: 'The rainbow ruse covers the full span, so it cannot miss: if he is shy it is a hit, and if he is secretly gregarious it is a *better* hit — it seems to have seen past the surface. Watch for the "but with the right people…" hinge; that is the seam.',
  },
  {
    id: 'cr-fork',
    subject: 'Someone who has just mentioned, vaguely, that work has been "a lot" lately.',
    question: 'Which line is a fork — where both answers confirm the reader?',
    options: [
      { t: '"There is a decision you keep circling back to, isn\'t there."', ok: true },
      { t: '"You are thinking about leaving your job."', ok: false },
      { t: '"Your manager is the problem."', ok: false },
      { t: '"You have been there about three years."', ok: false },
    ],
    tech: 'fork',
    explain: 'If they say yes, the reader was right. If they say no, the reader says "not yet — but it is coming" and it becomes a prediction. The tell of a fork is that it is unfalsifiable in *both* directions, which no honest statement is.',
  },
  {
    id: 'cr-fuzzy',
    subject: 'A woman who has just sat down opposite you.',
    question: 'Which line is designed to make her supply the content and then credit you for it?',
    options: [
      { t: '"I am getting something around an older woman — a name with an M, or a J."', ok: true },
      { t: '"Your grandmother\'s name was Margaret."', ok: false },
      { t: '"You have two sisters."', ok: false },
      { t: '"You were born in the spring."', ok: false },
    ],
    tech: 'fuzzy',
    explain: 'Two letters, two of the most common initials, and "older woman" covers mother, grandmother, aunt, neighbour, colleague. She will produce a name, and within a minute she will remember that *you* produced it. This is the single most powerful move in the toolkit and the one worth recognising when it is aimed at you.',
  },
  {
    id: 'cr-vanish',
    subject: 'A man who has just denied that he collects anything.',
    question: 'Which reply is a vanishing negative — turning his "no" into a hit?',
    options: [
      { t: '"No, of course not — but there is something you have kept that you would never throw away."', ok: true },
      { t: '"Are you sure? Most people collect something."', ok: false },
      { t: '"Then I was wrong about that one."', ok: false },
      { t: '"Perhaps you will start collecting later in life."', ok: false },
    ],
    tech: 'vanish',
    explain: 'The miss is absorbed into the next claim before it can register as a miss, and the follow-up is a Barnum statement that cannot fail. Notice the pattern: readers never argue with a "no", they *ride* it. If someone is never wrong in a conversation, that is not accuracy — it is architecture.',
  },
  {
    id: 'cr-mine',
    subject: 'Early in a conversation with someone you have just met.',
    question: 'Which of these is fishing — a question wearing a statement\'s clothes?',
    options: [
      { t: '"You have that look of someone who moved around a lot growing up."', ok: true },
      { t: '"Where did you grow up?"', ok: false },
      { t: '"I grew up in one town and never left."', ok: false },
      { t: '"Moving as a child is hard on people."', ok: false },
    ],
    tech: 'mine',
    explain: 'It is a question with a claim\'s grammar. A hit costs nothing; a miss produces "no, actually I lived in one house until I was eighteen" — which is a fact you now own and can reflect back twenty minutes later as intuition. Direct questions are honest. Statements that harvest are not.',
  },
  {
    id: 'cr-defence',
    subject: 'You are the one being read. A stranger has made three statements about you and all three felt uncannily accurate.',
    question: 'What is the correct test?',
    options: [
      { t: 'Ask yourself whether any of the three could have been wrong out loud.', ok: true },
      { t: 'Count how many were right and weigh it against how many were wrong.', ok: false },
      { t: 'Give a deliberately false answer and see if they catch it.', ok: false },
      { t: 'Ask them how they knew.', ok: false },
    ],
    tech: 'barnum',
    explain: 'Falsifiability is the only test that works from the inside. Counting hits fails because misses are absorbed and forgotten — that is the *design*. Asking how they knew invites a better performance. The question is not "were they right", it is "could they have been visibly wrong". If not, no information was ever transmitted.',
  },
  {
    id: 'cr-attention',
    subject: 'You want someone to remember one specific thing you said in a ten-minute conversation.',
    question: 'Which does the most work?',
    options: [
      { t: 'Say it, then stop talking entirely for three or four seconds.', ok: true },
      { t: 'Say it three times in different words.', ok: false },
      { t: 'Say it louder and with more conviction than the rest.', ok: false },
      { t: 'Say it at the very start, while attention is highest.', ok: false },
    ],
    tech: 'barnum',
    explain: 'Silence after a statement is the strongest legitimate attention tool there is. It creates a gap the listener\'s mind fills with the thing you just said, and it signals that the statement was load-bearing. Repetition dilutes. Volume triggers resistance. Opening lines are heard before the listener has decided to care.',
  },
  {
    id: 'cr-misdirect',
    subject: 'A performer wants you to miss a movement of their left hand.',
    question: 'What actually controls where you look?',
    options: [
      { t: 'Where the performer looks, and what appears to be about to happen.', ok: true },
      { t: 'Fast movement, which the eye is drawn to.', ok: false },
      { t: 'Bright colours and shiny objects in the other hand.', ok: false },
      { t: 'Loud, sudden sounds from the opposite side.', ok: false },
    ],
    tech: 'barnum',
    explain: 'Attention follows *anticipated significance*, and the strongest cue for significance is another person\'s gaze — you look where they look, automatically. Fast movement actually draws the eye, which is why real misdirection uses slow, expected, uninteresting motion for the secret action and lets the gaze do the steering.',
  },
  {
    id: 'cr-ethics',
    subject: 'You have just realised you can steer a conversation with these tools.',
    question: 'What is the line that matters?',
    options: [
      { t: 'Whether the other person would still consent if they could see the mechanism.', ok: true },
      { t: 'Whether you are causing them any material harm.', ok: false },
      { t: 'Whether what you are telling them is technically true.', ok: false },
      { t: 'Whether they enjoy the interaction.', ok: false },
    ],
    tech: 'barnum',
    explain: 'Every one of these techniques works by being invisible — that is the whole mechanism. So the honest test is the transparency test: would this still be fine if they watched you do it? Rapport, attention and good questions pass. Manufactured omniscience does not, and the fact that it entertains people is precisely how the fraud sustains itself.',
  },
];

/* Prompts for the field log — real-world observation homework. */
export const LOG_PROMPTS = [
  'Describe, from memory, the shoes of the last stranger you stood near. Then say what you would guess from them — and what you cannot.',
  'Name three things in the room you are in that you had never consciously registered before today.',
  'Recall the last conversation you had. What did the other person do with their hands?',
  'Pick someone you saw today. What is one thing about them that contradicted your first impression?',
  'What did the last person you spoke to say that they did not have to say? Why do you think they said it?',
  'Describe the entrance of a building you use often — door handle side, number of steps, what is immediately left.',
  'Think of a claim someone made to you this week. What physical evidence would have to exist if it were true?',
  'Who spoke least in the last group you were in? What did the group do when they finally spoke?',
  'Recall a moment today when you felt certain. What would have had to be true for you to be wrong?',
  'What is your own baseline? Describe what you do with your body when you are comfortable, in detail.',
  'Reconstruct the route you walked most recently. Every turn, every crossing. Where does the memory go blank?',
  'What did you overhear today that you were not meant to be part of? What did it tell you about the speakers?',
  'Pick one person you know well. What single detail would let a stranger identify them from behind?',
  'What is the last thing that surprised you? Was the surprise about the world, or about your model of it?',
];
