/* eslint-disable @next/next/no-img-element */
import { Switch, Tag } from "antd";
import { ChartData, ChartOptions } from "chart.js";
import { Chart } from "primereact/chart";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductService } from "../demo/service/ProductService";
import { LayoutContext } from "../layout/context/layoutcontext";
import { Demo } from "../types/types";
import statisticApi from "./api/statisticApi";
import { IStatistic } from "./models/Statistic";

import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { pumpApi } from "./api/pumpApi";
import { ledApi } from "./api/ledApi";
import dayjs from "dayjs";
import { InputSwitch } from "primereact/inputswitch";

interface DataAdafruit {
    key: React.Key;
    id: string;
    temp: number;
    humid: number;
}

interface TableDataType {
    key: React.Key;
    date_time: string;
    status: boolean;
}

interface CurrentData {
    temp: number;
    humid: number;
}

const Dashboard = () => {
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const [lightOn, setLightOn] = useState(false);
    const [pumpOn, setPumpOn] = useState(false);

    const [tempData, setTempData] = useState<number[]>([]);
    const [humidData, setHumidData] = useState<number[]>([]);

    const [dataAdafruit, setDataAdafruit] = useState<DataAdafruit[]>([]);
    const [statistic, setStatistic] = useState<IStatistic[]>();

    const [dataTable, setDataTable] = useState<TableDataType[]>([]);
    const [currentTempHumid, setCurrentTempHumid] = useState<CurrentData>();
    const [realtimeLed, setRealtimeLed] = useState<boolean | undefined>(false);
    const [realtimePump, setRealtimePump] = useState<boolean | undefined>(false);

    useEffect(() => {
        getStatistic();
    }, []);
    useEffect(() => {
        fetchDataTable();
    }, []);

    useEffect(() => {
        fetchCurrentData();
        console.log("fetchCurrentData useEffect:", currentTempHumid);
    }, []);

    useEffect(() => {
        pumpApi.controlPump(pumpOn ? 1 : 0);
    }, []);

    useEffect(() => {
        ledApi.controlLed(lightOn ? 1 : 0);
    }, []);

    const fetchCurrentData = async () => {
        const data = await statisticApi.getCurrentStatistic();
        const current: CurrentData = {
            temp: data.temperature,
            humid: data.humidity,
        };
        setCurrentTempHumid(current);
    };
    const lineData: ChartData = {
        labels: ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Temperature",
                data: [
                    parseFloat(dataAdafruit[0]?.temp as any),
                    parseFloat(dataAdafruit[1]?.temp as any),
                    parseFloat(dataAdafruit[2]?.temp as any),
                    parseFloat(dataAdafruit[3]?.temp as any),
                    parseFloat(dataAdafruit[4]?.temp as any),
                    parseFloat(dataAdafruit[5]?.temp as any),
                    parseFloat(dataAdafruit[6]?.temp as any),
                ],
                fill: false,
                backgroundColor: "#2f4860", //doi mau nhe
                borderColor: "#2f4860", //doi mau nhe
                tension: 0.4,
            },
            {
                label: "Humid",
                data: [
                    parseFloat(dataAdafruit[0]?.humid as any),
                    parseFloat(dataAdafruit[1]?.humid as any),
                    parseFloat(dataAdafruit[2]?.humid as any),
                    parseFloat(dataAdafruit[3]?.humid as any),
                    parseFloat(dataAdafruit[4]?.humid as any),
                    parseFloat(dataAdafruit[5]?.humid as any),
                    parseFloat(dataAdafruit[6]?.humid as any),
                ],
                fill: false,
                backgroundColor: "#00bb7e", //doi mau nhe
                borderColor: "#00bb7e", //doi mau nhe
                tension: 0.4,
            },
        ],
    };

    const getStatistic = async () => {
        const stat = await statisticApi.getStatisticInLast7Days();
        const newData: DataAdafruit[] = stat?.map(
            (item: any, index: number) => {
                return {
                    key: index,
                    id: item?._id,
                    temp: item?.temperature,
                    humid: item?.humidity,
                };
            }
        );
        setDataAdafruit(newData);
    };

    const fetchDataTable = async () => {
        const result = await pumpApi.getPumpHistory();

        const newData: TableDataType[] = result?.map(
            (data: any, index: number) => {
                return {
                    key: index,
                    date_time: dayjs(data?.createdAt).format(
                        "DD/MM/YYYY HH:mm:ss"
                    ),
                    status: data?.pumpStatus,
                };
            }
        );
        setDataTable(newData);
    };

    //dua cai api control light vao day

    const columns: ColumnsType<TableDataType> = [
        {
            title: "Index",
            dataIndex: "key",

            width: "30%",
        },
        {
            title: "Date and time",
            dataIndex: "date_time",
        },
        {
            title: "Status",
            dataIndex: "status: ",

            render: (_, record: TableDataType) =>
                record?.status === true ? (
                    <Tag color="success">On</Tag>
                ) : (
                    <Tag color="red">Off</Tag>
                ),

            width: "40%",
        },
    ];

    const handleToggleLed = (value: any) => {
        // setLed(!led);

        setRealtimeLed(value);

        // handleToggleLedToServer();
        const sendData: number = realtimeLed == true ? 0 : 1;

        ledApi.controlLed(sendData);
    };
    const handleTogglePump = (value: any) => {
        setRealtimePump(value);
        const sendData: number = realtimePump == true ? 0 : 1;
        pumpApi.controlPump(sendData);
    };

    return (
        <>
            <div className="grid">
                <div className="col-12 xl:col-8">
                    {/*du thoi gian thi lam table: trc khi lam table : format data theo kieu data table o tren "lineData" roi chi can truyen cai array sau khi format vao la dc*/}

                    <div className="">
                        <div className="card">
                            <h5>Average of Temperature and Humidity</h5>
                            <Chart
                                type="line"
                                data={lineData}
                                // options={lineOptions}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 xl:col-4 flex flex-column ">
                    <div className="">
                        <div className="card">
                            <div className="h-9rem">
                                <div className="font-bold text-2xl">
                                    Control Light
                                </div>
                                <div className="flex mt-2 mb-3 justify-content-center">
                                    <InputSwitch
                                        checked={realtimeLed as any}
                                        onChange={(e) =>
                                            handleToggleLed(e.value)
                                        }
                                    />
                                </div>
                                <div className="card p-0 flex justify-content-center" style={realtimeLed == false ? {backgroundColor: "#ED4747"}: {backgroundColor: "#5379F1"}}>
                                        <div className="text-2xl m-4 font-bold" >
                                            {realtimeLed == true ? "ON" : "OFF"}
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="card">
                            <div className="h-9rem">
                                <div className="font-bold text-2xl">
                                    Water pump
                                </div>
                                <div className="flex mt-2 mb-3 justify-content-center">
                                    <InputSwitch
                                        checked={realtimePump as any}
                                        onChange={(e) =>
                                            handleTogglePump(e.value)
                                        }
                                    />
                                </div>
                                <div className="card p-0 flex justify-content-center"  style={realtimePump == false ? {backgroundColor: "#ED4747"}: {backgroundColor: "#5379F1"}}>
                                        <div className="text-2xl m-4 font-bold" >
                                            {realtimePump == true ? "ON" : "OFF"}
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="col-6">
                    <div className="card">
                        <div className="h-9rem">
                            <h3>Current Temperature</h3>
                            <div className=" flex justify-content-center">
                                <div className="text-7xl" style={currentTempHumid?.temp as any > 35 ? {color: "#ED4747"} : {color: "#5379F1"}}>
                                    {currentTempHumid?.temp}&deg;C
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    {" "}
                    <div className="card">
                        <div className="h-9rem">
                            <h3>Current Humidity</h3>
                            <div className=" flex justify-content-center">
                                <div className="text-primary-500 text-7xl">
                                    {currentTempHumid?.humid}%
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                        <h5>General in formation of Temperature & Humidity</h5>
                        <Table columns={columns} dataSource={dataTable} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

const StatusPump = (value: any) => {
    return (
        <>
            {value == "true" ? (
                <Tag color="success">on</Tag>
            ) : (
                <Tag color="red">Off</Tag>
            )}
        </>
    );
};
