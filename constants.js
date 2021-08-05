const DEFAULT_UNITS = 5

const directions = {
    NORTH: 'north',
    SOUTH: 'south',
    EAST: 'east',
    WEST: 'west',
}

const rotations = {
    LEFT: 'left',
    RIGHT: 'right'
}

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
    }
}

module.exports = {
    DEFAULT_UNITS,
    directions,
    rotations,
    directionsMap,
}
