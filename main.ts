#! /usr/bin/env node

import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns"
import chalk from "chalk";

console.log(chalk.blue("\n\tWelcome To Ahzam - Countdown Timer\n"));


const res = await inquirer.prompt([
    {
        name: "userinput",
        type: "number",
        message: "Please enter the amount of second",
        validate: (input) =>{
            if(isNaN(input)){
                return "please Enter a valid number";
            }else if (input > 60){
                return "seconds must be 60";
            }else{
                return true;
            }
        }
    }
]);

let input = res.userinput + 1;


function starttime(val:number){
    const inttime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervaltime = new Date(inttime)
    setInterval((() => {
        const currtime = new Date();
        const timediff = differenceInSeconds(intervaltime, currtime);

        if(timediff <= 0){
            console.log(chalk.red("Timer has expired"));
            process.exit()
        }
        const min = Math.floor((timediff%(3600 * 4)/3600));
        const sec = Math.floor((timediff%60));
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);

    }), 1000)   
}

starttime(input);