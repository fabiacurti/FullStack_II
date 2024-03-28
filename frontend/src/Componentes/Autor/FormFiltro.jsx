import { useState } from "react";
import AutorService from "../services/autorService";
import './Autor.css';

const autorService = new AutorService();

function FormFiltro({ onUpdate }) {
    const [filtroData, setFiltroData] = useState({ Genero: 'Todos', Nome: '' });

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setFiltroData({ ...filtroData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const autoresFiltrados = await autorService.filtrar(filtroData);
            onUpdate(autoresFiltrados);
        } catch (error) {
            console.log("Erro ao filtrar autores:");
        }
    };
    return (
        <div className="row">
            <form onSubmit={handleSubmit} className="mb-3">
                <h3>Filtrar Autor</h3>
                <div className="d-flex flex-wrap input-group mb-2">
                    <div className="mb-3">
                        <div className="input-group">
                            <label className="input-group-text custom-label-height">Nome:</label>
                            <input
                                type="text"
                                name="Nome"
                                id="inputNome"
                                value={filtroData.Nome}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mb-3 ms-md-3">
                        <div className="input-group">
                            <label className="input-group-text">Gênero:</label>
                            <select
                                name="Genero"
                                value={filtroData.Genero}
                                onChange={handleInputChange}
                                className="form-select"
                                id="inputGroupSelect01"
                            >
                                <option value="Todos">Todos</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                    </div>
                    <div className="ms-auto">
                        <button type="submit" className="btn btn-primary">
                            Filtrar
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default FormFiltro;
