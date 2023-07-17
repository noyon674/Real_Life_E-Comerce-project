//error response handle
const errorResponse = (res, {statusCode=500, message='Internal Server error'})=>{
    return res.status( statusCode).json({
        Success: false,
        Messege: message
    });
};

//success response handle
const successResponse = (res, {statusCode=200, message='Successful', payload = {}})=>{
    return res.status( statusCode).json({
        Success: true,
        Messege: message,
        payload,
    });
};


//export
module.exports = {errorResponse, successResponse}