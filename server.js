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
            choices: ["view all employees", "view all employees by department", "view all employees by role", "add employee", "add department", "add role", "remove employee", "remove department", "remove role", "update employee role", "view all roles", "view all departments"]
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
            PromptAllEmployeesbyRole()
            break;
        case "add employee":
            PromptAddEmployee().then(function (value) {
                insertEmployee(value)
                connection.end()
            })
        case "add department":
            console.log("add department")
            PromptAddDepartment().then(function (value) {
                insertDepartment(value)
                connection.end()
            })
            break;
        case "add role":
            console.log("add role")
        case "remove employee":
            PromptRemoveEmployee()
            break;
        case "remove department":
            console.log("remove department")
        case "remove role":
            console.log("remove role")
        case "update employee role":
            PromptUpdateEmployeeRole()
            break;
        case "view all roles":
            console.log("query to view all roles")
            break;
        case "view all departments":
            console.log("query to view all departments")
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

    connection.query('SELECT department.name FROM department;',

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
                    choices: deptArray
                },
            ]).then(function (value) {
                allEmployeesbyDeptQuery(value)
            })
        })
}

function PromptAllEmployeesbyRole() {

    connection.query('SELECT role.title FROM role;',

        function (error, results) {
            if (error) throw error
            let roleArray = []
            results.forEach((element) => {
                roleArray.push(element.title)

            });
            return inquirer.prompt([
                {
                    type: "list",
                    name: "allroles",
                    choices: roleArray
                },
            ]).then(function (value) {
                allEmployeesbyRoleQuery(value)
            })
        })
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

function PromptAddDepartment() {
    return inquirer.prompt([
        {
            type: "value",
            name: "name",
            message: "dept name?"
        }])

    // var query = "INSERT INTO department (name) ";
    // query +="SET role_id = ? ";

}

//function PromptAddRole()

function PromptRemoveEmployee() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee',

        function (error, results) {
            if (error) throw error
            let employeeArray = []
            results.forEach((element) => {
                let name = element.id + ' ' + element.first_name + ' ' + element.last_name
                employeeArray.push(name)
            });
            return inquirer.prompt([
                {
                    type: "list",
                    name: "whichemployee",
                    message: "which employee?",
                    choices: employeeArray
                }
            ]).then(function (value) {
                getEmployeeid(value, deleteEmployee)
            })

        })

}

function PromptUpdateEmployeeRole() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee',

        function (error, results) {
            if (error) throw error
            let employeeArray = []
            results.forEach((element) => {
                let name = element.id + ' ' + element.first_name + ' ' + element.last_name
                employeeArray.push(name)
            });
            return inquirer.prompt([
                {
                    type: "list",
                    name: "whichemployee",
                    message: "which employee?",
                    choices: employeeArray
                }
            ]).then(function (value) {
                getEmployeeid(value, getRoleName)
            })

        })
}

//function allDepartmentsQuery()

//function allRolesQuery()

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
    connection.query(`SELECT employee.first_name, employee.last_name, role.title` +
        ` FROM employee RIGHT JOIN role on employee.role_id = role.id` +
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

function insertDepartment(value) {
    var query = "INSERT INTO department (name) VALUES (?)";
    console.log(value.name)

    connection.query(query, [value.name], function (err, res) {
        if (err) throw err
        console.log(res)
    })
}

//function insertRole()

function getEmployeeid(value, callback) {
    let employeename = value.whichemployee
    let employeeidString = employeename.substr(0, employeename.indexOf(' '))
    let employeeid = parseInt(employeeidString)
    callback(employeeid)
}

function deleteEmployee(employeeid) {
    var query = "DELETE FROM employee WHERE employee.id = ?";

    connection.query(query, [employeeid], function (error, results) {
        if (error) throw error
        console.log(results)
        connection.end()
    })

}

function getRoleName(employeeid) {
    connection.query('SELECT role.id, role.title FROM role',

        function (error, results) {
            if (error) throw error
            let roleArray = []
            results.forEach((element) => {
                let title = element.id + ' ' + element.title
                roleArray.push(title)
            });
            return inquirer.prompt([
                {
                    type: "list",
                    name: "whichrole",
                    message: "which role?",
                    choices: roleArray
                }
            ]).then(function (value) {
                getRoleId(value, employeeid, updateRole)
            })

        })
}

function getRoleId(value, employeeid, callback) {
    let rolename = value.whichrole
    let roleidString = rolename.substr(0, rolename.indexOf(' '))
    let roleid = parseInt(roleidString)
    callback(employeeid, roleid)
}

function updateRole(employeeid, roleid) {
    console.log(employeeid)
    console.log(roleid)
    var query = "UPDATE employee ";
    query += "SET role_id = ? ";
    query += "WHERE employee.id = ?;";

    connection.query(query, [roleid, employeeid], function (err, res) {
        console.log(res)
        connection.end()
    })
}




