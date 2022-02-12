const {
  directions, MAX_X, MAX_Y,
} = require('./constants');
const Robot = require('./robot');

// just to prevent logging to console when .report is called within tests
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('ROBOT', () => {
  describe('examples from PROBLEM.md', () => {
    it('should satisfy example a', () => {
      const robot = new Robot();
      robot.place({ x: 0, y: 0, f: directions.NORTH });
      robot.move();
      expect(robot.report()).toStrictEqual({ x: 0, y: 1, f: directions.NORTH });
    });

    it('should satisfy example b', () => {
      const robot = new Robot();
      robot.place({ x: 0, y: 0, f: directions.NORTH });
      robot.left();
      expect(robot.report()).toStrictEqual({ x: 0, y: 0, f: directions.WEST });
    });

    it('should satisfy example c', () => {
      const robot = new Robot();
      robot.place({ x: 1, y: 2, f: directions.EAST });
      robot.move();
      robot.move();
      robot.left();
      robot.move();
      expect(robot.report()).toStrictEqual({ x: 3, y: 3, f: directions.NORTH });
    });
  });

  describe('multiple placements', () => {
    it('should execute place command when place called multiple times', () => {
      const robot = new Robot();
      robot.place({ x: 0, y: 0, f: directions.NORTH });
      robot.move();
      const newPlacement = { x: 4, y: 1, f: directions.EAST };
      robot.place(newPlacement);
      expect(robot.report()).toStrictEqual(newPlacement);
    });

    it('should execute move when robot already placed multiple times', () => {
      const robot = new Robot();
      robot.place({ x: 0, y: 0, f: directions.NORTH });
      robot.move();
      const newPlacement = { x: 3, y: 1, f: directions.EAST };
      robot.place(newPlacement);
      robot.move();
      expect(robot.report()).toStrictEqual({ x: 4, y: 1, f: directions.EAST });
    });
  });

  describe('ignore cases', () => {
    it('should ignore move and report when robot is not yet placed', () => {
      const robot = new Robot();
      robot.move();
      expect(robot.report()).toBeUndefined();
    });

    it('should ignore move when move takes robot off the board', () => {
      const robot = new Robot();
      const originalPlacement = { x: MAX_X, y: MAX_Y, f: directions.NORTH };
      robot.place(originalPlacement);
      robot.move();
      expect(robot.report()).toStrictEqual(originalPlacement);
    });

    it('should ignore placement when x-placement is off the board', () => {
      const robot = new Robot();
      robot.place({ x: MAX_X + 1, y: MAX_Y, f: directions.NORTH });
      expect(robot.report()).toBeUndefined();
    });

    it('should ignore placement when y-placement is off the board', () => {
      const robot = new Robot();
      robot.place({ x: MAX_X, y: MAX_Y + 1, f: directions.NORTH });
      expect(robot.report()).toBeUndefined();
    });

    it('should ignore placement when placement has invalid x coordinate', () => {
      const robot = new Robot();
      robot.place({ x: '1', y: MAX_Y, f: directions.NORTH });
      expect(robot.report()).toBeUndefined();
    });

    it('should ignore placement when placement has invalid y coordinate', () => {
      const robot = new Robot();
      robot.place({ x: MAX_X, y: '1', f: directions.NORTH });
      expect(robot.report()).toBeUndefined();
    });

    it('should ignore placement when placement has invalid face direction', () => {
      const robot = new Robot();
      robot.place({ x: MAX_X, y: MAX_Y, f: 'right' });
      expect(robot.report()).toBeUndefined();
    });
  });
});
