const directions = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST',
};

const rotations = {
  LEFT: 'left',
  RIGHT: 'right',
};

// thought about doing a circular-linked list, but that seemed like overkill
const directionsMap = {
  [directions.NORTH]: {
    [rotations.LEFT]: directions.WEST,
    [rotations.RIGHT]: directions.EAST,
  },
  [directions.SOUTH]: {
    [rotations.LEFT]: directions.EAST,
    [rotations.RIGHT]: directions.WEST,
  },
  [directions.EAST]: {
    [rotations.LEFT]: directions.NORTH,
    [rotations.RIGHT]: directions.SOUTH,
  },
  [directions.WEST]: {
    [rotations.LEFT]: directions.SOUTH,
    [rotations.RIGHT]: directions.NORTH,
  },
};

const commands = {
  MOVE: 'move',
  ...rotations,
  REPORT: 'report',
  PLACE: 'place',
};

// number of units wide
const DEFAULT_WIDTH = 5;
// number of units tall
const DEFAULT_HEIGHT = 5;

// we zero index, so this is the value of the max X
const MAX_X = DEFAULT_WIDTH - 1;
// we zero index, so this is the value of the max Y
const MAX_Y = DEFAULT_HEIGHT - 1;

module.exports = {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  commands,
  directions,
  rotations,
  directionsMap,
  MAX_X,
  MAX_Y,
};
