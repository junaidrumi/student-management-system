#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let randomNumber = Math.floor(10000 + Math.random() * 90000);
console.log(chalk.blueBright("*****\nWelcome To Student Management System\n*****"));
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: "Enter your name: ",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter non-empty value.";
        },
    },
    {
        name: "courses",
        type: "list",
        message: "Select the course to enrolled.",
        choices: ["HTML", "CSS", "Javascript", "Typescript", "Python"]
    }
]);
let tuitionFee = {
    "HTML": 2000,
    "CSS": 2500,
    "Javascript": 5000,
    "Typescript": 6000,
    "Python": 8000
};
console.log(chalk.cyanBright(`\ntuitionfees: ${tuitionFee[answer.courses]}\n`));
console.log(chalk.gray(`\nBalance: ${myBalance}\n`));
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select the payment method: ",
        choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
    },
    {
        name: "amount",
        type: "number",
        message: "transfer payment",
        validate: function (value) {
            if (value !== "") {
                return true;
            }
            return "Please enter non-empty value.";
        }
    }
]);
console.log(chalk.yellowBright(`\nYou select the payment method ${paymentType.payment}.\n`));
let tuitionFees = tuitionFee[answer.courses];
let paymentAmount = parseFloat(paymentType.amount);
if (tuitionFees === paymentAmount) {
    console.log(chalk.greenBright(chalk.redBright(`\nCongratulations! you are succesesfully enrolled in ${answer.courses}.\n`)));
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to next?",
            choices: ["View Status", "Exit"]
        }
    ]);
    if (ans.select === "View Status") {
        console.log(chalk.italic.bold.bgBlue(`\n*********Student Status**********\n`));
        console.log(chalk.gray(`Student Name: ${answer.student}`));
        console.log(chalk.green(`Student ID: ${randomNumber}`));
        console.log(chalk.yellow(`Course: ${answer.courses}`));
        console.log(chalk.blue(`Tuition Fee Paid: ${paymentAmount}`));
        console.log(chalk.cyan(`Balance: ${myBalance += paymentAmount}`));
    }
    else {
        console.log(chalk.bgGreenBright(`\nExiting Student Management System`));
    }
}
else {
    console.log(chalk.bgRedBright("\nInvalid amount due to course.\n"));
}
