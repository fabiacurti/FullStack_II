import React, { useState, useEffect } from 'react';
import TipoLivroService from '../services/tipoLivroService.js';
import FormTipoLivro from './FormTipoLivro.jsx';
import FormFiltro from './FormFiltro.jsx';


const tipoLivroService = new TipoLivroService()


function TabelaTipoLivro({ atualizar }) {

    const [confirmacaoDelete, setConfirmacaoDelete] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [tipoLivros, setTipoLivros] = useState([]);

    const carregaTipoLivros = async () => {
        try {
            const dados = await tipoLivroService.getAllTipoLivros();
            setTipoLivros(dados);
        } catch (error) {
            console.error("Erro ao carregar os tipoLivros: ", error);
        }
    };

    useEffect(() => {
        carregaTipoLivros();
    }, [atualizar]);


    const handleDelete = async (ID) => {
        setConfirmacaoDelete(ID);
        setShowConfirmation(true);
    };


    const confirmDelete = async () => {
        if (confirmacaoDelete) {
            await tipoLivroService.deleteTipoLivro(confirmacaoDelete);
            const dados = await tipoLivroService.getAllTipoLivros();
            setTipoLivros(dados);
            setConfirmacaoDelete(null);
        }
        setShowConfirmation(false);
    };

    const cancelDelete = () => {
        setConfirmacaoDelete(null);
        setShowConfirmation(false);
    };

    const [selectedTipoLivro, setSelectedTipoLivro] = useState(null)
    const handleEdit = async (tipoLivro) => {
        setSelectedTipoLivro(tipoLivro)
    }


    const handleUpdate = async () => {
        await carregaTipoLivros()
    }


    const handleUpDateFiltro = async (tipoLivrosFiltrados) => {
        setTipoLivros(tipoLivrosFiltrados)
    }

    return (
        <>
            <FormTipoLivro selectedTipoLivro={selectedTipoLivro} onUpdate={handleUpdate}></FormTipoLivro>
            <div className='conteudo-extra'>
                <FormFiltro onUpdate={handleUpDateFiltro}></FormFiltro>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Faixa Etaria</th>
                            <th scope="col">Nivel Leitura</th>
                            <th scope="col">Formato</th>
                            <th scope="col">Ações</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            tipoLivros.map((tipoLivro => (
                                <tr>
                                    <th scope="row ">{tipoLivro.ID}</th>
                                    <td >{tipoLivro.nome}</td>
                                    <td>{tipoLivro.faixaEtaria}</td>
                                    <td>{tipoLivro.nivelLeitura}</td>
                                    <td>{tipoLivro.formato}</td>
                                    <td>
                                        <button type='button' onClick={() => handleDelete(tipoLivro.ID)} className="btn btn-danger">EXCLUIR</button>
                                        <button type='button' onClick={() => handleEdit(tipoLivro)} className="btn btn-primary">EDITAR</button>
                                    </td>

                                </tr>
                            )))
                        }
                    </tbody>

                </table>
                {showConfirmation && (
                    <div className="confirmation">
                        <p>Confirme a exclusão do tipo do livro?</p>
                        <button className="btn btn-danger" onClick={confirmDelete}>
                            Sim
                        </button>
                        <button className="btn btn-primary" onClick={cancelDelete}>
                            Não
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default TabelaTipoLivro;
