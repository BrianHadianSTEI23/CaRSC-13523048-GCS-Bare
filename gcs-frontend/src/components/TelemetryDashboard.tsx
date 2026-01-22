import { useEffect, useState } from "react";
import TelemetryForm from "./TelemetryForm";
import TelemetryTable from "./TelemetryTable";
import type { Telemetry } from "../types/telemetry";

const API_URL = "http://backend:8000/telemetry";

export default function TelemetryPage() {
    const [data, setData] = useState<Telemetry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTelemetry = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Failed to fetch telemetry");
            setData(await res.json());
        } catch (err) {
            setError("Unable to load telemetry data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTelemetry();
    }, []);

    return (
        <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
            <h1>Ground Control Station</h1>

            <section style={{ marginBottom: 32 }}>
                <TelemetryForm onSuccess={fetchTelemetry} />
            </section>

            <section>
                <TelemetryTable
                    data={data}
                    loading={loading}
                    error={error}
                />
            </section>
        </main>
    );
}
