const { ObjectId } = require("bson");
const { default: mongoose } = require("mongoose");

const { Artist } = require("../model/music-model");

const getOne = (req, res)=>{
    console.log("artist called...");

    const musicId = req.params.musicId;
    const artistId = req.params.artistId;

    if(!mongoose.isValidObjectId(artistId) && !mongoose.isValidObjectId(musicId)){
        res.status(400).json({Error: "MusicId or ArtistId is not valid"});
    }
    else{
        Artist.find({_id: ObjectId(artistId)}, (err, data)=>{
            if(err){
                res.status(400).json(err);
            }
            else{
                res.status(200).json(data);
            }
            console.log(err, data);
            
        });
    }
} 

const getAll = (req, res) => {
    
}

const addOne = (req, res)=>{

}

const deleteOne = (req, res)=>{

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