import { Request, Response, NextFunction } from "express";

export const checkEndpoint = (req: Request, res: Response, next: NextFunction) => {
    if (!res.headersSent)
        res.status(404).json({ message: "Endpoint not found" })
    else {
        next()
    }
}