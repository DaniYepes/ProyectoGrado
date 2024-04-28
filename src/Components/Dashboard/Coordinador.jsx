import React, { useState } from 'react';
import imagen from '../../LoginAssets/ImagenMAG.jpg'
import Calendar from 'react-calendar'; 
import './Gerente.scss'; 

const Gerente = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  return (
    <div className="gerente-container">
      <div className="company-image">
        {/* Company image */}
        <img src={imagen} alt="Company Logo" className="small-logo" />
      </div>
      <div className="left-section">
        {/* Table for individual performance */}
        <h2>Porcentaje de cumplimiento individual</h2>
        <table className="individual-performance">
          <thead>
            <tr>
              <th>Cumplió</th>
              <th>Contador asignado</th>
              <th>Compañías</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Pepito Perez</td>
              <td>Compañía A</td>
            </tr>
            {/* Add more rows */}
          </tbody>
        </table>
        <h2>Porcentaje de cumplimiento</h2>
        <div className="percentage-section">
          <table className="percentage-table">
            <thead>
              <tr>
                <th>Contador</th>
                <th>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Contador 1</td>
                <td>
                  <div className="percentage-bar">
                    <div className="fill" style={{ width: '75%' }}></div>
                  </div>
                </td>
              </tr>
              {/* Add more counters */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="right-section">
        <div className="calendar-section">
          <h2>Fecha de entregas importantes</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
        <div className="file-upload-section">
          <h2>Carga de archivos para aprobación</h2>
          <div className="file-upload-buttons">
            <button>Cargar Archivos</button>
            <button>Enviar</button>
            <button>Descargar Base</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gerente;
