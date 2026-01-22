import { useState } from "react";
import type { Telemetry } from "../types/telemetry";

interface Props {
    onSuccess: () => void;
}

const API_URL = "http://backend:8000";

export default function TelemetryForm({ onSuccess }: Props) {
    const [form, setForm] = useState<Omit<Telemetry, "id">>({
        time: "",
        latitude: 0,
        longitude: 0,
        altitude: 0,
        speed: 0,
        battery: 100,
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);
        setSubmitting(true);

        try {
            const res = await fetch(`${API_URL}/telemetry`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error(await res.text());

            onSuccess();
            setForm({ ...form, time: "" }); // soft reset
        } catch {
            setError("Failed to submit telemetry");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
            <h2>Add Telemetry</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Time">
                    <input
                        type="text"
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                    />
                </Field>

                <Field label="Latitude (°)">
                    <input
                        type="number"
                        min={-90}
                        max={90}
                        value={form.latitude}
                        onChange={(e) => setForm({ ...form, latitude: +e.target.value })}
                    />
                </Field>

                <Field label="Longitude (°)">
                    <input
                        type="number"
                        min={-180}
                        max={180}
                        value={form.longitude}
                        onChange={(e) => setForm({ ...form, longitude: +e.target.value })}
                    />
                </Field>

                <Field label="Altitude (m)">
                    <input
                        type="number"
                        min={0}
                        value={form.altitude}
                        onChange={(e) => setForm({ ...form, altitude: +e.target.value })}
                    />
                </Field>

                <Field label="Speed (m/s)">
                    <input
                        type="number"
                        min={0}
                        value={form.speed}
                        onChange={(e) => setForm({ ...form, speed: +e.target.value })}
                    />
                </Field>

                <Field label="Battery (%)">
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={form.battery}
                        onChange={(e) => setForm({ ...form, battery: +e.target.value })}
                    />
                </Field>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
                onClick={submit}
                disabled={submitting}
                style={{ marginTop: 16 }}
            >
                {submitting ? "Submitting..." : "Submit"}
            </button>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span>{label}</span>
            {children}
        </label>
    );
}
