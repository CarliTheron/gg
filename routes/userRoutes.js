const express = require('express');
const router = express.Router();
const User = require('../model/user');

//create user (remember /users is used in routes.http)
router.post('/users',(req, res) => {
 const {name,surname,age,email}=req.body;
 
 const newUser = new User({name,surname,age,email});

 newUser.save()
 .then(()=>{
    res.status(201).json({message: 'User created successfully'});
 })
 .catch((error)=> {
    res.status(500).json({message: 'Error creating user'});
 })
});

//retrieve/ view all users
router.get('/users', (req, res) => {
    User.find()
    .then((users)=>{
       res.status(201).json(users);
    })
    .catch((error)=> {
       res.status(500).json({error: 'Error users not found'});
    })
});

// get user by ID
router.get('/users/:id', (req, res) => {
    const id  = req.body;
    User.findById(id)
    .then(users => {
        if(users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Error retrieving user'});
    });
});

// update user by ID
router.put('/users/:id', (req, res) => {
    const  id  = req.body;
    const { name, surname, age, email } = req.body;
    User.findByIdAndUpdate(id, { name, surname, age, email }, { new: true })
    .then(users => {
        if(users) {
            res.status(200).json({message: 'User updated successfully', user});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Error updating user'});
    });
});

// delete user by ID
router.delete('/users/:id', (req, res) => {
    const  id  = req.body;
    User.findByIdAndDelete(id)
    .then(users => {
        if(users) {
            res.status(200).json({message: 'User deleted successfully'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Error deleting user'});
    });
});

module.exports = router;
