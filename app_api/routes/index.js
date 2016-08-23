var express = require('express');
var router = express.Router();

var ctrlcourseSearch = require('../controllers/courseSearch');

// member
router.get('/courseSearch', ctrlcourseSearch.query);

module.exports = router;