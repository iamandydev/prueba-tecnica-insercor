/* IMPORTACIONES */
import { useState } from "react";
import { mockReadings } from "./data/mockReadings";
import SensorDashboard from "./components/SensorDashboard";

/* Estructura de cada lectura */
export interface Reading {
  id: number;
  sensorName: string;
  timestamp: number;
  value: number | null;
  unit: string;
  status: "ok" | "warning" | "critical" | "offline";
}

/* Componente principal */
function App() {
  /* Inicializa el estado de las lecturas a partir de Reading[] */
  const [readings, setReadings] = useState<Reading[]>(mockReadings);

  /* Simula una nueva lectura */
  const addSimulated = () => {
    /* Define un nuevo objeto siguiendo la interfaz */
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

export default App;
