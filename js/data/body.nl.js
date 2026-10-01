/* ============================================================
   data/body.nl.js — Dutch overlay for the physical programme.

   Keyed like body.js. Exercise names stay in English (that is
   how they are said in a Dutch gym); notes, prescriptions and
   the rules article are translated. Anything missing here falls
   through to the English original.
   ============================================================ */

export const BODY_NL = {
  sessions: {
    power:   { focus: 'Eerst springen, dan zwaar tillen: explosief werk vraagt een fris zenuwstelsel.' },
    upperA:  { focus: 'Zware verticale trek- en drukkracht. De weighted pull-up is je belangrijkste oefening.' },
    quality: { focus: 'Eén kwaliteitssessie per week, de rest van het lopen blijft easy.' },
    upperB:  { focus: 'Skills eerst (muscle-up en front lever), dan horizontaal duwen en trekken.' },
    speed:   { focus: 'Snelheid eerst, na een rustdag en met volledige rust tussen de sprints.' },
    tests:   { focus: 'Max strict pull-ups, dead hang en vrije handstand, in deze volgorde.' },
    rest:    { name: 'Rust', focus: 'Rust is onderdeel van het programma.' },
  },

  restText: {
    fri: 'Rust, zodat je fris aan de sprintdag begint. Wandelen en rustig bewegen mogen. Wil je iets doen, oefen dan 10 minuten handstand.',
    sun: 'Volledige rust. Wandelen, rustige mobility en gewoon bewegen mogen. "Ik voel me goed, dus nog even 8 km" hoort er niet bij: van herstel word je sterker.',
  },

  warm: {
    upperA: '7–10 min, 2 rondes, niet vermoeiend: scapular push-up 10 · scapular pull-up 6–8 · band external rotation 12/arm · band pull-apart 12–15 · wrist lean en circles 20–30 s · push-up 8 · easy pull-up 3.',
    upperB: 'Zelfde als Upper A, plus 1–2 explosive pull-ups: scapular push-up 10 · scapular pull-up 6–8 · band external rotation 12/arm · band pull-apart 12–15 · wrist lean en circles 20–30 s · push-up 8 · easy pull-up 3.',
    power: '10 min: 3–5 min rustig fietsen of joggen, dan BW squat 10 · walking lunge 5/been · leg swing 10/been · glute bridge 10 · calf raise 10 · pogos 10.',
    quality: '10–12 min easy joggen, dan leg swings en A-skips, dan 2–3 strides van 15–20 s. Na afloop 5–10 min uitlopen.',
    speed: '12–15 min: 3 min joggen · leg swings 10/been · walking lunge 6/been · A-march 2 × 15 m · A-skip 2 × 15 m · pogos 2 × 10 · lateral shuffle 2 × 10 m. Dan build-ups over 20 m op 60%, 75% en 85–90%, met volledige rust.',
  },

  quality: [
    '6 × 2 min interval · 2 min joggen ertussen',
    '3 × 6 min threshold · 2 min joggen ertussen',
    '5 × 3 min interval · 2 min joggen ertussen',
    'Deload: 30–35 min easy + 4 × 15 s strides, volledig herstel',
    '4 × 5 min threshold · 2 min joggen ertussen',
    '6 × 3 min interval · 2 min joggen ertussen',
    '2 × 10 min threshold · 3 min joggen ertussen, daarna eventueel 4 strides',
    '8 km-test, voluit',
  ],

  sprints: [
    '5 × 20 m op 90–95%',
    'Sprinttest: 2 × 20 m op 90%, dan 3 × voluit',
    '5 × 20–25 m op 95–100%',
    'Deload: 3 × 20 m op ±90%',
    '4 × 20 m + 2 × 30 m op 95–100%',
    '4 × 20 m + 3 × 30 m op 95–100%',
    '3 × 20 m + 3 × 30 m op 95–100%',
    'Sprinttest: 2 × 20 m op 90%, dan 3 × voluit',
  ],

  ex: {
    power: {
      bj: { presc: '2 opwarmsprongen, dan 3 × 3 · rust 2–3 min', note: 'Elke sprong maximaal. Land stil en reset voor elke sprong.' },
      hs: { presc: '5–10 min, na de sprongen', note: 'Explosief werk gaat voor.' },
      squat: { note: 'Technisch perfect. Nooit een max testen.' },
      tbdl: { note: 'Twee zware sets is bewust genoeg.', altNote: 'In plaats van de trap-bar deadlift.' },
      bss: { note: 'Kg is het totale gewicht, reps zijn per been.' },
      nordic: { note: 'Gecontroleerd zakken. Hulp met een band of je handen mag.' },
      calf: { note: 'Volledige stretch onderin.' },
      tib: { note: 'Weinig bewijs: schrappen als je tijd krap is.' },
    },
    upperA: {
      hs: { presc: '5–10 min · 2 × 20 s chest-to-wall, dan vrij oefenen', note: 'Stop zodra je balans duidelijk slechter wordt.' },
      wpu: { note: 'De 4e set doe je los, ±3 min na de 3e. Vul het extra gewicht in (0 = lichaamsgewicht).' },
      hlr: { note: 'Zonder zwaaien.' },
      ohe: { note: 'Volledige stretch onderin.' },
      run: { note: 'Een paar uur na Upper A. Moet het in één keer: eerst kracht, dan lopen.' },
    },
    upperB: {
      hs: { note: 'Stop zodra je balans duidelijk slechter wordt.' },
      mu: { note: 'Geen grinders: een rep die je moet forceren, telt niet.' },
      hpu: { note: 'Maximale hoogte. Schrappen zodra 3 × 1 muscle-up clean lukt.' },
      pl: { note: 'Sterke protractie, armen gestrekt.' },
      row: { note: 'Geen halve reps om meer gewicht te kunnen pakken.' },
      flrow: { note: 'Deze week in plaats van de chest-supported row.' },
    },
    speed: {
      sprint: { note: 'Niet hijgend aan de volgende beginnen. Zakt je snelheid merkbaar: stoppen.' },
      shuttle: { presc: '3 reps · rust 2–3 min', note: 'Remmen, laag zwaartepunt, draaien, versnellen. Tijden invullen mag, hoeft niet.' },
      bounds: { presc: '2 × 4 per zijde · rust 90 s', note: 'Land elke keer perfect.' },
      hs: { presc: '5 min, na het explosieve blok' },
      mut: { note: 'Geen tweede zware muscle-uptraining.' },
      plyo: { note: 'Maximaal explosief.' },
      towel: { note: 'Of 2 rope climbs. Dinsdag en donderdag zijn je zware trekdagen.' },
      farmer: { dist: '20–40 m, zwaar', note: 'Sterke houding. Kg per hand.' },
      suitcase: { dist: '20–30 m per zijde', note: 'Romp recht, niet scheef hangen.' },
      run: { note: 'Een paar uur na de sprints, bijvoorbeeld \'s middags.' },
    },
    tests: {
      maxpu: { presc: 'Eén set vanuit dead hang, kin boven de stang, geen kip', note: 'Stop bij de eerste rep die niet zuiver is.' },
      hang: { presc: '5 min na de pull-ups · maximale tijd, bovenhandse greep' },
      hsfree: { presc: 'Langste hold, beste van 3' },
    },
    restFri: {
      hs: { presc: 'Optioneel: 10 min' },
    },
  },

  rules: [
    { h: 'De regels' },
    { ul: [
      '**RIR** (reps in reserve) is hoeveel reps je nog had gekund. Week 1–2: zware compounds op 2–3 RIR. Vanaf week 3: de RIR die bij de oefening staat. Geen grinders.',
      '**Dubbele progressie.** Haal je op álle sets de bovenkant van de range met dezelfde techniek, dan gaat het gewicht omhoog en begin je weer onderaan. Bij 4 × 4–6: 5/5/4/4 → 6/5/5/5 → 6/6/6/5 → 6/6/6/6 → zwaarder.',
      '**Stappen.** Weighted pull-up en dip +1,25–2,5 kg · bench +1–2,5 kg · squat en deadlift +2,5–5 kg · accessoires de kleinste stap die er is.',
      '**Opwarmsets.** 3–4 oplopende sets, minder reps naarmate het zwaarder wordt. Squat met 80 kg: bar × 8 → 40 × 5 → 55 × 3 → 67,5 × 1–2 → werksets. Accessoires: 0–1.',
      '**Supersets (A1 ⇄ A2).** Set A1, 60–90 s rust, set A2, 60–90 s, terug naar A1. Bij zware compounds 90–120 s. Elke oefening heeft zo nog ±3 minuten tussen z\'n eigen sets, in veel minder tijd. Te druk in de gym? Doe ze los met ±3 minuten rust.',
      '**Skills eerst en vaak.** 5–10 minuten handstand in elke krachtsessie. Kort en vaak leert sneller dan lang en weinig. Stop zodra je balans duidelijk slechter wordt.',
      '**Autoregulatie.** Slecht geslapen of ziekig: schrap de laatste set van elke oefening en sprint op max 90%. Sprinttijd of sprongafstand zakt merkbaar: stop dat blok. Scherpe pijn of gewrichtspijn: stop die oefening; spierpijn is oké. Koorts: niet trainen.',
    ] },
    { h: 'De week' },
    { p: 'Maandag, woensdag en zaterdag zijn de zware beendagen, steeds 48 uur uit elkaar. Dinsdag en donderdag train je je bovenlichaam. Rust op vrijdag beschermt de sprints van zaterdag; rust op zondag beschermt de sprongen en squats van maandag. Explosiviteit lijdt het meest onder vermoeidheid en onder duurwerk kort ervoor.' },
    { h: 'Week 4: deload' },
    { p: 'Week 4 is bewust lichter: dankzij muscle memory komt je kracht sneller terug dan je pezen en gewrichten meegroeien. ±60–70% van je werksets, zelfde gewicht op 3+ RIR. De quality run wordt een easy run met strides, en sprints blijven op ±90%. Handstand en muscle-uptechniek gewoon doen.' },
    { h: 'Herstel' },
    { ul: [
      '**Slaap** 8–10 uur per nacht.',
      '**Eiwit** ±1,6 g per kg lichaamsgewicht per dag, verdeeld over 3–5 momenten.',
      '**Genoeg eten**, vooral koolhydraten rond de zware dagen en de quality run. Worden je gewichten en tijden slechter terwijl je constant moe bent? Eerst meer eten en slapen, niet harder trainen.',
    ] },
    { h: 'Na week 8' },
    { p: 'Fase 2 wordt niet simpelweg zwaarder. Vergelijk je tests en geef je zwakste schakel meer volume, terwijl de rest naar onderhoud gaat. Benen train je in deze fase maar één keer per week zwaar, dus daar kijk je als eerste naar.' },
    { h: 'Waar dit vandaan komt' },
    { sources: [
      { t: 'Kracht en duur in hetzelfde programma remmen vooral explosieve kracht, sterker in dezelfde sessie dan met 3+ uur ertussen.' },
      { t: 'Krachtwinst was vergelijkbaar over een brede range RIR; spiergroei nam toe naarmate sets dichter bij falen stopten.' },
      { t: 'Supersets maken sessies ±37% korter, met vergelijkbare kracht- en spiergroei.' },
      { t: 'Gespreide oefening werkt beter dan geconcentreerde oefening voor continue vaardigheden.' },
      { t: 'Programma\'s met de Nordic hamstring curl gaven 51% minder hamstringblessures (15 studies, 8.459 sporters).' },
      { t: 'Handgeklokte sprinttijden weken gemiddeld ±0,15 s af van elektronische tijd.' },
      { t: 'Bij volwassenen onder 65 die krachttrainen gaf extra eiwit pas vanaf ±1,6 g/kg per dag meetbaar meer spiermassa.' },
      { t: 'Tieners van 13–18 jaar horen 8–10 uur per 24 uur te slapen.' },
      { t: 'Je looppaces komen uit je eigen 8 km-tijd via de VDOT-formule van Daniels en Gilbert.' },
    ] },
  ],
};
