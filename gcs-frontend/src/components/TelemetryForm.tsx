import { useState } from "react";
import type { Telemetry } from "../types/telemetry";

interface Props {
    onSuccess: () => void;
}

export default function TelemetryForm({ onSuccess }: Props) {
    const [form, setForm] = useState<Omit<Telemetry, "id">>({
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

    const submit = async () => {
        if (!validate()) {
            alert("Invalid input");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/telemetry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            onSuccess(); // 🔥 trigger refetch
        } catch (err) {
            console.error("Submit failed:", err);
            alert("Failed to submit telemetry");
        }
    };

    return (
        <div>
            <h3>Add Telemetry</h3>

            {Object.keys(form).map((key) => (
                <input
                    key={key}
                    placeholder={key}
                    type={key === "time" ? "text" : "number"}
                    value={(form as any)[key]}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            [key]:
                                key === "time"
                                    ? e.target.value
                                    : Number(e.target.value),
                        })
                    }
                />
            ))}

            <button onClick={submit}>Submit</button>
        </div>
    );
}
