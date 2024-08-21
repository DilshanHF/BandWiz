const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/Db.js');

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Database error occurred' });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: 'Email already exists' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: 'Error hashing password' });
            }

            // Insert user into the database
            const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [name, email, hash], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ success: false, message: 'Database error occurred' });
                }
                res.json({ success: true });
            });
        });
    });
}