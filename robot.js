const {
  directions, rotations, directionsMap, MAX_X, MAX_Y,
} = require('./constants');

// +1 because maxUnit is zero indexed
const getCoordinateOptions = maxUnit => [...Array(maxUnit + 1)].map((_x, i) => i);

class Robot {
  constructor({ maxX, maxY } = {}) {
    this.maxX = maxX || MAX_X;
    this.maxY = maxY || MAX_Y;
    this.isAlreadyPlaced = false;
    this.x = 0;
    this.y = 0;
    this.f = directions.NORTH;
  }

  place({ x, y, f }) {
    if (this.isValidPlacement({ x, y, f })) {
      this.isAlreadyPlaced = true;
      this.x = x;
      this.y = y;
      this.f = f;
    }
  }

  move() {
    if (this.isAlreadyPlaced && this.moves[this.f].isOnBoard()) {
      this.moves[this.f].execute();
    }
  }

  left() {
    this.rotate(rotations.LEFT);
  }

  right() {
    this.rotate(rotations.RIGHT);
  }

  report() {
    if (!this.isAlreadyPlaced) {
      return;
    }

    const position = `${this.x},${this.y},${this.f}`;
    // to view in command line
    // eslint-disable-next-line no-console
    console.log(`${this.tableDrawing}\n${position}\n`);
    const { x, y, f } = this;
    // return for testing purposes
    return { x, y, f };
  }

  isValidPlacement({ x, y, f }) {
    const isValidXCoordinate = Number.isInteger(x) && x >= 0 && x <= this.maxX;
    const isValidYCoordinate = Number.isInteger(y) && y >= 0 && y <= this.maxY;
    const isValidDirection = Object.values(directions).includes(f);
    return isValidXCoordinate && isValidYCoordinate && isValidDirection;
  }

  get moves() {
    return {
      [directions.NORTH]: {
        isOnBoard: () => (this.y + 1) <= this.maxY,
        execute: () => {
          this.y = this.y + 1;
        },
      },
      [directions.SOUTH]: {
        isOnBoard: () => (this.y - 1) >= 0,
        execute: () => {
          this.y = this.y - 1;
        },
      },
      [directions.EAST]: {
        isOnBoard: () => (this.x + 1) <= this.maxX,
        execute: () => { this.x = this.x + 1; },
      },
      [directions.WEST]: {
        isOnBoard: () => (this.x - 1) >= 0,
        execute: () => { this.x = this.x - 1; },
      },
    };
  }

  rotate(rotation) {
    if (this.isAlreadyPlaced) {
      this.f = directionsMap[this.f][rotation];
    }
  }

  get xCoordinateOptions() {
    return getCoordinateOptions(this.maxX);
  }

  get yCoordinateOptions() {
    return getCoordinateOptions(this.maxY);
  }

  /**
   * produces a drawing of the robots current position
   * e.g. the following represents 4,2,S
   * _ _ _ _ _
   * _ _ _ _ _
   * _ _ _ _ S
   * _ _ _ _ _
   * _ _ _ _ _
   *
   */
  get tableDrawing() {
    const {
      x, y, f, isAlreadyPlaced, yCoordinateOptions, xCoordinateOptions,
    } = this;
    if (!isAlreadyPlaced) {
      return;
    }
    return yCoordinateOptions.reverse().reduce((drawing, yCoordinate) => {
      const row = xCoordinateOptions.reduce((r, xCoordinate) => {
        const isRobotCoordinates = x === xCoordinate && y === yCoordinate;
        return r + (isRobotCoordinates ? f.charAt(0) : '_');
      }, '');
      return `${drawing + row}\n`;
    }, '');
  }
}

module.exports = Robot;
