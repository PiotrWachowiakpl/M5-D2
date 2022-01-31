import express from "express";
import fs, { rmSync, writeFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { join } from "path";
import uniqid from "uniqid";
import { checkBlogPostSchema, checkValidationResult } from "./validation.js";
import { checkSchema } from "express-validator";

const fileNameIAmWorkingOn = fileURLToPath(import.meta.url);
const directoryNameTheFileIsIn = dirname(fileNameIAmWorkingOn);
const blogsFilePath = join(directoryNameTheFileIsIn, "blogs.json");

const blogsRouter = express.Router();

blogsRouter.post("/", checkBlogPostSchema, checkValidationResult, async (req, res, next) => {
  try {
       const newblog = {
      id: uniqid(),
     ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const fileAsABuffer = fs.readFileSync(blogsFilePath);
    const fileAsAString = fileAsABuffer.toString();
    const fileAsAJSONArray = JSON.parse(fileAsAString);
    fileAsAJSONArray.push(newblog)
    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsAJSONArray))
    res.send(newblog)
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

blogsRouter.get("/", async (req, res, next) => {
  try {
    const fileAsABuffer = fs.readFileSync(blogsFilePath);
    const fileAsAString = fileAsABuffer.toString();
    const fileAsAJSON = JSON.parse(fileAsAString);
    res.send(fileAsAJSON);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

blogsRouter.get("/:id", async (req, res, next) => {
  try {
    const fileAsABuffer = fs.readFileSync(blogsFilePath);
    const fileAsAString = fileAsABuffer.toString();
    const fileAsAJSONArray = JSON.parse(fileAsAString);

    const foundblog = fileAsAJSONArray.find(blog => blog.id === req.params.id)
    if(!foundblog){
        res.status(404).send({message: `blog with ${req.params.id} is not found`})
    }
    res.send(foundblog)

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
    try {
        const fileAsABuffer = fs.readFileSync(blogsFilePath)
        const fileAsAString = fileAsABuffer.toString()
        let fileAsAJSONArray = JSON.parse(fileAsAString)
        
        const foundblogIndex = fileAsAJSONArray.findIndex(blog => blog.id === req.params.id)
        if(!foundblogIndex == -1){
            res.status(404).send({message: `blog with ${req.params.id} is not found`})
        }

        const blogsDataBeforeChange = fileAsAJSONArray[foundblogIndex]
        const blogsDataAfterChange ={
            ...blogsDataBeforeChange,
            ...req.body,
            updatedAt: new Date(),
            id: req.params.id
        }
        fileAsAJSONArray[foundblogIndex] = blogsDataAfterChange
        fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsAJSONArray))
        res.send(blogsDataAfterChange)
    
  
  
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
      const fileAsABuffer = fs.readFileSync(blogsFilePath)
      const fileAsAString = fileAsABuffer.toString()
      let fileAsAJSONArray = JSON.parse(fileAsAString)
      
      const foundblog = fileAsAJSONArray.find(blog => blog.id === req.params.id)
      if (!foundblog) {
          res.status(404).send({message: `blog with ${req.params.id} is not found`})
      }
      fileAsAJSONArray = fileAsAJSONArray.filter(
        (blog) => blog.id !== req.params.id)
      fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsAJSONArray))
      res.status(204).send("deleted")
  


  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default blogsRouter;
