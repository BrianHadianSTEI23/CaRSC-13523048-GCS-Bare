import type { Telemetry } from "../types/telemetry";

interface Props {
    data: Telemetry[];
    loading: boolean;
}

export default function TelemetryTable({ data, loading }: Props) {
    if (loading) return <p>Loading...</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Lat</th>
                    <th>Lon</th>
                    <th>Alt</th>
                    <th>Speed</th>
                    <th>Battery</th>
                </tr>
            </thead>
            <tbody>
                {data.map((t) => (
                    <tr key={t.id}>
                        <td>{t.time}</td>
                        <td>{t.latitude}</td>
                        <td>{t.longitude}</td>
                        <td>{t.altitude}</td>
                        <td>{t.speed}</td>
                        <td>{t.battery}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
