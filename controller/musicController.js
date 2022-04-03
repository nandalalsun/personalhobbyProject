const { default: mongoose } = require("mongoose");
const { Music } = require("../model/music-model");

const ifValidLength = (music_length) => {
    if(isNaN(music_length) || music_length > 10 || music_length < 0){
        return false;
    }
    else{
        return true;
    }
    
}

const addOne = function(req, res){
    if(!(req.body.music_info.music_name || req.body.music_name)){
        console.log("Invalid music");
        res.status(400).json("Music name must be provided");
    }
    else{
        console.log("Reading data...");
        let error = false;
        let error_message = {}

        let music_name = req.body.music_name ? req.body.music_name : req.body.music_info.music_name;
        let description = req.body.description ? req.body.description : req.body.music_info.description ? req.body.music_info.description : "No description";
        let music_type = req.body.music_type ? req.body.music_type : "Unknown";

        let music_length = 0;
        if(req.body.music_length){
            if(!ifValidLength(req.body.music_length)){
                error = true;
                error_message.music_length = "Music length is not valid, it must be an integer and 0 to 10";
            }
            else{
                music_length = req.body.music_length;
            }
        }

        let artist_name = req.body.artist ? req.body.artist : "Unknown";
        let bio = req.body.bio ? req.body.bio : "Not provided";

        let age = "";
        if(req.body.age){
            if(isNaN(req.body.age) && req.body.age > 100 && req.body.age < 0){
                error = true;
                error_message.age = "Age must be an integer and valid";
            }
            else{
                age = req.body.age;
            }
        }

        let artist_info = {
            artist_name: artist_name,
            bio: bio,
            age: age
        }
        
        let music_info = {
            music_name,
            description,
            artist_info
        }
        
        console.log({music_info: music_info, music_type: music_type, music_length: music_length});

        if(error){
            res.status(400).json(error_message);
        }
        else{
            Music.create({music_info: music_info, music_type: music_type, music_length: music_length}, (err, data)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({message: err});
                }
                else{
                    res.status(201).json(data);
                }
            });
        }
       
        
    }
}
const deleteOne = function(req, res){
    let musicId = req.params.musicId;
    let isValidId = mongoose.isValidObjectId(musicId);
    
    if(!isValidId){
        console.log("Invalid music Id");
        res.status(400).json({message: "Invalid music id"});
    }
    else{
        Music.deleteOne({_id: musicId}).then((delet)=>{
            if(delet.deletedCount == 0){
                console.log(delet);
                res.status(404).json({"Delete failed: " : "No data found to delete"});
            }
            else{
                console.log("Data deleted");
                res.status(200).json({message: "Delete Successful."})
            }
        });
    }
   

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
                res.status(404).json({message: err});
            }
            else if(music == null){
                res.status(404).json({message: "Music not found with the provided id"});
            }
            else{
                res.status(200).json(music);
            }
        });
    }
}
const getAll = function(req, res){
    let error = false;
    let error_message = {}

    let count = 5;

    if(req.query.count){
        if(!ifValidLength(req.query.count)){
            error = true;
            error_message.count = "Count number is either not a number or more than 10 or less than 0"
        }
        else{        
            count = req.query.count;
        }
    }

    let offset = 0;

    if(req.query.offset){
        if(isNaN(req.query.offset)){
            error = true;
            error_message.offset = "Offset is not a number"
        }
        else{
            offset = req.query.offset;
        }
    }

    if(error){
        res.status(400).json(error_message);
    }
    else{
        Music.find({}, null, {skip: offset, limit: count}).exec((err, music)=>{
            if(err){
                res.status(500).json({message: "Internal server error", err: err});
            }
            else if(music == null){
                res.status(404).json({message: "Music not found.."});
            }
            else{
                res.status(200).json(music);
            }
        });
    }
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