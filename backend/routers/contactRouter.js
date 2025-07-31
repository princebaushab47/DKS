const express = require('express');
const router = express.Router();
const Model = require('../models/contactModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

router.get('/getall', (req, res) => {
    Model.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});


router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        if (result) {
            res.json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});


module.exports = router;