const express = require('express');
const router = new express.Router();
const MensRanking = require('../models/mens');


// handling post req
router.post("/mens", (req, res) => {
    const addingMensRecord = new MensRanking(req.body);
    console.log(req.body);
    addingMensRecord.save();
    res.status(201).send(`Data is successfully added to the database.`);
})

// handling get req
router.get('/mens', (req, res) => {
    MensRanking.find().sort({ "ranking": 1 })
        .then(MensRanking => {
            res.send(MensRanking);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

});


// handling get req for an individual
router.get('/mens/:id', (req, res) => {
    const _id = req.params.id
    MensRanking.findById(_id)
        .then(MensRanking => {
            res.send(MensRanking);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

});

// handling patch req for an individual
router.patch('/mens/:id', (req, res) => {
    const _id = req.params.id
    MensRanking.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        .then(MensRanking => {
            res.send(MensRanking);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

});

// handling delete req for individual
router.delete('/mens/:id', (req, res) => {
    const _id = req.params.id
    MensRanking.findByIdAndDelete(_id)
        .then(MensRanking => {
            res.send(MensRanking);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

});

module.exports = router;