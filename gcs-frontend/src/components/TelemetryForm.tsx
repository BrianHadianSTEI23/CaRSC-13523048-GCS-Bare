import { useState } from "react";
import type { Telemetry } from "../types/telemetry";


interface Props {
onSubmit: (data: Omit<Telemetry, "id">) => void;
}


export default function TelemetryForm({ onSubmit }: Props) {
const [form, setForm] = useState({
time: "",
latitude: 0,
longitude: 0,
altitude: 0,
speed: 0,
battery: 100,
});


const validate = () => {
return (
form.latitude >= -90 && form.latitude <= 90 &&
form.longitude >= -180 && form.longitude <= 180 &&
form.altitude >= 0 &&
form.speed >= 0 &&
form.battery >= 0 && form.battery <= 100
);
};


const submit = () => {
if (!validate()) {
alert("Invalid input");
return;
}
onSubmit(form);
};


return (
<div>
<h3>Add Telemetry</h3>
{Object.keys(form).map(key => (
<input
key={key}
placeholder={key}
type={key === "time" ? "text" : "number"}
onChange={e =>
setForm({ ...form, [key]: key === "time" ? e.target.value : Number(e.target.value) })
}
/>
))}
<button onClick={submit}>Submit</button>
</div>
);
}