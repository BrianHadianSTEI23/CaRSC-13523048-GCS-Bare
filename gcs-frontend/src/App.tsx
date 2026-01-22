import { useEffect, useState } from "react";
import type { Telemetry } from "./types/telemetry";
import { addTelemetry, deleteTelemetry, getTelemetry } from "./api/telemetry";
import TelemetryForm from "./components/TelemetryForm.tsx";
import TelemetryTable from "./components/TelemetryTable.tsx";


export default function App() {
  const [data, setData] = useState<Telemetry[]>([]);


  const refresh = async () => {
    setData(await getTelemetry());
  };


  useEffect(() => {
    refresh();
  }, []);


  return (
  <div>
    <TelemetryForm onSubmit={async d => { await addTelemetry(d); refresh(); }} />
    <TelemetryTable data={data} onDelete={async id  => { await deleteTelemetry(id); refresh(); }} />
  </div>
  );
}