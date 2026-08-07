/* ============================================================
   i18n.js — language switching.

   t('key') returns the string for the active language, falling
   back to English if a key is missing. Interpolation uses
   {name} placeholders: t('home.left', { n: 2, m: 3 }).

   The language is stored separately from app state so it
   survives a progress wipe.
   ============================================================ */

const KEY = 'cave.lang';

export const LANGS = {
  en: { name: 'English', locale: 'en-GB' },
  nl: { name: 'Nederlands', locale: 'nl-NL' },
};

let lang = load();

function load() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored && LANGS[stored]) return stored;
    // First run: follow the device if it is set to Dutch.
    return (navigator.language || '').toLowerCase().startsWith('nl') ? 'nl' : 'en';
  } catch {
    return 'en';
  }
}

export function getLang() { return lang; }
export function locale() { return LANGS[lang].locale; }

export function setLang(next) {
  if (!LANGS[next]) return;
  lang = next;
  try { localStorage.setItem(KEY, next); } catch {}
}

export function t(key, vars) {
  const table = STRINGS[lang] || STRINGS.en;
  let s = table[key];
  if (s === undefined) s = STRINGS.en[key];
  if (s === undefined) return key;
  if (typeof s === 'function') s = s(vars || {});
  if (vars) {
    for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  }
  return s;
}

/** Dutch plurals are almost all -en/-s, so a simple chooser is enough. */
const plural = (n, one, many) => (n === 1 ? one : many);

/** Coaching lines shown after a run. Arrays, because they are picked at random. */
export function tips(drill) {
  const set = TIP_SETS[lang] || TIP_SETS.en;
  return set[drill] || TIP_SETS.en[drill] || [];
}

const TIP_SETS = {
  en: {
    sweep: [
      'Scan in a fixed order — left to right, top to bottom. A random scan loses most of the grid.',
      'Name each object silently as you see it. Verbalising forces encoding; passive looking does not.',
      'Count first, then detail. A total you are sure of anchors everything else.',
      'Your first glance gets the least processing, not the most. Go back to where you started.',
      'Group by fill rather than by position — a chunk of four hollows survives better than four coordinates.',
    ],
    palace: [
      'Absurd beats sensible. An anchor smashing through your front door survives; an anchor resting beside it does not.',
      'Make the image interact with the place. Objects that merely sit somewhere vanish.',
      'Add one non-visual sense — a sound, a smell, a texture. Multi-sensory images are far more durable.',
      'Scale it. Enormous or tiny, never actual size.',
      'If a link breaks on recall, do not force it. Move to the next locus and come back — the gap usually fills itself.',
    ],
    still: [
      'Slowing your breathing before a hard question buys you working memory. Four in, six or eight out.',
      'The pause you are afraid of is about a quarter as long from the outside as it feels from the inside.',
      'Putting a feeling into words measurably reduces its intensity. Naming it beats trying to suppress it.',
      'Suppressing the obvious answer is the same muscle whether the pull is a word, a hunch, or a satisfying conclusion.',
      'Speed without accuracy is not composure. Get it right, then get it quick.',
    ],
    chain: ['A conclusion is defensible when you can name the observation that would break it.'],
    baseline: ['Baseline, cluster, timing. A signal has to clear all three before it is worth anything.'],
    hook: ['Would this still be acceptable to them if they could see exactly what you were doing? That is the whole ethics of it.'],
  },
  nl: {
    sweep: [
      'Scan in een vaste volgorde — links naar rechts, boven naar beneden. Een willekeurige scan verliest het grootste deel van het veld.',
      'Benoem elk object in stilte terwijl je het ziet. Verwoorden dwingt opslag af; passief kijken niet.',
      'Tel eerst, ga dan op detail. Een totaal waar je zeker van bent verankert al het andere.',
      'Je eerste blik krijgt de minste verwerking, niet de meeste. Ga terug naar waar je begon.',
      'Groepeer op vulling in plaats van op positie — een blokje van vier holle vormen overleeft beter dan vier coördinaten.',
    ],
    palace: [
      'Absurd verslaat verstandig. Een anker dat door je voordeur slaat blijft hangen; een anker dat ernaast staat niet.',
      'Laat het beeld iets doen met de plek. Objecten die er alleen maar staan verdwijnen.',
      'Voeg één niet-visueel zintuig toe — een geluid, een geur, een textuur. Meerzintuiglijke beelden zijn veel duurzamer.',
      'Speel met schaal. Enorm of piepklein, nooit op ware grootte.',
      'Breekt een schakel bij het ophalen, forceer dan niet. Ga naar de volgende plek en kom terug — het gat vult zichzelf meestal.',
    ],
    still: [
      'Je ademhaling vertragen vóór een lastige vraag levert je werkgeheugen op. Vier tellen in, zes tot acht uit.',
      'De stilte waar je bang voor bent duurt van buitenaf ongeveer een kwart van wat hij vanbinnen voelt.',
      'Een gevoel in woorden vatten verlaagt meetbaar de intensiteit ervan. Benoemen verslaat onderdrukken.',
      'Het voor de hand liggende antwoord onderdrukken is dezelfde spier, of de trek nu van een woord, een onderbuikgevoel of een bevredigende conclusie komt.',
      'Snelheid zonder precisie is geen kalmte. Eerst goed, dan snel.',
    ],
    chain: ['Een conclusie is te verdedigen als je de waarneming kunt noemen die haar zou breken.'],
    baseline: ['Basislijn, cluster, timing. Een signaal moet alle drie doorstaan voordat het iets waard is.'],
    hook: ['Zou dit voor hen nog acceptabel zijn als ze precies konden zien wat je deed? Dat is de hele ethiek ervan.'],
  },
};

