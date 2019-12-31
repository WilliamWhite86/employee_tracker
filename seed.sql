INSERT INTO department (name)
VALUES ("LEGAL"),("FINANCE"),("SALES"),("IT");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES ("ATTORNEY", 150000, 1),("PARALEGAL",70000,1),("LEGAL MANAGER",100000,1),("ACCOUNTANT",80000,2),("FINANCIAL ANALYST",60000,2),("FINANCE MANAGER",100000,2),("SALES REP",125000,3),("SERVICE REP",50000,3),("SALES MANAGER",100000,3),("DEVELOPER", 100000,4),("SUPPORT AGENT",65000,4),("IT MANAGER",100000,4);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("BILL", "WILSON",1),("BIGGIE", "SMALLS",2),("MOBB", "DEEP",3),("PUFF", "DADDY",4),("IMAGINE", "DRAGONS",5),("NICKLEBACK","CREED",6),("JOHANN","BACH",7),("LUDWIG","BEETOVEN",8),("GARY","JOHNSON", 9),("MIT","ROMNEY", 10),("HILLARY","CLINTON",11);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("DARTH","VADER",1,3);

SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
FROM employee
LEFT JOIN role
	on employee.role_id = role.id
LEFT JOIN department
	on department.id = role.department_id
WHERE department.name = "Legal";

SELECT employee.first_name, employee.last_name, role.title
FROM employee
LEFT JOIN role
	on employee.role_id = role.id
WHERE role.title = "Attorney";

SELECT *
FROM employee
LEFT JOIN role
	on employee.role_id = role.id
LEFT JOIN employee as second_employee
	on employee.manager_id = second_employee.id
WHERE employee.manager_id = second_employee.id OR employee.manager_id IS null;

SELECT first_employee.*, second_employee.*
FROM employee as first_employee
LEFT JOIN employee as second_employee
	on first_employee.manager_id = second_employee.id
WHERE first_employee.manager_id = second_employee.id OR first_employee.manager_id IS null;

SELECT * FROM employee as first_employee LEFT JOIN employee as second_employee on first_employee.manager_id = second_employee.id WHERE first_employee.manager_id = second_employee.id OR first_employee.manager_id IS null;

SELECT first_employee.first_name, first_employee.last_name, second_employee.first_name as manager_first_name, second_employee.last_name as manager_last_name 
FROM employee as first_employee 
LEFT JOIN employee as second_employee 
	on first_employee.manager_id = second_employee.id 
WHERE first_employee.manager_id = second_employee.id OR first_employee.manager_id IS null;

select * from employee;

SELECT role.title 
FROM role
WHERE department_id = 1;

SELECT employee.role_id
FROM employee
LEFT JOIN role
	on employee.role_id = role.id
WHERE role.title = "Attorney";

INSERT INTO employee (first_name, last_name, role_id) VALUES
("SMEY", "WHITE", (SELECT id from role WHERE title = "Attorney"));

SELECT * FROM employee;

SELECT department.name FROM department;

INSERT INTO department (name)
VALUES ("Human Resource");

SELECT * FROM employee;

DELETE FROM department WHERE name = "Legal";

SELECT employee.first_name, employee.last_name, role.title
		FROM employee RIGHT JOIN role on employee.role_id = role.id
        WHERE role.title = "Attorney";
        
UPDATE employee
SET role_id = 2
WHERE employee.id = 1;

INSERT INTO role (title,salary,department_id) VALUES
("Secretary", 50000,(SELECT id from department WHERE name = "Legal"));

SELECT * From role
