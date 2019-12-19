const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mercury@02',
    database: 'employees_db'
})

connection.connect();

connection.query('SELECT * FROM department', function (error, results) {
    if (error) throw error
    console.table(results)
})

function firstPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            name: "toDo",
            message: "What what you like to do?",
            choices: ["view all employees", "view all employees by department", "view all employees by role", "add employee", "remove employee", "update employee role", "view all roles"]
        }
    ])
}

firstPrompt().then(function (value) {
    switch (value.toDo) {
        case "view all employees":
            allEmployeesQuery()
            connection.end()
            break;
        case "view all employees by department":
            PromptAllEmployeesbyDepartment().then(function (value) {
                allEmployeesbyDeptQuery(value)
                connection.end()
            })
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

function allEmployeesQuery() {
    connection.query('SELECT * FROM employee', function (error, results) {
        if (error) throw error
        console.table(results)
    })
}

function PromptAllEmployeesbyDepartment() {
    return inquirer.prompt([
        {
            type: "list",
            name: "alldepartments",
            choices: ["Legal", "Sales", "Finance", "IT"]
        }
    ])
}

function allEmployeesbyDeptQuery(value) {
    connection.query(`SELECT employee.first_name, employee.last_name, department.name FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department on department.id = role.department_id WHERE department.name = '${value.alldepartments}';`, function (error, results) {
        if (error) throw error
        console.table(results)
    })
}



