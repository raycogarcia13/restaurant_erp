const express = require('express');
const router = express.Router();

const { 
    store,
    all,
    update,
    remove
 } = require('../../controllers/TableController')

 const { isAuthenticatedUser, authorizeRole } = require("../../middlewares/auth")

router.get('/tables',isAuthenticatedUser ,all);
router.post('/tables',isAuthenticatedUser ,store);
router.put('/tables/:id',isAuthenticatedUser ,update);
router.delete('/tables/:id',isAuthenticatedUser ,remove);

module.exports = router;
