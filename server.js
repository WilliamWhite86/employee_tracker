const inquirer = require("inquirer")
const mysql = require("mysql")


function firstPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            name: "toDo",
            message: "What what you like to do?",
            choices: ["view all employees by department", "view all employees by role", "add employee", "remove employee", "update employee role", "view all roles"]
        }
    ])
}

firstPrompt().then(function (value) {
    switch (value.toDo) {
        case "view all employees by department":
            console.log("query to view all employees by dept")
            break;
        case "view all employees by role":
            console.log("query to view all employees by role")
            break;
        case "add employee":
            console.log("questions to add employee")
            break;
        case "remove employee":
            console.log("questions to remove employee")
            break;
        case "update employee role":
            console.log("questions to update employee role")
            break;
        case "view all roles":
            console.log("query to view all roles")
    }

})

