const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'ownerData_db'
  },
  console.log(`Connected to the ownerdata_db database.`)
);

loadMainChoices();

function loadMainChoices() {
  console.log('\n')
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
      console.log (answers)
      // Use user feedback for... whatever!!
      if (answers.choice === "add employee") {
        addEmployee()
      }
      else if (answers.choice === "add department") {
        addDepartment()

      }
      else if (answers.choice === "add role") {
        addRole()
      }
      else if (answers.choice === "view employee") {
        viewEmployee()
      }
      else if (answers.choice === "view role") {
        viewRole()
      }
      else if (answers.choice === "view department") {
        viewDepartment()
      }
      else if (answers.choices === "update employee role") {
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
function addEmployee() {
  const sql = "SELECT * from role"
  db.query(sql, (err, res) => {
    const roleChoices = res.map((role) => ({ value: role.id, name: role.title }))
    if (err) console.log(err)

    const employeeSql = " SELECT * from employee"
    db.query(employeeSql, (err, res) => {
      const employeeChoices = res.map((employee) => ({ value: employee.id, name: `${employee.first_name} ${employee.last_name}` }))
      if (err) console.log(err)
      inquirer.prompt([{
        type: 'input',
        name: "employeeFirst",
        message: "what is the employee's first name?",
      }, {
        type: 'input',
        name: "employeeLast",
        message: "what is the employee's last name?",
      }, {
        type: 'list',
        name: 'employeeRoleId',
        message: "what is the employee's role?",
        choices: roleChoices,
      }, {
        type: 'list',
        name: 'employeeManagerId',
        message: "what is the employee's namager?",
        choices: employeeChoices
      }])
    })
  }
  )
}

function addRole() {

  const sql = "select * from department"
  db.query(sql, (err, res) => {
    const departmentChoices = res.map((department) => ({ value: department.id, name: department.name }))
    // console.log(departmentChoices)
    if (err) console.log(err)


    inquirer.prompt([{
      type: "input",
      name: "roleTitle",
      message: "what is the new roleTitle",
    }, {
      type: "input",
      name: "roleSalary",
      message: "what is the new roleSalary",
    }, {
      type: "list",
      name: "departmentId",
      message: "what is the new departmentId",
      choices: departmentChoices
    }]).then((answer) => {
      // console.log(departmentChoices)
      const sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"
      values = [answer.roleTitle, answer.roleSalary, answer.departmentId]
      db.query(sql, values, (err, res) => {
        console.log(`${answer.roleTitle} role added to the database.`)
        if (err) console.log(err)
        loadMainChoices()
      })
    })
  })
}

function addDepartment() {
  inquirer.prompt([{
    type: "input",
    name: 'departmentName',
    message: "What is the new department's name?"
  }]).then((answer) => {
    const sql = "INSERT INTO department (name) VALUES (?)"
    values = [answer.departmentName]
    db.query(sql, values, (err, res) => {
      console.log(`${answer.departmentName} department added to the database.`)
      if (err) console.log(err)
      loadMainChoices()
    })

  })

}

function viewEmployee() {
  const sql = "select * from employee"
  db.query(sql, (err, res) => {
    console.log('\n')
    console.table(res)
    if (err) console.log(err)
  })
  loadMainChoices()
}
function viewRole() {
  const sql = "select * from role"
  db.query(sql, (err, res) => {
    console.log('\n')
    console.table(res)
    if (err) console.log(err)
  })
  loadMainChoices()
}
function viewDepartment() {
  const sql = "select * from department"
  db.query(sql, (err, res) => {
    console.log('\n')
    console.table(res)
    if (err) console.log(err)
  })
  loadMainChoices()
}
function updateEmployeeRole() {

}
