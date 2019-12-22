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

// connection.query('SELECT * FROM department', function (error, results) {
//     if (error) throw error
//     console.table(results)
// })

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
            allEmployeesQuery();
            connection.end()
            break;
        case "view all employees by department":
            PromptAllEmployeesbyDepartment().then(function (value) {
                allEmployeesbyDeptQuery(value)
                connection.end()
            })
            break;
        case "view all employees by role":
            PromptAllEmployeesbyRole().then(function (value) {
                allEmployeesbyRoleQuery(value)
                connection.end()
            })
            break;
        case "add employee":
            PromptAddEmployee().then(function (value) {
                console.log(value)
                findRoleId(value)
                //.then(function(value) {
                    //console.log(value)
                    //insertRole(value)
                //})
                connection.end()
            })
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

    connection.query('SELECT first_employee.first_name, first_employee.last_name, second_employee.first_name as manager_first_name, second_employee.last_name as manager_last_name' +
        ' FROM employee as first_employee' +
        ' LEFT JOIN employee as second_employee' +
        ' on first_employee.manager_id = second_employee.id' +
        ' WHERE first_employee.manager_id = second_employee.id OR first_employee.manager_id IS null;',

        function (error, results) {
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

function PromptAllEmployeesbyRole() {
    return inquirer.prompt([
        {
            type: "list",
            name: "allroles",
            choices: ["Attorney", "Paralegal", "Legal Manager", "Accountant", "Financial Analyst", "Finance Manager", "Sales Rep", "Service Rep", "Sales Manager", "Developer", "Support Agent", "IT Manager"]
        }
    ])
}

function PromptAddEmployee() {
    return inquirer.prompt([
        {
            type: "value",
            name: "firstname",
            message: "first name?"
        },
        {
            type: "value",
            name: "lastname",
            message: "last name?"
        },
        {
            type: "list",
            name: "role",
            message: "role?",
            choices: ["Attorney", "Paralegal", "Legal Manager", "Accountant", "Financial Analyst", "Finance Manager", "Sales Rep", "Service Rep", "Sales Manager", "Developer", "Support Agent", "IT Manager"]
        }
    ])
}

function allEmployeesbyDeptQuery(value) {
    connection.query(`SELECT employee.first_name, employee.last_name, department.name` +
        ` FROM employee INNER JOIN role on employee.role_id = role.id` +
        ` INNER JOIN department on department.id = role.department_id` +
        ` WHERE department.name = '${value.alldepartments}';`,

        function (error, results) {
            if (error) throw error
            console.table(results)
        })
}

function allEmployeesbyRoleQuery(value) {
    connection.query(`SELECT employee.first_name, employee.last_name, role.title`
        ` FROM employee RIGHT JOIN role on employee.role_id = role.id`
        ` WHERE role.title = '${value.allroles}';`,

        function (error, results) {
            if (error) throw error
            console.table(results)
        })
}

function findRoleId(value) {
    var query = "SELECT employee.role_id ";
    query += "FROM employee ";
    query += "LEFT JOIN role ";
        query += "on employee.role_id = role.id ";
    query += "WHERE role.title = ? ";
    connection.query(query, [value.role], function (err, res){
        console.log(res)
    })
}

function insertRole(value) {
    console.log(value)
}



