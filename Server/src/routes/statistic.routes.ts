import { Router } from "express";
import StatisticController from "@/controllers/statistic.controller";
import { Route } from "./index.routes";
import { AuthMiddleware } from "@/middlewares/auth.middleware";

export default class StatisticRoutes implements Route {
    public statisticController = new StatisticController();
    public router = Router();
    public authMiddleware = new AuthMiddleware();
    public path = "/statistic";

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/`,
            this.authMiddleware.authenticateJWT,
            this.statisticController.createStatistic
        );
        this.router.get(
            `${this.path}/current`,
            // this.authMiddleware.authenticateJWT,
            this.statisticController.getCurrentStatistic
        );
        this.router.get(
            `${this.path}/get`,
            // this.authMiddleware.authenticateJWT,
            this.statisticController.getStatisticInLast7Days
        );
    }

    public getRoutes(): Route[] {
        return [
            {
                path: `${this.path}`,
                router: this.router,
            },
        ];
    }
}
