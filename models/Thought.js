const { Schema, model, Types } = require("mongoose");
const moment = require('moment');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
        },
    
        createdAt: {
            type: Date,
            default: Date.now,
            get: (time) => format_date(time) 
        },

        username: {
            type: String,
            required: true
          },

          reactions: [reactionSchema]
          
        },

        {
            toJSON: {
              virtuals: true,
              getters: true
            },
            id: false
          });

          // real backend begins here
ThoughtSchema.virtual('reactionTally').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought