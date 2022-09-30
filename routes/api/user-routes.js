const userController = require('../../controllers/user-controller');
const router = require('express').Router()

// /api/users
router.route('/')
    .get(userController.getAllUsers);

// /api/users/:userId
router.route('/:userId')
    .get(userController.getUser)
    .post(userController.createUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .put(userController.addFriend)
    .delete(userController.deleteFriend);

