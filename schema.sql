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
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_RoleEmployee FOREIGN KEY (role_id)
		REFERENCES role(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    CONSTRAINT FK_ManagerEmployee FOREIGN KEY (manager_id)
		REFERENCES employee(id)
);