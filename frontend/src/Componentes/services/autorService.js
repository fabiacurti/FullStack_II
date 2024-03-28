const API_BASE_URL = 'http://localhost:3001'

class AutorService{


    async getAllAutores(){
        try{
            const response = await fetch(`${API_BASE_URL}/autor/`)
            if(!response.ok){
                throw new Error('Erro ao buscar Autores')
            }
            const dados = await response.json()
            return dados


        }catch(error){
            console.error('Erro ao buscar autores: ', error);
            throw error;
        }


    }

    async getAutoresByID(ID){
        try{
            const response = await fetch(`${API_BASE_URL}/autor/${ID}`)
            if(!response.ok){
                throw new Error('Erro ao buscar Autores')
            }
            const dados = await response.json()
            return dados


        }catch(error){
            console.error('Erro ao buscar autores: ', error)
            throw error;
        }


    }

    async deleteAutor(id){
        try{
            const response = await fetch(`${API_BASE_URL}/autor/${id}`,{
                method:"DELETE",
            })
            if(!response.ok){
                throw new Error('Erro ao deletar autor!')
            }

        }catch(error){
            console.error('Erro ao deletar autor: ', error)
            throw error;
        }


    }

    async updateAutor(ID,autorData){
        try {
            const response = await fetch(`${API_BASE_URL}/autor/${ID}`,{
                method:"PUT",
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(autorData)

            })

            if(!response.ok){
                throw new Error('erro ao atualizar autor')
            }

        } catch (error){
            throw error;
        }
    }


    async createAutor(autorData){
        try{
            const response = await fetch(`${API_BASE_URL}/autor`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(autorData)
            })
            if(!response.ok){
                throw new Error('Erro ao cadastrar autor!')
            }

        }catch(error){
            throw error;
        }


    }

    async filtrar(filtroData) {
        try {
            const response = await fetch(`${API_BASE_URL}/autor/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filtroData)
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao filtrar autor! Status: ${response.status}, Mensagem: ${response.statusText}`);
            }
    
            return response.json();
        } catch (error) {
            throw error;
        }
    }
    


}
export default AutorService