const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //validate here
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9\._-]{1,64}@[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{1,6}$/.test(v)
                //local part, before the @ must be 1-64 characters in length and contain a-z, A-Z, 0-9, ".",'_', or '-'
                //domain part, after the @ should be 1-63 characters in length contain a-z, A-Z, 0-9, or '-'
                //followed by a . and any 1-6 charcters a-z or A-Z
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = mongoose.model('user', userSchema);

module.exports = User;