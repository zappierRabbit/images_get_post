const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/imageSchema');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
    });


router.get('/getimages', (req, res) => {
    Image.find({})
    .then(
        image => {
            res.json({
                baseURL:"http://localhost:3000/",
                status:"201",
                success: true, 
                data: image
            })
        }
    )
    .catch(err => {
        return res.status(500).json({
            status:500,
            success: false,
            message : "Internal server error",
            error: err.message
        })
    });
});

router.post('/postimages', upload.single('displayPic'), (req, res) => {
    try {
        const image = new Image({
            name: req.file.originalname,
            displayPic: req.file.path
        });
        image
        .save()
        .then(image => {
            res.json({
                baseURL:"http://localhost:3000/",
                status:201, 
                message:"Image saved"
            });
        })
        .catch(err => {
            return res.status(500).json({
                status:500,
                success: false,
                message : "Internal server error",
                error: err.message
            })
        });
    } catch (err) {
        return res.status(500).json({
            status:500,
            success: false,
            message : "Internal server error",
            error: err.message
        });
    }
    
});

module.exports = router;