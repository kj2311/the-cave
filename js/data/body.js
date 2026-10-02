/* ============================================================
   data/body.js — the physical programme. Phase 1: eight weeks of
   strength, speed, power, running and skills, trained together.

   Structure and English copy live here; the Dutch overlay is
   body.nl.js, keyed the same way. Running paces are NOT stored:
   they are computed on the device from the user's own 8 km time
   (paces() in js/body.js), so they move when the user does.
   ============================================================ */

/** Which session each weekday holds. Fri and Sun are rest (Fri holds
    the tests in weeks 1 and 8). */
export const WEEKDAY_SESSION = {
  mon: 'power', tue: 'upperA', wed: 'quality', thu: 'upperB', sat: 'speed',
};

export const SESSIONS = {
  power:   { name: 'Power + Legs',     dur: '±75 min',            focus: 'Jump first, then lift heavy: explosive work needs a fresh nervous system.' },
  upperA:  { name: 'Upper A',          dur: '±60 min + easy run', focus: 'Heavy vertical pulling and pressing. The weighted pull-up is the main lift.' },
  quality: { name: 'Quality run',      dur: '±50 min',            focus: 'One quality session a week, the rest of the running stays easy.' },
  upperB:  { name: 'Upper B',          dur: '±60 min',            focus: 'Skills first (muscle-up and front lever), then horizontal pressing and pulling.' },
  speed:   { name: 'Speed + athletic', dur: '±80 min + easy run', focus: 'Speed first, after a rest day, with full rest between sprints.' },
  tests:   { name: 'Tests',            dur: '±20 min',            focus: 'Max strict pull-ups, dead hang and free handstand, in that order.' },
  rest:    { name: 'Rest',             dur: '',                   focus: 'Rest is part of the programme.' },
};

/** Rest-day copy differs: Friday protects the sprints, Sunday the power day. */
export const REST_TEXT = {
  fri: 'Rest, so you arrive fresh for the sprint day. Walking and easy movement are fine. If you want to do something, practise handstands for 10 minutes.',
  sun: 'Full rest. Walking, easy mobility and normal daily movement are fine. "I feel good, so a quick 8 km" is not: recovery is where you get stronger.',
};

export const WARM = {
  upperA: '7–10 min, 2 rounds, not tiring: scapular push-up 10 · scapular pull-up 6–8 · band external rotation 12/arm · band pull-apart 12–15 · wrist lean and circles 20–30 s · push-up 8 · easy pull-up 3.',
  upperB: 'Same as Upper A, plus 1–2 explosive pull-ups: scapular push-up 10 · scapular pull-up 6–8 · band external rotation 12/arm · band pull-apart 12–15 · wrist lean and circles 20–30 s · push-up 8 · easy pull-up 3.',
  power: '10 min: 3–5 min easy bike or jog, then BW squat 10 · walking lunge 5/leg · leg swing 10/leg · glute bridge 10 · calf raise 10 · pogos 10.',
  quality: '10–12 min easy jog, then leg swings and A-skips, then 2–3 strides of 15–20 s. Afterwards 5–10 min easy jog.',
  speed: '12–15 min: 3 min jog · leg swings 10/leg · walking lunge 6/leg · A-march 2 × 15 m · A-skip 2 × 15 m · pogos 2 × 10 · lateral shuffle 2 × 10 m. Then build-ups over 20 m at 60%, 75% and 85–90%, with full rest.',
};

/** Easy-run minutes per week (index 0 = week 1). */
export const EASY_MIN = {
  tue: ['35–40', '35–40', '40–45', '30–35', '40–50', '40–50', '40–50', '30–35'],
  sat: ['30', '35', '40', '25–30', '35', '40', '40–45', '25–30'],
};

/** Wednesday's session per week. zone: I interval, T threshold, E easy, test. */
export const QUALITY = [
  { zone: 'I', txt: '6 × 2 min interval · 2 min jog between' },
  { zone: 'T', txt: '3 × 6 min threshold · 2 min jog between' },
  { zone: 'I', txt: '5 × 3 min interval · 2 min jog between' },
  { zone: 'E', txt: 'Deload: 30–35 min easy + 4 × 15 s strides, full recovery' },
  { zone: 'T', txt: '4 × 5 min threshold · 2 min jog between' },
  { zone: 'I', txt: '6 × 3 min interval · 2 min jog between' },
  { zone: 'T', txt: '2 × 10 min threshold · 3 min jog between, then 4 strides if you like' },
  { zone: 'test', txt: '8 km test, all-out' },
];

