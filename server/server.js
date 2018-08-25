const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {User} = require('./models/user');
const cookieParser = require('cookie-parser');
const {auth} = require('./middlewares/auth');

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://rezade2004:235689red@ds125482.mlab.com:25482/myauth',{useNewUrlParser:true});
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/user',(req,res)=>{
    const user1 = new User({
        email: req.body.email,
        password: req.body.password
    });
    user1.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).send(doc);
    })
});

app.post('/api/user/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err, user)=>{
        if(!user) res.json({message: 'Auth Failed, no user!!!'});
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                message: 'Wrong Password'
            });
            //res.status(200).send(isMatch);
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).send('ok');
            });
        });
    });
});

//git 12:30

app.get('/user/profile', auth, (req,res)=>{
/*
    let token = req.cookies.auth;
    User.findByToken(token,(err, user)=>{
        if(err) throw err;
        if(!user) return res.status(401).send('No Access');
        res.status(200).send('You have access');
    });
*/
    res.status(200).send(req.token);
});


const port = process.env.PORT || 3000;
app.listen(port,()=>{
   console.log(`Started on Port ${port}`);
});