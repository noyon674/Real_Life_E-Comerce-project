//import file
const  jwt = require('jsonwebtoken');

//create webtoken
const createJsonWebToken = (payload, secretKey, expiresIn)=>{
    if( typeof payload !== 'object' || !payload){
        throw new Error('Payload must be a non-empty object');
    }
    if( typeof secretKey !== 'string' || secretKey === ''){
        throw new Error('Secret key must be a non-empty string');
    }
    try {
        const Token = jwt.sign(payload, secretKey, {expiresIn});
        return Token;
    } catch (error) {
        console.error('Failed to sign the JWT: ', error);
        throw error;
    }
};

module.exports = {createJsonWebToken};