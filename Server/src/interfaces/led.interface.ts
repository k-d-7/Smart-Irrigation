import { Document } from "mongoose";

export interface ILed extends Document {
    ledStatus: boolean;
}