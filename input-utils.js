const inquirer = require('inquirer');
const {
  commands, directions,
} = require('./constants');

const name = 'command';

/**
 * prompts the user via the command line to select an answer to a question
 * 
 * @param {*} {message, choices} - the 'message' (or prompt) you want asked and the choices you want presented
 * @returns the user selected value
 */
const askQuestion = async ({
  message,
  choices,
}) => {
  const result = await inquirer.prompt({
    type: 'list',
    name,
    message,
    choices,
  });
  return result[name];
};


const getCommand = async () => askQuestion(
  {
    message: 'What do you want the robot to do?',
    choices: Object.values(commands),
  },
);

const getPlacement = async (robot) => {
  const x = await askQuestion({
    message: 'What is the X coordinate for robot placement?',
    choices: robot.xCoordinateOptions,
  });
  const y = await askQuestion({
    message: 'What is the Y coordinate for robot placement?',
    choices: robot.yCoordinateOptions,
  });
  const f = await askQuestion({
    message: 'What direction is the robot facing?',
    choices: Object.keys(directions),
  });
  return { x, y, f };
};


module.exports = {
  getCommand,
  getPlacement,
};
