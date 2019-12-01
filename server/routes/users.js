const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  User
    .find()
    .then(users => {
      res.status(200).json(users);
    })
		.catch( err => res.status(500).json({ 'Error': error }));
		done();
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
  User
    .findById(id)
    .then(user => {
		user ? res.status(200).json(user) 
		: res.status(404).json({ 'Message': `No user with ${id} exists` });
    })
		.catch( err => res.status(500).json({ 'Error': error }));
		done();
});

router.post('/', (req, res) => {
	const newUser = new User(req.body);
  newUser
    .save()
    .then(user => {
    res.status(201).json(user);
    })
		.catch( err => res.status(500).json({ 'Error': error }));
		done();
});

router.put('/:id', (req, res) => {
  User
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(user => { 
			res.status(204).json(user);
		})
		.catch(err => {
		  res.status(500).json({ 'Error': error })
		});
		done();
});

router.delete('/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id, { $set: req.body })
    .then(user => {
      res.status(200).json(user);
    })
		.catch(err => {
			res.status(500).json({ 'Error': error })
		});
		done();
});

module.exports = router;
