/* Importa la variable Reading creada en App */
import type { Reading } from "../App";

type Props = {
    readings: Reading[];
};

function SensorDashboard({ readings }: Props) {

    /* Define la logica para mostrar el contenido */
    const content = readings.length === 0 ? (
        <p>No hay lecturas</p>
    ) : (
        readings.map((reading) => (
            <div key={reading.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                <h3>{reading.sensorName}</h3>
                <p><strong>Valor:</strong> {reading.value ?? "Sin dato"} {reading.unit}</p>
                <p><strong>Estado:</strong> {reading.status}</p>
            </div>
        ))
    );

    return (
        <div>
            {content}
        </div>
    );
}

export default SensorDashboard;