const { User, Thought, Reaction } = require("../models");

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then(async (users) => {
          const userObj = {
            users,
            // friendCount: await friendCount(),
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Get a single user
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select("-__v")
        .lean()
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: "No user with that ID" })
            : res.json(user)
            // needs to get all thoughts and friendCount
            // : res.json({
            //     user,
            //     grade: await grade(req.params.userId),
            //   })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    // Create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Delete a user
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: "No such user exists" })
            : Thought.deleteMany(
                { users: req.params.userId },
                // { $pull: { thoughts: req.params.thoughtId } },
                // { new: true }
              )
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({
                message: "User deleted, but no thoughts found",
              })
            : res.json({ message: "User successfully deleted" })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Add a friend to a user friend list
    addFriend(req, res) {
      console.log("You are adding a friend");
      console.log(req.friendId);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: "No user found with that ID" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove friend from a user friend list
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        // not sure if objectId in user model sets this to friend id? or user id?
        { $pull: { friend: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: "No user found with that ID" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  