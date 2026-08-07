/* ============================================================
   words.js — vocabulary for the memory drills.

   Deliberately concrete and imageable. The method of loci runs
   on pictures, and abstract nouns ("progress", "quality") have
   no picture, so they are excluded on purpose.
   ============================================================ */

export const NOUNS = [
  'anchor', 'lantern', 'violin', 'kettle', 'ladder', 'compass', 'harpoon', 'mirror',
  'trumpet', 'saddle', 'candle', 'anvil', 'telescope', 'umbrella', 'crowbar', 'beehive',
  'cactus', 'piano', 'scarecrow', 'lighthouse', 'wheelbarrow', 'typewriter', 'birdcage', 'sundial',
  'chandelier', 'accordion', 'hammock', 'periscope', 'gramophone', 'windmill', 'pitchfork', 'seashell',
  'bootlace', 'cauldron', 'domino', 'flagpole', 'gargoyle', 'harmonica', 'inkwell', 'jawbone',
  'keyhole', 'lobster', 'matchbox', 'nutcracker', 'obelisk', 'padlock', 'quiver', 'rowboat',
  'stagecoach', 'tambourine', 'unicycle', 'vulture', 'walnut', 'xylophone', 'yardstick', 'zeppelin',
  'barrel', 'chisel', 'dagger', 'easel', 'fountain', 'goggles', 'hatchet', 'igloo',
  'jigsaw', 'kayak', 'lantern-fish', 'mousetrap', 'noose', 'octopus', 'pendulum', 'quill',
  'radiator', 'stopwatch', 'thimble', 'urn', 'vase', 'whisk', 'anchorman', 'bellows',
  'cobweb', 'drawbridge', 'eggshell', 'fireplace', 'greenhouse', 'horseshoe', 'iceberg', 'jukebox',
  'kaleidoscope', 'lampshade', 'megaphone', 'nightingale', 'ottoman', 'parachute', 'quarry', 'rooftop',
  'sextant', 'trapdoor', 'ukulele', 'velvet', 'wagon', 'yoke', 'zipper', 'apricot',
  'binoculars', 'coffin', 'dumbbell', 'envelope', 'ferry', 'gondola', 'hourglass', 'ivy',
];

/** Short, high-contrast items for span drills where reading speed matters. */
export const SHORT_NOUNS = [
  'axe', 'bell', 'cage', 'dice', 'eel', 'fan', 'gem', 'hook',
  'ice', 'jar', 'key', 'lamp', 'map', 'net', 'oar', 'pin',
  'rope', 'saw', 'tin', 'urn', 'van', 'wig', 'yarn', 'zinc',
  'bone', 'cork', 'drum', 'fern', 'gate', 'horn', 'kite', 'leaf',
  'mask', 'nail', 'oven', 'pipe', 'rake', 'sock', 'tent', 'wave',
];

/** Loci suggestions offered as scaffolding the first few times. */
export const LOCI_ROUTES = [
  ['your front door', 'the hallway', 'the kitchen sink', 'the fridge', 'the sofa', 'the television', 'the bathroom mirror', 'your bed'],
  ['the bus stop', 'the corner shop', 'the crossing', 'the bakery', 'the bench', 'the postbox', 'the bridge', 'the station gate'],
  ['the car boot', 'the driver\'s seat', 'the dashboard', 'the mirror', 'the glovebox', 'the back seat', 'the bonnet', 'the wheel arch'],
];

/* ------------------------------------------------------------
   Dutch set. The words themselves are the drill material, so a
   Dutch speaker needs Dutch nouns — an English word costs a
   translation step before the image forms, which is exactly the
   effort the method is supposed to remove.
   ------------------------------------------------------------ */

export const NOUNS_NL = [
  'anker', 'lantaarn', 'viool', 'ketel', 'ladder', 'kompas', 'harpoen', 'spiegel',
  'trompet', 'zadel', 'kaars', 'aambeeld', 'telescoop', 'paraplu', 'koevoet', 'bijenkorf',
  'cactus', 'piano', 'vogelverschrikker', 'vuurtoren', 'kruiwagen', 'typemachine', 'vogelkooi', 'zonnewijzer',
  'kroonluchter', 'accordeon', 'hangmat', 'periscoop', 'grammofoon', 'windmolen', 'hooivork', 'schelp',
  'veter', 'heksenketel', 'domino', 'vlaggenmast', 'waterspuwer', 'mondharmonica', 'inktpot', 'kaakbeen',
  'sleutelgat', 'kreeft', 'lucifersdoosje', 'notenkraker', 'obelisk', 'hangslot', 'pijlkoker', 'roeiboot',
  'postkoets', 'tamboerijn', 'eenwieler', 'gier', 'walnoot', 'xylofoon', 'duimstok', 'zeppelin',
  'ton', 'beitel', 'dolk', 'schildersezel', 'fontein', 'skibril', 'bijl', 'iglo',
  'legpuzzel', 'kajak', 'zeeduivel', 'muizenval', 'strop', 'octopus', 'slinger', 'ganzenveer',
  'radiator', 'stopwatch', 'vingerhoed', 'urn', 'vaas', 'garde', 'blaasbalg', 'spinnenweb',
  'ophaalbrug', 'eierschaal', 'haardvuur', 'kas', 'hoefijzer', 'ijsberg', 'jukebox', 'caleidoscoop',
  'lampenkap', 'megafoon', 'nachtegaal', 'poef', 'parachute', 'steengroeve', 'dakpan', 'sextant',
  'valluik', 'ukelele', 'fluweel', 'wagen', 'juk', 'rits', 'abrikoos', 'verrekijker',
  'doodskist', 'halter', 'envelop', 'veerboot', 'gondel', 'zandloper', 'klimop', 'kurkentrekker',
];

export const SHORT_NOUNS_NL = [
  'bijl', 'bel', 'kooi', 'dobbelsteen', 'paling', 'waaier', 'edelsteen', 'haak',
  'ijs', 'pot', 'sleutel', 'lamp', 'kaart', 'net', 'roeispaan', 'speld',
  'touw', 'zaag', 'blik', 'urn', 'busje', 'pruik', 'garen', 'zink',
  'bot', 'kurk', 'trom', 'varen', 'hek', 'hoorn', 'vlieger', 'blad',
  'masker', 'spijker', 'oven', 'pijp', 'hark', 'sok', 'tent', 'golf',
];

export const LOCI_ROUTES_NL = [
  ['je voordeur', 'de gang', 'de keukenkraan', 'de koelkast', 'de bank', 'de televisie', 'de badkamerspiegel', 'je bed'],
  ['de bushalte', 'de buurtwinkel', 'het zebrapad', 'de bakker', 'het bankje', 'de brievenbus', 'de brug', 'het stationshek'],
  ['de kofferbak', 'de bestuurdersstoel', 'het dashboard', 'de spiegel', 'het handschoenenvakje', 'de achterbank', 'de motorkap', 'de wielkast'],
];
