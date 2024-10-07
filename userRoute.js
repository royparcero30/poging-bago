const express = require('express');
const { getAllUsers, getUserbyId, createUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticatetoken = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/', authenticatetoken, getAllUsers);


router.get('/:id', authenticatetoken, getUserbyId);


router.post('/', authenticatetoken, createUser);


router.put('/:id', authenticatetoken, updateUser);


router.delete('/:id', authenticatetoken, deleteUser);  

module.exports = router;