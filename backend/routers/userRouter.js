const express = require('express');
const router = express.Router();
const Model = require('../models/userModel');
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


router.post('/login', (req, res) => {
    Model.findOne({email: req.body.email, password: req.body.password})
    .then((result) => {
        if(result){
            const {_id, name, email, role} = result;
            const payload = {_id, name, email, role};

            jwt.sign(
                payload,
                process.env.SECRET_KEY,
                {expiresIn: '7d'},
                (err, token)=>{
                    if(err){
                        res.status(500).json(err);
                    }
                    else{
                        res.status(200).json({token});
                    }
                }
            )
        }
        else{
            res.status(401).json({message: 'Invalid email or password'});
        }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});


module.exports = router;