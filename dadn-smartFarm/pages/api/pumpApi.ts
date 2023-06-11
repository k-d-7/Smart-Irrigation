import { AppError } from "../models/Error";
import { IPump } from "../models/Pump";

const BASE_API = "http://localhost:3000/api/v1";
const apiUrl = `${BASE_API}/pump`;

export const pumpApi = {
    controlPump: async (signal: number) => {
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
                const pump: IPump = data.data;
                return pump;
            })
            .catch((err) => {
                return err;
            });

        return response;
    },

    getPumpHistory: async () => {
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
                const pump: IPump[] = data.data;
                return pump;
            })
            .catch((err) => {
                return err;
            });
        return response;
    },
};
