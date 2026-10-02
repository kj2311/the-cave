/* ============================================================
   people.nl.js — Dutch translation of the reading-people and
   influence content, plus the technique glossary.

   Options are plain arrays in the same order as the English
   source; the `ok` flags stay there.
   ============================================================ */

export const BASELINES_NL = {
  'b-desk': {
    baseline: 'In twee eerdere gesprekken praat Marcus de hele tijd met zijn handen. Hij leunt achterover in zijn stoel en springt van de hak op de tak. Hij lacht veel en hard.',
    moment: 'Je vraagt hem waar de facturen van de levering zijn gebleven. Hij praat even snel en even hard door. Maar zijn handen gaan plat op tafel liggen. Daar blijven ze tot het eind van zijn antwoord.',
    question: 'Welk signaal telt hier echt?',
    options: [
      'Stilte bij iemand die normaal veel beweegt, precies bij één bepaalde vraag.',
      'Hij liegt over de facturen.',
      'Handen plat op tafel is een bekend machtsgebaar.',
      'Niets — waar zijn handen liggen, is gewoon ruis.',
    ],
    explain: 'Wat hij zegt, blijft hetzelfde. Maar zijn handen, waar hij nooit bij nadenkt, vallen stil. Hij beweegt normaal veel, dus ineens stilvallen is een echte afwijking. En het gebeurt precies bij de vraag over de facturen. Wat het betekent, weet je nog niet. Het kan angst zijn, concentratie, verdriet of een leugen. Het wijst de plek aan. Het geeft geen antwoord.',
    myth: 'Veel mensen denken dat bepaalde gebaren een leugen verraden. Zo\'n gebaar bestaat niet. Grote onderzoeken die veel studies samen bekijken, vinden bij bijna elk bekend "leugenteken" een effect van ongeveer nul. Een afwijking vertelt je waar je moet graven. Nooit wat je daar vindt.',
  },
  'b-quiet': {
    baseline: 'Priya is precies en stil. Ze denkt na voordat ze iets zegt. Ze laat lange pauzes vallen en maakt bijna nooit gebaren.',
    moment: 'Je vraagt haar waarom het budget is overschreden. Ze antwoordt meteen en uitgebreid. Ze geeft zelfs twee details waar je niet om vroeg.',
    question: 'Welk signaal telt hier echt?',
    options: [
      'Iemand die normaal eerst nadenkt, antwoordt nu snel en geeft meer dan gevraagd.',
      'Ze is zenuwachtig, want ze praat te veel.',
      'Ongevraagd extra details geven is een bekend teken van een ingestudeerd verhaal.',
      'Niets — ze kent dit onderwerp goed, dus vlot praten is normaal.',
    ],
    explain: 'Welke kant de afwijking op gaat, maakt niet uit. Het gaat erom *dat* er iets afwijkt. Bij Marcus was het teken dat hij stilviel, bij Priya dat ze juist vlot gaat praten. Daarom bepaal je de basislijn per persoon. Hetzelfde gedrag is bij de één een signaal, bij de ander ruis. Let op: "ze kent het onderwerp gewoon goed" kan echt kloppen. Maar dat zoek je uit door te vragen, niet door het aan te nemen.',
    myth: 'Twee bekende regels: "te veel detail betekent ingestudeerd" en "te weinig detail betekent ontwijkend". Die kunnen niet allebei betrouwbaar zijn. Een regel die bij te veel én bij te weinig alarm slaat, is geen regel.',
  },
  'b-hands': {
    baseline: 'Vanaf het begin van het gesprek zit Tom met zijn armen over elkaar. Hij leunt achterover en antwoordt in korte zinnen. Zo zit hij al veertig minuten.',
    moment: 'Dan begin je over zijn dochter. Hij haalt zijn armen van elkaar, leunt naar voren en gaat uitgebreid vertellen.',
    question: 'Wat heb je nu echt geleerd?',
    options: [
      'Dat dit onderwerp hem verandert — en dat de armen over elkaar bij zijn basislijn hoorden, niet bij afweer.',
      'Dat hij eerst gesloten was en zich nu eerlijk openstelt.',
      'Dat de kans groter is dat hij liegt over zijn dochter, want die warmte is gespeeld.',
      'Dat het koud was in de kamer en hij nu is opgewarmd.',
    ],
    explain: 'De armen over elkaar betekenden niets, tot het moment dat ze veranderden. Dit is de meest gemaakte fout bij mensen lezen: iets wat *niet verandert* toch als signaal zien. Een houding die veertig minuten blijft, hoort bij het meubilair. De informatie zit in de verandering, en in waardoor die kwam.',
    myth: 'Het bekende idee: armen over elkaar betekent dat iemand zich afsluit. Maar bij geen houding wordt er zo vaak te veel in gezien. Meestal heeft iemand het gewoon koud, heeft de stoel geen armleuningen, of zit iemand nu eenmaal zo.',
  },
  'b-latency': {
    baseline: 'Tot nu toe komt elk antwoord na ongeveer een halve seconde. Steeds even snel, ontspannen en zonder haast.',
    moment: 'Dan stel je een vraag waar alleen geheugen voor nodig is: "Welke ingang heb je gebruikt?" Nu duurt de pauze vier seconden. Daarna komt een kort antwoord.',
    question: 'Waarom let je op deze pauze, en niet op de eerdere?',
    options: [
      'Het is een simpele geheugenvraag zonder denkwerk, dus de extra tijd is onverklaard.',
      'Lange pauzes voordat iemand antwoordt, wijzen op liegen.',
      'Korte antwoorden na lange pauzes wijzen op liegen.',
      'Niet de moeite waard: vier seconden is nog gewoon normaal.',
    ],
    explain: 'Een pauze zegt pas iets als je weet hoeveel denkwerk de vraag kost. "Welke ingang heb je gebruikt?" is gewoon iets opzoeken in je geheugen. Voor een eerlijke getuige gaat dat snel, ook als de rest van het verhaal traag gaat. De afwijking zit tussen de tijd die je *verwacht* en de tijd die het echt kost. Dat gat is je waarneming.',
    myth: 'Je hoort vaak dat een lange pauze op liegen wijst. Maar hoe lang een pauze is, zegt op zich bijna niets. De informatie zit in de pauze vergeleken met hoe moeilijk de vraag is.',
  },
  'b-group': {
    baseline: 'Een team van vijf vergadert elke week. De manager praat eerst, dan de ervaren ingenieur, dan de rest. Niemand onderbreekt de manager.',
    moment: 'Deze week blijft het een paar seconden stil als de manager klaar is. Twee mensen kijken even naar de junior ontwerper. Pas daarna zegt iemand iets.',
    question: 'Wat vertelt die blik je?',
    options: [
      'De groep denkt dat de ontwerper iets weet over wat er net is gezegd.',
      'De ontwerper heeft iets fout gedaan.',
      'De ontwerper is degene die in deze groep echt beslist.',
      'Het team is het niet eens met de manager.',
    ],
    explain: 'Groepen wijzen aan. Als er een onderwerp op tafel komt, kijken mensen naar degene die ze ermee verbinden. Dat gaat sneller dan iemand kan besluiten om te kijken. En meestal merkt niemand dat hij keek. Zo\'n blik laat betrouwbaar zien wie de groep met het onderwerp *verbindt*. Niet wie schuldig is, wie de baas is of wie het ergens mee eens is. Lees je er meer in, dan gaat het mis.',
    myth: 'Het lijkt alsof mensen zelf kiezen waar ze kijken. Maar in de eerste halve seconde bepaalt niemand dat zelf. Juist daarom is die eerste halve seconde het enige deel dat het lezen waard is.',
  },
  'b-smile': {
    baseline: 'Anna glimlacht vaak. Een brede, makkelijke glimlach die snel komt en net zo snel weer weg is.',
    moment: 'Ze hoort dat iemand anders de promotie krijgt, en ze glimlacht. Maar die glimlach komt een tel te laat. Hij komt trager op dan normaal en blijft veel langer hangen. Daarna zakt hij in stapjes weg, niet in één keer.',
    question: 'Welke conclusie kun je het best verdedigen?',
    options: [
      'De timing is anders dan normaal bij haar — het noteren waard, maar niet veel meer.',
      'Dit is een nepglimlach, dus ze verbergt haar echte reactie.',
      'Ze is stiekem blij met de uitkomst.',
      'Ze verbergt dat ze boos is.',
    ],
    explain: 'Kijk naar het *verloop*: hoe snel een glimlach opkomt, hoe lang hij blijft en hoe hij wegzakt. Voor dat deel is redelijk wat bewijs. Bij Anna wijkt dat verloop af van haar eigen basislijn: snel op, snel weg. Daarmee mag je zeggen: "deze is anders". Dat is een bescheiden conclusie. "Nep" kun je er niet uit halen. En welk gevoel eronder zit, al helemaal niet. Zie je hoe verleidelijk het antwoord "nepglimlach" is? En hoeveel dat aanneemt?',
    myth: 'De bekende test: een echte glimlach geeft rimpeltjes bij de ogen, een nepglimlach niet. Die test klopt niet. De meeste mensen blijken die oogspier gewoon bewust te kunnen aansturen. Studies vinden het "echte" kenmerk in tussen de 56% en 71% van de glimlachen die mensen expres opzetten. Toch wordt de test overal vol overtuiging herhaald. Het is een van de minst betrouwbare signalen die er zijn.',
  },
  'b-pronoun': {
    baseline: 'Daniël vertelt over zijn week. Hij zegt steeds "ik": ik ging, ik zei tegen hem, ik besloot. Zo praat hij normaal.',
    moment: 'Dan vertelt hij over die ene avond. Zijn verhaal verandert: "de auto werd achterom gezet", "toen was er een gesprek", "het werd heftig".',
    question: 'Wat is er veranderd?',
    options: [
      'Hij haalt zichzelf uit zijn eigen zinnen over die avond.',
      'Hij liegt over die avond.',
      'Hij herinnert zich die avond niet goed.',
      'Hij beschermt iemand anders die erbij was.',
    ],
    explain: 'Wat je kunt zeggen, is weinig. Maar het is het enige wat de moeite waard is. Zijn manier van praten verandert op één bepaald punt in het verhaal. Dat is een waarneming over *taal*. Het laat zien naar welke minuten je terug moet. Liegen, slecht geheugen, iemand beschermen: die antwoorden springen alle drie naar een oorzaak. Voor geen van die drie is genoeg bewijs.',
    myth: 'Je zult lezen dat leugenaars minder "ik" zeggen, om afstand te nemen. Het onderzoek is veel minder stevig dan die zekere versie doet denken. De uitkomsten verschillen per studie. Meerdere studies vinden helemaal geen echt effect. Ook is er serieuze twijfel over eerdere successen. Misschien kwamen die door toevallige eigenschappen van de gebruikte data, niet door een echt signaal. Zie een andere manier van praten dus als een plek voor nog een vraag. Nooit als een teken van liegen.',
  },
  'b-cluster': {
    baseline: 'Sam is de hele vergadering ontspannen en open. Zijn gedrag blijft steeds gelijk.',
    moment: 'Bij één vraag gebeuren er binnen twee seconden drie dingen. Zijn voet draait naar de deur. Hij slikt. En hij vraagt of je de vraag wilt herhalen.',
    question: 'Waarom weegt dit zwaarder dan elk van die dingen apart?',
    options: [
      'Drie losstaande signalen tegelijk zijn veel minder waarschijnlijk toeval.',
      'Voeten die naar de uitgang wijzen, zijn een bewezen teken dat iemand weg wil.',
      'Om herhaling vragen is een trucje om tijd te rekken.',
      'Slikken wijst op een droge mond door stress.',
    ],
    explain: 'Elk van die dingen is op zich achtergrondruis. Iedereen slikt, gaat weleens anders zitten of verstaat iets verkeerd. Maar drie tegelijk, bij één en dezelfde vraag? Dat is gewoon minder waarschijnlijk toeval. Daarom is een vervolgvraag de moeite waard. Meer beweer je niet.',
    myth: 'In trainingen hoor je vaak: "Eén signaal is niet betrouwbaar, maar een cluster (meerdere signalen tegelijk) wel." Het bewijs daarvoor is dun. Zwakke signalen opstapelen geeft niet betrouwbaar één sterk signaal. Maak dit dus niet groter dan het is. Een cluster levert je een betere vraag op, geen oordeel.',
  },
  'b-comfort': {
    baseline: 'Het gesprek loopt al tien minuten soepel. Ze leunt een beetje naar je toe.',
    moment: 'Je noemt de naam van haar zakenpartner. Haar houding blijft hetzelfde. Maar ze pakt haar koffiekopje, dat leeg is, en houdt het met twee handen vast.',
    question: 'Wat is dit?',
    options: [
      'Zichzelf kalmeren, met het kopje als schild — uitgelokt door de naam.',
      'Een teken dat ze haar zakenpartner niet mag.',
      'Dorst.',
      'Een bewuste manier om tijd te rekken.',
    ],
    explain: 'Ze pakt een *leeg* kopje: dat is het detail dat telt. Het heeft geen praktisch nut. Ze doet het dus om het gebaar zelf: handen bezig, iets tussen jou en haar in. Kalmerend gedrag komt veel voor en is een betrouwbaar teken van *meer spanning*. De naam zette het in gang. Wat die naam voor haar betekent, is de volgende vraag. Niet deze.',
    myth: 'Je zou denken: dit gebaar betekent dat ze haar zakenpartner niet mag. Maar gedrag waarmee je jezelf afschermt of kalmeert, wijst op ongemak. Meer niet. Ongemak heeft honderd oorzaken. Een hekel aan iemand is er maar één van.',
  },
  'b-story': {
    baseline: 'Ze vertelt over haar dag, netjes op volgorde. Ze geeft veel zintuiglijke details: hoe de kamer rook, wat iemand aanhad.',
    moment: 'Maar over één stuk van twintig minuten worden de details ineens dun. Ze vat het alleen kort samen: "we hebben het papierwerk geregeld en zijn toen weggegaan." Daarna komen de details terug.',
    question: 'Wat merk je precies op?',
    options: [
      'Op één plek ineens veel minder details, anders dan in de rest van haar verhaal.',
      'Ze verbergt wat er in die twintig minuten gebeurde.',
      'Er gebeurde in die twintig minuten niets wat het vertellen waard is.',
      'Ze vat saai papierwerk kort samen, en dat is normaal.',
    ],
    explain: 'Hoeveel details iemand geeft, stuurt bijna niemand bewust. Dus als dat verandert, is dat niet gespeeld. Een scherpe daling midden in een rijk verhaal is een echte afwijking. Misschien gebeurde er niets bijzonders, of was het saai papierwerk. Dat kunnen allebei prima verklaringen zijn voor die afwijking. En precies daarom heb je een vraag gevonden, geen antwoord. De goede volgende stap: laat haar die twintig minuten nog eens vertellen, maar dan achterstevoren.',
    myth: 'Je leest vaak dat een verhaal achterstevoren laten vertellen leugenaars ontmaskert. Het is ook echt een goede zet. Maar om een saaiere reden. Vroege studies wezen erop dat leugenaars zo door de mand vielen, omdat hun hoofd harder moest werken. Later onderzoek deed het nog eens en vond dat niet terug. Grote onderzoeken die veel studies samen bekijken, steunen het ook niet als manier om leugens te herkennen. Het wordt toch nog gebruikt, omdat het echt helpt bij onthouden. Via een andere route door je geheugen komen details boven die de eerste keer ontbraken.',
  },
};

