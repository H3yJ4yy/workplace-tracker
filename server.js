const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Configuration
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'council_db'
  },
  console.log(`Connected to the movies_db database.`)
);

db.connect(err =>{
    if (err){
        console.log('Error connecting to MySQL database:', err);
    } else {
      console.log('Connected to MySQL database!');
    }
    councilQuestions();
});

const councilQuestions = () => inquirer.prompt({
    type: "list",
  choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee role", "Quit"],
  message: "What would you like to do?",
  name: "option"
}).then(result => {
    console.log("You've selected: " + result.option);

    switch (result.option){
        case "Add department": addDepartment(); break;
        case "Add role": addRole(); break;
        case "Add employee": addEmployee(); break;
        case "Update employee role": updateEmpRole(); break;
        case "View departments": viewDepartments(); break;
        case "View roles": viewRoles(); break;
        case "View employees": viewEmployees(); break;
        default: quit(); 
    }
});

const addDepartment = () => inquirer.prompt([
    {
    type: "input",
    message: "What is the name of the new department?",
    name: "depName"
    }
]).then(answer =>{
    db.promise().execute("INSERT INTO department (name) VALUES (?)", [answer.depName])
        .then(([rows, fields]) =>{
            console.table(rows);
            councilQuestions();
        })
        .catch(err => {
            console.error(err);
            councilQuestions();
        })
});

const addRole = () => inquirer.prompt([
    {
        type: "input",
        message: "What is the title of the new role?",
        name: "titleRole"
    },
    {
        type: "input",
        message: "What is the salary of the new role",
        name: "newSalary"
    },
    {
        type: "input",
        message: "What is the new department id?",
        name: "depID"
    },
]).then(answer =>{
    db.promise().execute("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.titleRole, answer.newSalary, answer.depID])
    .then(([rows, fields]) =>{
        console.table(rows);
        councilQuestions();
    })
    .catch(err => {
        console.error(err);
        councilQuestions();
    })
})

const addEmployee = () => inquirer.prompt([
    {
        type: "input",
        message: "What is the new employees first name?",
        name: "firstName"
    },
    {
        type: "input",
        message: "What is the new employees last name?",
        name: "lastName"
    },
    {
        type: "input",
        message: "What is the new employees role id?",
        name: "roleID"
    },
    {
        type: "input",
        message: "What is the new employees manages id?",
        name: "managerID"
    }
]).then(answer =>{
    db.promise().execute("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID])
    .then(([rows, fields]) =>{
        console.table(rows);
        councilQuestions();
    })
    .catch(err => {
        console.error(err);
        councilQuestions();
    })
});

const updateEmpRole = () => inquirer.prompt([
    {
        type: "input",
        message: "What employee would you like to update?",
        name: "updateEmp"
    },
    {
        type: "input",
        message: "What is the emplyees new role?",
        name: "newRole"
    }
]).then(answer => {
    console.log("Updating employee: ", answer.updateEmp, "to role: ", answer.newRole)

    db.promise().execute("UPDATE employee SET role_id=? WHERE first_name = ?", [answer.updateEmp, answer.newRole]) 
    .then(([rows, fields]) =>{
        console.table(rows);
        councilQuestions();
    })
    .catch(err => {
        console.error(err);
        councilQuestions();
    })
});

const viewDepartments = () => db.promise().execute("SELECT * FROM department")
    .then(([rows, fields]) =>{
        console.table(rows);
        councilQuestions();
    })
    .catch(err => {
        console.error(err);
        councilQuestions();
    });


const viewEmployees = () => db.promise().execute("SELECT * FROM employee")
.then(([rows, fields]) =>{
    console.table(rows);
    councilQuestions();
})
.catch(err => {
    console.error(err);
    councilQuestions();
});


const viewRoles = () => db.promise().execute("SELECT * FROM role")
    .then(([rows, fields]) =>{
        console.table(rows);
        councilQuestions();
    })
    .catch(err => {
        console.error(err);
        councilQuestions();
    });

const quit = () => {
    db.end();
    process.exit();
}