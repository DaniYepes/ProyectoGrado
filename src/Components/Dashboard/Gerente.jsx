import React, { useState } from "react";
import imagen from "../../LoginAssets/ImagenMAG.jpg";
import informe from "../../LoginAssets/Informe.png";
import Calendar from "react-calendar";
import "./Gerente.scss";

const Gerente = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="gerente-container">
      <header className="header">
        <div className="company-image">
          {/* Company image */}
          <img src={imagen} alt="Company Logo" className="small-logo" />
        </div>
        <div className="header-title">
          <h2>Interface Gerente</h2>
        </div>
      </header>
      <main className="main">
        <section className="left-section">
          <h2>Porcentaje de cumplimiento individual</h2>
          <div className="individual-percentage-section">
            <div
              className="fixed-headers"
              style={{ position: "sticky", top: 0 }}
            >
              <table className="individual-performance">
                <thead>
                  <tr>
                    <th>Cumplió</th>
                    <th>Coordinador asignado</th>
                    <th>Contador asignado</th>
                    <th>Compañías</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="scrollable-table">
              <table className="individual-performance">
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Pepito Perez</td>
                    <td>Pepito Perez</td>
                    <td>Compañía A</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Pepito Perez</td>
                    <td>Pepito Perez</td>
                    <td>Compañía B</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Pepito Perez</td>
                    <td>Pepito Perez</td>
                    <td>Compañía C</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Pepito Perez</td>
                    <td>Pepito Perez</td>
                    <td>Compañía D</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Pepito Perez</td>
                    <td>Pepito Perez</td>
                    <td>Compañía E</td>
                  </tr>
                  {/* Add more rows */}
                </tbody>
              </table>
            </div>
          </div>

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
                      <div className="fill" style={{ width: "75%" }}></div>
                    </div>
                  </td>
                </tr>
                {/* Add more counters */}
              </tbody>
            </table>
          </div>
        </section>
        <section className="right-section">
          <div className="calendar-section">
            <h2>Fecha de entregas importantes</h2>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              calendarContainerClassName="small-calendar"
            />
          </div>
          <div className="file-upload-section">
            <h2>Descargar Informe KPI's</h2>
            <div className="upload-image">
              <button>
                <img src={informe} alt="Upload Logo" className="small-logo" />
              </button>
            </div>
            <div className="file-upload-buttons">
              <button>Descargar archivos aprobación</button>
              <button>Enviar aprobación</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gerente;
