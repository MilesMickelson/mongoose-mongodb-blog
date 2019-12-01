const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
  Blog
    .find()
    .then(blogs => {
      res.status(200).json(blogs);
    });
});

router.get('/featured', (req, res) => {
  Blog
    .where({ featured : true })
    .then(blogs => {
		blogs ? res.status(200).json(blogs) 
		: res.status(404).json('No featured blogs exist');
    })
		.catch( error => res.status(500).json({ 'Error': error }));
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
  Blog
    .findById(id)
    .then(blog => {
		blog ? res.status(200).json(blog) 
		: res.status(404).json({ 'Message': `No blog with ${id} exists` });
    })
		.catch( error => res.status(500).json({ 'Error': error }));
});

router.post('/', (req,res) => {
    var blog = new Blog({
        title: req.body.title,
        article: req.body.article,
        published: req.body.published,
        featured: req.body.featured,
        author: req.body.author
    });
    blog
        .save(function (err, result) {
            if (err) return handleError(err);
            res.status(201).send(result);
    });
});

router.put('/:id', (req, res) => {
	const id = req.params.id;
  Blog
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(blog => { 
		blog
		? res.status(204).json(blog)
		: res.status(404).json({ 'Error': `No blog with the id: ${id} exists to change` });
		})
		.catch(error => {
		res.status(500).json({ 'Error': error })
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
  Blog
    .findByIdAndRemove(id)
    .then(blog => {
		blog
    ? res.status(200).json(blog)
		: res.status(404).json({ 'Error': `No blog with the id: ${id} exists to delete` });
    })
		.catch(error => {
		res.status(500).json({ 'Error': error })
		});
});

module.exports = router;
