const { getCommand, getPlacement } = require('./input-utils');

const {
  commands,
} = require('./constants');

const Robot = require('./robot');

/**
 * running this game will create a new robot and board
 * and allow the user to move the robot around the board via the command line
 *
 */
const play = async (robot = new Robot()) => {
  const command = await getCommand();
  if (command === commands.PLACE) {
    const placement = await getPlacement(robot);
    robot.place(placement);
  } else {
    robot[command]();
  }
  play(robot);
};

module.exports = play;

if (require.main === module) {
  play();
}