/** Saturday's sprints per week. Distances in metres; test weeks time reps 3–5. */
export const SPRINTS = [
  { txt: '5 × 20 m at 90–95%',                         reps: ['20', '20', '20', '20', '20'] },
  { txt: 'Sprint test: 2 × 20 m at 90%, then 3 all-out', reps: ['20', '20', '20', '20', '20'], test: true },
  { txt: '5 × 20–25 m at 95–100%',                     reps: ['20–25', '20–25', '20–25', '20–25', '20–25'] },
  { txt: 'Deload: 3 × 20 m at about 90%',              reps: ['20', '20', '20'] },
  { txt: '4 × 20 m + 2 × 30 m at 95–100%',             reps: ['20', '20', '20', '20', '30', '30'] },
  { txt: '4 × 20 m + 3 × 30 m at 95–100%',             reps: ['20', '20', '20', '20', '30', '30', '30'] },
  { txt: '3 × 20 m + 3 × 30 m at 95–100%',             reps: ['20', '20', '20', '30', '30', '30'] },
  { txt: 'Sprint test: 2 × 20 m at 90%, then 3 all-out', reps: ['20', '20', '20', '20', '20'], test: true },
];

/*
  Exercise fields
  · type   load (kg × reps) · reps · hold (seconds) · carry (kg × metres)
           skill (handstand: minutes + best hold) · jump · sprint · times
           check · single · hold3 · run
  · sets / setsTxt   number of input columns / what the prescription says
  · dl / dlTxt       sets in the week-4 deload (default: about 65%)
  · step   [low, high] kg added when every set hits the top of the range,
           or a key into body.up.* for anything that is not a plate
  · up     what "next" means for reps and holds (body.up.*)
  · compound  heavy lift: 2–3 RIR in weeks 1–2
*/
export const EX = {
  power: [
    { id: 'bj', name: 'Broad jump', type: 'jump', presc: '2 warm-up jumps, then 3 × 3 · rest 2–3 min', note: 'Every jump all-out. Stick the landing and reset before each jump.' },
    { id: 'hs', name: 'Handstand', type: 'skill', presc: '5–10 min, after the jumps', note: 'Explosive work comes first.' },
    { id: 'squat', name: 'Back squat', type: 'load', sets: 3, reps: [4, 6], rir: '2', compound: true, rest: '3–5 min', step: [2.5, 5], note: 'Technically perfect. Never test a max.' },
    { id: 'tbdl', name: 'Trap-bar deadlift', type: 'load', sets: 2, reps: [3, 5], rir: '2', compound: true, rest: '3–4 min', step: [2.5, 5], dl: 1, note: 'Two heavy sets is deliberately enough.',
      alt: { name: 'Romanian deadlift', sets: 3, reps: [5, 8], dl: 2, rest: '3 min', note: 'Instead of the trap-bar deadlift.' } },
    { id: 'bss', tag: 'A1', name: 'Bulgarian split squat', type: 'load', sets: 2, reps: [6, 10], perLeg: true, rir: '2', rest: '90 s → A2', step: 'heavier', note: 'Kg is the total weight, reps are per leg.' },
    { id: 'nordic', tag: 'A2', name: 'Nordic hamstring curl', type: 'reps', sets: 2, reps: [4, 8], rest: '90 s → A1', up: 'lessHelp', note: 'Lower under control. Help from a band or your hands is fine.' },
    { id: 'calf', tag: 'B1', name: 'Standing calf raise', type: 'load', sets: 3, setsTxt: '2–3', reps: [8, 15], rir: '1–2', rest: '60 s → B2', step: 'heavier', note: 'Full stretch at the bottom.' },
    { id: 'tib', tag: 'B2', name: 'Tibialis raise', type: 'reps', sets: 2, reps: [15, 20], rest: '60 s → B1', optional: true, note: 'Little evidence behind it: drop it when time is short.' },
  ],

  upperA: [
    { id: 'hs', name: 'Handstand', type: 'skill', presc: '5–10 min · 2 × 20 s chest-to-wall, then free practice', note: 'Stop as soon as your balance clearly gets worse.' },
    { id: 'wpu', tag: 'A1', name: 'Weighted pull-up', type: 'load', sets: 4, reps: [4, 6], rir: '1–2', compound: true, plus: true, rest: '90–120 s → A2', step: [1.25, 2.5], dl: 3, dlTxt: '2–3', note: 'Do the 4th set on its own, about 3 min after the 3rd. Enter the added kg (0 = bodyweight).' },
    { id: 'dip', tag: 'A2', name: 'Weighted dip', type: 'load', sets: 3, reps: [4, 6], rir: '1–2', compound: true, plus: true, rest: '90–120 s → A1', step: [1.25, 2.5], dl: 2 },
    { id: 'hspu', tag: 'B1', name: 'HSPU progression', type: 'reps', sets: 3, reps: [4, 8], rir: '1–2', rest: '60–90 s → B2', up: 'harder',
      levels: ['Elevated pike', 'Negatives', 'Partial wall HSPU', 'Wall HSPU', 'Deficit HSPU', 'Freestanding'] },
    { id: 'hlr', tag: 'B2', name: 'Hanging leg raise', type: 'reps', sets: 2, reps: [6, 12], rir: '1–2', rest: '60–90 s → B1', up: 'toes', note: 'No swinging.' },
    { id: 'ohe', tag: 'C1', name: 'Overhead triceps extension', type: 'load', sets: 3, reps: [8, 12], rir: '1–2', rest: '60–90 s → C2', step: 'heavier', note: 'Full stretch at the bottom.' },
    { id: 'curl', tag: 'C2', name: 'Bayesian or incline curl', type: 'load', sets: 3, reps: [8, 12], rir: '1–2', rest: '60–90 s → C1', step: 'heavier' },
    { id: 'grip', tag: 'D', name: 'Towel hang or plate pinch', type: 'hold', sets: 3, setsTxt: '2–3', secs: [20, 45], rest: '90 s', up: 'heavier' },
    { id: 'run', name: 'Easy run', type: 'run', runKey: 'tue', note: 'A few hours after Upper A. If it has to be one session: strength first, then the run.' },
  ],

  quality: [
    { id: 'run', name: 'Quality run', type: 'run', runKey: 'wed' },
  ],

  upperB: [
    { id: 'hs', name: 'Handstand', type: 'skill', presc: '5–10 min', note: 'Stop as soon as your balance clearly gets worse.' },
    { id: 'mu', name: 'Muscle-up', type: 'reps', sets: 3, reps: [1, 2], rest: '2–3 min', levels: ['Band-assisted', 'Clean'], note: 'No grinders: a rep you have to force does not count.' },
    { id: 'hpu', name: 'Explosive high pull-up', type: 'reps', sets: 2, reps: [3, 3], rest: '2 min', note: 'Maximum height. Drop these once 3 × 1 clean muscle-ups work.' },
    { id: 'fl', tag: 'A1', name: 'Front lever hold', type: 'hold', sets: 3, secs: [8, 15], rest: '90–120 s → A2', up: 'next',
      levels: ['Tuck', 'Advanced tuck', 'One-leg', 'Straddle', 'Full'] },
    { id: 'pl', tag: 'A2', name: 'Planche lean', type: 'hold', sets: 2, secs: [10, 20], rest: '90–120 s → A1', up: 'lean', note: 'Strong protraction, straight arms.' },
    { id: 'bench', tag: 'B1', name: 'Bench press', type: 'load', sets: 3, reps: [5, 8], rir: '2', compound: true, rest: '90–120 s → B2', step: [1, 2.5] },
    { id: 'row', tag: 'B2', name: 'Chest-supported row', type: 'load', sets: 3, reps: [6, 10], rir: '1–2', rest: '90–120 s → B1', step: 'heavier', note: 'No half reps to move more weight.',
      swap: { weeks: [5, 7], ex: { id: 'flrow', name: 'Front-lever row', type: 'reps', sets: 3, reps: [5, 8], rir: null, step: null, up: 'harder', note: 'This week instead of the chest-supported row.' } } },
    { id: 'lat', tag: 'C1', name: 'Lateral raise', type: 'load', sets: 2, reps: [12, 20], rir: '1–2', rest: '60 s → C2', step: 'heavier' },
    { id: 'rear', tag: 'C2', name: 'Rear-delt fly or face pull', type: 'load', sets: 2, reps: [12, 20], rir: '1–2', rest: '60 s → C1', step: 'heavier' },
  ],

  speed: [
    { id: 'sprint', name: 'Acceleration sprint', type: 'sprint', note: 'Do not start the next one out of breath. If your speed drops noticeably, stop.' },
    { id: 'shuttle', name: '5-10-5 shuttle', type: 'times', sets: 3, presc: '3 reps · rest 2–3 min', note: 'Brake, drop your centre of mass, turn, accelerate. Times are optional.' },
    { id: 'bounds', name: 'Lateral bounds', type: 'check', presc: '2 × 4 per side · rest 90 s', note: 'Stick every landing.' },
    { id: 'hs', name: 'Handstand', type: 'skill', presc: '5 min, after the explosive block' },
    { id: 'mut', name: 'Muscle-up technique', type: 'reps', sets: 3, setsTxt: '2–3', reps: [1, 1], rest: '2 min', noDeload: true, note: 'Not a second heavy muscle-up session.' },
    { id: 'plyo', tag: 'A1', name: 'Plyometric push-up', type: 'reps', sets: 3, setsTxt: '2–3', reps: [3, 5], rest: '60–90 s → A2', note: 'Maximally explosive.' },
    { id: 'towel', tag: 'A2', name: 'Towel pull-up', type: 'reps', sets: 2, reps: [3, 6], rest: '60–90 s → A1', note: 'Or 2 rope climbs. Tuesday and Thursday are your heavy pulling days.' },
    { id: 'farmer', tag: 'B', name: 'Farmer carry', type: 'carry', sets: 3, dist: '20–40 m, heavy', rest: '90 s', note: 'Tall posture. Kg per hand.' },
    { id: 'suitcase', tag: 'C', name: 'Suitcase carry', type: 'carry', sets: 2, dist: '20–30 m per side', rest: '90 s', note: 'Stay upright, do not lean.' },
    { id: 'hammer', tag: 'D1', name: 'Hammer curl', type: 'load', sets: 2, reps: [10, 15], rir: '1–2', rest: '60 s → D2', step: 'heavier' },
    { id: 'press', tag: 'D2', name: 'Cable triceps pressdown', type: 'load', sets: 2, reps: [10, 15], rir: '1–2', rest: '60 s → D1', step: 'heavier' },
    { id: 'lsit', tag: 'E', name: 'L-sit', type: 'hold', sets: 2, secs: [15, 30], rest: '60–90 s', up: 'longer' },
    { id: 'run', name: 'Easy run', type: 'run', runKey: 'sat', note: 'A few hours after the sprints, for example in the afternoon.' },
  ],

  tests: [
    { id: 'maxpu', name: 'Max strict pull-ups', type: 'single', unit: 'reps', test: true, presc: 'One set from a dead hang, chin over the bar, no kipping', note: 'Stop at the first rep that is not clean.' },
    { id: 'hang', name: 'Dead hang', type: 'single', unit: 's', test: true, presc: '5 min after the pull-ups · maximum time, overhand grip' },
    { id: 'hsfree', name: 'Free handstand', type: 'hold3', test: true, presc: 'Longest hold, best of 3' },
  ],

  restFri: [
    { id: 'hs', name: 'Handstand', type: 'skill', presc: 'Optional: 10 min', optional: true },
  ],
};

