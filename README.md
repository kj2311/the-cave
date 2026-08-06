# THE CAVE

A private cognitive-training app — observation, memory, deduction, reading people,
influence and composure. Installable on iPhone as a home-screen app (PWA), works
offline, stores everything on-device.

No account, no server, no analytics. Nothing leaves the phone.

---

## Running it locally

There is no build step and no dependencies. It is plain ES modules.

```bash
powershell -ExecutionPolicy Bypass -File "tools/serve.ps1" -Port 8321
```

Then open <http://localhost:8321>.

The repo is also registered in `../.claude/launch.json` as **cave**, so the
preview tooling can start it directly.

## Installing on an iPhone

The app must be served over **HTTPS** for the service worker (offline mode) to
work — `localhost` is the only exception. Once it is hosted:

1. Open the URL in **Safari** (not Chrome — only Safari can install to the home screen).
2. Tap the **Share** button.
3. Scroll down and tap **Add to Home Screen**.

It then launches full screen with no browser chrome, runs with no signal, and
keeps its own storage.

## The look

One idea, held consistently: **cold wet rock, warm instrument light.**

- Blue-grey rock tones (`--rock`, `--rock-lit`, `--damp`) belong to the environment.
  Amber belongs to the machines. Never mix them — an amber cave wall or a blue-grey
  console breaks it immediately.
- `.cavern` is a fixed layer drawing stalactites above and cave floor below, tiled at
  1200px. It sits at `z-index: 0` with `.view` lifted to `1`; a negative layer would
  paint *under* body's opaque background and disappear.
- Panels are lit consoles — inset top highlight, a warm underglow, and a heavy drop
  shadow that separates them from the rock behind. The home briefing is the main
  display: scanlines, corner bolts, a stronger bloom.
- Opening the app plays a short descent (`.boot`), once per browser session, gated by
  a pre-paint inline script in `index.html`. It fades out via CSS animation rather
  than a JS timeout so a script failure cannot trap anyone behind it, and it is
  disabled entirely under `prefers-reduced-motion`.

There is deliberately **no Batman iconography** — no bat shapes, no cowl, no
black-and-yellow oval, no Gotham/Wayne naming. The cave, the console bank and the
amber-on-rock contrast carry the feel on their own. Keep it that way.

## Layout

```
index.html              app shell, iOS meta tags, tab bar
manifest.webmanifest    PWA manifest
sw.js                   offline cache — BUMP `CACHE` WHEN FILES CHANGE
css/app.css             the whole visual system
js/
  app.js                router + every view
  ui.js                 hyperscript helper, toast, timers, small utilities
  store.js              persistence, XP, levels, streak, daily protocol
  drills/
    index.js            drill registry
    _shared.js          hud, multiple choice, reveal panel, countdown
    sweep.js            observation — procedurally generated scenes
    palace.js           memory — ordered recall, method of loci scaffolding
    chain.js            deduction — case files, two-phase answers
    baseline.js         reading people — baseline vs deviation
    hook.js             influence — cold-reading mechanics, taught defensively
    stillness.js        composure — Stroop with rule switching
  data/
    cases.js            14 deduction case files
    people.js           10 baseline scenarios, 10 cold-reading items, log prompts
    lessons.js          11 codex articles
    words.js            concrete nouns + loci routes for memory drills
tools/
  serve.ps1             static server (no Node/Python on this machine)
  make-icons.ps1        regenerates the icon set via System.Drawing
```

## Adding a drill

1. Write `js/drills/yourdrill.js` exporting a default object:

```js
export default {
  id: 'yourdrill',
  name: 'Your Drill',
  discipline: 'observation',   // key from DISCIPLINES in store.js
  icon: ICONS.eye,
  blurb: 'One line for the training list.',
  length: '3 min',
  mount(root, ctx) {
    // ctx.level  → 1..8 (MAX_LEVEL), rises every 2 runs scoring >= MASTERY (70%)
    // ctx.finish({ pct, stats: [{k,v}], note })
    return () => { /* cleanup on navigate away */ };
  },
};
```

Scale something real off `ctx.level` — item count, exposure time, answer window,
available distractors. Difficulty is **mastery-gated**: turning up earns XP, but only
runs at 70% or better move the level, so the drill cannot outrun the person doing it.

2. Import it in `js/drills/index.js` and add it to `DRILLS`.
3. Add the file path to `SHELL` in `sw.js` and bump `CACHE`.

Levels, XP, the daily protocol, stats and the profile meters pick it up
automatically.

## Adding content

Case files, baseline scenarios and cold-reading items are plain arrays in
`js/data/`. Each needs a unique `id` — the rotation logic uses it to avoid
repeating items until the pool is exhausted.

## Notes on the content

The material deliberately contradicts the popular version of "reading people".
There is no reliable behavioural tell for lying; trained observers score near
chance. What is trainable is noticing deviation from a person's own baseline,
which locates a topic rather than delivering a verdict. The lessons and drills
say so explicitly, and several wrong answers in the Baseline drill are the
popular readings.

Cold reading is taught from the defensive side — the mechanics are laid out so
they can be recognised when someone runs them on you.

Empirical claims were checked against the literature and the sources are listed
in the codex entry **Where This Comes From** (`l-sources` in `js/data/lessons.js`).
Five claims were removed during that pass because they did not survive checking:
the eye-crinkle test for genuine smiles, reverse-order recall as a lie-detection
tool, the "ninety second" adrenaline figure, dropped pronouns as a deception cue,
and the idea that clusters of weak cues add up to a strong one. Each is now
documented in the app as a correction rather than quietly deleted.

**If you add content, cite it.** The app's whole credibility rests on not being
another confident repetition of folklore.
