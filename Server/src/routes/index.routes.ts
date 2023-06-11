import {response, Router} from 'express';
import IndexController from '@/controllers/index.controller';
export interface Route {
    path?: string;
    router: Router;
}

export default class IndexRoutes implements Route {
    public indexController = new IndexController();
    public router = Router();
    public path = '/';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.indexController.index);
    }

    public getRoutes(): Route[] {
        return [
            {
                path: `${this.path}`,
                router: this.router
            }
        ];
    }
}