/* ---------- the rules, as a codex-style article ---------- */

export const RULES = [
  { h: 'The rules' },
  { ul: [
    '**RIR** (reps in reserve) is how many more reps you could have done. Weeks 1–2: heavy compounds at 2–3 RIR. From week 3: the RIR given in the session. No grinders.',
    '**Double progression.** When every set reaches the top of the range with the same technique, the weight goes up and you start again at the bottom. With 4 × 4–6: 5/5/4/4 → 6/5/5/5 → 6/6/6/5 → 6/6/6/6 → heavier.',
    '**Steps.** Weighted pull-up and dip +1.25–2.5 kg · bench +1–2.5 kg · squat and deadlift +2.5–5 kg · accessories the smallest step available.',
    '**Warm-up sets.** 3–4 rising sets, fewer reps as it gets heavier. Squat at 80 kg: bar × 8 → 40 × 5 → 55 × 3 → 67.5 × 1–2 → work sets. For the heavy lifts the session sheet works them out from your working weight; tick them off as you go. They should never tire you, and they do not count as work sets. Accessories need 0–1.',
    '**Supersets (A1 ⇄ A2).** Set A1, 60–90 s rest, set A2, 60–90 s, back to A1. For heavy compounds 90–120 s. Each exercise still gets about 3 minutes between its own sets, in far less time. Gym too busy? Do them separately with about 3 minutes rest.',
    '**Skills first and often.** 5–10 minutes of handstand in every strength session. Short and frequent learns faster than long and rare. Stop as soon as your balance clearly gets worse.',
    '**Autoregulation.** Slept badly or feeling ill: drop the last set of each exercise and sprint at 90% at most. Sprint time or jump distance clearly dropping: stop that block. Sharp or joint pain: stop that exercise; muscle soreness is fine. Fever: no training.',
  ] },
  { h: 'The week' },
  { p: 'Monday, Wednesday and Saturday are the hard leg days, always 48 hours apart. Tuesday and Thursday train the upper body. Friday rest protects Saturday\'s sprints; Sunday rest protects Monday\'s jumps and squats. Explosive strength suffers most from fatigue and from endurance work just before it.' },
  { h: 'Week 4: deload' },
  { p: 'Week 4 is deliberately lighter, because muscle memory brings strength back faster than tendons and joints adapt. About 60–70% of your work sets, the same weight at 3+ RIR. The quality run becomes an easy run with strides, and sprints stay at about 90%. Handstand and muscle-up technique carry on as normal.' },
  { h: 'Recovery' },
  { ul: [
    '**Sleep** 8–10 hours a night.',
    '**Protein** about 1.6 g per kg of bodyweight a day, spread over 3–5 meals.',
    '**Eat enough**, especially carbohydrate around the hard days and the quality run. If your weights and times drop while you are tired all the time, eat and sleep more before you train harder.',
  ] },
  { h: 'After week 8' },
  { p: 'Phase 2 is not simply heavier. Compare your tests and give the weakest link more volume while the rest goes to maintenance. Legs are only trained heavy once a week in this phase, so that is the first place to look.' },
  { h: 'Where this comes from' },
  { sources: [
    { t: 'Strength and endurance in the same programme mainly blunt explosive strength, and more so in the same session than with 3+ hours between them.', a: 'Schumann et al., 2022', u: 'https://researchonline.jcu.edu.au/71546/' },
    { t: 'Strength gains were similar across a wide range of RIR; muscle growth increased as sets ended closer to failure.', a: 'Robinson et al., 2024', u: 'https://link.springer.com/article/10.1007/s40279-024-02069-2' },
    { t: 'Supersets cut session time by about 37% with similar gains in strength and muscle size.', a: 'Zhang et al., 2025', u: 'https://link.springer.com/article/10.1007/s40279-025-02176-8' },
    { t: 'Distributed practice beats massed practice for continuous skills.', a: 'Beach et al., Motor Learning and Development', u: 'https://us.humankinetics.com/blogs/excerpt/distribution-of-practice-in-motor-learning-and-development' },
    { t: 'Programmes with the Nordic hamstring curl had 51% fewer hamstring injuries (15 studies, 8,459 athletes).', a: 'van Dyk et al., 2019', u: 'https://www.csp.org.uk/frontline/article/nordic-hamstring-exercise-halves-hamstring-injury' },
    { t: 'Hand-timed sprints were off from electronic timing by about 0.15 s on average.', a: 'Hetzler et al., 2008', u: 'https://pubmed.ncbi.nlm.nih.gov/18978613/' },
    { t: 'In adults under 65 who lift, extra protein added measurable lean mass from about 1.6 g/kg a day.', a: 'Nunes et al., 2022', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8978023/' },
    { t: 'Teenagers aged 13–18 should sleep 8–10 hours per 24 hours.', a: 'Paruthi et al., 2016 (AASM)', u: 'https://jcsm.aasm.org/doi/10.5664/jcsm.5866' },
    { t: 'Running paces come from your own 8 km time through the VDOT formula of Daniels and Gilbert.', a: 'Daniels\' Running Formula', u: null },
    { t: 'Warm-ups with heavy, dynamic sets improved upper-body strength and power; short static stretching did nothing for power (31 studies).', a: 'McCrary et al., 2015', u: 'https://bjsm.bmj.com/content/49/14/935' },
  ] },
];
