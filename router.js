//import express
const express = require('express')

// import useController
const userController = require('./controllers/userController')

//import projectController
const projectController = require('./controllers/projectController')

//imort middleware
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')

//import router class / instance

const router = new express.Router()

//register
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//add-project
router.post('/add-project',jwtMiddleware,multerConfig.single("projectImage"),projectController.addProjectController)

//all project
router.get('/all-project',jwtMiddleware,projectController.getAllProjectController)

//home-project
router.get('/home-project',projectController.getHomeProjectController)

//user-project
router.get('/user-project',jwtMiddleware,projectController.getUserProjectController)

//remove
router.delete('/remove-userproject/:id',jwtMiddleware,projectController.removeUserProjectController)

//update user project
router.put('/update-userproject/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)

//update user profile
router.put('/update-userprofile',jwtMiddleware,multerConfig.single("profile"),userController.editProfileController)

//export
module.exports = router;