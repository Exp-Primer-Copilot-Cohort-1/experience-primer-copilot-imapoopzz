// Create web server  
const express = require('express');
const router = express.Router();
const commentsModel = require('../models/commentsModel');
const { check, validationResult } = require('express-validator');

// GET route for comments
router.get('/', async (req, res, next) => {
    try {
        const comments = await commentsModel.getAll()
        res.json(comments)
    } catch (error) {
        next(error)
    }
});

// GET route for comments by id
router.get('/:id', async (req, res, next) => {
    try {
        const comments = await commentsModel.getById(req.params.id)
        res.json(comments)
    } catch (error) {
        next(error)
    }
});

// POST route for comments
router.post('/', [
    check('title').isLength({ min: 1 }),
    check('comment_text').isLength({ min: 1 }),
    check('username').isLength({ min: 1 }),
    check('email').isLength({ min: 1 }),
], async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const err = new Error('Please enter a title, comment_text, username, and email')
            err.status = 400
            throw err
        }
        const comments = await commentsModel.create(req.body)
        res.json(comments)
    } catch (error) {
        next(error)
    }
});

// PUT route for comments
router.put('/:id', async (req, res, next) => {
    try {
        const comments = await commentsModel.update(req.params.id, req.body)
        res.json(comments)
    } catch (error) {
        next(error)
    }
});

// DELETE route for comments
router.delete('/:id', async (req, res, next) => {
    try {
        const comments = await commentsModel.delete(req.params.id)
        res.json(comments)
    } catch (error) {
        next(error)
    }
});

module.exports = router;