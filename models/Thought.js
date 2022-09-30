const mongoose = require('mongoose');
const dayjs = require('dayjs');

const replySchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        //280 character max validation
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dayjs(createdAtVal)
    }
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        //validate characters
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dayjs(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [replySchema]
})

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;