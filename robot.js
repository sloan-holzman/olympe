const {directions, rotations, DEFAULT_UNITS, directionsMap} = require('./constants')

// TODO: use yup schema validation and add tests around it

// The origin (0,0) can be considered to be the SOUTH WEST most corner
class Robot {
    constructor({xUnits, yUnits, place}) {
        this.xUnits = xUnits || DEFAULT_UNITS
        this.yUnits = yUnits || DEFAULT_UNITS
        this.placeSet = !!place
        this.x = (place && place.x) || 0
        this.y = (place && place.y) || 0
        this.f = (place && place.f) || directions.NORTH
    }

    // PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
    place({x, y, f}) {
        this.validatePlace({x, y, f})
        this.placeSet = true
        this.x = x
        this.y = y
        this.f = f
    }

    validatePlace({x, y, f}) {
        if (x < 0 || x > this.xUnits) {
            // TODO: throw error
        }
        if (y < 0 || y > this.yUnits) {
            // TODO: throw error
        }
        if (!Object.values(directions).includes(f)) {
            // TODO: throw error
        }
    }

    move() {
        if (this.placeSet && this.moves[this.f].isValid()) {
            this.moves[this.f].action()
        }
    }

    get moves() {
        return {
            [directions.NORTH]: {
                isValid: () => (this.y + 1) <= this.yUnits,
                action: () => this.y = this.y + 1
            },
            [directions.SOUTH]: {
                isValid: () => (this.y - 1) >= 0,
                action: () => this.y = this.y - 1
            },
            [directions.EAST]: {
                isValid: () => (this.x + 1) <= this.xUnits,
                action: () => this.x = this.x + 1
            },
            [directions.WEST]: {
                isValid: () => (this.x - 1) >= 0,
                action: () => this.x = this.x - 1
            }
        }
    }

    rotate(rotation) {
        if (this.placeSet) {
            this.f = directionsMap[this.f][rotation]
        }
    }

    left() {
        this.rotate(rotations.LEFT)
    }

    right() {
        this.rotate(rotations.RIGHT)

    }

    report() {
        // TODO: should return value, not log it...the index.js file can log
        // also, for bonus, should actually draw out the table...
        /*
            xxxxx
            xxxxx
            xxxxN
            xxxxx
            xxxxx
         */
        console.log(`x: ${this.x} / y: ${this.y} / f: ${this.f}`)
    }
}

module.exports = Robot
