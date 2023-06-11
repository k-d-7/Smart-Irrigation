import {Request, Response, NextFunction} from "express";
import {IPump} from "../interfaces/pump.interface";
import PumpService from "../services/pump.service";

export default class PumpController {
    public pumpService = new PumpService();

    public controlPump = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signal: number = req.body.signal;
            const pump: IPump = await this.pumpService.controlPump(signal);
            res.status(200).json({
                data: pump,
                message: "Pump controlled successfully",
            });
        } catch (error) {
            next(error);
        }   
    }

    public getPumpHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pumpHistory: IPump[] = await this.pumpService.getPumpHistory();
            res.status(200).json({
                data: pumpHistory,
                message: "Pump history retrieved successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}