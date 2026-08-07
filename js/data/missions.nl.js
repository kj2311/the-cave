/* ============================================================
   missions.nl.js — Dutch translation of the field assignments.

   Keyed by mission id. Anything missing falls back to English,
   so this file can be extended without breaking anything.
   ============================================================ */

export const MISSIONS_NL = {
  /* ---------------- WAARNEMING ---------------- */
  'm-sweep': {
    title: 'De vaste scan',
    time: '10 min',
    brief: 'Oefen het scanprotocol op een plek waar niets op het spel staat, tot de volgorde geen denkwerk meer kost. Dekking is een procedure, geen talent — maar alleen als die procedure automatisch is.',
    steps: [
      'Ga ergens openbaar zitten met zicht op een ruimte — een café, een wachtkamer, de bus.',
      'Scan in vaste volgorde: uitgangen, dan mensen en hun handen, dan de rand van de ruimte met de klok mee, dan oppervlakken, dan de vloer.',
      'Benoem alles in stilte terwijl je erlangs gaat. Blijf nergens hangen en ga niet terug.',
      'Kijk een volle minuut de andere kant op.',
      'Schrijf op wat je je nog herinnert, in de volgorde waarin je scande.',
    ],
    debrief: 'Welke fase van de scan leverde het minste op? Precies die fase sla je in werkelijkheid over.',
  },
  'm-negative': {
    title: 'Wat er niet is',
    time: '15 min',
    brief: 'Bijna iedereen vraagt "wat is hier?" — een vraag die je verwachtingen maar al te graag voor je beantwoorden. De bruikbare vraag is de andere.',
    steps: [
      'Kies een ruimte die je niet zelf hebt ingericht.',
      'Vraag: wat is hier dat er niet hoort? Let op het vreemde aantal, de verkeerde combinatie, het ding dat niet op zijn plek staat.',
      'Vraag dan: wat ontbreekt dat er wél zou moeten zijn? Gaten in een boekenkast, een schone plek in het stof, een haakje zonder iets eraan.',
      'Schrijf beide lijsten op. Verklaar ze nog niet.',
    ],
    debrief: 'Wat zou er voor elk punt op je tweede lijst waar moeten zijn om het onschuldig te maken? Kun je dat uitsluiten?',
  },
  'm-threshold': {
    title: 'De drempel',
    time: '5 min',
    brief: 'Een test van wat dagelijkse blootstelling werkelijk vastlegt. De meeste mensen ontdekken dat dat vrijwel niets is.',
    steps: [
      'Denk aan een ingang waar je een paar keer per week doorheen loopt.',
      'Schrijf uit je hoofd op: aan welke kant de klink zit, welke kant de deur opengaat, hoeveel treden er zijn, wat er direct links binnen staat, welke kleur de vloer heeft.',
      'Ga kijken.',
    ],
    debrief: 'Hoeveel had je goed, en hoe zeker was je vooraf? Het verschil tussen die twee getallen is waar het hier om gaat.',
  },
  'm-hands': {
    title: 'Handen',
    time: 'één gesprek',
    brief: 'Gezichten worden gespeeld. Handen worden grotendeels vergeten door de persoon die eraan vastzit, waardoor ze meer opleveren — en niemand kijkt ernaar.',
    steps: [
      'Houd in je volgende echte gesprek normaal oogcontact. Staar niemand aan.',
      'Volg met je ooghoeken wat de handen van de ander doen: wat ze vasthouden, wat ze aanraken, wanneer ze stilvallen, wanneer ze bewegen.',
      'Schrijf direct na afloop op wat de handen deden.',
    ],
    debrief: 'Deden de handen iets wat het gezicht niet deed? Noteer het zonder te bepalen wat het betekende.',
  },
  'm-floor': {
    title: 'Het vergeten vlak',
    time: '20 min',
    brief: 'De vloer is het minst bekeken oppervlak in elke ruimte, en precies daar zetten mensen dingen neer als ze er niet bij nadenken.',
    steps: [
      'Kijk op één dag in vier verschillende ruimtes bewust tien seconden naar de vloer.',
      'Let op: slijtpatronen, wat is neergezet in plaats van opgeruimd, vlekken, wat ónder meubels ligt in plaats van erop.',
      'Schrijf één regel per ruimte.',
    ],
    debrief: 'Wat vertelde een vloer je dat de rest van de ruimte niet vertelde?',
  },
  'm-wear': {
    title: 'Lees het voorwerp',
    time: '20 min',
    brief: 'Fysieke sporen van tijd zijn het sterkste bewijs dat er is — traag, onbewust, duur om te vervalsen. Oefen het lezen ervan waar je je antwoord kunt controleren.',
    steps: [
      'Kies een voorwerp dat iemand jarenlang intensief heeft gebruikt: gereedschap, een tas, een stoel, een toetsenbord, een pan.',
      'Schrijf alleen op basis van de slijtage op wat je kunt zeggen over het gebruik — welke hand, hoe vaak, waarvoor, met hoeveel zorg.',
      'Splits je lijst in wat de slijtage ondersteunt en wat jij eraan toevoegt.',
      'Vraag het de eigenaar, als dat kan.',
    ],
    debrief: 'Waar had je gelijk, en had je gelijk om de reden die je dacht?',
  },

  /* ---------------- GEHEUGEN ---------------- */
  'm-palace': {
    title: 'Bouw het paleis',
    time: '20 min, eenmalig',
    brief: 'Een eenmalige investering die jaren blijft renderen. Je leert geen trucje; je legt de vaste route aan waar al het andere aan opgehangen wordt.',
    steps: [
      'Kies een plek die je kent zonder na te denken — je huis, je route naar werk, het interieur van je auto.',
      'Leg tien duidelijke haltes langs één route vast, altijd dezelfde richting, nooit terug.',
      'Loop hem vier keer in gedachten tot de volgorde vanzelf gaat.',
      'Schrijf de tien haltes één keer op en kijk daarna niet meer op je lijst.',
    ],
    debrief: 'Noem je tien haltes in omgekeerde volgorde. Lukt dat moeizaam, dan ligt de route nog niet vast — loop hem morgen opnieuw.',
  },
  'm-shopping': {
    title: 'Zonder lijstje',
    time: 'één boodschap',
    brief: 'Het eerste echte gebruik van het paleis. Lage inzet, directe feedback, en je merkt meteen welke van je beelden te braaf waren.',
    steps: [
      'Schrijf een boodschappenlijst van minstens twaalf items.',
      'Plaats elk item op een halte van je route als een absurd, bewegend beeld dat iets doet met die plek.',
      'Laat het lijstje thuis.',
      'Doe je boodschappen. Controleer de lijst pas achteraf.',
    ],
    debrief: 'Welke items ben je kwijtgeraakt? Kijk naar het beeld dat je ervoor maakte — dat was waarschijnlijk stilstaand, logisch of op ware grootte.',
  },
  'm-names': {
    title: 'Drie namen',
    time: 'één week',
    brief: '"Ik ben slecht in namen" beschrijft bijna altijd aandacht, niet geheugen. Deze opdracht haalt dat excuus in een week weg.',
    steps: [
      'Leer deze week de namen van drie mensen die je nog niet kende.',
      'Voor elk: hoor de naam echt, zeg hem meteen terug, koppel hem als beeld aan één fysiek kenmerk, en gebruik hem nog één keer voor je weggaat.',
      'Haal elke naam daarna opnieuw op: na een uur, die avond, en twee dagen later.',
      'Ophalen — niet je notitie herlezen.',
    ],
    debrief: 'Welke van de drie zit het zwakst, en wat deed je anders bij het inprenten van juist die naam?',
  },
  'm-reverse': {
    title: 'De dag achterstevoren',
    time: '10 min',
    brief: 'Een andere ophaalroute brengt details boven die de voorwaartse ronde oversloeg. Dit is de eerlijke versie van een techniek die vaak wordt verkocht als leugendetectie.',
    steps: [
      'Reconstrueer aan het eind van een dag die dag in omgekeerde volgorde — van nu terug tot het opstaan.',
      'Ga in echte stappen, niet in samenvatting: niet "de middag", maar elke handeling.',
      'Markeer elke plek waar het geheugen leegloopt.',
    ],
    debrief: 'Wat leverde de omgekeerde ronde op dat een voorwaartse ronde in één zin had samengevat?',
  },
  'm-anchor': {
    title: 'Het anker',
    time: '15 min',
    brief: 'Getallen hebben geen beeld, en precies daarom onthouden de meeste mensen ze niet. Geef ze er een.',
    steps: [
      'Neem een getal dat je echt uit je hoofd zou willen kennen — een pas, een rekening, een noodcontact.',
      'Hak het in stukjes van twee of drie cijfers.',
      'Maak van elk stukje een concreet beeld en zet het op je route.',
      'Haal het morgen op, over drie dagen, en over een week.',
    ],
    debrief: 'Komt het getal na een week terug als cijfers of als beelden? Allebei is prima — noteer welke.',
  },

  /* ---------------- DEDUCTIE ---------------- */
  'm-two': {
    title: 'Twee verklaringen',
    time: 'de hele dag',
    brief: 'De gewoonte met het hoogste rendement in deze app. Kun je geen tweede verklaring bedenken, dan begrijp je de situatie niet goed genoeg om er een mening over te hebben.',
    steps: [
      'Elke keer dat je jezelf vandaag betrapt op een conclusie — over een persoon, een bericht, een vertraging, een blik — stop.',
      'Dwing een tweede verklaring naar boven die ook past. Geen stroman.',
      'Daarna een derde, als het lukt.',
      'Merk op hoe vaak de tweede minstens zo goed is als de eerste.',
    ],
    debrief: 'Schrijf de situatie op waarin de tweede verklaring achteraf de juiste bleek.',
  },
  'm-break': {
    title: 'Wat zou het onderuithalen',
    time: '10 min',
    brief: 'Een conclusie is houdbaar als je de waarneming kunt noemen die haar zou vernietigen. Kan niets dat, dan heb je je er niet naartoe geredeneerd.',
    steps: [
      'Schrijf iets op dat je op dit moment gelooft over een persoon of situatie in je leven.',
      'Schrijf de ene waarneming op die je zou dwingen dat los te laten.',
      'Vraag jezelf of je ooit naar die waarneming op zoek bent gegaan.',
    ],
    debrief: 'Als het antwoord nee is — wat zou er nodig zijn om er deze week wél naar te kijken?',
  },
  'm-rank': {
    title: 'Rangschik het bewijs',
    time: '15 min',
    brief: 'De meeste slechte conclusies ontstaan doordat een goedkoop feit zwaarder weegt dan een duur feit, omdat goedkope feiten harder schreeuwen.',
    steps: [
      'Neem een situatie die je nu aan het inschatten bent — een aanname, een aankoop, een bewering van iemand.',
      'Zet elke waarneming op een rij die je werkelijk hebt.',
      'Sorteer ze: fysieke sporen van tijd, dan motorische gewoonte, dan onwillekeurige timing, dan bewuste presentatie.',
      'Kijk waar je mening in werkelijkheid op rustte.',
    ],
    debrief: 'Rustte je conclusie op de bovenkant van die lijst of op de onderkant?',
  },
  'm-morning': {
    title: 'Het afgelopen uur',
    time: '10 min',
    brief: 'Oefening in precies stoppen waar het bewijs stopt — de discipline die de fictieve rechercheurs nooit voordoen, omdat hun schrijver aan hun kant staat.',
    steps: [
      'Kies op een openbare plek één onbekende. Kijk maximaal een minuut, zonder iemand te volgen of aan te spreken.',
      'Schrijf op wat hun afgelopen uur waarschijnlijk bevatte.',
      'Loop je tekst regel voor regel na en markeer elke regel als GEWETEN of TOEGEVOEGD.',
    ],
    debrief: 'Wat is je verhouding? Vrijwel iedereen ontdekt dat TOEGEVOEGD een paar keer zo vaak voorkomt.',
  },
  'm-absence': {
    title: 'Het argument uit afwezigheid',
    time: 'één week',
    brief: 'Vraag welk spoor een beweerde geschiedenis had moeten achterlaten, en ga daarnaar kijken. Dit is de zet die de kok met ongeschonden onderarmen ontmaskert.',
    steps: [
      'Vang deze week één bewering op die iemand doet over zijn eigen verleden, gewoontes of vakmanschap. Elke bewering, hoe klein ook.',
      'Bepaal welk fysiek of gedragsmatig spoor die bewering voorspelt.',
      'Kijk — zonder iemand te ondervragen en zonder aan te kondigen wat je doet.',
      'Noteer of het spoor er is.',
    ],
    debrief: 'Vond je bevestiging, afwezigheid, of geen bewijs in beide richtingen? Dat laatste komt het vaakst voor en voelt het minst bevredigend.',
  },

  /* ---------------- MENSEN LEZEN ---------------- */
  'm-baseline': {
    title: 'Leg een basislijn vast',
    time: 'drie sessies',
    brief: 'De stap die iedereen overslaat. Zonder basislijn is elk gedrag dat je opmerkt betekenisloos, en lees je met veel overtuiging het meubilair.',
    steps: [
      'Kies iemand die je regelmatig ziet in situaties zonder spanning.',
      'Noteer over drie verschillende gelegenheden alleen hun normaal: spreektempo, hoeveel ze gebaren, waar ze kijken, hoe ze zitten, hun stopwoorden.',
      'Concludeer niets. Interpreteer niets. Je legt alleen de referentie vast.',
    ],
    debrief: 'Schrijf hun basislijn in vijf regels op. Lukt dat niet, dan heb je nog niet genoeg gekeken.',
  },
  'm-transition': {
    title: 'De omslag',
    time: 'één gesprek',
    brief: 'Een houding die veertig minuten hetzelfde blijft is meubilair. De informatie zit in het moment dat het verandert, en in wat het veranderde.',
    steps: [
      'Houd in een langer gesprek de basislijn van de ander in gedachten.',
      'Let op een moment waarop meerdere losstaande kanalen tegelijk verschuiven — tempo, houding, handen, blik.',
      'Noteer wat er in de twee seconden daarvoor werd gezegd.',
      'Breng het niet ter sprake. Leg het alleen vast.',
    ],
    debrief: 'Wat was de aanleiding, en kun je drie onschuldige redenen noemen waarom die verschuiving optrad?',
  },
  'm-room': {
    title: 'Waar de zaal naar kijkt',
    time: 'één vergadering',
    brief: 'Groepen wijzen. Ogen bewegen naar degene die de zaal met een onderwerp associeert, sneller dan iemand besluit te kijken.',
    steps: [
      'Kijk in je volgende vergadering naar de luisteraars in plaats van naar de spreker.',
      'Noteer waar de eerste blikken heen gaan zodra een belangrijk onderwerp landt.',
      'Doe dit drie of vier keer verspreid over de vergadering.',
    ],
    debrief: 'Naar wie wees de zaal, en wat zegt dat je — bedenk dat het associatie aanwijst, niet schuld of gezag?',
  },
  'm-ask': {
    title: 'Vraag het, verkondig het niet',
    time: 'één week',
    brief: 'De valkuil van iedereen die dit traint: zelfverzekerder worden dan je accuraat bent, en mensen op dun bewijs vertellen wat ze voelen. Deze opdracht is het tegengif.',
    steps: [
      'Stel deze week nooit als feit vast wat je bij iemand opmerkt.',
      'Bied het aan als een vraag die ze mogen afwijzen: "er verschoof iets toen dat ter sprake kwam — zegt dat je iets?"',
      'Accepteer "nee" zonder door te drukken, en zonder in stilte te besluiten dat je toch gelijk had.',
    ],
    debrief: 'Hoe vaak had je het mis? Is het antwoord nooit, dan toets je je aannames niet — dan verzamel je instemming.',
  },

  /* ---------------- INVLOED ---------------- */
  'm-pause': {
    title: 'De stilte',
    time: 'drie gesprekken',
    brief: 'Het sterkste legitieme middel voor nadruk dat er is, en het middel dat vrijwel niemand gebruikt omdat de stilte van binnenuit ongemakkelijk voelt.',
    steps: [
      'Kies het ene ding in een gesprek dat je echt onthouden wilt hebben.',
      'Zeg het. Zwijg dan drie tot vier volle seconden.',
      'Vul het niet op, verzacht het niet, herhaal het niet.',
      'Doe dit in drie verschillende gesprekken.',
    ],
    debrief: 'Hoe lang voelde de stilte, en wat deed de ander ermee?',
  },
  'm-barnum': {
    title: 'Barnum-jacht',
    time: '15 min',
    brief: 'Zodra je de vorm ervan herkent, werkt het niet meer op jou. En de vorm is overal.',
    steps: [
      'Zoek drie voorbeelden in het wild: een horoscoop, de uitslag van een persoonlijkheidstest, een advertentie, het praatje van een recruiter, een online medium.',
      'Pas op elke uitspraak één toets toe: had dit zichtbaar onjuist kunnen zijn?',
      'Herschrijf er één zo dat hij fout kán zijn, en merk hoeveel zwakker hij dan klinkt.',
    ],
    debrief: 'Welke had je bijna te pakken voordat je de toets toepaste?',
  },
  'm-open': {
    title: 'Geen gesloten vragen',
    time: 'één gesprek',
    brief: 'De wetenschappelijk onderbouwde gespreksmodellen zijn hierop gebouwd: open vragen, een ononderbroken verhaal, niets sturends. Het levert nauwkeuriger detail op dan welke confronterende aanpak ook.',
    steps: [
      'Voer één heel gesprek zonder één vraag te stellen die met ja of nee te beantwoorden is.',
      'Gebruik: vertel eens, neem me mee door, wat gebeurde er daarna, hoe was dat.',
      'Wacht als ze stoppen met praten, in plaats van je volgende vraag te stellen.',
    ],
    debrief: 'Wat kwam er boven dat een ja/nee-vraag had afgesloten?',
  },
  'm-freerecall': {
    title: 'Vijf minuten zonder onderbreking',
    time: 'één gesprek',
    brief: 'De kern van het PEACE-model: laat het verhaal volledig lopen voordat je ook maar in de buurt van tegenstrijdigheden komt. Het is moeilijker dan het klinkt en het is waar het detail zit.',
    steps: [
      'Vraag iemand je te vertellen over iets dat hen is overkomen.',
      'Onderbreek vijf minuten lang niet. Geen verhelderende vragen, geen "en toen —", geen zinnen afmaken.',
      'Gebruik alleen minimale aanmoediging: een knik, een stilte, "ga door".',
      'Ga pas daarna terug naar de stukken waar je meer over wilt weten.',
    ],
    debrief: 'Wat wilde je bijna vragen, en kwamen ze er uiteindelijk zelf op?',
  },
  'm-beread': {
    title: 'Wees zelf het onderwerp',
    time: '20 min',
    brief: 'Verdediging is het hele punt van deze helft. Ga bewust aan de ontvangende kant staan terwijl je het mechanisme nog kunt zien.',
    steps: [
      'Zoek een cold reading die op een algemeen publiek gericht is — een online medium, een horoscooprubriek, een persoonlijkheidsrapport.',
      'Schrijf vóór elke uitspraak op wat zou gelden als "dit is onjuist".',
      'Lees hem dan en scoor eerlijk.',
      'Tel hoeveel uitspraken werkelijk fout hadden kunnen zijn.',
    ],
    debrief: 'Hoeveel konden er fout zijn? Ligt dat aantal dicht bij nul, dan is er nooit informatie naar je toe gegaan, hoe raak het ook voelde.',
  },

  /* ---------------- KALMTE ---------------- */
  'm-exhale': {
    title: 'De lange uitademing',
    time: '2 min',
    brief: 'Spanning pakt eerst je werkgeheugen af, en in dat werkgeheugen gebeurt alles uit deze app. De verlengde uitademing is het deel dat het werk doet.',
    steps: [
      'Neem twee minuten vóór iets waar je gespannen over bent — een telefoontje, een vergadering, een gesprek.',
      'Adem vier tellen in, zes tot acht tellen uit. De uitademing is het werkzame bestanddeel.',
      'Benoem je toestand in gewone woorden: "dit is adrenaline".',
      'Ga dan naar binnen.',
    ],
    debrief: 'Wat was er anders aan je eerste zestig seconden in die ruimte?',
  },
  'm-slow': {
    title: 'Halveer het tempo',
    time: 'één gesprek',
    brief: 'Bewust vertragen wat zichtbaar is werkt terug op de toestand eronder. Het koopt je bovendien denktijd waarvan niemand merkt dat je hem neemt.',
    steps: [
      'Vertraag in één gesprek bewust je spreektempo en je bewegingen — hoe snel je gaat zitten, gebaart, ergens naar reikt.',
      'Laat een tel vallen vóór elk antwoord, ook de makkelijke.',
      'Blijf net onder het punt waarop het vreemd zou overkomen.',
    ],
    debrief: 'Reageerde iemand erop? Wat veranderde er in hoe er naar je geluisterd werd?',
  },
  'm-dontknow': {
    title: 'Drie keer, eerlijk',
    time: 'één week',
    brief: '"Ik weet het nog niet" vasthouden tegen de aantrekkingskracht van een bevredigende conclusie is dezelfde onderdrukking die de Kalmte-oefening meet — en sociaal kost het veel meer dan op een scherm.',
    steps: [
      'Zeg deze week drie keer hardop "ik weet het niet" wanneer dat waar is.',
      'Niet "ik denk misschien", geen slag om de arm, geen gok verkleed als antwoord.',
      'Noteer wat je dacht dat het je kostte, en wat het je werkelijk kostte.',
    ],
    debrief: 'Wat verwachtte je dat er zou gebeuren, en wat gebeurde er?',
  },
  'm-silence': {
    title: 'Houd de stilte vast',
    time: 'één gesprek',
    brief: 'De meeste mensen vullen een stilte binnen twee seconden op, en wat ze er dan in gooien is vaak het bruikbaarste dat ze zeggen.',
    steps: [
      'Stel iemand een oprechte, open vraag over iets dat ertoe doet.',
      'Zeg niets als ze klaar zijn. Tel in gedachten tot vijf.',
      'Knik ze niet verder en begin niet aan je volgende vraag.',
      'Laat hen bepalen of ze doorgaan.',
    ],
    debrief: 'Voegden ze na de stilte nog iets toe? Was dat wezenlijk anders dan wat ervoor kwam?',
  },
};
