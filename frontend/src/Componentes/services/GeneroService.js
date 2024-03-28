const API_BASE_URL = "http://localhost:3001";

class GeneroService {
    async obterTodosGeneros() {
        const response = await fetch(`${API_BASE_URL}/genero`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if (!response.ok) {
            console.log('Erro ');
        }

        const dados = await response.json();
        return dados;
    }

    async cadastrarGenero(generoData) {
        try {
            const response = await fetch(`${API_BASE_URL}/genero`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(generoData),
            });

            if (!response.ok) {
                console.error('Erro ao cadastrar gênero:', response.statusText);
                throw new Error('Erro ao cadastrar gênero.');
            }

            const resultado = await response.json();
            return resultado;
        } catch (error) {
            console.error('Erro ao cadastrar gênero:', error.message);
            throw error;
        }
    }
    async updateGenero(id, dadosGenero) {
        const response = await fetch(`http://localhost:3001/genero/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosGenero),
        });
    
        if (!response.ok) {
            throw new Error('Erro ao editar gênero.');
        }
    
        return response.json();
    }
    


    async deleteGenero(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/genero/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar gênero!');
            }
        } catch (error) {
            console.error('Erro ao deletar gênero: ', error);
            throw error;
        }
    }

}
export default GeneroService;
