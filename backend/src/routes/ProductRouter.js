const express = require('express'); 
const router = express.Router()
const ProductController = require('../controller/ProductController');
const { authMiddleWare } = require('../middleware/authMiddelWare');
router.post('/create',ProductController.createProduct)
router.put('/update/:id',authMiddleWare,ProductController.updateProduct)
router.get('/details/:id',ProductController.getDetailProduct)
router.delete('/delete/:id',authMiddleWare,ProductController.deleteProduct)
router.get('/get-all',ProductController.getAllProduct)
router.get('/get-all-type',ProductController.getAllType)


module.exports = router