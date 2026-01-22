import type { Telemetry } from "../types/telemetry";


interface Props {
data: Telemetry[];
onDelete: (id: number) => void;
}


export default function TelemetryTable({ data, onDelete }: Props) {
return (
    <table border={1}>
    <thead>
    <tr>
    <th>ID</th>
    <th>Time</th>
    <th>Lat</th>
    <th>Lon</th>
    <th>Alt</th>
    <th>Speed</th>
    <th>Battery</th>
    <th>Action</th>
    </tr>
    </thead>
    <tbody>
    {data.map(row => (
    <tr key={row.id}>
    <td>{row.id}</td>
    <td>{row.time}</td>
    <td>{row.latitude}</td>
    <td>{row.longitude}</td>
    <td>{row.altitude}</td>
    <td>{row.speed}</td>
    <td>{row.battery}</td>
    <td>
    <button onClick={() => onDelete(row.id)}>Delete</button>
    </td>
    </tr>
    ))}
    </tbody>
    </table>
    );
}