/* import { useState } from "react";
import { mockReadings } from "./data/mockReadings";
import SensorDashboard from "./components/SensorDashboard";
 
export interface Reading {
  id: number;
  sensorName: string;
  timestamp: number;
  value: number | null;
  unit: string;
  status: "ok" | "warning" | "critical" | "offline";
}
 
function App() {
  const [readings, setReadings] = useState<Reading[]>(mockReadings);
 
  const addSimulated = () => {
    const newReading: Reading = {
      id: Date.now(),
      sensorName: "Sensor Simulado",
      timestamp: Date.now() / 1000,
      value: parseFloat((Math.random() * 30 + 10).toFixed(1)),
      unit: "MPa",
      status: "ok",
    };
    setReadings((current) => [...current, newReading]);
  };
 
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Monitor de Sensores Insercor</h1>
      <button onClick={addSimulated}>+ Simular lectura</button>
      <SensorDashboard readings={readings} />
    </div>
  );
}
 
export default App; */

import { useState, useEffect } from 'react'
 
export interface Reading {
  id: number
  sensorName: string
  timestamp: number
  value: number | null
  unit: string
  status: 'ok' | 'warning' | 'critical' | 'offline'
}
 
function App() {
  const [readings, setReadings] = useState<Reading[]>([])
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('https://api.insercor.internal/sensors/readings')
      .then(res => res.json())
      .then((data: Reading[]) => {
        setReadings(data)   // ← bug 1 OK
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])               // ← bug 2 OK
 
  const addSimulated = () => {
    const newReading: Reading = {
      id: Date.now(),
      sensorName: 'Sensor Simulado',
      timestamp: Date.now() / 1000,
      value: parseFloat((Math.random() * 30 + 10).toFixed(1)),
      unit: 'MPa',
      status: 'ok',
    }
    setReadings([...readings, newReading])      // ← bug 3 OK
  }
 
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Monitor de Sensores Insercor</h1>
      <button onClick={addSimulated}>+ Simular lectura</button>
 
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <ul>
          {readings.map((r, i) => (
            <li key={r.id}>          {/* ← bug 4 */}
              [{r.status.toUpperCase()}] {r.sensorName} —{' '}
              {r.value?.toFixed(2)} {r.unit} {/* ← bug 5 */}
              — {new Date(r.timestamp * 1000).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
 
export default App