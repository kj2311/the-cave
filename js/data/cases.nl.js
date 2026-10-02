/* ============================================================
   cases.nl.js — Dutch translation of the deduction case files.

   Only text. `key` (which observation is decisive) and the `ok`
   flags stay in the English source; options here are a plain
   array in the same order, and the resolver maps them on.
   ============================================================ */

export const CASES_NL = {
  chef: {
    title: 'De sollicitant',
    scene: 'Een man solliciteert als chef-kok. Hij zegt dat hij elf jaar lang zelf heeft gekookt in drukke restaurantkeukens.',
    facts: [
      'Op zijn onderarmen en de bovenkant van zijn handen zitten geen sporen. Geen brandlittekens, geen oude sneetjes van een mes.',
      'Op de vingertoppen van zijn linkerhand zit dik eelt. De nagels van zijn rechterhand zijn lang en gevijld.',
      'Hij is een kwartier te vroeg en heeft een uitgeprint cv bij zich.',
      'Voor zichzelf bestelt hij een biefstuk, goed doorbakken.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Hij liegt over die elf jaar, en hij speelt serieus een snaarinstrument.',
      'Hij zegt de waarheid, maar gaf vooral leiding en stond zelf niet aan het fornuis.',
      'Hij is eigenlijk patissier, geen gewone kok.',
      'Niets hier spreekt zijn verhaal tegen.',
    ],
    explain: 'Wie elf jaar in een drukke keuken kookt, houdt daar sporen aan over: brandplekken van ovenroosters op de onderarmen en sneetjes op de linkerhand. Die sporen ontbreken helemaal. Dat is de tegenspraak, dus aanwijzing 1 doet het werk. "Vooral leidinggegeven" redt zijn verhaal niet, want hij zegt dat hij zelf heeft gekookt. Aanwijzing 2 vertelt wat hij wél heeft gedaan. Eelt op de linkervingertoppen en lange nagels rechts horen bij een klassiek gitarist. Zo\'n hand bouw je in jaren op. Aanwijzing 4 is een hint, maar zwak: genoeg koks eten vreemd. Aanwijzing 3 zegt niets.',
    principle: 'Wat ontbreekt, is ook bewijs. Vraag je af welke sporen het verhaal zou achterlaten als het waar was, en zoek die.',
  },

  ice: {
    title: 'Kamer 412',
    scene: 'Een hotelgast zegt dat ze "ongeveer een uur geleden" heeft ingecheckt. Volgens haar is ze sindsdien niet van de kamer af geweest.',
    facts: [
      'Ze zegt dat ze de ijsemmer vulde toen ze aankwam. Nu zit er water in, en nog één dun stukje ijs.',
      'Haar koffer staat open en haar kleren hangen in de kast.',
      'De tv staat uit, en de achterkant is warm.',
      'Het gratis flesje water van het hotel is nog dicht.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Ze is al veel langer dan een uur in de kamer.',
      'Ze checkte een uur geleden in, maar vóór haar was er iemand anders in de kamer.',
      'Ze is de kamer uit geweest en kort geleden teruggekomen.',
      'De tijden kloppen met haar verhaal.',
    ],
    explain: 'Een volle ijsemmer heeft bij kamertemperatuur ongeveer drie uur nodig om tot één stukje te smelten. En ze vulde hem zelf toen ze aankwam. Aanwijzing 1 is dus een klok die zij zelf startte en niet kan terugzetten. De warme tv (aanwijzing 3) past bij een langer verblijf, maar is zwakker: een tv koelt langzaam af, en ze kan hem net hebben uitgezet. Aanwijzing 2 past bij elk verblijf langer dan tien minuten. Aanwijzing 4 zegt helemaal niets.',
    principle: 'Een kamer zit vol klokken: smeltend ijs, drankjes die afkoelen, natte kringen die opdrogen, stof dat neerdaalt. Zoek de klok voordat je een tijdlijn gelooft.',
  },

  car: {
    title: 'Drie jaar, zegt hij',
    scene: 'Een man verkoopt zelf zijn auto. Hij zegt dat hij de auto al drie jaar heeft en er elke dag in rijdt.',
    facts: [
      'Het rubber op het rempedaal is gladgesleten, iets meer links dan rechts.',
      'Hij zegt dat hij er net zelf mee hierheen reed. Maar als hij achter het stuur zit, ziet hij in de binnenspiegel alleen het dak. De spiegel staat goed voor iemand die een kop groter is.',
      'De vloermatten zijn nieuw. Binnen ruikt het naar schoonmaakmiddel voor de bekleding.',
      'Alle opgeslagen radiozenders zijn nog de standaardzenders uit de fabriek.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Er is echt veel in de auto gereden, maar niet door hem.',
      'Hij liegt over de leeftijd van de auto: die is veel nieuwer dan hij zegt.',
      'Hij heeft de auto drie jaar, maar heeft er bijna niet in gereden.',
      'De auto heeft een ongeluk gehad, en dat verzwijgt hij.',
    ],
    explain: 'Aanwijzing 1 bewijst dat er veel met de auto is gereden. Hij is dus niet nieuw. Aanwijzing 2 is de tegenspraak. Wie rijdt, zet de spiegel goed voor zijn eigen lengte, en hij zegt dat hij net zelf reed. Wie hier elke dag in rijdt, is een kop groter dan hij. Aanwijzing 4 wijst dezelfde kant op, maar is zwak: veel mensen streamen muziek en raken de radio nooit aan. Op aanwijzing 3 springen de meeste mensen. Maar die bewijst alleen dat hij de auto heeft schoongemaakt voor de verkoop. Dat doet elke eerlijke verkoper ook.',
    principle: 'Spullen verraden de gewoontes van hun eigenaar. Gewoontes groeien langzaam, zijn moeilijk na te doen en bijna nooit ingestudeerd.',
  },

  run: {
    title: 'Het ochtendrondje',
    scene: 'Het regende de hele ochtend hard. Twintig minuten geleden stopte het, en overal liggen nog plassen. Je collega komt binnen en zegt dat hij net tien kilometer buiten heeft hardgelopen.',
    facts: [
      'Hij heeft zijn hardloopschoenen nog aan. Die en zijn sokken zijn kurkdroog, en de veters zijn schoon.',
      'Zijn shirt is overal even vochtig, voor en achter precies hetzelfde.',
      'Hij ademt normaal en praat in hele zinnen.',
      'Zijn waterfles is nog bijna vol.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Hij heeft vanochtend geen tien kilometer buiten gelopen.',
      'Hij liep wel buiten, maar veel minder dan tien kilometer.',
      'Hij liep buiten voordat de regen begon.',
      'Alles hier past bij zijn verhaal.',
    ],
    explain: 'Aanwijzing 1 beslist het, en die is bijna niet weg te redeneren. Je kunt niet over natte paden vol plassen rennen en toch droge schoenen en sokken houden. Ook niet voor één kilometer. "Voor de regen" helpt ook niet: het regende de hele ochtend. Dan was hij uren geleden klaar, niet net. Aanwijzing 2 laat het verhaal echt lijken. Maar zweet maakt een shirt niet overal even nat. Het zit vooral op je borst, je rug en onder je armen. Aanwijzing 3 en 4 zijn zwak: fitte lopers zijn snel hersteld, en sommigen nemen water mee dat ze niet drinken. Let op wat je níét weet: of hij ergens anders liep, bijvoorbeeld op een loopband. Je weet alleen dat die tien kilometer buiten niet gebeurd zijn.',
    principle: 'Test een verhaal aan de sporen die het had moeten achterlaten. Natte paden geven natte schoenen, en dat weegt zwaarder dan een vochtig shirt.',
  },

  interp: {
    title: 'De tolk',
    scene: 'Je verhoort een getuige via een tolk. Hij houdt vol dat hij helemaal geen Engels spreekt.',
    facts: [
      'Eén keer vertaalt de tolk een van je langere vragen verkeerd. De getuige beantwoordt de vraag die jij echt stelde, niet de vraag die hij te horen kreeg.',
      'Hij beantwoordt elke vraag volledig en zonder te aarzelen.',
      'Na elk antwoord dat hij geeft, kijkt hij even naar de tolk.',
      'Tijdens het verhoor van een uur vraagt hij twee keer om water.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Hij verstaat Engels en verbergt dat.',
      'Hij kent een paar woorden Engels, maar meer niet.',
      'Hij leest je lichaamstaal, niet je woorden.',
      'De tolk zegt hem voor.',
    ],
    explain: 'Aanwijzing 1 beslist het. Hij kreeg de verkeerde vraag, maar gaf antwoord op de goede. Dan moet hij jouw Engels hebben verstaan. Het gaat om een hele vraag, niet om een paar woorden. Lichaamstaal kan geen vraag overbrengen. En de tolk kan hem niet hebben voorgezegd, want de tolk vertaalde juist verkeerd. Aanwijzing 3 past er ook bij: na je antwoord naar de tolk kijken lijkt op controleren of hij goed vertaalt. Maar het kan ook onschuldig zijn. Aanwijzing 2 en 4 zeggen niets.',
    principle: 'Zoek een reactie op informatie die iemand niet zou mogen hebben. Eén zo\'n slip weegt zwaarder dan al het zenuwachtige gedrag bij elkaar.',
  },

  tanline: {
    title: 'Nooit getrouwd',
    scene: 'Tijdens het eten zegt een man tussendoor dat hij nooit getrouwd is geweest.',
    facts: [
      'Onderaan de ringvinger van zijn linkerhand zit een bleke band. De huid is daar een beetje ingedeukt.',
      'Hij draagt zijn horloge om zijn rechterpols.',
      'Twee keer, als hij nadenkt, wrijft hij met zijn rechterduim over die vinger.',
      'Hij is vaag over waar hij vóór dit jaar woonde.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Hij droeg jarenlang een ring aan die vinger en is daar kort geleden mee gestopt.',
      'Hij is nu getrouwd en heeft de ring vóór het eten afgedaan.',
      'Hij is gescheiden en verzwijgt dat expres.',
      'Hij is kort geleden afgevallen, waardoor een ring die hij nog draagt losser zit.',
    ],
    explain: 'Aanwijzing 1 vertelt je precies één ding. Hij droeg lang een ring en is daar kort geleden mee gestopt. Meer niet. Wil je verder gaan (nu getrouwd, gescheiden, iets verbergen)? Dan moet je iets aannemen wat het bewijs niet laat zien. Aanwijzing 3 verraadt dat de ring er nog maar *kort* af is. Zijn hand zoekt nog iets wat weg is. Aanwijzing 4 maakt het verleidelijk om een verhaal te verzinnen. Doe dat niet.',
    principle: 'Stop precies waar het bewijs stopt. "Hij droeg een ring" is kennis, "zijn vrouw is bij hem weg" is een verhaal.',
  },

  switch: {
    title: 'Voor het eerst hier',
    scene: 'Een gast wordt een huis binnengelaten. Ze zegt dat ze hier voor het eerst is. Vorig jaar hebben de bewoners de gang verbouwd. Het lichtknopje zit sindsdien op een vreemde plek: laag, achter de kapstok.',
    facts: [
      'In de donkere gang gaat haar hand meteen naar dat knopje, zonder dat ze ernaar zoekt.',
      'Ze geeft een compliment over de schilderijen in de woonkamer.',
      'Voor een glas opent ze het tweede kastje. Daar staan de glazen.',
      'Ze slaat een rondleiding over de bovenverdieping af.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Ze is al eerder in dit huis geweest, en vaker dan één keer.',
      'Ze heeft foto\'s of een plattegrond van het huis gezien.',
      'Ze woonde zelf in een huis met precies dezelfde indeling.',
      'Iemand heeft haar van tevoren verteld waar alles is.',
    ],
    explain: 'Aanwijzing 1 beslist het. Blind in het donker naar een knopje grijpen is spiergeheugen. Dat bouw je op door het vaak te doen, niet doordat iemand het je vertelt. En dit knopje zit pas sinds vorig jaar op die vreemde plek. Een huis met dezelfde indeling of een oude plattegrond verklaart die greep dus ook niet. Aanwijzing 3 steunt het, maar waar de glazen staan, kan iemand je vertellen. Aanwijzing 4 is interessant, maar bewijst niets. Er zijn tientallen onschuldige redenen om een rondleiding over te slaan.',
    principle: 'Houd uit elkaar wat iemand weet en wat zijn lichaam weet. Dat laatste is veel moeilijker te faken en verraadt veel meer.',
  },

  cardstock: {
    title: 'Senior partner',
    scene: 'Op een congres zegt een man dat hij senior partner (mede-eigenaar) is bij een groot bedrijf. Hij geeft je zijn visitekaartje.',
    facts: [
      'De korte randen van het kaartje zijn licht geribbeld en een beetje vezelig.',
      'Het e-mailadres erop is een gratis adres dat iedereen kan aanmaken.',
      'Zijn schoenen zijn van goede kwaliteit en hebben minstens één keer nieuwe zolen gekregen.',
      'Hij kwam vijfentwintig minuten voordat de sessie begon.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Hij heeft de kaartjes zelf geprint. Het verhaal over het grote bedrijf klopt niet.',
      'Hij is partner bij een heel klein bedrijf en maakt het groter dan het is.',
      'Hij is kort geleden ontslagen en heeft zijn kaartjes nog niet aangepast.',
      'Hij heeft weinig geld en bezuinigt.',
    ],
    explain: 'Geribbelde, vezelige randen krijg je als je kaartjes losscheurt uit een vel voor je printer thuis. Aanwijzing 1 is iets wat je kunt voelen, en het is heel precies. Aanwijzing 2 bevestigt dat: een groot bedrijf geeft zijn mensen een e-mailadres van het bedrijf. Aanwijzing 3 is de valkuil. Wie slordig kijkt, denkt bij schoenen met nieuwe zolen: die man is blut. Maar wie verstand heeft van schoenen, laat goede schoenen gewoon verzolen. Dat doen mensen met elk inkomen. Aanwijzing 4 is ruis. Hooguit is het een zwak teken dat hij de mensen hier harder nodig heeft dan zij hem.',
    principle: 'Zet je aanwijzingen op volgorde. Bovenaan komt wat moeilijk te faken is en bij weinig verklaringen past: die wijst de weg.',
  },

  sugar: {
    title: 'De hele avond alleen',
    scene: 'Een vrouw zegt dat ze de hele avond alleen thuis was.',
    facts: [
      'Op het aanrecht staan twee gebruikte mokken.',
      'Eén ervan is nog een beetje warm. Onderin ligt suiker die niet is opgelost.',
      'Ze neemt nooit suiker, niet in koffie en niet in thee. Je kent haar al jaren.',
      'De tv-gids ligt open bij de programma\'s van gisteravond.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Er was vanavond nog iemand in huis, en die heeft hier iets gedronken.',
      'Ze had bezoek en is vergeten dat te zeggen.',
      'Ze heeft die avond twee drankjes voor zichzelf gemaakt.',
      'De mokken staan er nog van een eerdere dag.',
    ],
    explain: 'Twee gebruikte mokken (aanwijzing 1) zeggen op zich weinig. Iedereen kan op een avond twee mokken gebruiken. Aanwijzing 2 breekt het verhaal, maar alleen samen met aanwijzing 3. De mok is nog warm, dus hij is vanavond gebruikt. Er zat een zoet drankje in. En zij neemt nooit suiker. Dus heeft iemand anders er vanavond uit gedronken. Het antwoord "ze had bezoek en is het vergeten" klinkt goed, maar is zwakker. "Vergeten" is een gok naar waarom ze niets zei, en dat laat het bewijs niet zien. Aanwijzing 4 zegt niets.',
    principle: 'Eén afwijking is een vraag. Een afwijking plus een bekende basislijn (hoe iemand normaal doet) is een antwoord.',
  },

  lighter: {
    title: 'Twee jaar rookvrij',
    scene: 'Een collega vertelt dat hij twee jaar geleden is gestopt met roken.',
    facts: [
      'Als een vergadering gespannen wordt, gaat zijn hand naar zijn linkerborstzak en stopt daar.',
      'Als hij zijn mouwen opstroopt, zie je een nicotinepleister op zijn bovenarm.',
      'Hij heeft een aansteker bij zich, maar geen sigaretten.',
      'Zijn tanden zijn niet verkleurd.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Hij is veel korter dan twee jaar geleden gestopt.',
      'Hij rookt nog steeds en houdt dat helemaal verborgen.',
      'Hij is twee jaar geleden gestopt, precies zoals hij zegt.',
      'Hij heeft nooit gerookt en verzint het hele verhaal.',
    ],
    explain: 'Aanwijzing 2 beslist het. Een nicotinepleister is een hulpmiddel om te stoppen. Meestal gebruik je die een paar maanden na je laatste sigaret, niet twee jaar later. Aanwijzing 1 wijst dezelfde kant op: zijn hand zoekt sigaretten die er niet meer zijn. Maar zo\'n gewoonte kan lang blijven hangen, dus op zich zegt die niets over wanneer hij stopte. De aansteker (aanwijzing 3) past bij pas gestopt, al hebben sommige mensen er gewoon een bij zich. Schone tanden (aanwijzing 4) pleiten tegen jarenlang zwaar roken, niet tegen pas gestopt zijn.',
    principle: 'Sommige sporen bestaan maar kort na een verandering. Vind er zo een, en je weet wanneer de verandering was.',
  },

  flowers: {
    title: 'Bloemen om 18:40',
    scene: 'Een man komt thuis met bloemen. Hij zegt dat ze voor hun trouwdag zijn.',
    facts: [
      'De bloemen komen van het tankstation op vierhonderd meter van het huis. De prijssticker zit er nog op.',
      'Hij heeft ook een kaart gekocht. Die zit nog in het plastic.',
      'Hij komt op zijn normale tijd thuis.',
      'De verpakking is het gewone plastic van een tankstation, geen papier van een bloemist.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'De bloemen zijn een idee van de laatste paar minuten, wat de reden ook is.',
      'Hij was de trouwdag vergeten en probeert dat te verbergen.',
      'Hij biedt ermee excuses aan, in plaats van iets te vieren.',
      'Er is helemaal geen trouwdag. Hij verzint er een.',
    ],
    explain: 'Alles hier vertelt je *wanneer* hij de bloemen kocht, niet waarom. Aanwijzing 1 geeft de doorslag. Ken je de datum van tevoren, dan koop je ook eerder iets. Op een betere plek, verder weg. Aanwijzing 2 en 4 bevestigen dat het op het laatste moment ging. De antwoorden over "vergeten" en over "excuses" zijn allebei geloofwaardig. Dat is precies het probleem. Het bewijs kan niet tussen die twee kiezen. Je kunt dus nog geen van beide verdedigen.',
    principle: 'Passen twee verhalen even goed, dan heb je het nog niet opgelost. Zeg wat je echt weet, en zoek de aanwijzing die ze uit elkaar haalt.',
  },

  dust: {
    title: 'Er is niets weg',
    scene: 'Een werkkamer is doorzocht. De eigenaar houdt vol dat er niets weg is.',
    facts: [
      'Op de plank ligt een laagje stof. Daarin zit een schone rechthoek: ongeveer de afdruk van een klein doosje.',
      'De bureauladen zijn dicht, maar binnenin ligt alles door elkaar.',
      'Een raam zit niet op slot.',
      'Bij de deur ligt het kleed in een plooi.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Er stond tot kort geleden iets op die plank, en dat is nu weg.',
      'De eigenaar liegt om de waarde te beschermen van wat er gestolen is.',
      'De inbreker kwam binnen via het raam en ging weg via de deur.',
      'Iemand heeft het doorzoeken achteraf in scène gezet.',
    ],
    explain: 'Aanwijzing 1 is een afdruk van iets wat er niet meer is. Stof valt overal, behalve onder wat er staat. De vorm laat dus zien hoe groot het ding was, en ongeveer hoe lang het er stond. Meer bewijst het niet. Aanwijzing 2 zegt dat er gezocht is. Aanwijzing 3 zegt alleen dat een raam niet op slot zit. Dat iemand erdoor binnenkwam, is een aanname. Het antwoord dat de eigenaar liegt, kan best kloppen. Maar dit bewijs zegt niets over zijn reden.',
    principle: 'Lege plekken zijn ook informatie. Wat er *niet* is, en de vorm van dat gat, is vaak het duidelijkste bewijs.',
  },

  mirror: {
    title: 'Vreemden',
    scene: 'Op een feest spreek je twee mensen, los van elkaar. Allebei zeggen ze dat ze elkaar nog nooit hebben ontmoet.',
    facts: [
      'Als hij zijn gewicht verplaatst, doet zij dat binnen een seconde of twee ook. Steeds weer.',
      'Zijn telefoon licht op, op de tafel naast je. Op het vergrendelscherm staat een foto van hen samen, jaren jonger, op een strand.',
      'Zij gebruikt een ongewoon stopwoordje. Twintig minuten later gebruikt hij het ook.',
      'Ze staan aan de twee uiteinden van de kamer.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Ze kennen elkaar, en ze kennen elkaar goed.',
      'Ze hebben elkaar eerder vanavond ontmoet en het klikt.',
      'Hij valt op haar en doet haar onbewust na.',
      'Het zijn collega\'s, maar geen goede vrienden.',
    ],
    explain: 'Aanwijzing 1 en 3, de nagedane houding en het overgenomen stopwoordje, kunnen ontstaan in één gesprek. Op zich passen ze dus bij twee mensen die elkaar eerder vanavond ontmoetten. Aanwijzing 2 niet. Een foto van hen samen, jaren jonger, als het plaatje dat hij elke dag ziet: daar zijn jaren en een goede band voor nodig. Collega\'s die niet close zijn, zetten elkaar niet op hun vergrendelscherm. Aanwijzing 4 is decor.',
    principle: 'Vraag je bij elke aanwijzing af hoe lang die nodig had om te ontstaan. De traagste bepaalt hoe lang ze elkaar minstens kennen.',
  },

  photo: {
    title: 'Afgelopen zomer',
    scene: 'Je krijgt een foto te zien. Die zou afgelopen zomer gemaakt zijn.',
    facts: [
      'De schaduwen vallen bijna recht onder de mensen op de foto.',
      'Achter hen hangt een poster voor een concert, met een datum erop.',
      'Een van hen draagt een polsbrace.',
      'De bomen op de achtergrond zitten vol in het blad.',
    ],
    question: 'Welke conclusie past het best bij de aanwijzingen?',
    options: [
      'Alleen de poster kan de foto dateren. De rest zegt alleen iets over het tijdstip of het seizoen.',
      'De foto is echt van afgelopen zomer.',
      'De foto is midden op de dag in een warme maand gemaakt. Het jaar kun je niet weten.',
      'De polsbrace verraadt de datum, want die blessure is bekend.',
    ],
    explain: 'Deze zaak draait om wat elke aanwijzing wel en niet kan vertellen. Korte schaduwen geven je het tijdstip. Bomen vol in het blad geven je het seizoen. Geen van beide geeft een jaar. Daarom is het antwoord "midden op de dag in een warme maand, jaar onbekend" *bijna* goed. Het valt alleen af omdat aanwijzing 2 er is. Een poster met een datum is een klok van buitenaf. Die koppelt de foto aan een echte kalender. Het antwoord over de polsbrace gaat uit van kennis die je nergens hebt gekregen.',
    principle: 'Vraag je eerst bij elke aanwijzing af: waar kan deze iets over zeggen? Tijd, plaats, duur of wie het is? Aanwijzingen van verschillende soorten tel je niet bij elkaar op.',
  },
};
