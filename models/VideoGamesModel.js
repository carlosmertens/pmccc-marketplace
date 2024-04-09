import mongoose from "mongoose";
const videoGamesSchema = new mongoose.Schema({
    name: {type: String, minlength: 1, maxlength: 50, required: true, unique: true},
    price: {type: Number, min: 1, required: true},
    genre: {type: String, minlength: 1, maxlength: 20, required: true},
});

const VideoGamesModel = mongoose.model("VideoGames", videoGamesSchema);

export default VideoGamesModel;