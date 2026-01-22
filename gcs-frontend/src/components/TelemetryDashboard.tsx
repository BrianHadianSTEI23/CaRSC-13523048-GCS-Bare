import { useEffect, useState } from "react";
import TelemetryForm from "./TelemetryForm";
import TelemetryTable from "./TelemetryTable";
import type { Telemetry } from "../types/telemetry";

const API_URL = "http://127.0.0.1:8000/telemetry";

export default function TelemetryPage() {
    const [data, setData] = useState<Telemetry[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTelemetry = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error("Failed to fetch telemetry:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTelemetry(); // initial load
    }, []);

    return (
        <div>
            <TelemetryForm onSuccess={fetchTelemetry} />
            <TelemetryTable data={data} loading={loading} />
        </div>
    );
}
