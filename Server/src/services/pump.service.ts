import Pump from "@/models/pump.model";
import { IPump } from "@/interfaces/pump.interface";
import Adafruit from "@/adafruit";

class PumpService {
    public adafruit = Adafruit.getInstance();

    public async controlPump(signal: number) : Promise<IPump> {
        if (signal == 1) {
            const newPump = await Pump.create({ pumpStatus: true });
            const status: boolean = await this.adafruit.controlPump(1);
            if (status == false) {
                throw new Error("Cannot control pump");
            }
            return newPump;
        } else {
            const newPump = await Pump.create({ pumpStatus: false });
            const status: boolean = await this.adafruit.controlPump(0);
            if (status == false) {
                throw new Error("Cannot control pump");
            }
            return newPump;
        }
    }

    public async getPumpHistory(): Promise<IPump[]> {
        const pumpHistory = await Pump.find();
        if (!pumpHistory) {
            throw new Error("Pump history not found");
        }

        return pumpHistory;
    }
}

export default PumpService;