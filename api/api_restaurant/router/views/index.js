const express = require('express');
const router = express.Router();

const { 
    home,
    menu
 } = require('../../controllers/ViewController')

router.get('/', home);
router.get('/menu', menu);

module.exports = router;
