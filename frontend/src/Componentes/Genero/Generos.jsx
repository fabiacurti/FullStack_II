import React, { useState, useEffect } from 'react';
import Cabecalho_Generos from './Cabecalho_Generos';
import './Generos.css';
import GeneroService from '../services/GeneroService';

function Generos() {
  const [generos, setGeneros] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [genero, setGenero] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const generoService = new GeneroService();

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch('http://localhost:3001/genero');
        const data = await response.json();
        setGeneros(data);
      } catch (error) {
        console.error('Erro ao obter gêneros:', error);
        setMensagemErro('Erro ao obter gêneros do servidor.');
      }
    };

    fetchGeneros();
  }, []);

  const handleCadastrar = async () => {
    try {
      const generoData = { codigo, descricao: genero, isAtivo: true };
      const response = await generoService.cadastrarGenero(generoData);

      if (response.success) {
        setGeneros([...generos, { ...generoData, id: response.id }]);
        setCodigo('');
        setGenero('');
        setMensagemErro('');
      } else {
        setMensagemErro('Erro ao cadastrar gênero.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar gênero:', error.message);
      setMensagemErro('Erro ao cadastrar gênero.');
    }
  };

  const handleExcluir = async (id) => {
    await generoService.deleteGenero(id);
    setGeneros(generos.filter((item) => item.id !== id));
  };

  const handleEditar = async () => {
    try {
      const response = await generoService.updateGenero(editingId, { descricao: editedName });
  
      if (response.success) {
        const novosGeneros = generos.map((item) =>
          item.id === editingId ? { ...item, descricao: editedName } : item
        );
        setGeneros(novosGeneros);
        setEditingId(null);
        setEditedName('');
      } else {
        setMensagemErro(response.message);
      }
    } catch (error) {
      console.error('Erro ao editar gênero:', error.message);
      setMensagemErro('Erro ao editar gênero.');
    }
  };
  

  const handleIniciarEdicao = (id, descricao) => {
    setEditingId(id);
    setEditedName(descricao);
  };

  return (
    <>
      <Cabecalho_Generos />
      <div className="container fundoss">
        <div className="formulario fundo">
          <div className="mb-3">
            <label htmlFor="codigo" className="form-label">
              Código do Gênero
            </label>
            <input
              type="text"
              className="form-control"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="genero" className="form-label">
              Gênero
            </label>
            <input
              type="text"
              className="form-control"
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleCadastrar}
            >
              Cadastrar
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                setCodigo('');
                setGenero('');
                setMensagemErro('');
              }}
            >
              Limpar
            </button>
          </div>

          {mensagemErro && (
            <div className="alert alert-danger mt-3" role="alert">
              {mensagemErro}
            </div>
          )}
        </div>

        <div className="conteudo-extra">
          <div id="tabela">
            <div id="espacoTabela"></div>
            {generos.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Gênero</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {generos.map((item) => (
                    <tr key={item.id}>
                      <td>{item.codigo}</td>
                      <td>
                        {editingId === item.id ? (
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                          />
                        ) : (
                          item.descricao
                        )}
                      </td>
                      <td>
                        {editingId === item.id ? (
                          <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={handleEditar}
                          >
                            <i className="bi bi-check"></i> Salvar
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn btn-outline-primary"
                              type="button"
                              onClick={() =>
                                handleIniciarEdicao(item.id, item.descricao)
                              }
                            >
                              <i className="bi bi-pencil-square"></i> Editar
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              type="button"
                              onClick={() => handleExcluir(item.id)}
                            >
                              <i className="bi bi-trash3"></i> Excluir
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum gênero encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Generos;
