const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

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
    departmentQuestions();
});

const departmentQuestions = () => inquirer.prompt({
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
        case "View departments": viewDepartments(); break;
        case "View roles": viewRoles(); break;
        case "View employees": viewEmployees(); break;
        case "Update employee role": updateEmpRole(); break;
        default: quit(); 
    }
})
