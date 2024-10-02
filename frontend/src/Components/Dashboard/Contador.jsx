import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imagen from "../../LoginAssets/ImagenMAG.jpg";
import Calendar from "react-calendar";
import "./Contador.scss";
import { FaSignOutAlt, FaUpload, FaDownload } from "react-icons/fa";
import { getProcesses } from "../../../../backend/services/processesService";
import { uploadFile, getFiles, downloadFile } from "../../../../backend/services/fileService";

const Contador = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [processes, setProcesses] = useState([]);
  const [filteredProcesses, setFilteredProcesses] = useState([]);
  const [selectedProcessId, setSelectedProcessId] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const nombreCompleto = localStorage.getItem("nombre_completo");

  // Obtener los procesos cuando el componente se monta
  useEffect(() => {
    fetchProcesses();
  }, []);

  // Llamar al servicio para obtener los procesos
  const fetchProcesses = async () => {
    const response = await getProcesses();
    if (response) {
      setProcesses(response);
      setFilteredProcesses(response);
    }
  };

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("nombre_completo");
    navigate("/");
  };

  // Abrir el modal de subida de archivos
  const openUploadModal = (processId) => {
    setSelectedProcessId(processId); // Asignar el ID del proceso al estado
    setShowUploadModal(true);
  };

  // Cerrar el modal de subida de archivos
  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedProcessId) {
      alert("Seleccione un archivo y un proceso válido.");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('process_id', selectedProcessId);
  
    try {
      const response = await axios.post('http://localhost:5173/api/files/upload', formData);
      if (response.status === 200) {
        alert('Archivo subido exitosamente.');
        closeUploadModal();
      } else {
        alert('Error al subir el archivo.');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };
  
  
  // Abrir el modal de lista de archivos
  const openFilesModal = async (processId) => {
    setSelectedProcessId(processId);
    const response = await getFiles(processId); // Obtener la lista de archivos del proceso
    if (response) setFileList(response);
    setShowFilesModal(true);
  };

  // Cerrar el modal de lista de archivos
  const closeFilesModal = () => setShowFilesModal(false);

  return (
    <div className="contador-container">
      <header className="header">
        <div className="company-image">
          <img src={imagen} alt="Company Logo" className="small-logo" />
        </div>
        <div className="header-title">
          <h2>Interface Contador</h2>
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
          <h2>Lista de procesos del Contador</h2>
          <div className="individual-percentage-section">
            <div className="fixed-headers" style={{ position: "sticky", top: 0 }}>
              <table className="individual-performance">
                <thead>
                  <tr>
                    <th>Proceso</th>
                    <th>Compañía</th>
                    <th>Estado</th>
                    <th>Contador</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProcesses.length > 0 ? (
                    filteredProcesses.map((process, index) => (
                      <tr key={index}>
                        <td>{process.id}</td>
                        <td>{process.Compania}</td>
                        <td>{process.Estado}</td>
                        <td>{process.Contador}</td>
                        <td>
                          <FaUpload
                            className="icon-button"
                            onClick={() => openUploadModal(process.id)}
                            title="Subir Archivo"
                          />
                          <FaDownload
                            className="icon-button"
                            onClick={() => openFilesModal(process.id)}
                            title="Descargar Archivos"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No se encontraron procesos asignados.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="right-section">
          <div className="calendar-section">
            <h2>Fecha de entregas importantes</h2>
            <Calendar onChange={setSelectedDate} value={selectedDate} calendarContainerClassName="small-calendar" />
          </div>
        </section>
      </main>

      {/* Modal de Subida de Archivos */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h3>Subir Archivo para Proceso ID: {selectedProcessId}</h3>
              <form onSubmit={handleFileUpload}>
                <div className="form-group">
                  <label>Seleccione el archivo:</label>
                  <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} required />
                </div>
                <div className="button-group">
                  <button type="submit" className="modal-button add-button">Subir</button>
                  <button type="button" className="modal-button cancel-button" onClick={closeUploadModal}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Lista de Archivos */}
      {showFilesModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h3>Archivos del Proceso ID: {selectedProcessId}</h3>
              <ul className="file-list">
                {fileList.length > 0 ? (
                  fileList.map((file) => (
                    <li key={file.id}>
                      {file.file_name}
                      <button onClick={() => downloadFile(file.id)} className="modal-button">
                        Descargar
                      </button>
                    </li>
                  ))
                ) : (
                  <li>No hay archivos asociados a este proceso.</li>
                )}
              </ul>
              <div className="button-group">
                <button type="button" className="modal-button cancel-button" onClick={closeFilesModal}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contador;
