// userController.js
const User = require('./userModel');

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) return res.status(500).json({ message: 'Error retrieving users' });
        res.status(200).json(users);
    });
};

exports.getUserById = (req, res) => {
    const userId = req.params.id;
    User.getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({ message: 'Error retrieving user' });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    });
};

exports.createUser = (req, res) => {
    const userData = req.body;
    User.createUser(userData, (err, newUser) => {
        if (err) return res.status(400).json({ message: 'Error creating user' });
        res.status(201).json(newUser);
    });
};

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    User.updateUser(userId, userData, (err, updatedUser) => {
        if (err) return res.status(400).json({ message: 'Error updating user' });
        res.status(200).json(updatedUser);
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    User.deleteUser(userId, (err, success) => {
        if (err) return res.status(500).json({ message: 'Error deleting user' });
        if (!success) return res.status(404).json({ message: 'User not found' });
        res.status(204).send(); // No content
    });
};
