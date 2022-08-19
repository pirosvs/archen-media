const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: [
        {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
    ],
    reactionBody: [
        {
            type: String,
            required: true,
            maxLength: 280,
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
});

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;