import type { Telemetry } from "../types/telemetry";


let data: Telemetry[] = [];
let idCounter = 1;

let API_URL = "http://backend:8000";

export const getTelemetry = async (): Promise<Telemetry[]> => {
    const res = await fetch(`${API_URL}/telemetry`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
    }

    const data = await res.json();
    console.log("Get telemetry:", data);
    return data;
};


export const addTelemetry = async (item: Omit<Telemetry, "id">) => {
    data.push({ ...item, id: idCounter++ });
};


export const updateTelemetry = async (item: Telemetry) => {
    data = data.map(d => (d.id === item.id ? item : d));
};


export const deleteTelemetry = async (id: number) => {
    data = data.filter(d => d.id !== id);
};