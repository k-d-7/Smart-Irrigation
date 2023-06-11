import { Router } from "express";
import LedController from "@/controllers/led.controller";
import { Route } from "./index.routes";
import { AuthMiddleware } from "@/middlewares/auth.middleware";

export default class LedRoutes implements Route {
    public ledController = new LedController();
    public router = Router();
    public authMiddleware = new AuthMiddleware();
    public path = "/led";

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/`,
            // this.authMiddleware.authenticateJWT,
            this.ledController.controlLed
        );
        this.router.get(
            `${this.path}/get`,
            // this.authMiddleware.authenticateJWT,
            this.ledController.getLedHistory
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