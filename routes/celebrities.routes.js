const express = require('express');
const router = express.Router();
const celebritiesController = require('../controllers/celebrities.controller');

router.get('/create', celebritiesController.create);
router.post('/create', celebritiesController.doCreate);

router.get('/', celebritiesController.list);
router.get('/:id', celebritiesController.get);

router.get('/:id/update', celebritiesController.update);
router.post('/:id/update', celebritiesController.doUpdate);

router.post('/:id/delete', celebritiesController.delete);

module.exports = router;
