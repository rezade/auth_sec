const bcrypt = require('bcrypt');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');
/*
bcrypt.genSalt(10, (err, salt)=>{
    if(err) return next(err);
    bcrypt.hash('password123', salt, (err, hash)=>{
        if(err) return next(err);
        console.log(hash);
    });
});
*/

/*
const secret = 'mysecretpassword';
const secretSalt = 'adsadasdadaffgfd';
const user = {
    id:1,
    token: MD5('asdasdafsdf').toString() + secretSalt
}
const receivedToken = 'sdfs';
console.log(user);
*/
const id = '1000';
const secret = 'supersecret';
const receivedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';
const token = jwt.sign(id, secret);
const decodeToken = jwt.verify(receivedToken, secret); //1000 if this everything ok
console.log(decodeToken);
