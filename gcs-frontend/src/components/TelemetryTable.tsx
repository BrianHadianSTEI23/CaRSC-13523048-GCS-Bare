import type { Telemetry } from "../types/telemetry";

interface Props {
    data: Telemetry[];
    loading: boolean;
    error: string | null;
}

export default function TelemetryTable({ data, loading, error }: Props) {
    if (loading) return <p>Loading telemetry...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (data.length === 0) return <p>No telemetry data yet.</p>;

    return (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 16,
            }}
        >
            <thead>
                <tr>
                    {["Time", "Lat", "Lon", "Alt", "Speed", "Battery"].map((h) => (
                        <th key={h} style={th}>{h}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((t) => (
                    <tr key={t.id}>
                        <td style={td}>{t.time}</td>
                        <td style={td}>{t.latitude}</td>
                        <td style={td}>{t.longitude}</td>
                        <td style={td}>{t.altitude}</td>
                        <td style={td}>{t.speed}</td>
                        <td style={td}>{t.battery}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const th = {
    borderBottom: "2px solid #ccc",
    padding: 8,
    textAlign: "left" as const,
};

const td = {
    borderBottom: "1px solid #eee",
    padding: 8,
};