export const TECHNIQUES_NL = {
  barnum:  { name: 'Barnum-zin',       note: 'Een zin die op bijna iedereen past, maar voelt alsof hij precies over jou gaat.' },
  rainbow: { name: 'Regenboogtruc',    note: 'Een zin met een eigenschap én het tegendeel ervan, zodat iedereen zich erin herkent.' },
  fork:    { name: 'Splitsing',        note: 'Een zin die bij ja én bij nee klopt: de cold reader pakt de kant die raak is.' },
  fuzzy:   { name: 'Vaag feit',        note: 'Een vage treffer die de ander zelf invult — en later denkt dat de cold reader het wist.' },
  vanish:  { name: 'Verdwijnend nee',  note: 'Een "nee" wordt zo omgebogen dat het toch lijkt alsof de cold reader je doorziet.' },
  mine:    { name: 'Hengelen',         note: 'Een vraag vermomd als uitspraak, die details opvist om ze later als eigen kennis te verkopen.' },
};

export const COLDREADS_NL = {
  'cr-barnum': {
    subject: 'Een onbekende van eind twintig op een feestje, die je net vroeg wat je doet.',
    question: 'Welke zin is zo gebouwd dat hij bij bijna iedereen raak is?',
    options: [
      '"Je komt heel open over, maar een deel van jezelf laat je bijna niemand zien."',
      '"Je bent de oudste van drie en je vader werkte met zijn handen."',
      '"Je hebt vanochtend een lastig gesprek gehad."',
      '"Je houdt niet van feestjes zoals dit."',
    ],
    explain: 'Hij vleit, hij kan nooit fout blijken, en bijna elke volwassene gelooft dit over zichzelf. Iedereen voelt dat er van binnen meer speelt dan hij laat zien. De andere zinnen zijn concreet en kunnen zichtbaar fout blijken. Precies dat vermijdt een cold reader: iemand die met trucjes doet alsof hij je doorziet.',
  },
  'cr-rainbow': {
    subject: 'Een stille man die al tien minuten bijna niets heeft gezegd.',
    question: 'Welke zin is een regenboogtruc, met een eigenschap én het tegendeel?',
    options: [
      '"Je bent meestal gereserveerd, maar bij mensen die je vertrouwt, ben jij de luidste van het stel."',
      '"Je bent van nature een gereserveerd persoon."',
      '"Je bent stil vanavond, omdat je ergens mee zit."',
      '"Je luistert liever dan dat je praat."',
    ],
    explain: 'De regenboogtruc dekt alle kanten, dus hij kan niet missen. Is hij verlegen? Raak. Is hij stiekem een gezelligheidsdier? Nog *meer* raak, want dan lijkt de zin dwars door zijn buitenkant heen te kijken. Let op het woordje "maar" in "maar bij mensen die je vertrouwt…". Daar zit de naad.',
  },
  'cr-fork': {
    subject: 'Iemand die net vaag liet vallen dat werk de laatste tijd "veel" is.',
    question: 'Welke zin is een splitsing, waarbij ja én nee allebei een treffer opleveren?',
    options: [
      '"Er is een beslissing waar je steeds op terugkomt, toch?"',
      '"Je denkt erover na om ontslag te nemen."',
      '"Je manager is het probleem."',
      '"Je werkt er nu ongeveer drie jaar."',
    ],
    explain: 'Zegt de ander ja, dan had de cold reader gelijk. Zegt de ander nee, dan zegt de cold reader: "Nog niet, maar het komt eraan." Dan is het ineens een voorspelling. Zo herken je een splitsing: bij ja *en* bij nee kan hij niet fout blijken. Geen enkele eerlijke uitspraak werkt zo.',
  },
  'cr-fuzzy': {
    subject: 'Een vrouw die net tegenover je is gaan zitten.',
    question: 'Welke zin laat haar de details invullen, zodat jij er later de eer voor krijgt?',
    options: [
      '"Ik krijg iets door over een oudere vrouw — een naam met een M, of een J."',
      '"De naam van je oma was Margaretha."',
      '"Je hebt twee zussen."',
      '"Je bent in het voorjaar geboren."',
    ],
    explain: 'Twee letters, en het zijn twee van de meest voorkomende beginletters van namen. En "oudere vrouw" past op moeder, oma, tante, buurvrouw of collega. Zij noemt zelf een naam. Binnen een minuut herinnert ze zich dat *jij* die naam noemde. Dit is de allersterkste zet uit de trukendoos. En juist deze moet je herkennen als iemand hem op jou gebruikt.',
  },
  'cr-vanish': {
    subject: 'Een man die net zei dat hij niets verzamelt.',
    question: 'Welk antwoord is een verdwijnend nee, dat van zijn "nee" toch een treffer maakt?',
    options: [
      '"Nee, natuurlijk niet — maar er is iets wat je hebt bewaard en nooit zou weggooien."',
      '"Weet je het zeker? De meeste mensen verzamelen wel iets."',
      '"Dan zat ik daar naast."',
      '"Misschien ga je later in je leven nog verzamelen."',
    ],
    explain: 'De misser wordt meteen opgeslokt door de volgende bewering, nog voordat je doorhebt dat het mis was. En die volgende zin is een Barnum-zin, die altijd raak is. Let op het patroon: cold readers gaan nooit in discussie met een "nee". Ze *surfen erop mee*. Heeft iemand een heel gesprek lang nooit ongelijk? Dan komt dat niet doordat hij het steeds goed heeft. Het gesprek is gewoon zo gebouwd.',
  },
  'cr-mine': {
    subject: 'Vroeg in een gesprek met iemand die je net hebt ontmoet.',
    question: 'Welke hiervan is hengelen: een vraag verkleed als uitspraak?',
    options: [
      '"Je hebt de blik van iemand die als kind vaak is verhuisd."',
      '"Waar ben je opgegroeid?"',
      '"Ik ben in één plaats opgegroeid en er nooit weggegaan."',
      '"Als kind verhuizen is zwaar voor mensen."',
    ],
    explain: 'Het is een vraag, vermomd als bewering. Een treffer kost niets. Zit je mis, dan hoor je: "Nee, ik heb juist tot mijn achttiende in hetzelfde huis gewoond." Dat feit heb je nu binnen. Twintig minuten later breng je het alsof je het gewoon aanvoelde. Directe vragen zijn eerlijk. Uitspraken die informatie oogsten, zijn dat niet.',
  },
  'cr-defence': {
    subject: 'Jij bent nu degene die gelezen wordt. Een onbekende zei drie dingen over je, en alle drie voelden griezelig raak.',
    question: 'Wat is de juiste toets?',
    options: [
      'Vraag jezelf af of ook maar één van de drie zichtbaar fout had kunnen zijn.',
      'Tel hoeveel er klopten en vergelijk dat met hoeveel er fout waren.',
      'Geef expres een fout antwoord en kijk of de ander het doorheeft.',
      'Vraag hoe de ander het wist.',
    ],
    explain: 'Had het zichtbaar fout kunnen zijn? Dat is de enige toets die werkt als jij zelf gelezen wordt. Treffers tellen werkt niet, want missers worden opgeslokt en vergeten. Dat is juist de *bedoeling*. Vragen hoe de ander het wist, levert alleen een betere show op. De vraag is niet: "Had de ander gelijk?" De vraag is: "Had de ander zichtbaar ongelijk kunnen hebben?" Zo niet, dan heeft de ander je eigenlijk niets verteld.',
  },
  'cr-attention': {
    subject: 'Je wilt dat iemand één bepaald ding onthoudt uit een gesprek van tien minuten.',
    question: 'Wat werkt het best?',
    options: [
      'Zeg het, en zwijg daarna drie of vier seconden helemaal.',
      'Zeg het drie keer, steeds in andere woorden.',
      'Zeg het harder en met meer overtuiging dan de rest.',
      'Zeg het helemaal aan het begin, als de aandacht het hoogst is.',
    ],
    explain: 'Stilte na een uitspraak is het sterkste eerlijke aandachtsmiddel dat er is. Er ontstaat een gat, en de luisteraar vult dat in zijn hoofd met wat je net zei. Ook laat de stilte merken dat die zin belangrijk was. Herhalen verdunt. Harder praten roept weerstand op. En een openingszin hoort de luisteraar al voordat hij heeft besloten dat het hem iets kan schelen.',
  },
  'cr-misdirect': {
    subject: 'Een artiest wil dat je een beweging van zijn linkerhand mist.',
    question: 'Wat bepaalt echt waar je kijkt?',
    options: [
      'Waar de artiest kijkt, en wat er zo lijkt te gaan gebeuren.',
      'Snelle beweging, want daar wordt je oog naartoe getrokken.',
      'Felle kleuren en glimmende dingen in de andere hand.',
      'Harde, plotselinge geluiden van de andere kant.',
    ],
    explain: 'Aandacht gaat naar wat *belangrijk lijkt te worden*. Het sterkste signaal daarvoor is de blik van een ander: je kijkt automatisch waar hij kijkt. Snelle beweging trekt je oog juist *wel*. Daarom doet echte afleiding het geheime deel met een trage, verwachte, saaie beweging. En de blik van de artiest doet het sturen.',
  },
  'cr-ideomotor': {
    subject: 'Een artiest houdt de pols van een vrijwilliger vast. Hij vraagt hem heel goed te denken aan de plek waar iets verstopt ligt. Dan loopt hij met hem regelrecht naar die plek.',
    question: 'Wat gebeurt hier echt?',
    options: [
      'De vrijwilliger stuurt zonder het te merken, en de artiest voelt dat via het contact.',
      'De artiest leest micro-expressies op het gezicht van de vrijwilliger.',
      'De artiest wist de plek al van tevoren en speelt toneel.',
      'De vrijwilliger helpt bewust mee en heeft dat zo afgesproken.',
    ],
    explain: 'Dit heet contactgedachtelezen, of Cumberlandisme. Het is een echte techniek, die teruggaat tot de jaren 1870. Het werkt via het *ideomotorisch effect*: kleine bewegingen die je maakt zonder het te merken. Denk je hard aan een plek, dan beweeg je er heel licht naartoe. Zelf voel je dat niet. Niemand in deze scène liegt. Juist daar draait het om. Hetzelfde effect zit achter ouijaborden en wichelroedes. Daarom verdedigen oprechte mensen ze allebei.',
  },
  'cr-eyes': {
    subject: 'Iemand zegt dat hij leugens herkent: leugenaars kijken naar rechtsboven als ze een antwoord verzinnen.',
    question: 'Wat is de juiste reactie?',
    options: [
      'Dit komt uit NLP en er is geen bewijs voor. Kijkrichting zegt niets over liegen of herinneren.',
      'Het werkt, maar alleen als je eerst per persoon uitzoekt welke kant wat betekent.',
      'Het werkt om herinneren en bedenken te onderscheiden, maar niet specifiek voor liegen.',
      'Het klopt grofweg, maar het is te onbetrouwbaar om alleen op af te gaan.',
    ],
    explain: 'Dit idee over oogbewegingen komt uit NLP (neurolinguïstisch programmeren). Onderzoek vindt geen betrouwbaar verband tussen oogbewegingen en liegen. En ook geen vaste koppeling met denken in beelden, geluiden of gevoel. De verleidelijke tussenantwoorden, zoals "klopt, maar onbetrouwbaar" en "klopt, als je het per persoon afstelt", houden een dood idee in leven. Er valt niets af te stellen.',
  },
  'cr-priming': {
    subject: 'Een boek zegt dat je het gedrag van de ander kunt sturen door bepaalde woorden in een gesprek te strooien. Minuten later, zonder dat die het merkt.',
    question: 'Hoeveel gewicht geef je hieraan?',
    options: [
      'Heel weinig — het meeste onderzoek naar sociale priming gaf bij herhaling niet hetzelfde resultaat.',
      'Veel — het is een van de vaakst bevestigde resultaten in de psychologie.',
      'Een beetje — de effecten zijn echt, maar klein.',
      'Het werkt, maar alleen bij mensen die toch al makkelijk te beïnvloeden zijn.',
    ],
    explain: 'Sociale priming (gedrag sturen met woorden) werd het hardst geraakt door de replicatiecrisis. Toen bleek dat veel bekende onderzoeken in de psychologie bij herhaling niet hetzelfde opleverden. Het bekendste resultaat: mensen liepen langzamer na woorden die met ouderdom te maken hadden. Bij herhaling kwam dat niet terug. En in die herhaling verscheen het effect alleen als de onderzoekers het *verwachtten*. Het zegt dus iets over de onderzoekers. Wees hier extra voorzichtig. Dit soort beweringen vleit je: ze doen alsof jij andere mensen kunt besturen.',
  },
  'cr-ethics': {
    subject: 'Je beseft net dat je met deze technieken een gesprek kunt sturen.',
    question: 'Welke grens telt echt?',
    options: [
      'Of de ander nog steeds ja zou zeggen als hij kon zien hoe het werkt.',
      'Of je de ander echt schade doet.',
      'Of wat je zegt technisch gezien waar is.',
      'Of de ander het gesprek leuk vindt.',
    ],
    explain: 'Al deze technieken werken doordat ze onzichtbaar zijn. Dat is de hele truc. De eerlijke toets is dus: zou het nog oké zijn als de ander zag wat je deed? Een goede klik, aandacht en goede vragen slagen voor die toets. Doen alsof je alles weet, zakt ervoor. En dat mensen het leuk vinden, is precies hoe dat bedrog blijft bestaan.',
  },
};
