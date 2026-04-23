/* IMPORTACIONES */
import { useState } from "react";
import { mockReadings } from "./data/mockReadings";
import SensorDashboard from "./components/SensorDashboard";

import './App.css'
import logo from "./assets/Logo-Insercor.webp";

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
    <main className="main">
      <header className="header">
        <div className="header-group">
          <img className="header-brand" src={logo} alt="logo insercor" />
          <h1 className="header-title">Monitor de Sensores</h1>
        </div>

        <button className="btn" onClick={addSimulated}>
          <span className="material-symbols-outlined">
            sync
          </span>
        </button>
      </header>
      <SensorDashboard readings={readings} />
    </main>
  );
}

export default App;
