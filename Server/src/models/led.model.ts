import { model, Schema } from "mongoose";
import { ILed } from './../interfaces/led.interface';

const LedSchema: Schema = new Schema(
    {
        ledStatus: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    }
);

export default model<ILed>("Led", LedSchema);