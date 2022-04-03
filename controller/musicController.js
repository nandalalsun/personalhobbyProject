const { default: mongoose } = require("mongoose");
const Music = require("../model/music-model");

const ifValidInt = (music_length, res) => {
    if(isNaN(music_length) || music_length > 10 || music_length < 0){
        res.status(400).json({"Error": "Music length should be integer and range between 0 and 10"});
        return;
    }
    return music_length;
}

const addOne = function(req, res){
    if(!req.body.name){
        console.log("Invalid music");
        res.status(400).json("Music name must be provided");
    }
    else{
        let name = req.body.name;
        let description = req.body.description ? req.body.description : "No description";
        let artist = req.body.artist ? req.body.artist : "Unknown";
        let music_type = req.body.music_type ? req.body.music_type : "";
        let music_length = req.body.music_length ? ifValidInt(req.body.music_length, res) : 0;

        music_info = {
            name,
            description,
            artist
        }

        Music.insertOne({music_info: music_info, music_type: music_type, music_length: music_length}, (err, data)=>{});
        
    }
}
const deleteOne = function(req, res){
    let musicId = req.params.musicId;
    let isValidId = mongoose.isValidObjectId(musicId);
    if(!isValidId){
        console.log("Invalid music Id");
        res.status(400).json({message: "Invalid music id"});
        return;
    }
    Music.deleteOne({_id: musicId}, (err)=>{
        if(err){
            console.log(err);
            res.status(500).json("Delete failed: " + err);
        }
        else{
            res.status(200).json({message: "Delete Successful."})
        }
    });

}
const getOne = function(req, res){
    let musicId = req.params.musicId;
    let isValidId = mongoose.isValidObjectId(musicId);
    if(!isValidId){
        res.status(400).json({message: "Invalid music id"});
        return;
    }
    else{
        Music.findById({_id: musicId}, (err, music)=>{
            if(err){
                res.status(404).json({message: "Music not found with provided id"})
            }
            else{
                res.status(200).json(music);
            }
        });
    }
}
const getAll = function(req, res){
    Music.find({}, (err, music)=>{
        if(err){
            res.status(500).json({message: "Internal server error"});
        }
        else{
            res.status(200).json(music);
        }
    });
}
const updateOne = (req, res)=>{

}

module.exports = {
    addOne,
    deleteOne,
    getOne, 
    getAll,
    updateOne
}