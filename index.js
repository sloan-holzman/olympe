const inquirer = require('inquirer');
const Robot = require('./robot')
// const prompt = require('prompt-sync')({sigint: true});
// TODO: use inquirer (https://github.com/SBoudrias/Inquirer.js#installation) AND uninstall 'prompt-sync'
// basically, create a multiple choice: move, left, right, report, place
// if place, ask for x, y, and then give multiple choice for face (n, s, e, w)
// then, just lowercase the responses


const promptAndExecute = (robot) => {
    // execute against robot
    promptAndExecute(robot)
}

const playGame = () => {
    const robot = new Robot({xUnits: 5, yUnits: 5})
    promptAndExecute(robot)
}

module.exports = playGame

if (require.main === module) {
    playGame();
}
