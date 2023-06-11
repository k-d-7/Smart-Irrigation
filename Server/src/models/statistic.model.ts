import { model, Schema } from "mongoose";
import { IStatistic } from "@/interfaces/statistic.interface";

const StatisticSchema: Schema = new Schema(
    {
        temperature: { type: Number, required: true },
        humidity: { type: Number, required: true }
    },
    {
        timestamps: true,
    }
);

export default model<IStatistic>("Statistic", StatisticSchema);