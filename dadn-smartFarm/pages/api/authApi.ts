import { IAuth } from "../models/Auth";
import { AppError } from "../models/Error";

const BASE_API = 'http://localhost:3000/api/v1';
const apiUrl = `${BASE_API}/auth`;

export const authApi = {
    login: async (params: {phone: string, password: string}) => {
        const payload = {phone: params.phone, password: params.password};

        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json;
                }

                throw new Error("Network response not ok");
            })
            .then((data) => {
                // console.log(data);
                // const err: AppError = data.error;
                // if (err.errorMsg.length !== 0) {
                //     console.log(err.errorMsg);
                //     throw new Error(err.errorMsg + ` ++ ` + err.errorField);
                // }
                const user: IAuth = {status: true};
                return user;
            })
            .catch((err) => {
                return err;
            });

        return response;
    },

    logout: async () => {
        const response = await fetch(`${apiUrl}/logout`, {
            method: 'POST',
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json;
                }

                throw new Error("Network response not ok");
            })
            .then((data) => {
                // const err: AppError = data.error;
                // if (err.errorCode) {
                //     return null;
                // }
                const user: IAuth = {status: true};
                return user;
            })
            .catch((err) => {
                return err;
            });

        return response;
    }
}