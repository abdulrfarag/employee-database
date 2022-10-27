const inquirer = require('inquirer');
require('console.table');

loadMainChoices();

function loadMainChoices(){
    prompt([
    /* Pass your questions in here */
    {
        type: "list",
        name: "choice",
        message: "Please Select an Option",
        choices: [
            {
                name: "add employee",
                value: "ADD_EMPLOYEE",
            },
            {
                name: "remove employee",
                value: "REMOVE EMPLOYEE",
            },
            {
                name: ""
            }
        ]
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}



