const API_BASE_URL = 'http://localhost:3001';

class EmprestimoService {
    async obterListaEmprestimo() {
        try {
            const response = await fetch(`${API_BASE_URL}/registroEmprestimo`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao obter lista de empréstimos');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            throw new Error(`Erro na requisição: ${error.message}`);
        }
    }

    async criarEmprestimo(dadosEmprestimo) {
        try {
            const response = await fetch(`${API_BASE_URL}/registroEmprestimo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosEmprestimo)
            });
            if (!response.ok) {
                throw new Error('Erro ao criar empréstimo');
            }

            const novoEmprestimo = await response.json();
            return novoEmprestimo;
        } catch (error) {
            throw new Error(`Erro na requisição: ${error.message}`);
        }
    }

    async deletarEmprestimo(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/registroEmprestimo/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar empréstimo');
            }
        } catch (error) {
            throw new Error(`Erro na requisição: ${error.message}`);
        }
    }

    async atualizarEmprestimo(id, dadosAtualizados) {
        try {
            const response = await fetch(`${API_BASE_URL}/registroEmprestimo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAtualizados)
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar empréstimo');
            }
        } catch (error) {
            throw new Error(`Erro na requisição: ${error.message}`);
        }
    }

    async darBaixaEmprestimo(id, dadosBaixa) {
        try {
            const response = await fetch(`${API_BASE_URL}/registroEmprestimo/${id}/baixa`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosBaixa)
            });
            if (!response.ok) {
                throw new Error('Erro ao dar baixa no empréstimo');
            }
        } catch (error) {
            throw new Error(`Erro na requisição: ${error.message}`);
        }
    }
    async filtrar(filtroData) {
        try {
            const response = await fetch(`${API_BASE_URL}/registroEmprestimo/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filtroData)
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao filtrar empréstimo! Status: ${response.status}, Mensagem: ${response.statusText}`);
            }
    
            return response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default EmprestimoService;
