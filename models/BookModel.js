//TODO
//claudia should start working here

import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    author: { type: String, minlength:1},
    title: {type: String, minlength:1, required: true},
    entryNumber: {type: Number, required: true},
    clasification: {type:String, required:true}

});

export const BookModel = mongoose.model('Book', BookSchema);
