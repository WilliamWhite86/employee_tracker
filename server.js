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
            PromptAllEmployeesbyDepartment()
            break;
        case "view all employees by role":
            PromptAllEmployeesbyRole().then(function (value) {
                allEmployeesbyRoleQuery(value)
                connection.end()
            })
            break;
        case "add employee":
            PromptAddEmployee().then(function (value) {
                insertEmployee(value)
                connection.end()
            })
            break;
        case "remove employee":
            PromptRemoveEmployee()
            
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

    connection.query ('SELECT department.name FROM department;',

        function (error, results) {
            if (error) throw error
            let deptArray = []
            results.forEach((element) => {
                deptArray.push(element.name)

            });                
            return inquirer.prompt([
                {
                    type: "list",
                    name: "alldepartments",
                    message: "which dept?",
                    choices:deptArray
                },
            ]).then(function (value) {
            allEmployeesbyDeptQuery(value)
        })
        })
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
            choices: roleArray
        }
    ])
}

function PromptRemoveEmployee() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee',

        function (error, results) {
            if (error) throw error
            let employeeArray = []
            //console.log(results)
            results.forEach((element) => {
                let name = element.id + ' ' + element.first_name + ' ' + element.last_name
                //console.log(element);
                employeeArray.push(name)
                //console.log(employeeArray)

            });                
            return inquirer.prompt([
                {
                    type: "list",
                    name: "deletewhichemployee",
                    message: "which employee?",
                    choices:employeeArray
                }
            ]).then(function (value) {
                getEmployeeid(value, deleteEmployee)
            })

        })

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

function insertEmployee(value) {
    var query = "INSERT INTO employee (first_name, last_name, role_id) VALUES ";
    query += "(?, ?, (SELECT id from role WHERE title = ?))";

    connection.query(query, [value.firstname, value.lastname, value.role], function (err, res) {
        console.log(res)
    })
}

function getEmployeeid(value, callback) {
    let employeename = value.deletewhichemployee
    let employeeidString = employeename.substr(0,employeename.indexOf(' '))
    let employeeid = parseInt(employeeidString)
    callback(employeeid)
    //return employeeid
}

function deleteEmployee(employeeid){
    console.log(typeof employeeid)    
    var query = "DELETE FROM employee WHERE employee.id = ?";

    connection.query(query, [employeeid], function (error, results) {
        if (error) throw error
         console.log(results)
         connection.end()
    })

}





