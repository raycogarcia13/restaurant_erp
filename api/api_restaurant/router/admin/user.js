const express = require('express');
const router = express.Router();

const { 
    all,
    create,
    update,
    remove
 } = require('../../controllers/UserController')

 const { isAuthenticatedUser, authorizeRole } = require("../../middlewares/auth")

router.get('/user',isAuthenticatedUser ,all);
router.post('/user',isAuthenticatedUser ,create);
router.put('/user/:id',isAuthenticatedUser ,update);
router.delete('/user/:id',isAuthenticatedUser ,remove);

module.exports = router;
