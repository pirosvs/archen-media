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
                // { $pull: { thoughts: req.params.userId } },
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
  
    // Add a thought to a user
    addThought(req, res) {
      console.log("You are adding a thought");
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.thoughtText } },
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
    // Remove thought from a user
    removeThought(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thought: { thoughtId: req.params.thoughtId } } },
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
  