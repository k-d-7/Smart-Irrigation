import * as schedule from "node-schedule";
import { AdafruitResponseParams } from "@params/params";
import Adafruit from "@/adafruit";
import Cache from "@/cache";
import { setIdxGlobal, getIdxGlobal } from "@/global";
import { StatisticParams } from "@params/params";
import StatisticService from './../services/statistic.service';

class Job {
    public adafruit = Adafruit.getInstance();
    public redisCache = Cache.getInstance();
    public statisticService = new StatisticService();

    constructor() {}
    
    public readDataFromSensor() {
        console.log('create cronjob1 to read data');
        schedule.scheduleJob('*/10 * * * * *', async () => {
            console.log('read data from sensor');
            const temperature: AdafruitResponseParams = await this.adafruit.getTemperature();
            const humidity: AdafruitResponseParams = await this.adafruit.getHumidity();
            const statistics: StatisticParams = {
                temperature: Number(temperature.value),
                humidity: Number(humidity.value)
            }
            await this.redisCache.set(getIdxGlobal().toString(), statistics);
            setIdxGlobal(getIdxGlobal() + 1);
            console.log(temperature.value);
            console.log(humidity.value);
            console.log(getIdxGlobal())
        })
    }

    public storeStatistics() {
        console.log('create cronjob2');
        schedule.scheduleJob('59 23 * * *', async () => {
            console.log('store statistics');
            const id = getIdxGlobal();
            let averageTemperature: number = 0;
            let averageHumidity: number = 0;
            for (let i = 0; i < id; i++) {
                let statistic: StatisticParams = await this.redisCache.get(i.toString());
                averageTemperature += statistic.temperature;
                averageHumidity += statistic.humidity;
            }
            averageTemperature = Number((averageTemperature / id).toFixed(2));
            averageHumidity = Number((averageHumidity / id).toFixed(2));
            const statistics: StatisticParams = {
                temperature: averageTemperature,
                humidity: averageHumidity
            }

            try {
                const stats = this.statisticService.createStatistic(statistics);
                console.log("statistic created success");
            } catch (error) {
                console.log(error);
            }
        })
    }
}

export default new Job();