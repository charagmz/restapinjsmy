CREATE DATABASE IF NOT EXISTS restapijsmy;

USE restapijsmy;

--USERS TABLE
CREATE TABLE employees (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(11) DEFAULT NULL,
    PRIMARY KEY(id)
);

DESCRIBE employees;

INSERT INTO employees VALUES
  (1, 'Ryan Ray', 20000),
  (2, 'Joe McMilan', 40000),
  (3, 'Jonh Carter', 50000);


--AS root
USE restapijsmy;
DROP PROCEDURE IF EXISTS employeeAddOrEdit; 
DELIMITER &&
CREATE PROCEDURE employeeAddOrEdit(IN _id INT, IN _name VARCHAR(45), IN _salary INT) 
BEGIN
  IF _id = 0 THEN
    INSERT INTO employees (name, salary) 
    VALUES (_name, _salary);
    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE employees
    SET 
      name = _name,
      salary = _salary
      WHERE id = _id;
  END IF;
  SELECT _id AS 'id';
END &&
DELIMITER;


--GRANT ALL ON restapijsmy.* TO 'mysqluser'@'localhost' IDENTIFIED BY 'PASSWORD' WITH GRANT OPTION;
GRANT EXECUTE ON PROCEDURE restapijsmy.employeeAddOrEdit TO 'mysqluser'@'localhost';
flush privileges;
