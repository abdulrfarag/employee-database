const inquirer = require("inquirer");
require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "ownerData_db",
  },
  console.log(`Connected to the ownerdata_db database.`)
);

loadMainChoices();

function loadMainChoices() {
  console.log("\n");
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "choice",
        message: "Please Select an Option",
        choices: [
          "add employee",
          "add department",
          "add role",
          "view employee",
          "view employee by manager",
          "view role",
          "view department",
          "update employee role",
          "delete department",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      // Use user feedback for... whatever!!
      if (answers.choice === "add employee") {
        addEmployee();
      } else if (answers.choice === "add department") {
        addDepartment();
      } else if (answers.choice === "view employee by manager") {
        viewEmployeeByManager();
      } else if (answers.choice === "add role") {
        addRole();
      } else if (answers.choice === "view employee") {
        viewEmployee();
      } else if (answers.choice === "view role") {
        viewRole();
      } else if (answers.choice === "view department") {
        viewDepartment();
      } else if (answers.choices === "update employee role") {
        updateEmployeeRole();
      } else if (answers.choices === "delete department") {
        deleteDepartment();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
}

// add Department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the new department's name?",
      },
    ])
    .then((answer) => {
      const sql = "INSERT INTO department (name) VALUES (?)";
      values = [answer.departmentName];
      db.query(sql, values, (err, res) => {
        console.log(
          `${answer.departmentName} department added to the database.`
        );
        if (err) console.log(err);
        loadMainChoices();
      });
    });
}

// add Role
function addRole() {
  const sql = "select * from department";
  db.query(sql, (err, res) => {
    const departmentChoices = res.map((department) => ({
      value: department.id,
      name: department.name,
    }));
   
    if (err) console.log(err);

    inquirer
      .prompt([
        {
          type: "input",
          name: "role title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "role salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department id",
          message: "Which department does the role belong to?",
          choices: departmentChoices,
        },
      ])
      .then((answer) => {
        const sql =
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
        values = [answer.roleTitle, answer.roleSalary, answer.departmentId];
        db.query(sql, values, (err, res) => {
          console.log(`${answer.roleTitle} role added to the database.`);
          if (err) console.log(err);
          loadMainChoices();
        }
        )
      })
  })
}
// Add employees
function addEmployee() {
  const sql = "SELECT * from role";
  db.query(sql, (err, res) => {
    const roleChoices = res.map((role) => ({
      value: role.id,
      name: role.title,
    }));
    if (err) console.log(err);
    const sql = "select * from employee";
    db.query(sql, (err, res) => {
      const managerChoices = res.map((employee) => ({
        value: employee.id,
        name: employee.first_name,
        name: employee.last_name,
      }));
      if (err) console.log(err);
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",

            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",

            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            type: "number",
            message: "What is the employee's role?",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "manager_id",
            type: "number",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          },
        ])
        .then((answers) => {
          db.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [
              answers.first_name,
              answers.last_name,
              answers.role_id,
              answers.manager_id,
            ],
            function (err, data) {
              if (err) throw err;
              console.log(
                "The new employee entered has been added successfully to the database."
              );

              db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                  res.status(500).json({ error: err.message });
                }
                console.table(result);
                if (err) console.log(err);
                loadMainChoices();
          }
        )
      })
  })}
  )
})
}
// view employee
function viewEmployee() {
  const sql = "select * from employee";
  db.query(sql, (err, res) => {
    console.log("\n");
    console.table(res);
    if (err) console.log(err);
  });
  loadMainChoices();
}
function viewRole() {
  const sql = "select * from role";
  db.query(sql, (err, res) => {
    console.log("\n");
    console.table(res);
    if (err) console.log(err);
  });
  loadMainChoices();
}
function viewDepartment() {
  const sql = "select * from department";
  db.query(sql, (err, res) => {
    console.log("\n");
    console.table(res);
    if (err) console.log(err);
  });
  loadMainChoices();
}
function updateEmployeeRole() {}

// Delete Employee
function deleteEmployee() {
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "number",
        message:
          "Please enter the id of the employee you want to delete from the database. Enter ONLY numbers.",
      },
    ])
    .then(function (response) {
      db.query(
        "DELETE FROM employee WHERE id = ?",
        [response.employee_id],
        function (err, data) {
          if (err) throw err;
          console.log(
            "The employee entered has been deleted successfully from the database."
          );

          db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) {
              res.status(500).json({ error: err.message });
              startPrompt();
            }
            console.table(result);
            startPrompt();
          });
        }
      );
    });
}
