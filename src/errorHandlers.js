export const notFound = (err,req,res,next) =>{
    if (err && err.status === 400) {

        res.status(400).send({message: err.message || "NOT FOUND", errors: err.errors || []})
    }
next()
}

export const forbidden = (err,req,res,next) =>{
    if (err && err.status === 403) {

        res.status(400).send({message: err.message || "Forbidden"})
    }
next()
}

export const catchErrors = (err,req,res,next) =>{
    if (err) {
        if (!req.headerSent) {
            res.status(err.status || 500).send({message: err.message || "Not working properly"})
        }
    }
next()
}