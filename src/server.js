import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"

const server = express()
const port =  3002


server.use(express.json())

console.table(listEndpoints(server))
server.listen(port, ()=>console.log(`Server is running on PORT : ${port}`))

server.on("error",(error)=>console.log(`Server is not running due to : ${error}`))