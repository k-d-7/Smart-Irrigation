import axios from "axios";
import { X_AIO_Key, ADAFRUIT_USERNAME } from "@/config";

export default class Adafruit {
    private static instance: Adafruit;
    private adafruitRequest: any;

    private constructor() {
        this.adafruitRequest = axios.create({
            baseURL: `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/`,
            headers: {
                "X-AIO-Key": X_AIO_Key || "aio_sTCb92KODaSL7JBxOREnOrLTnRJ1",
                "Content-Type": "application/json",
            },
        });
    }

    public static getInstance(): Adafruit {
        if (!Adafruit.instance) {
            Adafruit.instance = new Adafruit();
        }

        return Adafruit.instance;
    }

    public async getTemperature() {
        try {
            const {data, status} = await this.adafruitRequest.get("feeds/temp/data/last");
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    public async getHumidity() {
        try {
            const {data, status} = await this.adafruitRequest.get("feeds/humidity/data/last");
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    public async controlPump(value: number) {
        try {
            const {data, status} = await this.adafruitRequest.post("feeds/water-pump/data", {
                value: value
            });
            console.log(status, " ", data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async controlLed(value: number) {
        try {
            const {data, status} = await this.adafruitRequest.post("feeds/led/data", {
                value: value
            });
            console.log(status, " ", data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}