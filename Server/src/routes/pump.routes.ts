import { Router } from "express";
import PumpController from "@/controllers/pump.controller";
import { Route } from "./index.routes";
import { AuthMiddleware } from "@/middlewares/auth.middleware";

export default class PumpRoutes implements Route {
    public pumpController = new PumpController();
    public router = Router();
    public authMiddleware = new AuthMiddleware();
    public path = "/pump";

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/`,
            // this.authMiddleware.authenticateJWT,
            this.pumpController.controlPump
        );
        this.router.get(
            `${this.path}/get`,
            // this.authMiddleware.authenticateJWT,
            this.pumpController.getPumpHistory
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