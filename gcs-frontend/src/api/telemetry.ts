import type { Telemetry } from "../types/telemetry";


let data: Telemetry[] = [];
let idCounter = 1;


export const getTelemetry = async (): Promise<Telemetry[]> => {
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