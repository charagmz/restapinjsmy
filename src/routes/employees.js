const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM employees WHERE id=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/', (req, res) => {
    const { id, name, salary } = req.body;
    /*
    //Para que funcione asi agregar la opcion multipleStatements: true, en el objeto createConnection
    const query = `
        SET @id = ?;
        SET @name = ?;
        SET @salary = ?;
        CALL employeeAddOrEdit(@id, @name, @salary);
    `;*/
    const query = `CALL employeeAddOrEdit(?, ?, ?);`;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if (!err) {
            //console.log(rows);
            res.json({status: 'Employeed Saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;
    const query = `CALL employeeAddOrEdit(?, ?, ?);`;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if (!err) {
            //console.log(rows);
            res.json({status: 'Employeed Updated'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            //console.log(rows);
            res.json({status: 'Employeed Delete'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;