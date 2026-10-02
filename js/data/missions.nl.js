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
    brief: 'Oefen de scan op een plek waar niets op het spel staat, tot de volgorde vanzelf gaat. Alles zien is geen talent, maar een vaste aanpak. Die aanpak moet dan wel automatisch gaan.',
    steps: [
      'Ga op een openbare plek zitten, met zicht op de hele ruimte. Bijvoorbeeld in een café, een wachtkamer of de bus.',
      'Scan in vaste volgorde: uitgangen, mensen en hun handen, de muren met de klok mee, tafels en vensterbanken, de vloer.',
      'Noem alles in je hoofd terwijl je erlangs gaat. Blijf nergens hangen en ga niet terug.',
      'Kijk dan een hele minuut de andere kant op.',
      'Schrijf op wat je nog weet, in de volgorde van je scan.',
    ],
    debrief: 'Bij welk deel van de scan wist je het minst? Dat deel sla je eigenlijk over.',
  },
  'm-negative': {
    title: 'Wat er niet is',
    time: '15 min',
    brief: 'Bijna iedereen vraagt: "Wat is hier?" Je verwachting vult het antwoord dan al voor je in. De vraag die je echt verder helpt, is de andere.',
    steps: [
      'Kies een ruimte die je niet zelf hebt ingericht.',
      'Vraag: wat is hier dat er niet hoort? Let op een aantal dat niet klopt, dingen die niet bij elkaar passen of iets op de verkeerde plek.',
      'Vraag dan: wat ontbreekt er dat er wél hoort? Denk aan een gat in een boekenkast, een schone plek in het stof of een leeg haakje.',
      'Schrijf beide lijstjes op. Bedenk nog geen verklaring.',
    ],
    debrief: 'Bedenk bij elk punt op je tweede lijst een onschuldige verklaring. Kun je die uitsluiten?',
  },
  'm-threshold': {
    title: 'De drempel',
    time: '5 min',
    brief: 'Een test: hoeveel onthoud je echt van iets wat je vaak ziet? De meeste mensen ontdekken: bijna niets.',
    steps: [
      'Denk aan een ingang waar je een paar keer per week doorheen loopt, zoals die van school.',
      'Schrijf uit je hoofd op: aan welke kant zit de klink, en naar welke kant gaat de deur open? Hoeveel traptreden zijn er, wat staat er binnen direct links, en welke kleur heeft de vloer?',
      'Ga daarna kijken hoe het echt zit.',
    ],
    debrief: 'Hoeveel had je goed, en hoe zeker was je van tevoren? Om het verschil tussen die twee draait het.',
  },
  'm-hands': {
    title: 'Handen',
    time: 'één gesprek',
    brief: 'Mensen spelen toneel met hun gezicht. Hun handen vergeten ze meestal, dus die zeggen meer. En niemand kijkt ernaar.',
    steps: [
      'Houd in je volgende echte gesprek gewoon oogcontact. Staar niemand aan.',
      'Let met een half oog op de handen van de ander. Wat houden ze vast, wat raken ze aan, wanneer zijn ze stil en wanneer bewegen ze?',
      'Schrijf direct na het gesprek op wat de handen deden.',
    ],
    debrief: 'Deden de handen iets wat het gezicht niet deed? Schrijf het op, maar beslis nog niet wat het betekent.',
  },
  'm-floor': {
    title: 'De vergeten vloer',
    time: '20 min',
    brief: 'In elke ruimte kijken mensen het minst naar de vloer. En juist daar zetten ze dingen neer als ze niet nadenken.',
    steps: [
      'Kijk op één dag in vier verschillende ruimtes bewust tien seconden naar de vloer.',
      'Let op slijtplekken en vlekken. Let ook op wat neergezet is in plaats van opgeruimd, en wat onder meubels ligt in plaats van erop.',
      'Schrijf per ruimte één regel op.',
    ],
    debrief: 'Wat vertelde een vloer je dat de rest van de ruimte niet vertelde?',
  },
  'm-wear': {
    title: 'Lees het voorwerp',
    time: '20 min',
    brief: 'Sporen van tijd, zoals slijtage, zijn het sterkste soort bewijs dat er is. Ze ontstaan langzaam en ongemerkt, en je kunt ze moeilijk namaken. Oefen om ze te lezen bij iets waar je het antwoord kunt checken.',
    steps: [
      'Kies een voorwerp dat iemand al jaren veel gebruikt. Bijvoorbeeld gereedschap, een tas, een stoel, een toetsenbord of een pan.',
      'Ga alleen af op de slijtage. Schrijf op wat die zegt over het gebruik: welke hand, hoe vaak, waarvoor, hoe voorzichtig.',
      'Splits je lijst in twee: wat de slijtage echt laat zien, en wat je er zelf bij bedenkt.',
      'Vraag het daarna aan de eigenaar, als dat kan.',
    ],
    debrief: 'Waar had je gelijk, en was dat om de reden die je dacht?',
  },

  /* ---------------- GEHEUGEN ---------------- */
  'm-palace': {
    title: 'Bouw je geheugenpaleis',
    time: '20 min, één keer',
    brief: 'Dit doe je één keer, en je hebt er jaren wat aan. Je leert geen trucje. Je bouwt de vaste route waar je later alles aan ophangt.',
    steps: [
      'Kies iets wat je kent zonder na te denken, zoals je huis of je weg naar school.',
      'Leg daar een vaste route door, met tien duidelijke plekken. Ga altijd dezelfde kant op, nooit terug.',
      'Loop de route vier keer in je hoofd, tot de volgorde vanzelf gaat.',
      'Schrijf de tien plekken één keer op. Kijk daarna niet meer op dat lijstje.',
    ],
    debrief: 'Schrijf je tien plekken achterstevoren op. Ging dat vlot, of moet je de route morgen nog een keer lopen?',
  },
  'm-shopping': {
    title: 'Zonder lijstje',
    time: 'één keer boodschappen doen',
    brief: 'Dit is je eerste echte test met je geheugenpaleis. Er staat weinig op het spel en je weet meteen of het werkt. Je merkt snel welke beelden te braaf waren.',
    steps: [
      'Schrijf een boodschappenlijstje van minstens twaalf dingen.',
      'Zet elk ding op een plek van je route. Maak er een gek beeld van dat beweegt en iets doet met die plek.',
      'Laat het lijstje thuis.',
      'Doe je boodschappen. Kijk pas achteraf op het lijstje.',
    ],
    debrief: 'Welke dingen was je vergeten? Kijk naar het beeld dat je ervoor maakte: dat was waarschijnlijk stilstaand, logisch of op ware grootte.',
  },
  'm-names': {
    title: 'Drie namen',
    time: 'één week',
    brief: '"Ik ben slecht in namen" zegt bijna altijd iets over je aandacht, niet over je geheugen. Met deze opdracht ben je dat excuus in een week kwijt.',
    steps: [
      'Leer deze week de namen van drie mensen die je voor het eerst ontmoet.',
      'Luister bij elke naam goed, en zeg hem meteen terug.',
      'Koppel de naam in een beeld aan iets wat opvalt aan hun uiterlijk. Gebruik de naam nog één keer voordat je weggaat.',
      'Herinner je elke naam later opnieuw: na een uur, die avond en twee dagen later.',
      'Doe dat uit je hoofd. Lees je aantekening niet terug.',
    ],
    debrief: 'Welke naam zit het minst goed vast, en wat deed je anders toen je juist die leerde?',
  },
  'm-reverse': {
    title: 'De dag achterstevoren',
    time: '10 min',
    brief: 'Als je je dag achterstevoren doorloopt, komen er details boven die je anders mist. Mensen zeggen vaak dat je hiermee leugens kunt herkennen, maar dat is overdreven. Dit is de eerlijke versie.',
    steps: [
      'Loop aan het eind van een dag alles achterstevoren door. Begin bij nu en werk terug tot het opstaan.',
      'Ga in echte stappen, niet in grote lijnen. Dus niet "de middag", maar elk ding dat je deed.',
      'Markeer elk moment waarop je het niet meer weet.',
    ],
    debrief: 'Wat vond je achterstevoren terug dat je normaal in één zin had samengevat?',
  },
  'm-anchor': {
    title: 'Het anker',
    time: '15 min',
    brief: 'Getallen hebben geen beeld. Juist daarom onthouden de meeste mensen ze niet. Geef ze er dus een.',
    steps: [
      'Kies een getal dat je echt uit je hoofd wilt kennen. Bijvoorbeeld het nummer van je bankpas, je rekeningnummer of het nummer van iemand die je in nood belt.',
      'Hak het op in stukjes van twee of drie cijfers.',
      'Maak van elk stukje een beeld dat je echt voor je ziet. Zet elk beeld op een plek in je geheugenpaleis.',
      'Test jezelf morgen, over drie dagen en over een week.',
    ],
    debrief: 'Komt het getal na een week terug als cijfers of als beelden? Allebei is goed.',
  },

  /* ---------------- REDENEREN ---------------- */
  'm-two': {
    title: 'Twee verklaringen',
    time: 'de hele dag',
    brief: 'Van alle gewoontes in deze app levert deze het meest op. Kun je geen tweede verklaring bedenken? Dan begrijp je de situatie nog niet goed genoeg om er iets van te vinden.',
    steps: [
      'Stop elke keer dat je jezelf vandaag op een conclusie betrapt. Bijvoorbeeld over iemand, een bericht, een vertraging of een blik.',
      'Bedenk een tweede verklaring die ook bij de feiten past. Neem een serieuze, geen zwakke die je makkelijk wegstreept.',
      'Bedenk daarna een derde, als dat lukt.',
      'Let op hoe vaak de tweede minstens zo goed is als de eerste.',
    ],
    debrief: 'Schrijf de situatie op waarin de tweede verklaring achteraf klopte.',
  },
  'm-break': {
    title: 'Wat bewijst je ongelijk?',
    time: '10 min',
    brief: 'Je kunt een conclusie pas verdedigen als je weet wat haar zou onderuithalen. Kan niets haar onderuithalen? Dan heb je niet echt geredeneerd.',
    steps: [
      'Schrijf iets op wat je nu gelooft over iemand of over een situatie in je leven.',
      'Schrijf het ene ding op dat je zou moeten zien om dat idee los te laten.',
      'Vraag jezelf af of je daar ooit naar hebt gezocht.',
    ],
    debrief: 'Als het antwoord nee is: wat is er nodig om er deze week wél naar te zoeken?',
  },
  'm-rank': {
    title: 'Sorteer het bewijs',
    time: '15 min',
    brief: 'De meeste foute conclusies ontstaan doordat een goedkoop feit zwaarder telt dan een duur feit. Goedkoop betekent: makkelijk na te maken. En juist zulke feiten vallen het meest op.',
    steps: [
      'Neem een situatie die je nu probeert in te schatten. Bijvoorbeeld een aankoop of iets wat iemand beweert.',
      'Schrijf alles op wat je echt hebt gezien of gehoord.',
      'Sorteer het van sterk naar zwak: sporen van tijd, automatische gewoontes, onbewuste timing, en wat iemand bewust laat zien. Slijtage staat dus bovenaan, kleding onderaan.',
      'Kijk waar je mening eigenlijk op gebaseerd was.',
    ],
    debrief: 'Was je conclusie gebaseerd op de bovenkant of de onderkant van je lijst?',
  },
  'm-morning': {
    title: 'Het afgelopen uur',
    time: '10 min',
    brief: 'Oefen om precies te stoppen waar het bewijs stopt. Detectives in boeken en series doen dat nooit, want hun schrijver staat aan hun kant.',
    steps: [
      'Kies op een openbare plek één onbekende en kijk hooguit een minuut. Volg niemand, spreek niemand aan en maak geen foto\'s.',
      'Schrijf op wat die persoon het afgelopen uur waarschijnlijk heeft gedaan.',
      'Lees je tekst regel voor regel na. Zet bij elke regel GEZIEN of BEDACHT.',
    ],
    debrief: 'Hoe vaak schreef je GEZIEN, en hoe vaak BEDACHT? Bijna iedereen heeft een paar keer zo vaak BEDACHT als GEZIEN.',
  },
  'm-absence': {
    title: 'Het ontbrekende spoor',
    time: 'één week',
    brief: 'Vraag je af welke sporen iemands verhaal over zijn verleden had moeten achterlaten. Ga daarna kijken of ze er zijn. Zo betrap je ook de kok zonder brandplekken op zijn armen.',
    steps: [
      'Let deze week op één ding dat iemand over zichzelf beweert: over zijn verleden, gewoontes of wat hij kan. Het mag iets kleins zijn.',
      'Bedenk welke sporen dat zou moeten achterlaten, aan iemands lichaam of in zijn gedrag.',
      'Kijk alleen. Ga niemand uithoren en zeg niet wat je aan het doen bent.',
      'Schrijf op of de sporen er zijn.',
    ],
    debrief: 'Waren de sporen er, ontbraken ze, of kon je het niet zeggen? Dat laatste komt het vaakst voor, en voelt het minst bevredigend.',
  },

  /* ---------------- MENSEN LEZEN ---------------- */
  'm-baseline': {
    title: 'Leer iemands basislijn',
    time: 'drie keer',
    brief: 'De stap die iedereen overslaat: de basislijn (hoe iemand normaal doet). Zonder basislijn zegt geen enkel gedrag iets. Dan zie je vol overtuiging een gewoonte aan voor een signaal.',
    steps: [
      'Kies iemand die je vaak ziet in rustige situaties.',
      'Kijk op drie verschillende momenten alleen naar hoe die persoon normaal doet.',
      'Schrijf het normale op: praattempo, hoeveel gebaren, waar de blik heen gaat, hoe die persoon zit, en stopwoordjes.',
      'Trek geen conclusies en zoek nergens iets achter. Je legt alleen vast wat normaal is.',
    ],
    debrief: 'Schrijf de basislijn van die persoon op in vijf regels. Lukt dat niet, dan heb je nog te weinig gekeken.',
  },
  'm-transition': {
    title: 'De omslag',
    time: 'één gesprek',
    brief: 'Een houding die veertig minuten hetzelfde blijft, is gewoon achtergrond. Het gaat om het moment dat die verandert, en om wat dat veroorzaakte.',
    steps: [
      'Houd in een langer gesprek in je achterhoofd hoe de ander normaal doet (de basislijn).',
      'Let op een moment waarop meerdere losse dingen tegelijk veranderen: tempo, houding, handen, blik.',
      'Onthoud wat iemand in de twee seconden daarvoor zei.',
      'Begin er niet over. Schrijf het later op, meer niet.',
    ],
    debrief: 'Wat was de aanleiding, en welke drie onschuldige redenen kun je bedenken voor die verandering?',
  },
  'm-room': {
    title: 'Wie de groep aankijkt',
    time: 'één groepsgesprek',
    brief: 'Groepen wijzen. Ogen schieten naar wie volgens de groep bij een onderwerp hoort. Dat gaat sneller dan iemand kan besluiten om te kijken.',
    steps: [
      'Kijk in je volgende groepsgesprek naar de luisteraars, niet naar wie er praat.',
      'Let op waar de eerste blikken heen gaan zodra een belangrijk onderwerp ter sprake komt.',
      'Doe dit drie of vier keer tijdens het gesprek.',
    ],
    debrief: 'Blikken tonen wie volgens de groep bij een onderwerp hoort, niet wie schuldig is of de leiding heeft. Naar wie wees de groep, en wat zegt dat jou?',
  },
  'm-ask': {
    title: 'Vragen, niet beweren',
    time: 'één week',
    brief: 'De valkuil voor iedereen die dit traint: je wordt zekerder van je zaak dan terecht is. Dan vertel je mensen wat ze voelen, op basis van weinig bewijs. Deze opdracht is het tegengif.',
    steps: [
      'Merk je deze week iets op bij iemand? Zeg het dan nooit als een feit.',
      'Maak er een vraag van waar de ander nee op mag zeggen. Bijvoorbeeld: "Er veranderde iets toen dat ter sprake kwam. Speelt daar iets?"',
      'Accepteer een "nee" zonder aan te dringen. En besluit niet stiekem dat je toch gelijk had.',
    ],
    debrief: 'Hoe vaak zat je ernaast? Is het antwoord nooit, dan test je je inschattingen niet: je verzamelt alleen knikjes.',
  },

  /* ---------------- INVLOED ---------------- */
  'm-pause': {
    title: 'De pauze',
    time: 'drie gesprekken',
    brief: 'Een pauze is de sterkste eerlijke manier om iets te benadrukken. Toch doet bijna niemand het, want voor jezelf voelt die stilte ongemakkelijk.',
    steps: [
      'Kies het ene punt in een gesprek dat de ander echt moet onthouden.',
      'Zeg het. Zwijg dan drie tot vier hele seconden.',
      'Vul de stilte niet op. Maak je punt niet zachter en herhaal het niet.',
      'Doe dit in drie verschillende gesprekken.',
    ],
    debrief: 'Hoe lang voelde de stilte, en wat deed de ander ermee?',
  },
  'm-barnum': {
    title: 'Barnum-jacht',
    time: '15 min',
    brief: 'Een Barnum-uitspraak klinkt persoonlijk, maar past op iedereen. Zodra je de vorm herkent, werkt het niet meer op jou. En je komt ze overal tegen.',
    steps: [
      'Zoek drie voorbeelden in het echt. Bijvoorbeeld een horoscoop, de uitslag van een persoonlijkheidstest, een reclame of een helderziende op internet.',
      'Doe bij elke uitspraak één test: had dit duidelijk fout kunnen zijn?',
      'Herschrijf er één zo dat hij wél fout kan zijn. Let op hoeveel zwakker hij dan klinkt.',
    ],
    debrief: 'Welke had je bijna te pakken, voordat je de test deed?',
  },
  'm-open': {
    title: 'Geen gesloten vragen',
    time: 'één gesprek',
    brief: 'Verhoormethodes die op onderzoek steunen, werken zo: open vragen stellen, iemand laten uitpraten en niets voorzeggen. Zo krijg je meer kloppende details dan met druk zetten of confronteren.',
    steps: [
      'Voer een heel gesprek zonder één vraag die je met ja of nee kunt beantwoorden.',
      'Gebruik zinnen als "vertel eens", "hoe ging dat precies", "wat gebeurde er daarna" en "hoe was dat".',
      'Stopt de ander met praten? Wacht dan even, in plaats van meteen je volgende vraag te stellen.',
    ],
    debrief: 'Wat kwam er naar boven dat je met een ja/nee-vraag had gemist?',
  },
  'm-freerecall': {
    title: 'Vijf minuten niet onderbreken',
    time: 'één gesprek',
    brief: 'De kern van de PEACE-methode, een manier van verhoren: laat iemand eerst het hele verhaal vertellen. Pas daarna kijk je naar wat niet klopt. Dat is moeilijker dan het klinkt, maar daar zitten de details.',
    steps: [
      'Vraag iemand om je iets te vertellen wat diegene heeft meegemaakt.',
      'Onderbreek vijf minuten lang niet. Geen vragen tussendoor, geen "hm, en heb je toen…", geen zinnen voor de ander afmaken.',
      'Moedig alleen een beetje aan: een knik, een stilte, "ga door".',
      'Ga pas daarna terug naar de stukken waar je meer over wilt weten.',
    ],
    debrief: 'Wat wilde je bijna vragen, en vertelde de ander dat later vanzelf?',
  },
  'm-beread': {
    title: 'Laat jezelf lezen',
    time: '20 min',
    brief: 'Je leert deze trucs vooral om je ertegen te beschermen. Ga daarom bewust aan de ontvangende kant staan, terwijl je doorziet hoe het werkt.',
    steps: [
      'Zoek een cold reading die voor iedereen bedoeld is: iets wat met trucjes doet alsof het jou kan doorzien. Bijvoorbeeld van een helderziende op internet, een horoscoop of een persoonlijkheidsrapport.',
      'Schrijf bij elke uitspraak eerst op wat zou tellen als "dit klopt niet".',
      'Kijk daarna eerlijk of de uitspraak bij jou klopt.',
      'Tel hoeveel uitspraken echt fout hadden kunnen zijn.',
    ],
    debrief: 'Hoeveel hadden er fout kunnen zijn? Is dat bijna nul, dan kreeg je geen echte informatie, hoe raak het ook voelde.',
  },

  /* ---------------- KALMTE ---------------- */
  'm-exhale': {
    title: 'Lang uitademen',
    time: '2 min',
    brief: 'Spanning pakt als eerste je werkgeheugen af: de ruimte in je hoofd waarmee je denkt. Juist daar gebeurt alles uit deze app. Vooral de lange uitademing helpt daartegen.',
    steps: [
      'Neem twee minuten voor iets waar je gespannen over bent. Bijvoorbeeld een telefoontje, een afspraak of een gesprek.',
      'Adem vier tellen in en zes tot acht tellen uit. Het uitademen is het deel dat werkt.',
      'Zeg in gewone woorden tegen jezelf wat je voelt: "dit is adrenaline".',
      'Ga dan naar binnen.',
    ],
    debrief: 'Wat was er anders aan je eerste zestig seconden daarbinnen?',
  },
  'm-slow': {
    title: 'Half zo snel',
    time: 'één gesprek',
    brief: 'Als je bewust trager praat en beweegt, word je vanbinnen ook rustiger. En je krijgt extra denktijd, zonder dat iemand het merkt.',
    steps: [
      'Praat en beweeg in één gesprek bewust trager. Denk aan hoe snel je gaat zitten, gebaart of iets pakt.',
      'Wacht één tel voor elk antwoord, ook bij makkelijke vragen.',
      'Ga net niet zo ver dat het raar overkomt.',
    ],
    debrief: 'Reageerde iemand erop, en wat veranderde er aan hoe mensen naar je luisterden?',
  },
  'm-dontknow': {
    title: 'Drie keer, eerlijk',
    time: 'één week',
    brief: 'Een conclusie voelt fijn, dus je wilt er snel een. "Ik weet het nog niet" volhouden vraagt dan dezelfde rem die de Kalmte-oefening meet. Alleen kost het met mensen erbij veel meer dan op een scherm.',
    steps: [
      'Zeg deze week drie keer hardop "ik weet het niet", als dat echt zo is.',
      'Draai er niet omheen. Dus niet "ik denk misschien", en geen gok die je verkleedt als antwoord.',
      'Schrijf op wat je dacht dat het je zou kosten, en wat het echt kostte.',
    ],
    debrief: 'Wat dacht je dat er zou gebeuren, en wat gebeurde er echt?',
  },
  'm-silence': {
    title: 'Houd de stilte vast',
    time: 'één gesprek',
    brief: 'De meeste mensen vullen een stilte binnen twee seconden op. Wat ze dan zeggen, is vaak het nuttigste van het hele gesprek.',
    steps: [
      'Stel iemand een echte, open vraag over iets belangrijks.',
      'Zeg niets als de ander klaar is met praten. Tel in je hoofd tot vijf.',
      'Knik niet aanmoedigend en begin niet aan je volgende vraag.',
      'Laat de ander zelf kiezen of die verder praat.',
    ],
    debrief: 'Zei de ander na de stilte nog iets, en was dat echt anders dan wat ervoor kwam?',
  },
};
