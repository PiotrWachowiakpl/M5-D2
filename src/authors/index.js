import express from "express";
import fs, { rmSync, writeFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { join } from "path";
import uniqid from "uniqid";

const fileNameIAmWorkingOn = fileURLToPath(import.meta.url);
const directoryNameTheFileIsIn = dirname(fileNameIAmWorkingOn);
const authorsFilePath = join(directoryNameTheFileIsIn, "authors.json");

const authorsRouter = express.Router();

authorsRouter.post("/", async (req, res, next) => {
  try {
    const { name, surname, email, dateOfBirth } = req.body;
    const newAuthor = {
      id: uniqid(),
      name,
      surname,
      email,
      dateOfBirth,
      avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const fileAsABuffer = fs.readFileSync(authorsFilePath);
    const fileAsAString = fileAsABuffer.toString();
    const fileAsAJSONArray = JSON.parse(fileAsAString);
    fileAsAJSONArray.push(newAuthor)
    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsAJSONArray))
    res.send(newAuthor)
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

authorsRouter.get("/", async (req, res, next) => {
  try {
    const fileAsABuffer = fs.readFileSync(authorsFilePath);
    const fileAsAString = fileAsABuffer.toString();
    const fileAsAJSON = JSON.parse(fileAsAString);
    res.send(fileAsAJSON);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

authorsRouter.get("/:id", async (req, res, next) => {
  try {
    const fileAsABuffer = fs.readFileSync(authorsFilePath);
    const fileAsAString = fileAsABuffer.toString();
    const fileAsAJSONArray = JSON.parse(fileAsAString);

    const foundAuthor = fileAsAJSONArray.find(author => author.id === req.params.id)
    if(!foundAuthor){
        res.status(404).send({message: `Author with ${req.params.id} is not found`})
    }
    res.send(foundAuthor)

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

authorsRouter.delete("/:id", async (req, res, next) => {
  try {
      const fileAsABuffer = fs.readFileSync(authorsFilePath)
      const fileAsAString = fileAsABuffer.toString()
      const fileAsAJSONArray = JSON.parse(fileAsAString)
      
      const foundAuthor = fileAsAJSONArray.find(author => author.id === req.params.id)
      if(!foundAuthor){
          res.status(404).send({message: `Author with ${req.params.id} is not found`})
      }
      fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsAJSONArray))
      res.status(204).send()
  


  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default authorsRouter;
