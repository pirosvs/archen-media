const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: [
        {
          type: String,
          required: true,
          unique: true,
        //   trim
        },
      ],
    email: [
        {
          type: String,
          required: true,
          unique: true,
        //   match email validation
        },
      ],
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
    friends: [
      {
        type: Schema.Types.ObjectId,
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

const User = model('user', userSchema);

module.exports = User;