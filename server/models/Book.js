const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required:true
    },
    authorid:{
        type: String
    }
});

module.exports = new mongoose.model('Book',bookSchema);