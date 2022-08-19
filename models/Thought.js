const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: [
        {
          type: String,
          required: true,
        },
    ],
    createdAt: [
    {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
    },
    ],
    username: [
        {
          type: String,
          required: true,
        },
    ],
    reactions: [
        {
          ref: 'Reaction',
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

// reactionCount

const User = model('thought', thoughtSchema);

module.exports = Thought;