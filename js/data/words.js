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
