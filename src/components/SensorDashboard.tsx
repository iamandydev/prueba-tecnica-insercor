/* Importa la variable Reading creada en App */
import type { Reading } from "../App";
import './SensorDashboard.css';
import torre from '../assets/torre.jpg';

type Props = {
    readings: Reading[];
};

function SensorDashboard({ readings }: Props) {

    /* Define la logica para mostrar el contenido */
    const content = readings.length === 0 ? (
        <p>No hay lecturas</p>
    ) : (
        readings.map((reading) => (
            <div key={reading.id} className={'sensor ' + `status-${reading.status}`}>
                <img className="sensor-img" src={torre} alt={reading.sensorName} />
                <div className="sensor-info">
                    <span className={'sensor-tag '}>
                        {reading.sensorName}
                    </span>
                    <p className="sensor-value">{reading.value ?? "Sin dato"} {reading.unit}</p>
                </div>
            </div>
        ))
    );

    return (
        <section className="monitoring">
            {content}
        </section>
    );
}

export default SensorDashboard;