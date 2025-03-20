const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/users', dataController.getTopUsers);
router.get('/posts', dataController.getPostsByType);

module.exports = router;