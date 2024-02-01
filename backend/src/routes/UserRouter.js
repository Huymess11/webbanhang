const express = require('express'); 
const router = express.Router()
const userController = require('../controller/UserController');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddelWare');
router.post('/signup',userController.createUser)
router.post('/signin',userController.loginUser)
router.put('/update-user/:id',userController.updateUser)
router.delete('/delete-user/:id',authMiddleWare,userController.deleteUser)
router.get('/get-details/:id',authUserMiddleWare,userController.getDetailsUser)
router.post('/refresh-token',userController.refreshToken)


module.exports = router