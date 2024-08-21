const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/Db.js');


exports.signIn = (req, res) => {
    const { email, password } = req.body;

    const findUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(findUserQuery, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Database error occurred' });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: 'Error during password comparison' });
            }

            if (isMatch) {
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Invalid email or password' });
            }
        });
    });
};