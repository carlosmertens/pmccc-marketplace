//TODO
//claudia should start working here

// BookModel.js
import {mongoose} from 'mongoose';

const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

export const BookModel = mongoose.model('Book', BookSchema);
