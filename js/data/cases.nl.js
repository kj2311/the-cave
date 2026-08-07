/* ============================================================
   cases.nl.js — Dutch translation of the deduction case files.

   Only text. `key` (which observation is decisive) and the `ok`
   flags stay in the English source; options here are a plain
   array in the same order, and the resolver maps them on.
   ============================================================ */

export const CASES_NL = {
  chef: {
    title: 'De sollicitant',
    scene: 'Een man die solliciteert als chef-kok vertelt je dat hij elf jaar lang professionele keukens heeft geleid.',
    facts: [
      'Zijn onderarmen en handruggen zijn ongeschonden — geen brandlittekens, geen oude messneden.',
      'De vingertoppen van zijn linkerhand zitten vol eelt; de nagels van zijn rechterhand zijn lang en gevijld.',
      'Hij is een kwartier te vroeg en heeft een geprint cv bij zich.',
      'Hij bestelt zijn eigen biefstuk goed doorbakken.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Hij liegt over die elf jaar, en hij speelt serieus een snaarinstrument.',
      'Hij spreekt de waarheid, maar heeft vooral leidinggegeven en niet aan de lijn gestaan.',
      'Hij is patissier en geen lijnkok.',
      'Niets hier spreekt zijn bewering tegen.',
    ],
    explain: 'Elf jaar aan een keukenlijn laat sporen na — brandplekken van ovenroosters op de onderarm, sneetjes op de linkerhand. Dat die volledig ontbreken is de tegenspraak; feit 1 doet het werk. Feit 2 vertelt je vervolgens wat hij wél doet: eeltige linkervingertoppen met lange rechternagels is de hand van een klassiek gitarist, en dat kost jaren. Feit 4 is suggestief maar zwak — genoeg koks eten vreemd. Feit 3 is pure ruis.',
    principle: 'Afwezigheid is bewijs. Vraag wat de beweerde geschiedenis had moeten achterlaten, en ga daar dan naar kijken.',
  },

  ice: {
    title: 'Kamer 412',
    scene: 'Een hotelgast zegt dat ze "ongeveer een uur geleden" heeft ingecheckt en de kamer sindsdien niet heeft verlaten.',
    facts: [
      'De ijsemmer op het bureau bevat water en één splinter ijs.',
      'Haar koffer staat open, kleren hangen in de kast.',
      'De televisie staat uit en de achterkant is warm.',
      'Het gratis flesje water is ongeopend.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Ze is aanzienlijk langer dan een uur in de kamer.',
      'Ze checkte een uur geleden in, maar er was iemand anders vóór haar in de kamer.',
      'Ze heeft de kamer verlaten en is kort geleden teruggekomen.',
      'De tijdlijn klopt met haar verhaal.',
    ],
    explain: 'Een volle emmer heeft bij kamertemperatuur ruwweg drie uur nodig om tot splinters in te zakken — feit 1 is een klok die ze niet kan terugzetten. De warme televisie (feit 3) ondersteunt langer verblijf, maar is zachter bewijs; een toestel koelt traag af en ze kan hem hoe dan ook net hebben uitgezet. Feit 2 past bij elke duur boven de tien minuten. Feit 4 zegt helemaal niets.',
    principle: 'Ruimtes bevatten klokken: smeltend ijs, afkoelende drank, opdrogende kringen, neergedaald stof. Zoek de klok voordat je de tijdlijn accepteert.',
  },

  car: {
    title: 'Drie jaar, zegt hij',
    scene: 'Een man die particulier een auto verkoopt vertelt je dat hij hem drie jaar in bezit heeft en er dagelijks in rijdt.',
    facts: [
      'Het rubber op het rempedaal is gladgesleten en iets naar links afgesleten.',
      'Elke radiovoorkeuze is een standaardzender uit de fabriekslijst.',
      'De vloermatten zijn nieuw en het interieur ruikt naar bekledingsreiniger.',
      'De bestuurdersstoel staat ver naar achteren; hij is geen lange man.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'De auto is werkelijk intensief gebruikt, maar niet door hem.',
      'Hij liegt over de leeftijd van de auto; hij is veel nieuwer dan beweerd.',
      'Hij heeft hem drie jaar gehad maar er nauwelijks in gereden.',
      'De auto heeft schade gehad die hij verzwijgt.',
    ],
    explain: 'Feit 1 bewijst zwaar gebruik, dus de auto is niet vers. Feit 2 is de tegenspraak: niemand rijdt drie jaar dagelijks zonder ooit een zender in te stellen. Feit 4 ondersteunt dat — de stoel is gevormd naar de routine van iemand die langer is. Feit 3 is het feit waar mensen zich op storten, en het bewijst alleen dat hij hem heeft schoongemaakt voor de verkoop, wat elke eerlijke verkoper ook doet.',
    principle: 'Voorwerpen leggen de gewoontes van hun eigenaar vast. Gewoontes zijn traag, duur om te vervalsen en vrijwel nooit gerepeteerd.',
  },

  run: {
    title: 'De ochtendloop',
    scene: 'Het heeft tot twintig minuten geleden hard geregend. Je collega komt binnen en zegt dat hij net tien kilometer heeft gelopen.',
    facts: [
      'Zijn shirt is gelijkmatig vochtig over borst en rug.',
      'Zijn hardloopschoenen en sokken zijn droog, en de veters zijn schoon.',
      'Hij ademt normaal en praat in hele zinnen.',
      'Hij heeft een bijna volle bidon in zijn hand.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Hij heeft niet gelopen; dat vochtige shirt is op een andere manier ontstaan.',
      'Hij heeft gelopen, maar veel minder dan tien kilometer.',
      'Hij heeft binnen op een loopband gelopen.',
      'Hij liep voordat de regen begon.',
    ],
    explain: 'Feit 2 is doorslaggevend en vrijwel niet weg te praten: je kunt geen natte grond oversteken zonder je schoenen nat te maken. Feit 3 en 4 zijn op zichzelf zwak — getrainde lopers herstellen snel en sommigen dragen water dat ze niet drinken. Let op dat "loopband" de droge schoenen zou verklaren, en juist daarom is feit 1 nodig als steun: een gelijkmatig, overal verdeeld vocht is hoe een besproeid of natgemaakt shirt eruitziet, niet het kraag-en-ruggengraatpatroon van echte inspanning.',
    principle: 'Zoek bij een kandidaat-verklaring degene die ook de vólgende vraag overleeft. Droge schoenen wegen zwaarder dan een vochtig shirt.',
  },

  interp: {
    title: 'De tolk',
    scene: 'Je hoort een getuige via een tolk. Hij houdt vol dat hij geen woord Engels spreekt.',
    facts: [
      'Als je een straatnaam noemt, schieten zijn ogen naar je toe voordat de tolk begonnen is.',
      'Hij beantwoordt elke vraag volledig en zonder aarzeling.',
      'Hij kijkt na elk eigen antwoord naar de tolk.',
      'Hij vraagt tijdens het uur twee keer om water.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Hij verstaat Engels en verbergt dat.',
      'Hij herkende specifiek die straatnaam, maar kent verder geen Engels.',
      'Hij leest jouw lichaamstaal, niet je woorden.',
      'De tolk coacht hem.',
    ],
    explain: 'Feit 1 is een timingfout, en timing is bijzonder moeilijk te onderdrukken: begrip komt eerder dan de vertaling, en de ogen bewegen op begrip. Feit 3 is het opmerken waard — na het spreken de tolk controleren suggereert dat hij de vertaling toetst — maar laat onschuldige lezingen toe. Feit 4 is ruis. Lichaamstaal kan geen straatnaam overbrengen.',
    principle: 'Let op de timing van reacties, niet op de inhoud. Mensen repeteren wat ze zullen zeggen, nooit wanneer ze zullen reageren.',
  },

  tanline: {
    title: 'Nooit getrouwd',
    scene: 'Tijdens het eten laat een man terloops vallen dat hij nooit getrouwd is geweest.',
    facts: [
      'Aan de basis van zijn linkerringvinger zit een bleke, licht ingedrukte band.',
      'Zijn horloge draagt hij om zijn rechterpols.',
      'Twee keer, terwijl hij nadenkt, wrijft zijn rechterduim over die vinger.',
      'Hij is vaag over waar hij vóór dit jaar woonde.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Hij heeft jarenlang een ring op die vinger gedragen en is daar kort geleden mee gestopt.',
      'Hij is nu getrouwd en heeft de ring vóór het eten afgedaan.',
      'Hij is gescheiden en verzwijgt dat bewust.',
      'Hij is recent afgevallen, waardoor een ring die hij nog draagt losser zit.',
    ],
    explain: 'Feit 1 ondersteunt precies één bewering — langdurig dragen, recent gestopt — en niets meer. Elk rijker verhaal (nu getrouwd, gescheiden, verzwijgt het) vraagt een aanname die het bewijs niet levert. Feit 3 is het teken dat het verlies récent is: de hand grijpt nog naar iets dat er niet meer is. Feit 4 verleidt je een verhaal te bouwen; weersta dat.',
    principle: 'Stop de redenering precies waar het bewijs stopt. "Hij droeg een ring" is kennis. "Zijn vrouw is bij hem weg" is een verhaal.',
  },

  switch: {
    title: 'Voor het eerst hier',
    scene: 'Een gast wordt een huis binnengelaten voor wat volgens haar haar eerste bezoek is.',
    facts: [
      'Bij het betreden van de schemerige gang gaat haar hand naar de lichtschakelaar zonder dat ze ernaar kijkt.',
      'Ze maakt een compliment over de schilderijen in de zitkamer.',
      'Ze opent het tweede kastje voor een glas en vindt de glazen.',
      'Ze slaat een rondleiding boven af.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Ze is eerder in dit huis geweest, en vaker dan één keer.',
      'Ze heeft foto\'s of een plattegrond van het huis gezien.',
      'Ze woonde in een huis met exact dezelfde indeling.',
      'Iemand heeft haar voor haar komst verteld waar alles staat.',
    ],
    explain: 'Feit 1 is motorisch geheugen, geen kennis. Je kunt te horen krijgen waar de glazen staan (feit 3, en daarom is dat alleen steun), maar een reikbeweging kun je niet krijgen — die bouwt zich op door herhaling, in het donker, zonder nadenken. Feit 4 is gedragsmatig het interessantst, maar bewijst niets; een rondleiding afslaan heeft een dozijn onschuldige redenen.',
    principle: 'Scheid wat iemand weet van wat hun lichaam weet. Het tweede is veel moeilijker te veinzen en veel veelzeggender.',
  },

  cardstock: {
    title: 'Senior partner',
    scene: 'Op een congres stelt een man zich voor als senior partner bij een groot kantoor en geeft je een visitekaartje.',
    facts: [
      'De korte zijden van het kaartje voelen licht geribbeld en vezelig aan.',
      'Het e-mailadres erop gebruikt een gratis consumentendomein.',
      'Zijn schoenen zijn van goede kwaliteit en minstens één keer opnieuw verzoold.',
      'Hij was vijfentwintig minuten voor aanvang aanwezig.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Hij heeft de kaartjes zelf geprint; de bewering over een groot kantoor houdt geen stand.',
      'Hij is partner bij een heel klein kantoor en overdrijft de omvang.',
      'Hij is kort geleden ontslagen en heeft zijn materiaal niet bijgewerkt.',
      'Hij zit krap bij kas en bezuinigt.',
    ],
    explain: 'Geribbelde, vezelige korte zijden komen van geperforeerde vellen voor de thuisprinter — feit 1 is fysiek en specifiek. Feit 2 ondersteunt dat: een groot kantoor geeft kantooradressen uit. Feit 3 is de valstrik. Verzoolde goede schoenen lezen voor een slordige waarnemer als "blut", maar goede schoenen laten verzolen is wat mensen die iets van schoenen weten in elk inkomen doen. Feit 4 is ruis, of hooguit een zwak signaal dat hij deze zaal harder nodig heeft dan zij hem.',
    principle: 'Rangschik je waarnemingen naar hoe moeilijk ze te vervalsen zijn en hoe weinig verklaringen ze toelaten. Laat dan de bovenste leiden.',
  },

  sugar: {
    title: 'De hele avond alleen',
    scene: 'Een vrouw zegt dat ze de hele avond alleen thuis is geweest.',
    facts: [
      'Er staan twee schone mokken op het afdruiprek.',
      'De suikerpot staat op het aanrecht met een theelepel erin.',
      'Ze drinkt haar koffie zwart en ongezoet — dat heb je vaak genoeg gezien.',
      'De tv-gids ligt open op de programmering van gisteravond.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Er was iemand anders in huis en die kreeg iets te drinken.',
      'Ze heeft bezoek gehad en is vergeten dat te vermelden.',
      'Ze heeft in de loop van de avond twee keer iets voor zichzelf gemaakt.',
      'De mokken zijn van een eerdere dag afgewassen.',
    ],
    explain: 'Twee mokken (feit 1) is op zichzelf zwak — iedereen gebruikt er twee op een avond. De suikerpot breekt het: feit 2 in combinatie met feit 3 betekent dat de suiker is klaargezet voor iemand met een andere smaak dan de hare. Merk op dat optie 2 waarschijnlijk klínkt maar zwakker is dan optie 1; "vergeten te vermelden" voegt een motief toe dat het bewijs niet heeft verdiend.',
    principle: 'Eén afwijking is een vraag. Een afwijking plus een bekende basislijn is een antwoord.',
  },

  lighter: {
    title: 'Twee jaar gestopt',
    scene: 'Een collega laat vallen dat hij twee jaar geleden is gestopt met roken.',
    facts: [
      'Zodra een vergadering gespannen wordt, gaat zijn hand naar zijn linkerborstzak en stopt daar.',
      'Hij draagt een aansteker bij zich, maar geen sigaretten.',
      'Hij neemt zijn koffie mee naar buiten en drinkt hem daar alleen op.',
      'Zijn tanden zijn onbevlekt.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Hij is veel recenter gestopt dan twee jaar geleden.',
      'Hij rookt nog steeds en verbergt dat volledig.',
      'Hij is precies twee jaar geleden gestopt, zoals hij zegt.',
      'Hij heeft nooit gerookt en verzint die geschiedenis.',
    ],
    explain: 'Feit 1 is een fantoomritueel — de reikbeweging overleeft de gewoonte, maar niet jarenlang; die dooft uit. Feit 2 is de bevestiging: de aansteker zit nog in de rotatie van dingen die hij meeneemt, en dat is een artefact van twee weken, niet van twee jaar. Feit 3 is het klassieke rokerspatroon maar kent onschuldige lezingen. Feit 4 pleit mild tegen de zwáárste variant, niet tegen de recentheid.',
    principle: 'Gewoontes laten een uitdovend spoor achter. De versheid van het residu dateert de verandering.',
  },

  flowers: {
    title: 'Bloemen om 18:40',
    scene: 'Een man komt thuis met bloemen. Hij zegt dat het voor hun trouwdag is.',
    facts: [
      'De bloemen komen van het tankstation vierhonderd meter verderop, prijssticker er nog op.',
      'Hij heeft ook een kaart gekocht, en die zit nog in het plastic.',
      'Hij is op zijn gebruikelijke tijd thuis.',
      'De verpakking is standaard tankstationfolie, geen bloemistenpapier.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Het gebaar is in de laatste paar minuten geïmproviseerd, wat de gelegenheid ook is.',
      'Hij is de trouwdag vergeten en dekt dat af.',
      'Hij biedt excuses aan in plaats van iets te vieren.',
      'Er is geen trouwdag; hij verzint er een.',
    ],
    explain: 'Alles hier dateert de áánkoop, niet het motief. Feit 1 is doorslaggevend: een gelegenheid die je van tevoren kent, koop je van tevoren, ergens beters, verder weg. Feit 2 en 4 ondersteunen de improvisatie. Optie 2 en 3 passen allebei goed, en dat is precies het probleem — het bewijs kan er niet tussen kiezen, dus geen van beide is nu te verdedigen.',
    principle: 'Passen twee verhalen even goed, dan heb je het niet opgelost. Benoem wat je werkelijk weet en ga op zoek naar het feit dat ze scheidt.',
  },

  dust: {
    title: 'Er is niets weg',
    scene: 'Een studeerkamer is doorzocht. De eigenaar houdt vol dat er niets ontbreekt.',
    facts: [
      'Op de plank ligt een schone rechthoek in een laagje stof, ongeveer de voetafdruk van een klein doosje.',
      'De bureauladen zijn dicht, maar de inhoud ligt door elkaar.',
      'Een raam staat van het slot.',
      'Het kleed ligt opgekruld bij de deur.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Er stond tot voor kort een voorwerp op die plank en dat is nu weg.',
      'De eigenaar liegt om de waarde van het gestolene te beschermen.',
      'De indringer kwam via het raam binnen en vertrok door de deur.',
      'De doorzoeking is achteraf in scène gezet.',
    ],
    explain: 'Feit 1 is een negatieve afdruk — stof hoopt zich op rondom wat het bedekt, dus de vorm is een registratie van het ontbrekende voorwerp en ruwweg van hoe lang het er stond. Meer bewijst het niet. Feit 2 zegt dat er is gezocht. Feit 3 zegt dat een raam van het slot is, meer niet; binnenkomst is een aanname. Optie 2 kan best waar zijn, maar het gegeven bewijs kan geen motief bereiken.',
    principle: 'Lege ruimte is data. Wat er níet is, en de vorm van die afwezigheid, is vaak het schoonste feit in de kamer.',
  },

  mirror: {
    title: 'Vreemden',
    scene: 'Twee mensen op een feest vertellen je, los van elkaar, dat ze elkaar nooit hebben ontmoet.',
    facts: [
      'Als hij zijn gewicht verplaatst, doet zij dat binnen een seconde of twee ook — herhaaldelijk.',
      'Hij stapt opzij om haar te laten passeren zonder eerst te kijken.',
      'Zij gebruikt een ongebruikelijk stopwoord; twintig minuten later gebruikt hij het ook.',
      'Ze staan aan weerszijden van de zaal.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Ze kennen elkaar, en ze kennen elkaar goed.',
      'Ze hebben elkaar vanavond ontmoet en kunnen het goed vinden.',
      'Hij voelt zich tot haar aangetrokken en spiegelt onbewust.',
      'Het zijn collega\'s, maar niet close.',
    ],
    explain: 'Feit 1 en 3 — houdingsspiegeling en taalconvergentie — ontstaan binnen één gesprek, dus op zichzelf passen ze bij optie 2. Feit 2 niet: uit iemands looplijn stappen zonder te controleren waar die persoon is, vereist een aangeleerd model van hoe die specifieke persoon beweegt. Dat is maanden, geen minuten. Feit 4 is decor.',
    principle: 'Vraag hoe lang een gedrag nodig heeft om op te bouwen. Die duur is je ondergrens voor de relatie.',
  },

  photo: {
    title: 'Afgelopen zomer',
    scene: 'Je krijgt een foto te zien die volgens de eigenaar afgelopen zomer is genomen.',
    facts: [
      'De schaduwen vallen vrijwel recht onder de personen.',
      'Achter hen hangt een poster voor een concert met een datum erop.',
      'Eén persoon draagt een polsbrace.',
      'De bomen op de achtergrond staan vol in blad.',
    ],
    question: 'Welke conclusie is het beste te verdedigen?',
    options: [
      'Alleen de poster kan de foto dateren; de rest legt het tijdstip of het seizoen vast.',
      'De foto is echt van afgelopen zomer.',
      'De foto is midden op de dag in een warme maand genomen, maar het jaar is onbekend.',
      'De polsbrace dateert hem, want die blessure is bekend.',
    ],
    explain: 'Deze zaak gaat over weten wat elk feit kan dragen. Korte schaduwen geven je het tijdstip. Vol blad geeft je het seizoen. Geen van beide geeft een jaar, dus optie 3 is bíjna goed en faalt alleen omdat feit 2 bestaat. Een gedateerde poster is een externe klok — die verankert het beeld aan een echte kalender. Optie 4 veronderstelt kennis die het tafereel je nooit gaf.',
    principle: 'Vraag je vóór het combineren van feiten af wat elk feit kan beantwoorden: tijd, plaats, duur, identiteit? Feiten van verschillende soort stapelen niet.',
  },
};
