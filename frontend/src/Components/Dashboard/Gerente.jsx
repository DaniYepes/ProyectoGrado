//frontend/src/Components/Dashboard/Coordinador.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imagen from "../../LoginAssets/ImagenMAG.jpg";
import Calendar from "react-calendar";
import "./Coordinador.scss";
import { FaSignOutAlt, FaPlusCircle, FaUser } from "react-icons/fa";
import { getProcesses } from "../../../../backend/services/processesService";
import { getContadores, getCompanies } from "../../../../backend/services/coordinatorService";

const Coordinador = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [contadores, setContadores] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedContador, setSelectedContador] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [processes, setProcesses] = useState([]);
  const [filteredProcesses, setFilteredProcesses] = useState([]);
  const [contadorFilter, setContadorFilter] = useState("");
  const [companiaFilter, setCompaniaFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  
  const navigate = useNavigate();
  const nombreCompleto = localStorage.getItem("nombre_completo");

  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    const response = await getProcesses();
    if (response) {
      setProcesses(response);
      setFilteredProcesses(response);
    }
  };

  useEffect(() => {
    filterProcesses();
  }, [contadorFilter, companiaFilter, estadoFilter]);

  const filterProcesses = () => {
    let filtered = processes;

    if (contadorFilter) {
      filtered = filtered.filter((process) =>
        process.Contador.toLowerCase().includes(contadorFilter.toLowerCase())
      );
    }
    if (companiaFilter) {
      filtered = filtered.filter((process) =>
        process.Compania.toLowerCase().includes(companiaFilter.toLowerCase())
      );
    }
    if (estadoFilter) {
      filtered = filtered.filter((process) =>
        process.Estado.toLowerCase().includes(estadoFilter.toLowerCase())
      );
    }

    setFilteredProcesses(filtered);
  };

  useEffect(() => {
    if (showModal) {
      fetchContadores();
      fetchCompanies();
    }
  }, [showModal]);

  const fetchContadores = async () => {
    const response = await getContadores();
    if (response) setContadores(response);
  };

  const fetchCompanies = async () => {
    const response = await getCompanies();
    if (response) setCompanies(response);
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

   // Función para redirigir a la página de registro
   const handleRegisterClick = () => {
    navigate('/Register'); // Navega a la página de registro de empleados
  };



  return (
    <div className="coordinador-container">
      <header className="header">
        <div className="company-image">
          <img src={imagen} alt="Company Logo" className="small-logo" />
        </div>
        <div className="header-title">
          <h2>Bienvenido, {nombreCompleto}</h2>
        </div>
        {/* Botones de registro de nuevos empleados y cerrar sesión */}
        <div className="header-actions">
          <button className="register-button" onClick={handleRegisterClick} title="Registrar nuevo empleado">
            <FaUser size={24} /> {/* Ícono de añadir empleado */}
          </button>
          </div>
        <div className="header-actions">
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt size={24} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <main className="main">
        <section className="left-section">
          <h2>Lista de procesos</h2>
          <div className="individual-percentage-section">
            <div className="fixed-headers" style={{ position: "sticky", top: 0 }}>
              <table className="individual-performance">
                <thead>
                  <tr>
                    <th>Proceso</th>
                    <th>
                      <input
                        type="text"
                        placeholder="Filtrar por Contador"
                        value={contadorFilter}
                        onChange={(e) => setContadorFilter(e.target.value)}
                        className="filter-input"
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder="Filtrar por Compañía"
                        value={companiaFilter}
                        onChange={(e) => setCompaniaFilter(e.target.value)}
                        className="filter-input"
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder="Filtrar por Estado"
                        value={estadoFilter}
                        onChange={(e) => setEstadoFilter(e.target.value)}
                        className="filter-input"
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>Proceso</th>
                    <th>Coordinador Asignado</th>
                    <th>Contador Asignado</th>
                    <th>Compañía</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProcesses.map((process, index) => (
                    <tr key={index}>
                      <td>{process.id}</td>
                      <td>{process.Coordinador}</td>
                      <td>{process.Contador}</td>
                      <td>{process.Compania}</td>
                      <td>{process.Estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          <div className="file-upload-section add-process-section">
            <h2>Añadir Proceso</h2>
            <div className="upload-image">
              <button onClick={openModal}>
                <FaPlusCircle size={50} color="#6a5acd" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h3>Añadir Proceso</h3>
              <form>
                <div className="form-group">
                  <label>Seleccionar Contador:</label>
                  <select value={selectedContador} onChange={(e) => setSelectedContador(e.target.value)} className="select-input">
                    <option value="">Seleccione un Contador</option>
                    {contadores.map((contador) => (
                      <option key={contador.id} value={contador.id}>
                        {contador.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Seleccionar Compañía:</label>
                  <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} className="select-input">
                    <option value="">Seleccione una Compañía</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Estado del Proceso:</label>
                  <select value={estado} onChange={(e) => setEstado(e.target.value)} className="select-input">
                    <option value="Activo">Activo</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Revisión">Revisión</option>
                    <option value="Completado">Completado</option>
                  </select>
                </div>

                <div className="button-group">
                  <button type="submit" className="modal-button add-button">Añadir</button>
                  <button type="button" className="modal-button cancel-button" onClick={closeModal}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>

    
  );
};

export default Coordinador;
