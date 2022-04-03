const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistInfo = new Schema({
    artist_name: {
        type: String
    },
    bio: {
        type: String
    },
    age: {
        type: Number
    }
});

const Music_info = new Schema({
    music_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    music_length: {
        type: Number,
        mix: 10
    },
});

const MusicSchema = new Schema({
    music_info: {
        type: Music_info,
        required: true
    },

    music_type: {
        type: String,
    },
    artist: {
        type: [ArtistInfo]
    }

});



// module.exports.Artist = 

// module.exports = 

module.exports = {
    Music: mongoose.model("Music", MusicSchema, "music"),
    Artist: mongoose.model("Artist", ArtistInfo, "artist")
}