import { Request, Response } from "express";
import { userRepo } from "../mongo/repositories/user.repo";
import { AppError } from "../modules/common/errors";
import { ErrorMessages } from "../enums/errors.enum";

export const adminOnly = async (req: Request, res: Response, next: any) => {
    const id = req.params.id;
    const doc = await userRepo.findById(id)
    if(doc?.role! === 'admin') console.log('Admin Record Being Edited')
    if(req?.user?.role === 'visitor') console.log("Visitor Trying To Edit")
    if (doc?.role! === 'admin' && req?.user?.role === 'visitor')
        return next(new AppError(ErrorMessages.ADMIN_ONLY, 403))
    next()
}