//import file
const connectDB = require('./Config/DBconnection');
const App = require('./app');
const {serverPort} = require('./secret')

//server running
App.listen(serverPort, async()=>{
    console.log(`server running at http://localhost:${serverPort}`);

    //database conncetion
   await connectDB();
});

