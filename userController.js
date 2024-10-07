const pool = require ('../config/database');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {

        const [rows] = await pool.query ('Select user_id, fullname, username, created_at, updated_at From users');
        res.json({ message: 'Returning all users' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById =  async (req, res) => {
    const { id } = req.params;
    res.json({ message: `Returning user with ID: ${id}` });


    try {
        const [rows] = await pool.query('Select user_id, fullname, username, created_at, updated_at From users WHERE user_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json ({ error: err.message });
    }
};

const createUser = async (req, res ) => {
    const { fullname, username,  password } = req.body;
    
    res.status(201).json({ message: 'User created' });
  
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSER INTO user (fullname, username, password) VALUES (?, ?, ?)' [fullname, username, hashedpassword]);
        res.status(201).json({ id: result.insertid, fullname, username, password});
    } catch (err) {
        res.status(500).json ({ error: err.message });
    }
};

const updateUser = async (req,res) => {
    const { id } = req.params;
    const { fullname, username, password } = req.body;
    res.json({ message: `User with ID: ${id} updated` });

    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('UPDATE users SET fullname = ?, username + ?, password = ? WHERE user_id = ?', [fullname, username, hashedpassword, id]);
    
        if (result.affectedRows === 0) {
            return res.status(404).json ({ error: 'User not found' });
        }

        res.json({ message: 'User updated sucessfully' });
    } catch (error) {
        res.status(500).json ({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req. params;
    res.json({ message: `User with ID: ${id} deleted` });

    try {
        const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser };