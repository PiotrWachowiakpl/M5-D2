import express from "express"

const authorsRouter = express.Router()

export default authorsRouter

authorsRouter.post("/",async (req, res, next) => {})


authorsRouter.get("/",async (req, res, next) => {})


authorsRouter.get("/:authorId",async (req, res, next) => {})


authorsRouter.put("/:authorId",async (req, res, next) => {})


authorsRouter.delete("/:authorId",async (req, res, next) => {})