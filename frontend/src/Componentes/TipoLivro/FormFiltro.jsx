import { useState } from "react";
import TipoLivroService from "../services/tipoLivroService";
import './TipoLivro.css';

const tipoLivroService = new TipoLivroService();

function FormFiltro({ onUpdate }) {
    const [filtroData, setFiltroData] = useState({ Genero: 'Todos', Nome: '' });

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setFiltroData({ ...filtroData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const tipoLivrosFiltrados = await tipoLivroService.filtrar(filtroData);
            onUpdate(tipoLivrosFiltrados);
        } catch (error) {
            console.log("Erro ao filtrar tipoLivros:");
        }
    };
    return (
        <div className="row">
            <form onSubmit={handleSubmit} className="mb-3">
                <h3>Filtrar Tipo Livro</h3>
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
                            <label className="input-group-text">Faixa Etária:</label>
                            <select
                                name="Genero"
                                value={filtroData.Genero}
                                onChange={handleInputChange}
                                className="form-select"
                                id="inputGroupSelect01"
                            >
                                <option value="Livre">Livre</option>
                                <option value="10 Anos">10 anos</option>
                                <option value="12 Anos">12 anos</option>
                                <option value="14 Anos">14 anos</option>
                                <option value="16 Anos">16 anos</option>
                                <option value="18 Anos">18 anos</option>
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
