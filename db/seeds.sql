INSERT INTO department(name)
VALUES 
    ("mangement"), ("sales");
    
INSERT INTO role(title, salary, department_id)
VALUES
    ("manager",100000, 1), ("salesPerson", 8000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("mike", "ken", 1, NULL), ("sam", "frank", 2, 1 )
