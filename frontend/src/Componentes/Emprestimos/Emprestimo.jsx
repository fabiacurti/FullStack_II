import React, { useState, useEffect } from 'react';
import CabecalhoEmprestimo from './Cabecalho_Emprestimo';
import './Cabecalho_Emprestimo.css';
import EmprestimoService from '../services/emprestimoService.js';
import LivroService from '../services/livroService.js';
import AlunoProfessorService from '../services/alunoprofessorService.js';

function Emprestimo() {
    const [emprestimos, setEmprestimos] = useState([]);
    const [livros, setLivros] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [codigoLivro, setCodigoLivro] = useState('');
    const [cpfAluno, setCpfAluno] = useState({});
    const [mensagemErro, setMensagemErro] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [dataEmprestimo, setDataEmprestimo] = useState('');
    const [dataDevolucao, setDataDevolucao] = useState('');
    const emprestimoService = new EmprestimoService();
    const livroService = new LivroService();
    const alunoService = new AlunoProfessorService()

    useEffect(() => {
        const fetchEmprestimos = async () => {
            try {
                const response = await emprestimoService.obterListaEmprestimo();
                setEmprestimos(response);
            } catch (error) {
                console.error('Erro ao obter o empréstimo:', error);
                setMensagemErro('Erro ao obter a lista de empréstimos do servidor.');
            }
        };

        const fetchLivros = async () => {
            try {
                const response = await livroService.getAllLivros();
                setLivros(response);
            } catch (error) {
                console.error('Erro ao obter lista de livros:', error);
                setMensagemErro('Erro ao obter a lista de livros do servidor.');
            }
        };

        const fetchAlunos = async () => {
            try {
                const response = await alunoService.getAllAlunoProfessor();
                if (response.length > 0) {
                    setCpfAluno(response[0]);
                }
                setAlunos(response);
                setCpfAluno(response);
            } catch (error) {
                console.error('Erro ao obter lista de alunos:', error);
                setMensagemErro('Erro ao obter a lista de alunos do servidor.');
            }
        };

        fetchLivros();
        fetchAlunos();
        fetchEmprestimos();
    }, []);

    const handleCadastrar = async () => {
        try {
            const novoEmprestimo = {
                idLivro: codigoLivro,
                idUsuario: cpfAluno,
                dataEmprestimo,
                dataDevolucao,
                isAtivo: 1,
            };

            await emprestimoService.criarEmprestimo(novoEmprestimo);

            setCodigoLivro('');
            setCpfAluno('');
            setDataEmprestimo('');
            setDataDevolucao('');
            setMensagemErro('');

            const response = await emprestimoService.obterListaEmprestimo();
            setEmprestimos(response);
        } catch (error) {
            console.error('Erro ao cadastrar empréstimo:', error.message);
            setMensagemErro('Erro ao cadastrar empréstimo.');
        }
    };


    const handleEditar = async (id) => {
        try {
            const emprestimoParaEditar = emprestimos.find(emprestimo => emprestimo.id === id);
            if (!emprestimoParaEditar) {
                console.error('Empréstimo não encontrado para edição.');
                return;
            }
            setEditingId(id);
            setEditedName(emprestimoParaEditar.NomeLivro);
            setCodigoLivro(emprestimoParaEditar.idLivro);
            setCpfAluno(emprestimoParaEditar.idUsuario);
            setDataEmprestimo(emprestimoParaEditar.dataEmprestimo);
            setDataDevolucao(emprestimoParaEditar.dataDevolucao);
        } catch (error) {
            console.error('Erro ao iniciar edição:', error.message);
            setMensagemErro('Erro ao iniciar edição.');
        }
    };
    const handleDelete = async (id) => {
        try {
            await emprestimoService.deletarEmprestimo(id);
            const updatedEmprestimos = emprestimos.filter(emprestimo => emprestimo.id !== id); // Correção: "emprestimo.codigo" para "emprestimo.id"
            setEmprestimos(updatedEmprestimos);
        } catch (error) {
            console.error('Erro ao excluir o empréstimo:', error.message);
            setMensagemErro('Erro ao excluir o empréstimo.');
        }
    };


    return (
        <>
            <CabecalhoEmprestimo />
            <div className="container fundoss">
                <div className="formulario fundo">
                    <div className="mb-3">
                        <label htmlFor="livro" className="form-label">
                            Livro
                        </label>
                        <select
                            className="form-select"
                            id="livro"
                            value={codigoLivro}
                            onChange={(e) => setCodigoLivro(e.target.value)}
                        >
                            <option value="">Selecione um livro</option>
                            {livros.map((livro) => (
                                <option key={livro.codigoLivro} value={livro.codigoLivro}>
                                    {livro.NomeLivro}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="aluno" className="form-label">
                            Aluno
                        </label>
                        <select
                            className="form-select"
                            id="aluno"
                            value={cpfAluno || ''}
                            onChange={(e) => setCpfAluno(e.target.value)}
                        >
                            <option value="">Selecione um aluno</option>
                            {alunos.map((aluno) => (
                                <option key={aluno.cpf} value={aluno.cpf}>
                                    {aluno.Nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dataEmprestimo" className="form-label">
                            Data do Empréstimo
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dataEmprestimo"
                            value={dataEmprestimo}
                            onChange={(e) => setDataEmprestimo(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dataDevolucao" className="form-label">
                            Data de Devolução
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dataDevolucao"
                            value={dataDevolucao}
                            onChange={(e) => setDataDevolucao(e.target.value)}
                        />
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleCadastrar}
                        >
                            Pesquisar
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => {
                                setCodigoLivro('');
                                setIdUsuario('');
                                setDataEmprestimo('');
                                setDataDevolucao('');
                                setMensagemErro('');
                            }}
                        >
                            Limpar
                        </button>
                    </div>
                    <div className="mt-3">
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={handleCadastrar}
                        >
                            Cadastrar Novo Empréstimo
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
                        {emprestimos.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Data do Empréstimo</th>
                                        <th scope="col">Data de Devolução</th>
                                        <th scope="col">Livro</th>
                                        <th scope="col">Usuário</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emprestimos.map((emprestimo) => (
                                        <tr key={emprestimo.id}>
                                            <td>{new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</td>
                                            <td>{new Date(emprestimo.dataDevolucao).toLocaleDateString()}</td>
                                            <td>{emprestimo.NomeLivro}</td>
                                            <td>{emprestimo.NomeUsuario}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(emprestimo.id)}
                                                    className="btn btn-danger"
                                                >
                                                    Excluir
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleEditar(emprestimo.id)}
                                                    className="btn btn-primary"
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Nenhum empréstimo encontrado.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Emprestimo;
