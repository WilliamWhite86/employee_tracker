DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_DepartmentRole FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_RoleEmployee FOREIGN KEY (role_id)
    REFERENCES role(id),
    CONSTRAINT FK_ManagerEmployee FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);

INSERT INTO department (name)
VALUES ("LEGAL"),("FINANCE"),("SALES"),("IT");

SELECT * FROM department;
INSERT INTO role (title, salary, department_id)
VALUES ("ATTORNEY", 150000, 1),("ACCOUNTANT","80000",2),("SALES REP",125000,3),("DEVELOPER", 100000,4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("BILL", "WILSON",1),("BIGGIE", "SMALLS",2),("MOBB", "DEEP",3),("PUFF", "DADDY",4);


SELECT employee.first_name, employee.last_name, department.name
FROM employee
INNER JOIN role
	on employee.role_id = role.id
INNER JOIN department
	on department.id = role.department_id
WHERE department.name = "Legal";



    