/* ============================================================ */

const STRINGS = {

  /* ---------------------------------------------------------- */
  en: {
    'tab.home': 'Cave',
    'tab.train': 'Train',
    'tab.codex': 'Codex',
    'tab.field': 'Field',
    'tab.you': 'You',

    'title.home': 'THE CAVE',
    'title.train': 'TRAINING',
    'title.codex': 'CODEX',
    'title.field': 'FIELD',
    'title.mission': 'ASSIGNMENT',
    'title.progress': 'PROGRESS',
    'title.result': 'RESULT',

    'home.complete': 'Protocol complete.',
    'home.back': 'Back again.',
    'home.first': 'Come in.',
    'home.completeSub': 'Three systems trained today. Anything further is surplus.',
    'home.left': ({ n, m }) => `${n} of ${m} sessions left in today's protocol.`,
    'home.protocol': "Today's protocol",
    'home.completeChip': 'Complete',
    'home.streakAt': ({ n }) => `Streak at ${n} ${plural(n, 'day', 'days')}.`,
    'home.assignment': 'Field assignment',
    'home.beginWith': ({ name, len }) => `Begin — ${name} · ${len}`,
    'home.continueWith': ({ name, len }) => `Continue — ${name} · ${len}`,
    'home.extra': 'Train something extra',
    'home.next': 'Next',
    'home.newTitle': 'How this works',
    'home.new1': '**Three short sessions a day.** They are chosen for you and take about ten minutes in total.',
    'home.new2': '**One field assignment.** Something to do away from the phone, written up afterwards.',
    'home.new3': '**The codex explains why.** Read it whenever you want — nothing is locked.',
    'home.newHint': 'Everything stays on this device. Start with the button above.',

    'install.title': 'Install this.',
    'install.ios': ' Tap the Share button in Safari, scroll down, and choose ',
    'install.iosBold': 'Add to Home Screen',
    'install.iosEnd': '. It then opens full screen, works with no signal, and keeps your progress.',
    'install.other': ' Use your browser menu and choose ',
    'install.otherBold': 'Install app',
    'install.otherOr': ' or ',
    'install.otherEnd': ' to run it full screen and offline.',

    'train.label': 'Training',
    'train.heading': 'Six systems',
    'train.intro': ({ max, mastery }) => `Each drill scales with you, up to level ${max}. Two runs at ${mastery}% or better move it up — more items, less time, fewer cues, a bigger board.`,
    'train.intro2': 'Turning up counts for XP. Only doing well makes it harder.',
    'train.runs': ({ n }) => `${n} ${plural(n, 'run', 'runs')}`,
    'train.best': ({ p }) => ` · best ${p}%`,
    'train.ceiling': ' · at the ceiling',
    'train.toNext': ({ n, lvl }) => ` · ${n} more strong ${plural(n, 'run', 'runs')} to level ${lvl}`,
    'train.lv': ({ n }) => `LV ${n}`,
    'train.level': ({ n }) => `Level ${n}`,

    'codex.label': 'Codex',
    'codex.heading': 'The written material',
    'codex.intro': 'Read these in any order. Every claim in here is one you can act on; where the popular version of an idea is wrong, it says so.',
    'codex.entries': ({ n }) => `${n} entries`,
    'codex.mins': ({ n }) => `${n} min`,
    'codex.minRead': ({ n }) => `${n} min read`,
    'codex.read': 'Read',
    'codex.next': ({ title }) => `Next — ${title}`,
    'codex.back': 'Back to the codex',
    'codex.englishOnly': 'This article is available in English only for now.',

    'field.label': 'Field work',
    'field.heading': 'Assignments',
    'field.intro': 'The drills build the mechanism. These put it outside, where it is harder and where it counts. Every one ends in a written debrief — the training is in the noticing afterwards.',
    'field.today': 'Put forward today',
    'field.filed': ({ n }) => `Filed — ${n}`,
    'field.nothing': 'Nothing filed yet',
    'field.delete': 'Delete',
    'field.deleteConfirm': 'Delete this entry?',

    'mission.method': 'Method',
    'mission.debrief': 'Debrief',
    'mission.answerThis': 'Answer this',
    'mission.placeholder': 'Answer the debrief. Write what actually happened, not what should have.',
    'mission.file': 'File the debrief',
    'mission.back': 'Back',
    'mission.filed': 'Filed',
    'mission.empty': 'Nothing written yet.',
    'mission.saved': 'Filed.',

    'tier.1': 'Tier I',
    'tier.2': 'Tier II',
    'tier.3': 'Tier III',
    'tier.1note': 'Doable today.',
    'tier.2note': 'Needs a real conversation or a full day.',
    'tier.3note': 'A week, or something that actually matters.',

    'progress.rank': 'Rank',
    'progress.xpTotal': ({ n }) => `${n} XP total`,
    'progress.xpTo': ({ n, rank }) => `${n} XP to ${rank}`,
    'progress.topRank': 'Top rank held',
    'progress.dayStreak': 'Day streak',
    'progress.bestStreak': 'Best streak',
    'progress.sessions': 'Sessions',
    'progress.last28': 'Last 28 days',
    'progress.ofDays': ({ n }) => `${n} of 28 days`,
    'progress.sessionCount': ({ n }) => `${n} ${plural(n, 'session', 'sessions')}`,
    'progress.systems': 'Systems',
    'progress.drillByDrill': 'Drill by drill',
    'progress.notAttempted': 'Not attempted yet',
    'progress.recent': 'Recent',
    'progress.noSessions': 'No sessions yet.',
    'progress.improving': '↑ improving',
    'progress.slipping': '↓ slipping',
    'progress.steady': '▬ steady',
    'progress.atCeiling': ({ max }) => `Level ${max} — the ceiling`,
    'progress.needMore': ({ n, mastery, lvl }) => `${n} more ${plural(n, 'run', 'runs')} at ${mastery}%+ to reach level ${lvl}`,

    'settings.label': 'Settings',
    'settings.language': 'Language',
    'settings.languageNote': 'Changes the whole app immediately — interface, codex articles, drills and field assignments.',

    'data.label': 'Your data',
    'data.note': 'Everything lives on this device only. Nothing is uploaded, and there is no account. That also means clearing your browser data clears this — export a copy if it matters to you.',
    'data.export': 'Export progress',
    'data.restore': 'Restore from file',
    'data.wipe': 'Wipe everything',
    'data.wipeConfirm': 'Wipe all progress, logs and history? This cannot be undone.',
    'data.wiped': 'Everything cleared.',
    'data.restored': 'Progress restored.',
    'data.badFile': 'That file is not a Cave backup.',
    'data.downloaded': 'Downloaded.',
    'data.downloadedCopied': 'Downloaded, and copied to the clipboard.',

    'result.clean': 'Clean.',
    'result.solid': 'Solid.',
    'result.workable': 'Workable.',
    'result.rough': 'Rough — which is the point of doing it again.',
    'result.xp': ({ n }) => `+${n} XP`,
    'result.drillLevelUp': ({ name, n }) => `${name} is now level ${n} — it gets harder from here`,
    'result.disciplineLevelUp': ({ name, n }) => `${name} reached level ${n}`,
    'result.personalBest': 'Personal best',
    'result.difficulty': 'Difficulty',
    'result.levelOf': ({ n, max }) => `Level ${n} of ${max}`,
    'result.ceiling': 'You are at the ceiling for this drill.',
    'result.strongRun': ({ n, lvl }) => `Counted as a strong run. ${n} more to level ${lvl}.`,
    'result.weakRun': ({ mastery, n }) => `Below ${mastery}%, so it does not count towards the next level. ${n} strong ${plural(n, 'run', 'runs')} needed.`,
    'result.takeaway': 'Take this with you',
    'result.protocolComplete': 'Protocol complete',
    'result.again': 'Run it again',
    'result.backHome': 'Back to the cave',
    'result.leaveConfirm': 'Leave the session? Progress in this run is lost.',

    'drill.begin': 'Begin',
    'drill.next': 'Next',
    'drill.seeResults': 'See results',
    'drill.continue': 'Continue',
    'drill.beforeStart': 'Before you start',

    'drill.sweep.name': 'Sweep',
    'drill.palace.name': 'The Palace',
    'drill.chain.name': 'The Chain',
    'drill.baseline.name': 'Baseline',
    'drill.hook.name': 'The Hook',
    'drill.stillness.name': 'Stillness',
    'drill.sweep.blurb': 'Take in a scene at a glance, then answer for it.',
    'drill.palace.blurb': 'Hold a sequence, then give it back in order.',
    'drill.chain.blurb': 'Read the scene. Reach only as far as the evidence goes.',
    'drill.baseline.blurb': 'Learn the normal. Then read the departure from it.',
    'drill.hook.blurb': 'Take apart the tricks that work on everyone, including you.',
    'drill.stillness.blurb': 'Hold the rule while everything pulls the other way.',

    'chain.open': 'Open the first file',
    'chain.whichCarried': 'Now — which one carried it?',
    'chain.nextCase': 'Next case',
    'chain.decisive': 'Which observation was decisive?',
    'chain.decisiveSub': 'The one that, on its own, the claim cannot survive.',
    'chain.case': ({ n, title }) => `Case ${n} — ${title}`,
    'chain.correct': ({ n }) => `Correct — observation ${n}`,
    'chain.wasObs': ({ n }) => `The decisive one was observation ${n}`,
    'chain.principle': 'Principle',

    'baseline.baseline': 'Baseline',
    'baseline.moment': 'The moment',
    'baseline.groundRule': 'Ground rule',
    'baseline.reading': 'Reading',
    'baseline.mythTitle': 'The popular version is wrong',

    'hook.subject': 'Subject',
    'hook.test': 'The test that matters',
    'hook.why': 'Why it works',

    'palace.route': 'Your route',
    'palace.recall': 'Recall',
    'palace.rebuild': 'Rebuild the sequence, in order',
    'palace.takeBack': 'Tap a placed word to take it back.',
    'palace.submit': 'Submit sequence',
    'palace.was': 'The sequence was',
    'palace.slot': 'tap the words below, in order',

    'still.rule': ({ r }) => `RULE · ${r}`,
    'still.ruleChanged': ({ r }) => `RULE CHANGED → ${r}`,

    /* --- drill intros --- */
    'sweep.head': 'Observation · Sweep',
    'sweep.intro': ({ n, s }) => `A scene of ${n} objects appears for ${s} seconds. Then it is gone and the questions begin. You will not know in advance what is asked.`,
    'sweep.intro2': 'Objects differ by shape and by fill — solid, hollow, hatched, dotted, split, double.',
    'palace.head': 'Memory · The Palace',
    'palace.intro': ({ s }) => `Items appear one at a time, ${s} seconds each. Afterwards you rebuild the sequence in order.`,
    'palace.introScaffold': 'Each item is paired with a place on a route. Put the item there as a picture — moving, absurd, interacting with the place.',
    'palace.introFree': 'No route is given this time. Use one of your own and place each item as you go.',
    'palace.items': ({ lvl, n }) => `Level ${lvl} — ${n} items`,
    'chain.head': 'Deduction · The Chain',
    'chain.intro': 'Each file gives you a scene and a handful of observations. Some of them are noise, deliberately.',
    'chain.intro2': 'Choose the conclusion the evidence will actually support — not the most interesting one. Then name the observation that did the work.',
    'chain.files': ({ lvl, n }) => `Level ${lvl} — ${n} case files`,
    'baseline.head': 'Reading · Baseline',
    'baseline.intro': 'You get a person\'s established normal, then a single moment. Identify what genuinely departed from the baseline.',
    'baseline.rule': 'No behaviour means "lying". Several answers in this drill are the popular reading, and they are wrong. Deviation locates a topic; it never delivers a verdict.',
    'baseline.count': ({ lvl, n }) => `Level ${lvl} — ${n} observations`,
    'hook.head': 'Influence · The Hook',
    'hook.intro': 'These are the mechanics behind psychics, fraudsters and bad-faith persuasion. They are taught here so that they can never be run on you unnoticed.',
    'hook.testText': 'Could that statement have been visibly wrong? If not, no information passed — no matter how accurate it felt.',
    'hook.count': ({ lvl, n }) => `Level ${lvl} — ${n} devices`,
    'still.head': 'Composure · Stillness',
    'still.count': ({ lvl, n }) => `Level ${lvl} — ${n} trials`,
    'still.introA': 'A direction word appears above an arrow, and they usually disagree. Under the rule ',
    'still.introB': ', answer where the arrow points and ignore the word.',
    'still.switchA': 'From this level the rule switches without warning to ',
    'still.switchB': ', where you answer what the word says and ignore the arrow. Watch the banner.',
    'still.noSwitch': 'The rule stays on ARROW for the whole run at this level.',
    'still.limit': ({ s }) => `${s} seconds per trial. A miss counts the same as a wrong answer.`,
    'still.ARROW': 'ARROW',
    'still.WORD': 'WORD',

    /* --- stat labels --- */
    'stat.correct': 'Correct', 'stat.objects': 'Objects', 'stat.exposure': 'Exposure',
    'stat.inPlace': 'In place', 'stat.run': 'Run', 'stat.level': 'Level',
    'stat.score': 'Score', 'stat.cases': 'Cases', 'stat.remaining': 'Remaining',
    'stat.pool': 'Pool', 'stat.rule': 'Rule', 'stat.devices': 'Devices',
    'stat.accuracy': 'Accuracy', 'stat.median': 'Median', 'stat.interference': 'Interference',

    /* --- shapes and fills --- */
    'shape.circle': 'Circle', 'shape.square': 'Square', 'shape.triangle': 'Triangle',
    'shape.diamond': 'Diamond', 'shape.hexagon': 'Hexagon', 'shape.cross': 'Cross',
    'fill.solid': 'Solid', 'fill.hollow': 'Hollow', 'fill.hatched': 'Hatched',
    'fill.dotted': 'Dotted', 'fill.split': 'Split', 'fill.double': 'Double',
    'dir.LEFT': 'LEFT', 'dir.RIGHT': 'RIGHT', 'dir.UP': 'UP', 'dir.DOWN': 'DOWN',

    /* --- generated sweep questions --- */
    // Plural and attributive forms are spelled out, not suffixed —
    // "cross" + "s" is wrong in English and "hol" + "e" is wrong in Dutch.
    'shapes.circle': 'circles', 'shapes.square': 'squares', 'shapes.triangle': 'triangles',
    'shapes.diamond': 'diamonds', 'shapes.hexagon': 'hexagons', 'shapes.cross': 'crosses',
    'filladj.solid': 'solid', 'filladj.hollow': 'hollow', 'filladj.hatched': 'hatched',
    'filladj.dotted': 'dotted', 'filladj.split': 'split', 'filladj.double': 'double',

    'doc.caseFile': 'Case file',
    'doc.subjectFile': 'Subject file',
    'doc.assignment': 'Assignment',
    'doc.observations': 'Observations',
    'doc.baselineSec': 'Established baseline',
    'doc.momentSec': 'The moment',
    'doc.no': ({ n, of }) => `No. ${String(n).padStart(2, '0')} of ${of}`,
    'doc.open': 'Open',
    'doc.resolved': 'Resolved',
    'doc.onFile': 'On file',
    'doc.filed': 'Filed',
    'doc.decisive': 'Decisive observation, highlighted.',

    'q.total': 'How many objects were in the scene in total?',
    'q.fillCount': ({ f }) => `How many ${f} objects were there?`,
    'q.atCell': ({ r, c }) => `What was in row ${r}, column ${c}? (counting from the top left)`,
    'q.absent': 'Which of these did NOT appear anywhere in the scene?',
    'q.shapeCount': ({ s }) => `How many ${s} were there?`,
    'q.ringed': 'One object was circled by a dashed ring. What shape was it?',
    'q.commonFill': 'Which fill appeared most often?',

    'disc.observation': 'Observation',
    'disc.memory': 'Memory',
    'disc.deduction': 'Deduction',
    'disc.people': 'Reading',
    'disc.influence': 'Influence',
    'disc.composure': 'Composure',
    'disc.observation.tag': 'See what others walk past.',
    'disc.memory.tag': 'Hold it, and get it back.',
    'disc.deduction.tag': 'Build the chain, test the chain.',
    'disc.people.tag': 'Baseline first. Always.',
    'disc.influence.tag': 'Attention is the only currency.',
    'disc.composure.tag': 'Nothing works if you are rattled.',

    'rank.Initiate': 'Initiate',
    'rank.Watcher': 'Watcher',
    'rank.Observer': 'Observer',
    'rank.Reader': 'Reader',
    'rank.Analyst': 'Analyst',
    'rank.Interrogator': 'Interrogator',
    'rank.Mentalist': 'Mentalist',
  },

  /* ---------------------------------------------------------- */
  nl: {
    'tab.home': 'Basis',
    'tab.train': 'Training',
    'tab.codex': 'Codex',
    'tab.field': 'Veld',
    'tab.you': 'Jij',

    'title.home': 'THE CAVE',
    'title.train': 'TRAINING',
    'title.codex': 'CODEX',
    'title.field': 'VELDWERK',
    'title.mission': 'OPDRACHT',
    'title.progress': 'VOORTGANG',
    'title.result': 'RESULTAAT',

    'home.complete': 'Protocol afgerond.',
    'home.back': 'Weer terug.',
    'home.first': 'Kom binnen.',
    'home.completeSub': 'Drie systemen vandaag getraind. Alles daarna is extra.',
    'home.left': ({ n, m }) => `Nog ${n} van de ${m} sessies in het protocol van vandaag.`,
    'home.protocol': 'Protocol van vandaag',
    'home.completeChip': 'Afgerond',
    'home.streakAt': ({ n }) => `Reeks staat op ${n} ${plural(n, 'dag', 'dagen')}.`,
    'home.assignment': 'Veldopdracht',
    'home.beginWith': ({ name, len }) => `Beginnen — ${name} · ${len}`,
    'home.continueWith': ({ name, len }) => `Verder — ${name} · ${len}`,
    'home.extra': 'Nog iets extra trainen',
    'home.next': 'Nu',
    'home.newTitle': 'Zo werkt het',
    'home.new1': '**Drie korte sessies per dag.** Ze worden voor je gekozen en kosten samen ongeveer tien minuten.',
    'home.new2': '**Eén veldopdracht.** Iets om buiten de telefoon te doen en achteraf op te schrijven.',
    'home.new3': '**De codex legt uit waarom.** Lees hem wanneer je wilt — er zit niets op slot.',
    'home.newHint': 'Alles blijft op dit apparaat. Begin met de knop hierboven.',

    'install.title': 'Zet dit op je beginscherm.',
    'install.ios': ' Tik op de deelknop in Safari, scrol naar beneden en kies ',
    'install.iosBold': 'Zet op beginscherm',
    'install.iosEnd': '. De app opent dan schermvullend, werkt zonder verbinding en bewaart je voortgang.',
    'install.other': ' Gebruik het menu van je browser en kies ',
    'install.otherBold': 'App installeren',
    'install.otherOr': ' of ',
    'install.otherEnd': ' om hem schermvullend en offline te gebruiken.',

    'train.label': 'Training',
    'train.heading': 'Zes systemen',
    'train.intro': ({ max, mastery }) => `Elke oefening groeit met je mee, tot niveau ${max}. Twee runs van ${mastery}% of hoger tillen hem omhoog — meer items, minder tijd, minder houvast, een groter veld.`,
    'train.intro2': 'Meedoen levert altijd XP op. Alleen goed presteren maakt het moeilijker.',
    'train.runs': ({ n }) => `${n} ${plural(n, 'run', 'runs')}`,
    'train.best': ({ p }) => ` · best ${p}%`,
    'train.ceiling': ' · op het maximum',
    'train.toNext': ({ n, lvl }) => ` · nog ${n} sterke ${plural(n, 'run', 'runs')} tot niveau ${lvl}`,
    'train.lv': ({ n }) => `NIV ${n}`,
    'train.level': ({ n }) => `Niveau ${n}`,

    'codex.label': 'Codex',
    'codex.heading': 'Het geschreven materiaal',
    'codex.intro': 'Lees ze in willekeurige volgorde. Alles hierin kun je toepassen; waar de populaire versie van een idee onjuist is, staat dat er expliciet bij.',
    'codex.entries': ({ n }) => `${n} artikelen`,
    'codex.mins': ({ n }) => `${n} min`,
    'codex.minRead': ({ n }) => `${n} min lezen`,
    'codex.read': 'Gelezen',
    'codex.next': ({ title }) => `Volgende — ${title}`,
    'codex.back': 'Terug naar de codex',
    'codex.englishOnly': 'Dit artikel is voorlopig alleen in het Engels beschikbaar.',

    'field.label': 'Veldwerk',
    'field.heading': 'Opdrachten',
    'field.intro': 'De oefeningen bouwen het mechanisme. Deze opdrachten zetten het buiten, waar het moeilijker is en waar het telt. Elke opdracht eindigt met een schriftelijke nabespreking — de training zit in wat je daarna opmerkt.',
    'field.today': 'Vandaag voorgesteld',
    'field.filed': ({ n }) => `Ingediend — ${n}`,
    'field.nothing': 'Nog niets ingediend',
    'field.delete': 'Verwijderen',
    'field.deleteConfirm': 'Deze notitie verwijderen?',

    'mission.method': 'Werkwijze',
    'mission.debrief': 'Nabespreking',
    'mission.answerThis': 'Beantwoord dit',
    'mission.placeholder': 'Beantwoord de nabespreking. Schrijf op wat er echt gebeurde, niet wat er had moeten gebeuren.',
    'mission.file': 'Nabespreking indienen',
    'mission.back': 'Terug',
    'mission.filed': 'Ingediend',
    'mission.empty': 'Er staat nog niets.',
    'mission.saved': 'Ingediend.',

    'tier.1': 'Niveau I',
    'tier.2': 'Niveau II',
    'tier.3': 'Niveau III',
    'tier.1note': 'Vandaag te doen.',
    'tier.2note': 'Vraagt een echt gesprek of een hele dag.',
    'tier.3note': 'Een week, of iets dat er werkelijk toe doet.',

    'progress.rank': 'Rang',
    'progress.xpTotal': ({ n }) => `${n} XP totaal`,
    'progress.xpTo': ({ n, rank }) => `Nog ${n} XP tot ${rank}`,
    'progress.topRank': 'Hoogste rang bereikt',
    'progress.dayStreak': 'Dagenreeks',
    'progress.bestStreak': 'Langste reeks',
    'progress.sessions': 'Sessies',
    'progress.last28': 'Laatste 28 dagen',
    'progress.ofDays': ({ n }) => `${n} van de 28 dagen`,
    'progress.sessionCount': ({ n }) => `${n} ${plural(n, 'sessie', 'sessies')}`,
    'progress.systems': 'Systemen',
    'progress.drillByDrill': 'Per oefening',
    'progress.notAttempted': 'Nog niet geprobeerd',
    'progress.recent': 'Recent',
    'progress.noSessions': 'Nog geen sessies.',
    'progress.improving': '↑ vooruitgang',
    'progress.slipping': '↓ terugval',
    'progress.steady': '▬ stabiel',
    'progress.atCeiling': ({ max }) => `Niveau ${max} — het maximum`,
    'progress.needMore': ({ n, mastery, lvl }) => `Nog ${n} ${plural(n, 'run', 'runs')} van ${mastery}%+ voor niveau ${lvl}`,

    'settings.label': 'Instellingen',
    'settings.language': 'Taal',
    'settings.languageNote': 'Past de hele app direct aan — interface, codexartikelen, oefeningen en veldopdrachten.',

    'data.label': 'Jouw gegevens',
    'data.note': 'Alles staat alleen op dit apparaat. Er wordt niets geüpload en er is geen account. Dat betekent ook dat het wissen van je browsergegevens dit wist — exporteer een kopie als het je wat waard is.',
    'data.export': 'Voortgang exporteren',
    'data.restore': 'Herstellen uit bestand',
    'data.wipe': 'Alles wissen',
    'data.wipeConfirm': 'Alle voortgang, notities en geschiedenis wissen? Dit kan niet ongedaan worden gemaakt.',
    'data.wiped': 'Alles gewist.',
    'data.restored': 'Voortgang hersteld.',
    'data.badFile': 'Dat bestand is geen back-up van The Cave.',
    'data.downloaded': 'Gedownload.',
    'data.downloadedCopied': 'Gedownload en naar het klembord gekopieerd.',

    'result.clean': 'Schoon.',
    'result.solid': 'Degelijk.',
    'result.workable': 'Bruikbaar.',
    'result.rough': 'Rommelig — en precies daarom doe je hem nog eens.',
    'result.xp': ({ n }) => `+${n} XP`,
    'result.drillLevelUp': ({ name, n }) => `${name} staat nu op niveau ${n} — vanaf hier wordt het zwaarder`,
    'result.disciplineLevelUp': ({ name, n }) => `${name} heeft niveau ${n} bereikt`,
    'result.personalBest': 'Persoonlijk record',
    'result.difficulty': 'Moeilijkheid',
    'result.levelOf': ({ n, max }) => `Niveau ${n} van ${max}`,
    'result.ceiling': 'Je zit op het maximum voor deze oefening.',
    'result.strongRun': ({ n, lvl }) => `Telt als sterke run. Nog ${n} tot niveau ${lvl}.`,
    'result.weakRun': ({ mastery, n }) => `Onder ${mastery}%, dus telt niet mee voor het volgende niveau. Er zijn ${n} sterke ${plural(n, 'run', 'runs')} nodig.`,
    'result.takeaway': 'Neem dit mee',
    'result.protocolComplete': 'Protocol afgerond',
    'result.again': 'Nog een keer',
    'result.backHome': 'Terug naar de basis',
    'result.leaveConfirm': 'Sessie verlaten? De voortgang in deze run gaat verloren.',

    'drill.begin': 'Beginnen',
    'drill.next': 'Volgende',
    'drill.seeResults': 'Resultaat bekijken',
    'drill.continue': 'Verder',
    'drill.beforeStart': 'Voordat je begint',

    'drill.sweep.name': 'Scan',
    'drill.palace.name': 'Het Paleis',
    'drill.chain.name': 'De Keten',
    'drill.baseline.name': 'Basislijn',
    'drill.hook.name': 'De Haak',
    'drill.stillness.name': 'Kalmte',
    'drill.sweep.blurb': 'Neem een tafereel in één oogopslag op en geef er rekenschap van.',
    'drill.palace.blurb': 'Houd een reeks vast en geef hem op volgorde terug.',
    'drill.chain.blurb': 'Lees het tafereel. Reik niet verder dan het bewijs gaat.',
    'drill.baseline.blurb': 'Leer het normaal. Lees dan de afwijking ervan.',
    'drill.hook.blurb': 'Ontleed de trucs die op iedereen werken, jou incluis.',
    'drill.stillness.blurb': 'Houd de regel vast terwijl alles de andere kant op trekt.',

    'chain.open': 'Open het eerste dossier',
    'chain.whichCarried': 'En nu — welke gaf de doorslag?',
    'chain.nextCase': 'Volgende zaak',
    'chain.decisive': 'Welke waarneming was doorslaggevend?',
    'chain.decisiveSub': 'Degene die de bewering op zichzelf niet overleeft.',
    'chain.case': ({ n, title }) => `Zaak ${n} — ${title}`,
    'chain.correct': ({ n }) => `Juist — waarneming ${n}`,
    'chain.wasObs': ({ n }) => `De doorslaggevende was waarneming ${n}`,
    'chain.principle': 'Principe',

    'baseline.baseline': 'Basislijn',
    'baseline.moment': 'Het moment',
    'baseline.groundRule': 'Grondregel',
    'baseline.reading': 'De lezing',
    'baseline.mythTitle': 'De populaire versie klopt niet',

    'hook.subject': 'Onderwerp',
    'hook.test': 'De toets die telt',
    'hook.why': 'Waarom het werkt',

    'palace.route': 'Jouw route',
    'palace.recall': 'Ophalen',
    'palace.rebuild': 'Bouw de reeks opnieuw op, op volgorde',
    'palace.takeBack': 'Tik op een geplaatst woord om het terug te nemen.',
    'palace.submit': 'Reeks indienen',
    'palace.was': 'De reeks was',
    'palace.slot': 'tik de woorden hieronder aan, op volgorde',

    'still.rule': ({ r }) => `REGEL · ${r}`,
    'still.ruleChanged': ({ r }) => `REGEL GEWIJZIGD → ${r}`,

    /* --- drill intros --- */
    'sweep.head': 'Waarneming · Scan',
    'sweep.intro': ({ n, s }) => `Een tafereel met ${n} objecten verschijnt ${s} seconden. Daarna is het weg en beginnen de vragen. Je weet vooraf niet wat er gevraagd wordt.`,
    'sweep.intro2': 'Objecten verschillen in vorm en in vulling — massief, hol, gearceerd, gestippeld, half, dubbel.',
    'palace.head': 'Geheugen · Het Paleis',
    'palace.intro': ({ s }) => `Items verschijnen één voor één, elk ${s} seconden. Daarna bouw je de reeks op volgorde opnieuw op.`,
    'palace.introScaffold': 'Elk item is gekoppeld aan een plek op een route. Zet het item daar neer als beeld — bewegend, absurd, in wisselwerking met de plek.',
    'palace.introFree': 'Deze keer krijg je geen route. Gebruik er een van jezelf en plaats elk item onderweg.',
    'palace.items': ({ lvl, n }) => `Niveau ${lvl} — ${n} items`,
    'chain.head': 'Deductie · De Keten',
    'chain.intro': 'Elk dossier geeft je een tafereel en een handvol waarnemingen. Sommige daarvan zijn met opzet ruis.',
    'chain.intro2': 'Kies de conclusie die het bewijs werkelijk draagt — niet de interessantste. Benoem daarna de waarneming die het werk deed.',
    'chain.files': ({ lvl, n }) => `Niveau ${lvl} — ${n} dossiers`,
    'baseline.head': 'Mensen lezen · Basislijn',
    'baseline.intro': 'Je krijgt het vastgestelde normaal van iemand, en daarna één moment. Bepaal wat werkelijk van de basislijn afweek.',
    'baseline.rule': 'Geen enkel gedrag betekent "liegen". Meerdere antwoorden in deze oefening zijn de populaire lezing, en die is onjuist. Een afwijking wijst een onderwerp aan; nooit een oordeel.',
    'baseline.count': ({ lvl, n }) => `Niveau ${lvl} — ${n} waarnemingen`,
    'hook.head': 'Invloed · De Haak',
    'hook.intro': 'Dit is de mechaniek achter mediums, oplichters en kwaadwillende overtuiging. Je leert ze hier zodat ze nooit ongemerkt op jou toegepast kunnen worden.',
    'hook.testText': 'Had die uitspraak zichtbaar fout kunnen zijn? Zo niet, dan is er geen informatie overgedragen — hoe raak het ook voelde.',
    'hook.count': ({ lvl, n }) => `Niveau ${lvl} — ${n} technieken`,
    'still.head': 'Kalmte · Stilte',
    'still.count': ({ lvl, n }) => `Niveau ${lvl} — ${n} rondes`,
    'still.introA': 'Er verschijnt een richtingswoord boven een pijl, en meestal spreken ze elkaar tegen. Onder de regel ',
    'still.introB': ' antwoord je waar de pijl heen wijst en negeer je het woord.',
    'still.switchA': 'Vanaf dit niveau wisselt de regel zonder waarschuwing naar ',
    'still.switchB': ', waarbij je antwoordt wat het woord zegt en de pijl negeert. Let op de banner.',
    'still.noSwitch': 'Op dit niveau blijft de regel de hele run op PIJL staan.',
    'still.limit': ({ s }) => `${s} seconden per ronde. Een gemiste ronde telt hetzelfde als een fout antwoord.`,
    'still.ARROW': 'PIJL',
    'still.WORD': 'WOORD',

    /* --- stat labels --- */
    'stat.correct': 'Goed', 'stat.objects': 'Objecten', 'stat.exposure': 'Duur',
    'stat.inPlace': 'Op plek', 'stat.run': 'Reeks', 'stat.level': 'Niveau',
    'stat.score': 'Score', 'stat.cases': 'Zaken', 'stat.remaining': 'Resterend',
    'stat.pool': 'Voorraad', 'stat.rule': 'Regel', 'stat.devices': 'Technieken',
    'stat.accuracy': 'Precisie', 'stat.median': 'Mediaan', 'stat.interference': 'Interferentie',

    /* --- shapes and fills --- */
    'shape.circle': 'Cirkel', 'shape.square': 'Vierkant', 'shape.triangle': 'Driehoek',
    'shape.diamond': 'Ruit', 'shape.hexagon': 'Zeshoek', 'shape.cross': 'Kruis',
    'fill.solid': 'Massief', 'fill.hollow': 'Hol', 'fill.hatched': 'Gearceerd',
    'fill.dotted': 'Gestippeld', 'fill.split': 'Half', 'fill.double': 'Dubbel',
    'dir.LEFT': 'LINKS', 'dir.RIGHT': 'RECHTS', 'dir.UP': 'BOVEN', 'dir.DOWN': 'ONDER',

    /* --- generated sweep questions --- */
    // Attributive adjectives and plurals are irregular enough in Dutch that
    // suffixing breaks them: hol → holle, massief → massieve, half → halve.
    'shapes.circle': 'cirkels', 'shapes.square': 'vierkanten', 'shapes.triangle': 'driehoeken',
    'shapes.diamond': 'ruiten', 'shapes.hexagon': 'zeshoeken', 'shapes.cross': 'kruisen',
    'filladj.solid': 'massieve', 'filladj.hollow': 'holle', 'filladj.hatched': 'gearceerde',
    'filladj.dotted': 'gestippelde', 'filladj.split': 'halve', 'filladj.double': 'dubbele',

    'doc.caseFile': 'Dossier',
    'doc.subjectFile': 'Persoonsdossier',
    'doc.assignment': 'Opdracht',
    'doc.observations': 'Waarnemingen',
    'doc.baselineSec': 'Vastgestelde basislijn',
    'doc.momentSec': 'Het moment',
    'doc.no': ({ n, of }) => `Nr. ${String(n).padStart(2, '0')} van ${of}`,
    'doc.open': 'Open',
    'doc.resolved': 'Afgedaan',
    'doc.onFile': 'In dossier',
    'doc.filed': 'Gearchiveerd',
    'doc.decisive': 'Doorslaggevende waarneming, gemarkeerd.',

    'q.total': 'Hoeveel objecten stonden er in totaal in het tafereel?',
    'q.fillCount': ({ f }) => `Hoeveel ${f} objecten waren er?`,
    'q.atCell': ({ r, c }) => `Wat stond er op rij ${r}, kolom ${c}? (geteld vanaf linksboven)`,
    'q.absent': 'Welke hiervan kwam nergens in het tafereel voor?',
    'q.shapeCount': ({ s }) => `Hoeveel ${s} waren er?`,
    'q.ringed': 'Eén object had een stippelring eromheen. Welke vorm was dat?',
    'q.commonFill': 'Welke vulling kwam het vaakst voor?',

    'disc.observation': 'Waarneming',
    'disc.memory': 'Geheugen',
    'disc.deduction': 'Deductie',
    'disc.people': 'Mensen lezen',
    'disc.influence': 'Invloed',
    'disc.composure': 'Kalmte',
    'disc.observation.tag': 'Zie waar anderen langsloopt.',
    'disc.memory.tag': 'Vasthouden, en terughalen.',
    'disc.deduction.tag': 'Bouw de keten, test de keten.',
    'disc.people.tag': 'Eerst de basislijn. Altijd.',
    'disc.influence.tag': 'Aandacht is de enige valuta.',
    'disc.composure.tag': 'Niets werkt als je van slag bent.',

    'rank.Initiate': 'Beginner',
    'rank.Watcher': 'Waarnemer',
    'rank.Observer': 'Observator',
    'rank.Reader': 'Lezer',
    'rank.Analyst': 'Analist',
    'rank.Interrogator': 'Ondervrager',
    'rank.Mentalist': 'Mentalist',
  },
};
