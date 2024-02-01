import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

export const checkDatabaseConnection = (req: Request, res: Response, next: NextFunction) => {
    if (mongoose.connection.readyState === 1) {
        next()
    } else {
        res.status(500).json({ message: "Database not connected!" })
    }

}