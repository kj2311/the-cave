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

## Hosting notes

**Do not give any file a leading underscore.** GitHub Pages runs Jekyll by default, and
Jekyll silently drops every path beginning with one. This bit us once: the shared drill
module was called `_shared.js`, Pages served a 404 for it, and the app rendered its static
shell and then died — every tab inert, because no JavaScript had run. It is now
`js/drills/shared.js`.

`.nojekyll` in the repo root is a second line of defence: it tells Pages to serve files
verbatim. On this repo it did not stop the legacy builder from running Jekyll anyway, and
those builds hung for 10 to 30 minutes before being cancelled.

So deployment does not use the legacy builder at all. `.github/workflows/deploy.yml`
checks the repo out and uploads it unchanged — no build step, nothing to hang. **Pages
Source must be set to "GitHub Actions"** in repository settings for this to be used;
switching it back to "Deploy from a branch" reintroduces Jekyll and the problem.

Every path in the project is relative (`./`, `css/app.css`, `sw.js`), and the manifest
uses `"start_url": "./"` with `"scope": "./"`, so the app works from a subpath such as
`https://user.github.io/the-cave/` without changes.

## Installing on an iPhone

The app must be served over **HTTPS** for the service worker (offline mode) to
work — `localhost` is the only exception. Once it is hosted:

1. Open the URL in **Safari** (not Chrome — only Safari can install to the home screen).
2. Tap the **Share** button.
3. Scroll down and tap **Add to Home Screen**.

It then launches full screen with no browser chrome, runs with no signal, and
keeps its own storage.

## The look

**Black and silver. Sharp edges. Nothing decorative.** These are hard rules, not
preferences — the top of `css/app.css` restates them, and breaking one is what makes
an interface look generated rather than designed.

- **No radius.** `* { border-radius: 0 }` is set globally. Nothing is rounded, ever.
- **No colour.** Black, greys, silver, white. Correct and incorrect are distinguished
  by fill, weight and rule — a right answer inverts its marker to solid white, a wrong
  one gets a diagonal hatch and drops to a dimmer grey. Never add a hue to carry
  meaning; if you need a third state, use a dashed edge.
- **No glow, no blur, no soft shadows.** Structure is drawn with 1px hairlines.
  Gradients appear in exactly one place — the brushed-metal slug in the top bar and
  the icon, where metal would actually catch light.
- **Left-aligned.** Nothing is centred except a number that is the whole content of
  its box.
- **Three typefaces doing three jobs.** Mono for labels, data and anything measured;
  a tight system sans for headings and controls; a serif for prose. The serif is the
  signal that you are reading rather than operating.
- Disciplines step down a **silver scale** (`--accent` per `.d-*` class) instead of
  each taking a colour.

No Batman iconography — no bat shapes, no cowl, no yellow oval, no Gotham/Wayne
naming.

Two drills were rebuilt to survive the monochrome rule. **Sweep** varies objects by
fill (solid, hollow, hatched, dotted, split, double) rather than by colour. **Stillness**
replaced the Stroop task, which is colour-dependent by definition, with a
direction-word/arrow conflict that produces the same interference.

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
    shared.js           hud, multiple choice, reveal panel, countdown
    sweep.js            observation — procedurally generated scenes
    palace.js           memory — ordered recall, method of loci scaffolding
    chain.js            deduction — case files, two-phase answers
    baseline.js         reading people — baseline vs deviation
    hook.js             influence — cold-reading mechanics, taught defensively
    stillness.js        composure — Stroop with rule switching
  data/
    cases.js            14 deduction case files
    people.js           10 baseline scenarios, 13 cold-reading items
    lessons.js          14 codex articles
    missions.js         29 real-world field assignments, tiered
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

The codex entry **The Toolkit, Item by Item** goes through the techniques the
character is shown using and sorts them: cold reading and muscle reading (contact mind
reading / Cumberlandism, running on the ideomotor effect) are real; the memory palace
and gaze-based misdirection are real; micro-expression screening, social priming and
NLP eye-accessing cues are not. **The Interview** covers the Reid technique versus the
PEACE model, which is the one place the show's method is not merely unsupported but
actively harmful.

## Field missions

`js/data/missions.js` holds 29 assignments across three tiers, surfaced in the Field
tab with one put forward each day. Rules they follow, which new missions must also
follow:

- Everything is done to yourself or in public space. **No mission asks the user to run
  a technique on a named person who has not agreed to it**, and none involve following,
  approaching or recording anyone.
- Every mission ends in a debrief question. Filing an answer marks it complete and
  writes a tagged entry to the log.
- Tier I is doable today, Tier II needs a real conversation or a full day, Tier III
  takes a week or touches something that matters.

## The dossier

Case files, subject files and mission briefs render as a physical document
rather than as UI (`.dossier` in `css/app.css`, `dossier()` in
`js/drills/shared.js`).

It is the **one light surface in the app** and the only place colour appears
beyond the pictograms. That is deliberate: everywhere else you are operating an
instrument, and here you are being handed a piece of paper. Bone stock, black
ink, a newspaper serif (`--news`), filing holes punched down the left edge, a
rotated rubber stamp, and a small-caps lead-in on the opening paragraph only.

The highlighter is the same gold as the pictograms and is **earned, not
decorative**: in The Chain it swipes across the decisive observation at the
moment the case resolves, while a wrong pick is ruled out in pen. `mdish()`
also supports `==text==` for marking phrases inline in authored content.

Keep the paper confined to documents. A light panel anywhere else destroys the
contrast this depends on.
