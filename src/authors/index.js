import express from "express"
import fs from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"
import { join } from "path"

const fileNameIAmWorkingOn = fileURLToPath(import.meta.url)
const directoryNameTheFileIsIn = dirname(fileNameIAmWorkingOn)
const authorsFilePath = join(directoryNameTheFileIsIn, "authors.json")



const authorsRouter = express.Router()


authorsRouter.post("/",async (req, res, next) => {
    try {
        const fileAsABuffer = fs.readFileSync(authorsFilePath)
        const fileAsAString = fileAsABuffer.toString()
        const fileAsAJSON = JSON.parse(fileAsAString)
        res.send(fileAsAJSON)
    } catch (error) {
        res.status(500).send({message: error.message})
        
    }})
    
    
    authorsRouter.get("/",async (req, res, next) => {
        try {
            
        } catch (error) {
            res.status(500).send({message: error.message})
            
        }})
        
        
        authorsRouter.get("/:authorId",async (req, res, next) => {
            try {
                
            } catch (error) {
                res.status(500).send({message: error.message})
                
            }})
            
            
            authorsRouter.put("/:authorId",async (req, res, next) => {
                try {
                    
                } catch (error) {
                    res.status(500).send({message: error.message})
                    
                }})
                
                
                authorsRouter.delete("/:authorId",async (req, res, next) => {
                    try {
                        
                    } catch (error) {
                        res.status(500).send({message: error.message})
                        
    }})
         
export default authorsRouter