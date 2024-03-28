const API_BASE_URL = 'http://localhost:3001';

class EditoraService{

    async getAllEditora(){
        try {
            const response = await fetch(`${API_BASE_URL}/editoras/`)

            if(!response.ok){
                throw new Error('Erro ao buscar Editora')
            }
             const dados = await response.json();
             return dados;


        } catch (error) {
            console.error('Erro ao buscar Editora:', error);

        }
    }

    
    async filtrar(filtroData){
        try {
            const response = await fetch(`${API_BASE_URL}/editoras/filtrar`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },

                body:JSON.stringify(filtroData)
            });
            if(!response.ok){
                throw new Error('Erro ao filtrar Editora')
            }
            return response.json()
        } catch (error) {
            throw error;
        }
    }


    async creatEditora(editoraData){
        try {
            const response = await fetch(`${API_BASE_URL}/editoras/`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },

                body:JSON.stringify(editoraData)
            })
            if(!response.ok){
                throw new Error('Erro ao cadastrar Editora')
            }
        } catch (error) {
            throw error;
        }
    }

    async updateEditora(id,editoraData){
        try {
            const response = await fetch(`${API_BASE_URL}/editoras/${id}`,{
                method:"PUT",
                headers:{
                    'Content-Type': 'application/json',
                },

                body:JSON.stringify(editoraData)
            })
            if(!response.ok){
                throw new Error('Erro ao atualizar Editora')
            }
        } catch (error) {
            throw error;
        }
    }

    

    async deleteEditora(id){
        try {
            const response = await fetch(`${API_BASE_URL}/editoras/${id}`,{
                method:"DELETE",
                
            })

            if(!response.ok){
                throw new Error('Erro ao deletar Editora')
            }
        } catch (error) {
            console.error('Erro ao deletar editora', error);
            throw error;
        }
    }
}
export default EditoraService;