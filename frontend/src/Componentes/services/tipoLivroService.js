const API_BASE_URL = 'http://localhost:3001'

class TipoLivroService{


    async getAllTipoLivros(){
        try{
            const response = await fetch(`${API_BASE_URL}/tipoLivro/`)
            if(!response.ok){
                throw new Error('Erro ao buscar tipo de Livros')
            }
            const dados = await response.json()
            return dados


        }catch(error){
            console.error('Erro ao buscar tipo de livros: ', error);
            throw error;
        }


    }

    async getTipoLivrosByID(ID){
        try{
            const response = await fetch(`${API_BASE_URL}/tipoLivro/${ID}`)
            if(!response.ok){
                throw new Error('Erro ao buscar tipo de livros')
            }
            const dados = await response.json()
            return dados


        }catch(error){
            console.error('Erro ao buscar tipo de livros: ', error)
            throw error;
        }


    }

    async deleteTipoLivro(id){
        try{
            const response = await fetch(`${API_BASE_URL}/tipoLivro/${id}`,{
                method:"DELETE",
            })
            if(!response.ok){
                throw new Error('Erro ao deletar tipoLivros!')
            }

        }catch(error){
            console.error('Erro ao deletar tipoLivros: ', error)
            throw error;
        }


    }

    async updateTipoLivro(ID,tipoLivroData){
        try {
            const response = await fetch(`${API_BASE_URL}/tipoLivro/${ID}`,{
                method:"PUT",
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(tipoLivroData)

            })

            if(!response.ok){
                throw new Error('erro ao atualizar tipoLivros')
            }

        } catch (error){
            throw error;
        }
    }


    async createTipoLivro(tipoLivroData){
        try{
            const response = await fetch(`${API_BASE_URL}/tipoLivro`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(tipoLivroData)
            })
            if(!response.ok){
                throw new Error('Erro ao cadastrar tipoLivros!')
            }

        }catch(error){
            throw error;
        }


    }

    async filtrar(filtroData) {
        try {
            const response = await fetch(`${API_BASE_URL}/tipoLivro/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filtroData)
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao filtrar tipoLivros! Status: ${response.status}, Mensagem: ${response.statusText}`);
            }
    
            return response.json();
        } catch (error) {
            throw error;
        }
    }
    


}
export default TipoLivroService