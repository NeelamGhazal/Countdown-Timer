#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer"
import chalk from "chalk";

console.log(chalk.cyanBright.bold("\t➖➖➖➖➖➖➖➖➖➖➖"));
console.log(chalk.magentaBright.bold("\t    Countdown Timer "));
console.log(chalk.cyanBright.bold("\t➖➖➖➖➖➖➖➖➖➖➖"));

const res = await inquirer.prompt({
    type: "input",
    name: "userInput",
    message: "Please enter the amount of seconds",
    validate: (input)=>{
        if (isNaN(input)){
            return "please enter valid number"
        } else if (input > 60) {
            return "seconds must be in 60";
        } else {
            return true;
        }
    },
});

const input = +res.userInput;

function formatTime(seconds : number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTime(val : number) {
    const endTime = new Date(Date.now() + val * 1000);

    function updateTimer() {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(endTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.red.bold("Timer Has Expired"));
            process.exit();
        }
        console.log(chalk.cyanBright(formatTime(timeDiff)));
        const nextSecond = 1000 - (currentTime.getTime() % 1000);
        setTimeout(updateTimer, nextSecond); 
    }
    

    updateTimer(); 
}

startTime(input);