import { model, Schema } from "mongoose";
import { IPump } from "@/interfaces/pump.interface";

const PumpSchema: Schema = new Schema(
    {
        pumpStatus: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    }
);

export default model<IPump>("Pump", PumpSchema);