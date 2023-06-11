import Led from '../models/led.model';
import { ILed } from '../interfaces/led.interface';
import Adafruit from '@/adafruit';

class LedService {
    public adafruit = Adafruit.getInstance();

    public async controlLed(signal: number) : Promise<ILed> {
        if (signal == 1) {
            const newLed = await Led.create({ ledStatus: true });
            const status: boolean = await this.adafruit.controlLed(1);
            if (status == false) {
                throw new Error("Cannot control led");
            }
            return newLed;
        } else {
            const newLed = await Led.create({ ledStatus: false });
            const status: boolean = await this.adafruit.controlLed(0);
            if (status == false) {
                throw new Error("Cannot control led");
            }
            return newLed;
        }
    }

    public async getLedHistory(): Promise<ILed[]> {
        const ledHistory = await Led.find();
        if (!ledHistory) {
            throw new Error("Led history not found");
        }

        return ledHistory;
    }
}

export default LedService;