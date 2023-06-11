import Statistic from "@/models/statistic.model";
import { StatisticParams } from "@/params/params";
import { IStatistic } from "@/interfaces/statistic.interface";
import { isEmpty } from "@/utils/validate";
import Cache from "@/cache";
import { getIdxGlobal, setIdxGlobal } from "@/global";

class StatisticService {
    public redisCache = Cache.getInstance();

    public async createStatistic(params: StatisticParams): Promise<IStatistic> {
        if (isEmpty(params)) {
            throw new Error("Missing params");
        }

        const newStatistic = await Statistic.create({ ...params });

        return newStatistic;
    }

    public async getLatestStatistic(): Promise<IStatistic> {
        const date = new Date();
        date.setDate(date.getDate() - 2);
        const statistic = await Statistic.findOne({ createdAt: { $gt: date } });
        if (!statistic) {
            throw new Error("Statistic not found");
        }

        return statistic;
    }

    public async getStatisticInLast7Days(): Promise<IStatistic[]> {
        const currentDate = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 8);
        console.log(sevenDaysAgo);

        const statistic = await Statistic.find({ createdAt: { $gte: sevenDaysAgo, $lt: currentDate } });
        if (!statistic) {
            throw new Error("Statistic not found");
        }

        return statistic;
    }
}

export default StatisticService;