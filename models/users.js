const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },


    role: {
        type: String,
        required: true
    },
    jwtToken: {
        type: String,
        required: false,

    },

    createTime: {
        type: String,
        required: false
    },

    tokenValid: {
        type: String,
        required: false
    }

})

const SWSUser = mongoose.model('SWSUser', UserSchema)
module.exports = SWSUser;
