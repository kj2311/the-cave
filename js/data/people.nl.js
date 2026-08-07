/* ============================================================
   people.nl.js — Dutch translation of the reading-people and
   influence content, plus the technique glossary.

   Options are plain arrays in the same order as the English
   source; the `ok` flags stay there.
   ============================================================ */

export const BASELINES_NL = {
  'b-desk': {
    baseline: 'In twee eerdere gesprekken praat Marcus onafgebroken met zijn handen, leunt hij achterover en onderbreekt hij zichzelf om zijpaden in te slaan. Hij lacht makkelijk en hard.',
    moment: 'Je vraagt hem waar de vrachtbrieven zijn gebleven. Hij praat door op hetzelfde tempo en volume — maar zijn handen komen plat op tafel te liggen en blijven daar de rest van het antwoord.',
    question: 'Wat is hier het betekenisvolle signaal?',
    options: [
      'Stilte bij iemand die gewoonlijk beweegt, precies op één specifieke vraag.',
      'Hij liegt over de vrachtbrieven.',
      'Platte handen op tafel is een bekend dominantiegebaar.',
      'Niets — handpositie is ruis.',
    ],
    explain: 'De inhoud verandert niet; het kanaal waar hij niet over nadenkt valt stil. Plotselinge stilte bij iemand wiens basislijn beweging is, is een echte afwijking, en de timing wijst naar de vrachtbrieven. Wat het betékent staat nog open — het kan angst, concentratie, verdriet of een leugen zijn. Het markeert de plek. Het beantwoordt de vraag niet.',
    myth: 'Er bestaat geen gebaar dat "liegen" betekent. Meta-analyses van misleidingssignalen vinden voor vrijwel elk populair teken een effect rond nul. Een afwijking vertelt je waar je moet graven, nooit wat je zult vinden.',
  },
  'b-quiet': {
    baseline: 'Priya is precies en stil. Ze denkt na voordat ze spreekt, laat lange pauzes vallen en gebaart zelden.',
    moment: 'Gevraagd naar de budgetoverschrijding antwoordt ze onmiddellijk, uitgebreid, en levert ze twee details waar je niet om vroeg.',
    question: 'Wat is hier het betekenisvolle signaal?',
    options: [
      'Iemand die normaal weloverwogen spreekt wordt snel en overcompleet.',
      'Ze is zenuwachtig, want ze praat te veel.',
      'Ongevraagd extra detail geven is een klassiek teken van een ingestudeerd verhaal.',
      'Niets — ze kent dit onderwerp goed, dus vlotheid is te verwachten.',
    ],
    explain: 'De richting van de afwijking doet er niet toe; het feit ervan wel. Bij Marcus was het teken stilvallen, bij Priya juist vlot worden. Daarom zijn basislijnen persoonsgebonden: hetzelfde gedrag is bij de één signaal en bij de ander ruis. Merk op dat optie 4 een reële mogelijkheid is — maar dat stel je vast door te vragen, niet door aan te nemen.',
    myth: '"Te veel detail betekent ingestudeerd" en "te weinig betekent ontwijkend" kunnen niet allebei betrouwbaar zijn. Een regel die in beide richtingen afgaat is geen regel.',
  },
  'b-hands': {
    baseline: 'Aan het begin van het gesprek houdt Tom zijn armen over elkaar, zit hij achterover en antwoordt hij in korte zinnen. Dat doet hij nu al veertig minuten.',
    moment: 'Zodra je overgaat op vragen over zijn dochter, vouwt hij zijn armen los, leunt hij naar voren en gaat hij uitweiden.',
    question: 'Wat heb je nu werkelijk geleerd?',
    options: [
      'Dat dit onderwerp zijn toestand verandert — en dat gevouwen armen zijn basislijn waren, geen afwerend signaal.',
      'Dat hij eerder gesloten was en nu eerlijk opengaat.',
      'Dat hij eerder zal liegen over zijn dochter, omdat hij nu warmte speelt.',
      'Dat de ruimte koud was en hij is opgewarmd.',
    ],
    explain: 'De gevouwen armen betekenden niets totdat ze veranderden. Dit is de meest voorkomende fout bij het lezen van mensen: een stábiele toestand behandelen als signaal. Een houding die veertig minuten standhoudt is meubilair. De informatie zit in de overgang en in wat die veroorzaakte.',
    myth: 'Gevouwen armen is de meest overgeïnterpreteerde houding die er bestaat. Meestal betekent het dat iemand het koud heeft, dat de stoel geen armleuningen heeft, of simpelweg dat die persoon zo zit.',
  },
  'b-latency': {
    baseline: 'Elke vraag tot nu toe is beantwoord na een tel van ongeveer een halve seconde — consistent, comfortabel, ongehaast.',
    moment: 'Je stelt een vraag die alleen ophalen vraagt — "welke ingang heb je gebruikt?" — en de pauze rekt tot vier seconden voordat er een kort antwoord komt.',
    question: 'Waarom is deze pauze het opmerken waard en de eerdere niet?',
    options: [
      'De vraag vroeg ophalen, geen construeren, dus die extra tijd is onverklaard.',
      'Lange pauzes vóór een antwoord duiden op misleiding.',
      'Korte antwoorden na lange pauzes duiden op misleiding.',
      'Het is niet het opmerken waard; vier seconden valt binnen het normale bereik.',
    ],
    explain: 'Reactietijd betekent alleen iets ten opzichte van het denkwerk dat de vraag vraagt. "Welke ingang heb je gebruikt" is opzoeken — bij een eerlijke getuige gaat dat snel, ook als de rest van het verhaal traag is. De afwijking zit tussen de verwáchte kosten van de vraag en de werkelijk genomen tijd. Dat gat is de waarneming.',
    myth: 'Kale pauzelengte is vrijwel nutteloos. Pauzelengte ten opzichte van de moeilijkheid van de vraag is waar de informatie zit.',
  },
  'b-group': {
    baseline: 'Een team van vijf vergadert wekelijks. De manager spreekt als eerste, dan de senior engineer, daarna de rest. Niemand onderbreekt de manager.',
    moment: 'Deze week blijft het na de manager enkele seconden stil, en twee mensen kijken even naar de junior ontwerper voordat iemand iets zegt.',
    question: 'Wat vertelt die blik je?',
    options: [
      'De zaal denkt dat de ontwerper informatie heeft die met het zojuist gezegde te maken heeft.',
      'De ontwerper heeft iets fout gedaan.',
      'De ontwerper is de werkelijke beslisser in de groep.',
      'Het team is het oneens met de manager.',
    ],
    explain: 'Groepen wijzen. Als een onderwerp landt, bewegen ogen naar degene die de zaal ermee associeert — sneller dan iemand besluit te kijken, en meestal zonder dat iemand merkt dat hij keek. Het identificeert betrouwbaar associátie, niet schuld, gezag of instemming. Meer in een blik lezen is waar het misgaat.',
    myth: 'Niemand in een zaal bepaalt waar zijn ogen in de eerste halve seconde heen gaan. Precies daarom is die halve seconde het enige deel dat de moeite waard is.',
  },
  'b-smile': {
    baseline: 'Anna lacht vaak — een snelle, brede, makkelijke lach die net zo snel weer weg is.',
    moment: 'Als haar verteld wordt dat ze is gepasseerd voor de promotie, lacht ze. De lach komt een tel te laat, bouwt trager op dan gewoonlijk, blijft veel langer hangen en zakt in stapjes weg in plaats van in één keer.',
    question: 'Wat is hier het beste te verdedigen?',
    options: [
      'De timing wijkt af van haar eigen patroon — het opmerken waard, en veel meer ook niet.',
      'Dit is een nepglimlach, dus ze verbergt haar echte reactie.',
      'Ze is stiekem blij met de uitkomst.',
      'Ze verbergt woede.',
    ],
    explain: 'De dynámiek — hoe snel hij opkomt, hoe lang hij blijft, hoe hij wegzakt — is het deel met redelijke onderbouwing, en die wijkt af van haar eigen basislijn van snel op, snel af. Dat levert je "deze is anders" op, een bescheiden bewering. Het levert je geen "nep" op, en al helemaal niet welk gevoel eronder zit. Merk op hoe verleidelijk optie 2 is, en hoeveel die aanneemt.',
    myth: 'De beroemde toets — een echte lach doet de ogen rimpelen, een nepglimlach niet — houdt geen stand. De oogspier blijkt door de meeste mensen bewust aan te sturen, en studies vinden het "echte" kenmerk in ergens tussen de 56% en 71% van bewust geposeerde glimlachen. Het is een van de meest zelfverzekerd herhaalde en minst betrouwbare signalen in omloop.',
  },
  'b-pronoun': {
    baseline: 'Als Daniël over zijn week vertelt, zegt hij voortdurend "ik" — ik ging, ik zei tegen hem, ik besloot. Dat is zijn normale register.',
    moment: 'Bij het beschrijven van de betreffende avond verschuift het verhaal: "de auto werd achterom gezet", "toen was er een gesprek", "de gemoederen liepen op".',
    question: 'Wat is er veranderd?',
    options: [
      'Hij heeft zichzelf grammaticaal uit de gebeurtenissen gehaald die hij beschrijft.',
      'Hij liegt over die avond.',
      'Hij herinnert zich die avond niet helder.',
      'Hij beschermt iemand anders die erbij was.',
    ],
    explain: 'Wat je kunt zeggen is smal, en het is het enige dat de moeite waard is: zijn register veranderde op een specifiek punt in het verhaal. Dat is een waarneming over táál, en het markeert naar welke minuten je terug moet. Optie 2, 3 en 4 springen alle drie naar een oorzaak, en het bewijs reikt tot geen van die drie.',
    myth: 'Je zult lezen dat leugenaars persoonlijke voornaamwoorden weglaten om afstand te nemen. De literatuur is veel wankeler dan de zelfverzekerde versie doet vermoeden: resultaten zijn inconsistent, meerdere studies vinden helemaal geen effect, en er is gegronde zorg dat eerdere successen artefacten van specifieke datasets waren. Behandel een registerverschuiving als een plek om nog een vraag te stellen — nooit als een aanwijzing voor bedrog.',
  },
  'b-cluster': {
    baseline: 'De hele vergadering is Sam ontspannen, open en consistent geweest.',
    moment: 'Bij één vraag gebeuren er binnen twee seconden drie dingen: zijn voet draait naar de deur, hij slikt, en hij vraagt je de vraag te herhalen.',
    question: 'Waarom weegt dit zwaarder dan elk van die dingen afzonderlijk?',
    options: [
      'Onafhankelijke kanalen die tegelijk verschuiven is veel minder waarschijnlijk toeval.',
      'Voeten die naar uitgangen wijzen zijn een bewezen indicator van vluchtneiging.',
      'Om herhaling vragen is een vertragingstactiek om tijd te winnen.',
      'Slikken wijst op een droge mond door stress.',
    ],
    explain: 'Elk van die gedragingen is op zichzelf achtergrondruis — iedereen slikt, iedereen verzit, iedereen verstaat weleens iets verkeerd. De informatie zit in de gelíjktijdigheid over losstaande kanalen, gekoppeld aan één prikkel. Drie dingen tegelijk op één moment is simpelweg minder waarschijnlijk toeval, en dat maakt een vervolgvraag de moeite waard. Dat is de hele bewering.',
    myth: 'Pas op dat je dit niet opwaardeert. "Clusters zijn betrouwbaar waar losse signalen dat niet zijn" is een populaire stap in trainingen, en het bewijs ervoor is dun — zwakke indicatoren opstapelen levert niet betrouwbaar een sterke op. Een cluster verdient je een betere vraag, geen oordeel.',
  },
  'b-comfort': {
    baseline: 'Het gesprek loopt al tien minuten soepel. Ze heeft licht naar je toe geleund.',
    moment: 'Je noemt haar zakenpartner bij naam. Haar houding verandert niet, maar ze pakt haar koffie — die leeg is — en houdt hem met twee handen vast.',
    question: 'Wat is dit?',
    options: [
      'Een zelfkalmerende beweging die een voorwerp als barrière gebruikt, uitgelokt door de naam.',
      'Een teken dat ze haar zakenpartner niet mag.',
      'Dorst.',
      'Een bewuste vertragingstactiek.',
    ],
    explain: 'Grijpen naar een leeg kopje is het detail dat telt: de handeling heeft geen functioneel doel, dus wordt hij om zichzelf uitgevoerd — handen bezet, iets tussen jou en haar in. Kalmerend gedrag komt veel voor en is redelijk betrouwbaar als indicator van verhóógde spanning. De naam is de trigger. Wat die naam voor haar betekent is de volgende vraag, niet deze.',
    myth: 'Barrière- en zelfkalmerend gedrag wijst op ongemak, punt. Ongemak heeft honderd oorzaken en antipathie is er daar één van.',
  },
  'b-story': {
    baseline: 'Haar verslag van de dag loopt chronologisch, met rijk zintuiglijk detail — hoe de kamer rook, wat iemand aanhad.',
    moment: 'Voor één venster van twintig minuten verdunt het detail tot een samenvatting — "we hebben het papierwerk geregeld en zijn toen weggegaan" — waarna de rijkdom terugkeert.',
    question: 'Wat is de waarneming?',
    options: [
      'Een lokale daling in detaildichtheid, niet in lijn met de rest van haar verslag.',
      'Ze verbergt wat er in dat venster gebeurde.',
      'Er gebeurde in dat venster niets noemenswaardigs.',
      'Ze vat een saaie administratieve klus samen, wat normaal is.',
    ],
    explain: 'Detaildichtheid is een kanaal waar vrijwel niemand aan denkt te sturen, dus varieert het eerlijk — en een scherpe lokale daling tegen een rijke basislijn is een echte afwijking. Optie 3 en 4 zijn volstrekt plausibele verklaringen vóór die afwijking, en dat is precies het punt: je hebt een vraag gevonden, geen antwoord. De juiste volgende zet is haar die twintig minuten opnieuw te laten doorlopen, in omgekeerde volgorde.',
    myth: 'Het verslag nog eens vragen in omgekeerde volgorde is een goede zet — maar om een saaiere reden dan je elders leest. Vroege studies suggereerden dat het leugenaars ontmaskerde door de denklast te verhogen; latere replicaties reproduceerden dat effect niet, en meta-analytisch werk ondersteunt het niet als leugendetectie. Het overleeft omdat het een echt geheugenhulpmiddel is: een andere ophaalroute brengt detail boven dat de eerste ronde miste.',
  },
};

