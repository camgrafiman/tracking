const mongoose = require('mongoose');

/*Esquema */
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
}, {
    timestamps: true,
});


/* Modelo: */
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;