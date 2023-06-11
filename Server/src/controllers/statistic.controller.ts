import { NextFunction, Request, Response } from "express";
import { IStatistic } from "../interfaces/statistic.interface";
import { StatisticParams } from "../params/params";
import StatisticService from "../services/statistic.service";
import { setIdxGlobal, getIdxGlobal } from "@/global";
import Cache from "@/cache";

export default class StatisticController {
    public statisticService = new StatisticService();
    public redisCache = Cache.getInstance();

    public createStatistic = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const params: StatisticParams = req.body;
            const statistic: IStatistic =
                await this.statisticService.createStatistic(params);
            res.status(200).json({
                data: statistic,
                message: "Statistic created successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public getCurrentStatistic = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = getIdxGlobal() - 1;
            let stat: any;
            if (await this.redisCache.exists(id.toString())) {  
                stat = await this.redisCache.get(id.toString());
                return res.status(200).json({
                    data: stat,
                    message: "Statistic retrieved successfully from redis",
                });
            }
            stat = await this.statisticService.getLatestStatistic();
            res.status(200).json({
                data: stat,
                message: "Statistic retrieved successfully from db",
            });
        } catch (error) {
            next(error);
        }
    };

    public getStatisticInLast7Days = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const statistic: IStatistic[] =
                await this.statisticService.getStatisticInLast7Days();
            res.status(200).json({
                data: statistic,
                message: "Statistic retrieved successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}
