const express = require('express');
const router = express.Router();

const { 
    store,
    all,
    all_category,
    update,
    remove,
    menu
 } = require('../../controllers/ProductController')

 const { isAuthenticatedUser, authorizeRole } = require("../../middlewares/auth")

 const { imageUpload } = require('../../middlewares/filesUpload')

router.get('/products',isAuthenticatedUser ,all);
router.get('/products/:id',isAuthenticatedUser ,all_category);
router.get('/menu',isAuthenticatedUser ,menu);
router.post('/products',isAuthenticatedUser, imageUpload.single('picture'), store);
router.put('/products/:id',isAuthenticatedUser, imageUpload.single('picture'), update);
// router.put('/category/:id',isAuthenticatedUser ,update);
// router.delete('/category/:id',isAuthenticatedUser ,remove);

module.exports = router;
