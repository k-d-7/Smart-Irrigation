import { AppError } from "../models/Error";
import { IStatistic } from "../models/Statistic";
interface Props{
statistic: IStatistic;
}


const BASE_API = "http://localhost:3000/api/v1";
const apiUrl = `${BASE_API}/statistic`;

class statisticApi {
    public async getCurrentStatistic() {
        const response = await fetch(`${apiUrl}/current`, {
            method: "GET",
            // credentials: 'include',
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error("Network response not ok");
            })
            .then((data) => {
                
                const stat: IStatistic = data.data;
                console.log("Type result: " + typeof stat);
                console.log(stat);
                return stat;
            })
            .catch((err) => {
                return err;
            });

        return response;
    }

    public async getStatisticInLast7Days() {
        const response = await fetch(`${apiUrl}/get`, {
            method: "GET",
            // credentials: 'include',
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error("Network response not ok");
            })
            .then((data) => {
                console.log(data);
                const stat: IStatistic[] = data.data;
                console.log(stat);
                return stat;
            })
            .catch((err) => {
                return err;
            });

        return response;
    }
};

export default new statisticApi();

