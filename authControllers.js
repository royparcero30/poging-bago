const pool = require('../config/database');
const brypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register =async (re, res) => {
    const { fullname, username, password } = req.body;
 
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        const [rows] = await pool.query('INSERT INTO users(fullname, username, password) VALUES (?,?,?)', [fullname, username, hashedpassword]);

        res.status(201).json({message: 'User registered successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, username.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const token = jwt.sign({ user_id: user_id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME });

        res.json({ token });

    } catch (err) {
        
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login };