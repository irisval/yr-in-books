require('dotenv').config();
var express = require('express');
const controller = require('../controllers/search');
var router = express.Router();

/* GET home page. */
router.get('/', controller.getIndex);


router.get('/search', controller.getBooks);

module.exports = router;
