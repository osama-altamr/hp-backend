import { NextFunction, Request, Response } from "express";
import CrudRepository from "../mongo/repositories/crud.repo";
import { AppError } from "../modules/common/errors";

// TESTED ✅
export const checkRefId = (repo: CrudRepository<any>, key: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if(!req.body[key])
            next()
        if(! await repo.findById(req.body[key]))
            return next(new AppError('ObjectId not found', 404))
        next()
    }
}