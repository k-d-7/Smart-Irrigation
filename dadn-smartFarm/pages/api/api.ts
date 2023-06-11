import { ILed } from "../models/Led";
import { IPump } from "../models/Pump";
import { IAuth } from "../models/Auth";
import axios from "axios";
import { IStatistic } from './../models/Statistic';

const API = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    // withCredentials: true,
    headers: {
        Accept: "application/json"
    }
})

export async function getCurrentStatistic() {
    try {
        const {data, status} = await API.get<IStatistic>("statistic/current");
        console.log(typeof data);
        console.log("Data at request: " + JSON.stringify(data));
        // console.log("Data: ");
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
          } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
    }
}