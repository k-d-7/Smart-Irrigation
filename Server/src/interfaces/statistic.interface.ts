import { Document } from "mongoose";

export interface IStatistic extends Document {
    temperature: number;
    humidity: number;
}