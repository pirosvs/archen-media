const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

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
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// reactionCount: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
// needs to be for each (or for the given thought -- done in routes?)
const reactionCount = async () =>
  Reaction.aggregate([
    { $group: { _id: null, count: { $count: { } } } },
  ]).then((numberOfThoughtReactions) => numberOfThoughtReactions
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;