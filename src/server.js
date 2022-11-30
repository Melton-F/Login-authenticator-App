import http from 'http'
import app from './app'
import mongoose from 'mongoose'
const PORT = 3000

mongoose.connect("mongodb://localhost:27017/Login-App");
mongoose.connection
  .once("open", () => {
    console.log("DB connected");
  })
  .on("error", (error)=> {
    console.log("error is:", error);
  });


const server = http.createServer(app)
server.listen(PORT, ()=>{
    console.log(`server listening port of ${PORT}`);
})