const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: [
        {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
      ],
    email: [
        {
          type: String,
          required: true,
          unique: true,
          match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address'],
        },
      ],
    thoughts: [
        {
          type: [Schema.Types.ObjectId],
          ref: 'Thought',
        },
      ],
    friends: [
      {
        type: [Schema.Types.ObjectId],
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// does this work? since friend is part of User
const friendCount = async () =>
  Friend.aggregate([
    { $group: { _id: null, count: { $count: { } } } },
  ]).then((numberOfFriends) => numberOfFriends
);

const User = model('user', userSchema);

module.exports = User;