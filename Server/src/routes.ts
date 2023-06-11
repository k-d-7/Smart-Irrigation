import { Route } from '@routes/index.routes';
import IndexRoutes from "@/routes/index.routes";
import AuthRoutes from "@/routes/auth.routes";
import StatisticRoutes from './routes/statistic.routes';
import PumpRoutes from './routes/pump.routes';
import LedRoutes from './routes/led.routes';

// initialize route instance
const apiRoutes: Route[] = [
    new IndexRoutes(),
    new AuthRoutes(),
    new StatisticRoutes(),
    new PumpRoutes(),
    new LedRoutes(),
];

export default apiRoutes;
