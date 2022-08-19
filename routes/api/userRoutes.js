const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
//   addThought,
//   removeThought,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/thoughts
// router.route('/:userId/thoughts').post(addThought);

// /api/users/:userId/thoughts/:thoughtId
// router.route('/:userId/thoughts/:thoughtId').put(updateThought).delete(removeThought);

// /api/users/:userId/friends/:friendId
router.route('./:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;