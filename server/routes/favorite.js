const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post("/favoriteNumber", (req,res) => {
    
    Favorite.find({"movieId" : req.body.movieId}).exec((err, info) => {
        if (err) return res.status(400), send(err)
        
        res.status(200).json({
            success: true,
            favoriteNumber: info.length
        })

    })
})

router.post("/favorited", (req,res) => {
    
    //select
    Favorite.find({
                "movieId" : req.body.movieId
                ,"userFrom" : req.body.userFrom
                }).exec((err, info) => {
        if (err) return res.status(400), send(err)
        
        result = false;
        if (info.length !== 0) {
            result = true;
        }

        res.status(200).json({
            success: true,
            favorited: result
        })

    })
})

router.post("/removeFromFavorite", (req,res) => {
    //delete
    Favorite.findOneAndDelete({
                "movieId" : req.body.movieId
                ,"userFrom" : req.body.userFrom
                }).exec((err, doc) => {
        if (err) return res.status(400).send(err)

        return res.status(200).json({success: true, doc})

    })
})

router.post("/addToFavorite", (req,res) => {

    //insert
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success : true
        })
    })
})

router.post("/getFavoredMovie", (req,res) => {
    
    Favorite.find({"userFrom" : req.body.userFrom}).exec((err, favorites) => {
        if (err) return res.status(400), send(err)
        res.status(200).json({success: true, favorites})
    })
})

router.post("/aremoveFromFavorite", (req,res) => {
    //delete
    Favorite.findOneAndDelete({
                "movieId" : req.body.movieId
                ,"userFrom" : req.body.userFrom
                }).exec((err, doc) => {
        if (err) return res.status(400).send(err)

        return res.status(200).json({success: true})

    })
})


module.exports = router;
