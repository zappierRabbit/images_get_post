const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
        
    },
    displayPic:{
        type:String,
        required: true
    }
    

},
{timestamps: true}
);


module.exports = mongoose.model("Image", imageSchema);