export const TECHNIQUES_NL = {
  barnum:  { name: 'Barnum-uitspraak', note: 'Een bewering die breed genoeg is om op vrijwel iedereen te passen, geformuleerd zodat hij specifiek en persoonlijk aanvoelt.' },
  rainbow: { name: 'Regenboogtruc',    note: 'Beweert een eigenschap en het tegendeel ervan tegelijk, zodat elk zelfbeeld een match vindt.' },
  fork:    { name: 'Splitsing',        note: 'Een uitspraak zo gebouwd dat elk antwoord hem bevestigt; de lezer claimt de tak die landt.' },
  fuzzy:   { name: 'Vaag feit',        note: 'Een vage treffer die de ander zelf met echt detail invult — en zich daarna herinnert als die van de lezer.' },
  vanish:  { name: 'Verdwijnende ontkenning', note: 'Een ontkenning zo ingekaderd dat een "nee" verandert in bevestiging van het inzicht.' },
  mine:    { name: 'Hengelen',         note: 'Een vraag vermomd als uitspraak, die detail oogst om later als kennis terug te spelen.' },
};

export const COLDREADS_NL = {
  'cr-barnum': {
    subject: 'Een onbekende van eind twintig, op een feest, die net heeft gevraagd wat je doet.',
    question: 'Welke zin is zo gebouwd dat hij op vrijwel iedereen landt?',
    options: [
      '"Je komt heel open over, maar er is een deel van jezelf dat je goed bij mensen weghoudt."',
      '"Je bent de oudste van drie en je vader werkte met zijn handen."',
      '"Je hebt vanochtend een lastig gesprek gehad."',
      '"Je houdt niet van feestjes zoals dit."',
    ],
    explain: 'Hij vleit, hij is onweerlegbaar, en vrijwel elke volwassene gelooft dit over zichzelf — iedereen ervaart een innerlijk leven dat rijker is dan wat hij laat zien. De andere zinnen zijn specifiek en kunnen hardop fout blijken, en dat is precies wat een cold reader vermijdt.',
  },
  'cr-rainbow': {
    subject: 'Een stille man die al tien minuten vrijwel niets heeft gezegd.',
    question: 'Welke uitspraak is een regenboogtruc — die een eigenschap én het tegendeel dekt?',
    options: [
      '"Je bent meestal gereserveerd, maar bij mensen die je vertrouwt ben jij de luidste van het stel."',
      '"Je bent van nature een gereserveerd persoon."',
      '"Je bent vanavond stil omdat er iets op je hoofd zit."',
      '"Je luistert liever dan dat je praat."',
    ],
    explain: 'De regenboogtruc dekt de volle breedte, dus hij kan niet missen: is hij verlegen, dan is het raak, en is hij stiekem uitbundig, dan is het een béter raak — het lijkt dan door de buitenkant heen te kijken. Let op het scharnier "maar bij de juiste mensen…"; daar zit de naad.',
  },
  'cr-fork': {
    subject: 'Iemand die net vaag heeft laten vallen dat het op werk "veel" is de laatste tijd.',
    question: 'Welke zin is een splitsing — waarbij beide antwoorden de lezer bevestigen?',
    options: [
      '"Er is een beslissing waar je steeds op terugkomt, of niet?"',
      '"Je denkt erover na om ontslag te nemen."',
      '"Je manager is het probleem."',
      '"Je zit er ongeveer drie jaar."',
    ],
    explain: 'Zegt de ander ja, dan had de lezer gelijk. Zegt de ander nee, dan zegt de lezer "nog niet — maar het komt eraan" en wordt het een voorspelling. Het kenmerk van een splitsing is dat hij in béide richtingen onweerlegbaar is, wat geen enkele eerlijke uitspraak is.',
  },
  'cr-fuzzy': {
    subject: 'Een vrouw die net tegenover je is gaan zitten.',
    question: 'Welke zin is bedoeld om haar de inhoud te laten leveren en jou er vervolgens de eer voor te geven?',
    options: [
      '"Ik krijg iets door rond een oudere vrouw — een naam met een M, of een J."',
      '"De naam van je oma was Margaretha."',
      '"Je hebt twee zussen."',
      '"Je bent in het voorjaar geboren."',
    ],
    explain: 'Twee letters, twee van de meest voorkomende beginletters, en "oudere vrouw" dekt moeder, oma, tante, buurvrouw, collega. Zij levert een naam, en binnen een minuut herinnert ze zich dat jíj die naam leverde. Dit is de krachtigste zet uit het repertoire en degene die je vooral moet herkennen als hij op jou gericht is.',
  },
  'cr-vanish': {
    subject: 'Een man die zojuist heeft ontkend dat hij iets verzamelt.',
    question: 'Welk antwoord is een verdwijnende ontkenning — die zijn "nee" in een treffer verandert?',
    options: [
      '"Nee, natuurlijk niet — maar er is iets dat je hebt bewaard en nooit zou weggooien."',
      '"Weet je het zeker? De meeste mensen verzamelen wel iets."',
      '"Dan had ik het bij die mis."',
      '"Misschien ga je later in je leven wel verzamelen."',
    ],
    explain: 'De misser wordt door de volgende bewering opgeslokt voordat hij als misser kan registreren, en het vervolg is een Barnum-uitspraak die niet kan falen. Let op het patroon: lezers gaan nooit in discussie met een "nee", ze rijden erop mee. Als iemand een uur lang nooit ongelijk heeft, is dat geen accuratesse — dat is architectuur.',
  },
  'cr-mine': {
    subject: 'Vroeg in een gesprek met iemand die je net hebt ontmoet.',
    question: 'Welke hiervan is hengelen — een vraag in de kleren van een uitspraak?',
    options: [
      '"Je hebt de blik van iemand die als kind veel verhuisd is."',
      '"Waar ben je opgegroeid?"',
      '"Ik ben in één dorp opgegroeid en nooit weggegaan."',
      '"Verhuizen als kind is zwaar voor mensen."',
    ],
    explain: 'Het is een vraag met de grammatica van een bewering. Een treffer kost niets; een misser levert "nee, ik heb juist tot mijn achttiende in hetzelfde huis gewoond" — een feit dat je nu bezit en twintig minuten later als intuïtie kunt terugspelen. Directe vragen zijn eerlijk. Uitspraken die oogsten niet.',
  },
  'cr-defence': {
    subject: 'Jij bent degene die gelezen wordt. Een onbekende heeft drie uitspraken over je gedaan en alle drie voelden griezelig raak.',
    question: 'Wat is de juiste toets?',
    options: [
      'Vraag jezelf af of ook maar één van de drie hardop fout had kunnen zijn.',
      'Tel hoeveel er klopten en zet dat af tegen hoeveel er misgingen.',
      'Geef bewust een onjuist antwoord en kijk of ze het doorhebben.',
      'Vraag hoe ze het wisten.',
    ],
    explain: 'Weerlegbaarheid is de enige toets die van binnenuit werkt. Treffers tellen faalt omdat missers worden opgeslokt en vergeten — dat is het ontwérp. Vragen hoe ze het wisten nodigt uit tot een betere voorstelling. De vraag is niet "hadden ze gelijk", maar "hadden ze zichtbaar ongelijk kunnen hebben". Zo niet, dan is er nooit informatie overgedragen.',
  },
  'cr-attention': {
    subject: 'Je wilt dat iemand één specifiek ding onthoudt uit een gesprek van tien minuten.',
    question: 'Wat doet het meeste werk?',
    options: [
      'Zeg het, en zwijg daarna drie of vier seconden volledig.',
      'Zeg het drie keer in andere woorden.',
      'Zeg het harder en met meer overtuiging dan de rest.',
      'Zeg het helemaal aan het begin, als de aandacht het hoogst is.',
    ],
    explain: 'Stilte na een uitspraak is het sterkste legitieme aandachtsmiddel dat er is. Het creëert een gat dat de luisteraar vult met wat je net zei, en het signaleert dat die uitspraak dragend was. Herhaling verdunt. Volume roept weerstand op. Openingszinnen worden gehoord voordat de luisteraar besloten heeft dat het hem iets kan schelen.',
  },
  'cr-misdirect': {
    subject: 'Een artiest wil dat je een beweging van zijn linkerhand mist.',
    question: 'Wat bepaalt werkelijk waar je kijkt?',
    options: [
      'Waar de artiest kijkt, en wat er op het punt lijkt te gaan gebeuren.',
      'Snelle beweging, waar het oog naartoe getrokken wordt.',
      'Felle kleuren en glimmende voorwerpen in de andere hand.',
      'Harde, plotselinge geluiden van de andere kant.',
    ],
    explain: 'Aandacht volgt verwáchte betekenis, en de sterkste aanwijzing daarvoor is de blik van een ander — je kijkt automatisch waar zij kijken. Snelle beweging trekt het oog juist wél, en daarom gebruikt echte misleiding een trage, verwachte, oninteressante beweging voor de geheime handeling en laat het sturen aan de blik over.',
  },
  'cr-ideomotor': {
    subject: 'Een artiest houdt de pols van een vrijwilliger vast, vraagt hem zich sterk te concentreren op waar een voorwerp verstopt ligt, en loopt er regelrecht naartoe.',
    question: 'Wat gebeurt hier werkelijk?',
    options: [
      'De vrijwilliger stuurt onbewust, en de artiest leest dat via het contact af.',
      'De artiest leest micro-expressies op het gezicht van de vrijwilliger.',
      'De artiest wist de locatie vooraf en speelt toneel.',
      'De vrijwilliger helpt bewust mee en heeft dat afgesproken.',
    ],
    explain: 'Dit is contactgedachtelezen, ook wel Cumberlandisme, en het is een echte techniek die teruggaat tot de jaren 1870. Het draait op het *ideomotorisch effect*: concentreren op een locatie levert minieme onwillekeurige bewegingen in die richting op die je bij jezelf niet voelt. Niemand in dit tafereel liegt — dat is juist het punt. Hetzelfde effect drijft ouijaborden en wichelroedes, en daarom verdedigen oprechte mensen allebei.',
  },
  'cr-eyes': {
    subject: 'Iemand vertelt je dat hij leugens herkent doordat leugenaars naar rechtsboven kijken als ze een antwoord verzinnen.',
    question: 'Wat is de juiste reactie?',
    options: [
      'De bewering komt uit NLP en heeft geen onderbouwing; oogrichting voorspelt liegen noch herinneren.',
      'Het werkt, maar alleen als je eerst per persoon vaststelt welke richting welke is.',
      'Het werkt voor herinneren versus construeren, maar niet specifiek voor liegen.',
      'Het klopt in grote lijnen, maar is te onbetrouwbaar om alleen op te varen.',
    ],
    explain: 'Oogbewegingssignalen zijn een claim uit neurolinguïstisch programmeren, en onderzoek vindt geen betrouwbaar verband tussen oogbeweging en misleiding, en evenmin een consistente koppeling aan zintuiglijke modaliteit. De verleidelijke middenantwoorden — "waar maar onbetrouwbaar", "waar mits gekalibreerd" — zijn hoe een dode claim in leven blijft. Er valt niets te kalibreren.',
  },
  'cr-priming': {
    subject: 'Een boek vertelt je dat het strooien van bepaalde woorden in een gesprek het gedrag van de ander minuten later stuurt, zonder dat die het merkt.',
    question: 'Hoeveel gewicht moet je hieraan geven?',
    options: [
      'Heel weinig — de literatuur over sociale priming is grotendeels niet gerepliceerd.',
      'Veel — het is een van de best gerepliceerde bevindingen in de psychologie.',
      'Enigszins — de effecten zijn echt maar klein.',
      'Het werkt, maar alleen bij mensen die toch al beïnvloedbaar zijn.',
    ],
    explain: 'Sociale priming is het gebied dat het hardst is geraakt door de replicatiecrisis. Het kenmerkende resultaat — mensen die langzamer lopen na blootstelling aan woorden die met ouderdom te maken hebben — liet zich niet repliceren, en in de replicatie verscheen het effect alleen wanneer de onderzoekers het verwáchtten, wat het tot een bevinding over onderzoekers maakt. Wees hier extra voorzichtig: dit is precies het soort claim dat je vleit door te suggereren dat je een hendel op andere mensen hebt.',
  },
  'cr-ethics': {
    subject: 'Je beseft net dat je met deze middelen een gesprek kunt sturen.',
    question: 'Waar ligt de grens die ertoe doet?',
    options: [
      'Of de ander hier nog steeds mee zou instemmen als hij het mechanisme kon zien.',
      'Of je hem materiële schade berokkent.',
      'Of wat je hem vertelt technisch gezien waar is.',
      'Of hij het gesprek prettig vindt.',
    ],
    explain: 'Elk van deze technieken werkt doordat hij onzichtbaar is — dat is het hele mechanisme. De eerlijke toets is dus de transparantietoets: zou dit nog steeds in orde zijn als ze je bezig zagen? Verstandhouding, aandacht en goede vragen doorstaan die toets. Gefabriceerde alwetendheid niet, en het feit dat het mensen vermaakt is precies hoe de fraude zichzelf in stand houdt.',
  },
};
