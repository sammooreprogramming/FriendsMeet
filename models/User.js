const { Schema, model } = require('mongoose');
const moment = require('moment');

// this code will create the user schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match:[, 'Please provide a valid email address']
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],

        friends: [{
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// create friend tally
UserSchema.virtual('friendTally').get(function () {
    return this.friends.length;
});

const User = model('User, UserSchema');

module.exports = User;