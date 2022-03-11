#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import {createSpinner} from 'nanospinner';

let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow("Who wants to be a millionaire! Do you?");
    await sleep();
    rainbowTitle.stop();
    console.log();
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

async function askQuestion1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Who made this quiz?',
        choices: [
            'Bryan Ollendyke',
            'Liz Blake',
            'Taylor Bracone',
            'Andrew Maier'
        ],
    });

    return handleAnswer(answers.question_1 == 'Andrew Maier');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking Answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Correct! Nice work ${playerName}!` });
        winner();
    } else {
        spinner.error({ text: `Sorry, that's not correct.` });
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congrats ${playerName}!\n$ 1 , 0 0 0 , 0 0 0`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

await welcome();
await askName();
await askQuestion1();
