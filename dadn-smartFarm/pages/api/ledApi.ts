import { AppError } from "../models/Error";
import { ILed } from "../models/Led";

const BASE_API = "http://localhost:3000/api/v1";
const apiUrl = `${BASE_API}/led`;

export const ledApi = {
    controlLed: async (signal: number) => {
        const payload = { signal: signal };
        const response = await fetch(`${apiUrl}/`, {
            method: "POST",
            // credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error("Network response not ok");
            })
            .then((data) => {
                console.log(data);
                const led: ILed = data.data;
            
                return led;
            })
            .catch((err) => {
                return err;
            });

        return response;
    },
};
