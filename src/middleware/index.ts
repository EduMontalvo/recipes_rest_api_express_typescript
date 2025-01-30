import { Request,Response,NextFunction } from "express"
import { validationResult } from "express-validator"


export const handleInputErrors = (req:Request,res:Response,next:NextFunction) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        next()
    }else{
        res.status(400).json({errors: error.array()})
    }
    
}