import {Request, Response, NextFunction} from 'express';
import {ILed} from '../interfaces/led.interface';
import LedService from '../services/led.service';

export default class LedController {
    public ledService = new LedService();

    public controlLed = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signal: number = req.body.signal;
            const led: ILed = await this.ledService.controlLed(signal);
            res.status(200).json({
                data: led,
                message: "Led controlled successfully",
            });
        } catch (error) {
            next(error);
        }   
    }

    public getLedHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ledHistory: ILed[] = await this.ledService.getLedHistory();
            res.status(200).json({
                data: ledHistory,
                message: "Led history retrieved successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}