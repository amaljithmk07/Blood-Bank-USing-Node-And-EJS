const mongoose = require('mongoose')
const userbloodschema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    blood_group: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
})



module.exports = mongoose.model('Results', userbloodschema)