const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');

router.post('/create', commentsController.doCreate);

module.exports = router;
