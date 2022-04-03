const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Music_info = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    artist: {
        type: ArtistInfo,
        default: "Unknown"
    }
});

const MusicSchema = new Schema({
    music_info: {
        type: Music_info,
        required: true
    },

    music_type: {
        type: String,
    },
    music_length: {
        type: Number,
        mix: 10
    }
});

const ArtistInfo = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    age: {
        type: Number
    }
});

module.exports = mongoose.model("Artist", ArtistInfo, "artist");

module.exports = mongoose.model("Music", MusicSchema, "music");

