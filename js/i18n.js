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
    'settings.languageNote': 'Changes the interface immediately. Longer written articles are English only for now.',

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
    'settings.languageNote': 'Past de interface direct aan. De langere artikelen zijn voorlopig alleen in het Engels.',

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
