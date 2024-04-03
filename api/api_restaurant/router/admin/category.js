const express = require('express');
const router = express.Router();

const { 
    store,
    all,
    update,
    remove
 } = require('../../controllers/CategoryController')

 const { isAuthenticatedUser, authorizeRole } = require("../../middlewares/auth")

router.get('/category',isAuthenticatedUser ,all);
router.post('/category',isAuthenticatedUser ,store);
router.put('/category/:id',isAuthenticatedUser ,update);
router.delete('/category/:id',isAuthenticatedUser ,remove);

module.exports = router;
