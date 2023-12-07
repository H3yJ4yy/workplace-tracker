INSERT INTO department (name)
VALUES 
("Administration"),
("Park Operations"),
("City Hall"),
("Department Diva"),
("State Auditor");

INSERT INTO role(id, title, salary, department_id)
VALUES
(1, "State Auditor", 90000, 5),
(2, "Parks and Recreations Director", 80000, 2),
(3, "Deputy Director", 75000, 2),
(4, "Administrator", 60000, 1),
(5, "Receptionsist", 40000, 1 ),
(6, "Guard", 36000, 3 ),
(7, "Administrator", 62000, 4);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Ben", "Wyatt", 5, NULL),
(2, "Ron", "Swanson", 2, 1),
(3, "Leslie", "Knope", 2, 2),
(4, "Tom", "Haverford", 1, 2),
(5, "April", "Ludgate", 1, 2),
(6, "Andy", "Dwyer", 3, 2),
(7, "Dona", "Meagle", 4, 2);