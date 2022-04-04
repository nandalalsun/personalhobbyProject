const { ObjectId } = require("bson");
const { default: mongoose } = require("mongoose");

const { Music } = require("../model/music-model");

const getOne = (req, res)=>{
    console.log("artist called...");

    const musicId = req.params.musicId;
    const artistId = req.params.artistId;

    if(!mongoose.isValidObjectId(artistId) && !mongoose.isValidObjectId(musicId)){
        res.status(400).json({Error: "MusicId or ArtistId is not valid"});
    }
    else{
        Music.findOne({_id: musicId}, (err, data)=>{
            if(err){
                res.status(400).json(err);
            }
            else{
                data.artist.forEach(element => {
                    if(element._id == artistId){
                    res.status(200).json(element);
                    }else{
                        res.status(400).json({err: "No record"});
                    }
                });
                }
        });
    }
} 

const getAll = (req, res) => {
    let musicId = req.params.musicId;
    Music.findOne({_id: musicId}, (err, data)=>{
        if(err){
            res.status(400).json(err);
        }
        else{
            if(data.artist.length == 0){
                res.status(400).json({err: "No record"});
            }
            else{
                let artist = [];

                data.artist.forEach(element => {
                    artist.push(element);
                });
                res.status(200).json({artist: artist});
            }
            
        }
    });
}

const addOne = (req, res)=>{
    let artist_name = req.body.artist_name ? req.body.artist_name : "Unknown Artist";
    let bio = req.body.bio ? req.body.bio : "No bio";
    let age = req.body.age ? req.body.age : "";

    let musicId = req.params.musicId;

    let newArtist = {
        artist_name,
        bio,
        age
    }

    if(!(mongoose.isValidObjectId(musicId))){
        res.status(400).json({Error: "Invalid music id"});
    }
    else{
        Music.updateOne({_id: musicId}, {$push: {artist: newArtist}}).exec((err, artist)=>{
            if(!err){
                 res.status(200).json(artist);
            }
            else{
                res.status(400).json(err);
            }
        });
    }

}

const deleteOne = (req, res)=>{
    let musicId = req.params.musicId;
    let artistId = req.params.artistId;

    if(!(mongoose.isValidObjectId(musicId) && mongoose.isValidObjectId(artistId))){
        res.status(400).json({Error: "Invalid music or artist id"});
    }
    else{
        Music.updateOne({_id: musicId}, {$pullAll: {"artist._id": artistId}}).exec((err)=>{
            if(!err){
                 res.status(200).json({Success: "artist deleted"});
            }
            else{
                res.status(400).json(err);
            }
        });
    }
}

const updateOne = (req, res)=>{

}

module.exports = {
    getOne,
    addOne,
    deleteOne,
    updateOne,
    getAll
}