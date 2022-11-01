const inquirer = require('inquirer');
require('console.table');
const mysql= require ('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
   password:'',
    database: 'ownerData_db'
  },
  console.log(`Connected to the ownerdata_db database.`)
);

loadMainChoices();

function loadMainChoices(){
    inquirer.prompt([
    /* Pass your questions in here */
    {
        type: "list",
        name: "choice",
        message: "Please Select an Option",
        choices: ["add employee", "add department", "add role", "view employee", "view role", "view department", "update employee role"]
      }
    ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    if (answers.choice=== "add employee"){
        addEmployee()
    }
    else if (answers.choice=== "add department"){
      addDepartment()

    }
    else if (answers.choice==="add role") {
        addRole()
    }
    else if (answers.choice==="view employee") {
        viewEmployee()
    }
    else if (answers.choice==="view role") {
      viewRole()
    }
    else if (answers.choice==="view department") {
      viewDepartment()
    }
    else if (answers.choices==="update employee role") {
  updateEmployeeRole()
    }
    
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}
 function addEmployee (){
  
}
 function addDepartment (){
  
}
 function addRole (){
  
}
 function viewEmployee (){
  
}
 function viewRole (){
  
}
 function viewDepartment (){
  const sql="select * from department"
  db.query(sql, (err, res)=> {
    console.table(res)
    if(err) console.log(err)
  })
  
}
 function updateEmployeeRole (){
  
}
 function addEmployee (){
  
}



