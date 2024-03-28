const API_BASE_URL = 'http://localhost:3001';

class AlunoProfessorService{

    async getAllAlunoProfessor(){
        try {
            const response = await fetch(`${API_BASE_URL}/Aluno&Professor/`)

            if(!response.ok){
                throw new Error('Erro ao buscar Aluno e Professores')
            }
             const dados = await response.json();
             return dados;


        } catch (error) {
            console.error('Erro ao buscar Aluno e Professores:', error);

        }
    }

    
    async filtrar(filtroData){
        try {
            const response = await fetch(`${API_BASE_URL}/Aluno&Professor/filtrar`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },

                body:JSON.stringify(filtroData)
            });
            if(!response.ok){
                throw new Error('Erro ao filtrar Aluno ou Professor')
            }
            return response.json()
        } catch (error) {
            throw error;
        }
    }


    async createAlunoProfessor(alunoprofessorData){
        try {
            const response = await fetch(`${API_BASE_URL}/Aluno&Professor/`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },

                body:JSON.stringify(alunoprofessorData)
            })
            if(!response.ok){
                throw new Error('Erro ao cadastrar Aluno ou Professor')
            }
        } catch (error) {
            throw error;
        }
    }

    async updateAlunoProfessor(cpf,alunoprofessorData){
        try {
            const response = await fetch(`${API_BASE_URL}/Aluno&Professor/${cpf}`,{
                method:"PUT",
                headers:{
                    'Content-Type': 'application/json',
                },

                body:JSON.stringify(alunoprofessorData)
            })
            if(!response.ok){
                throw new Error('Erro ao atualizar Aluno ou Professor')
            }
        } catch (error) {
            throw error;
        }
    }

    

    async deleteAlunoProfessor(cpf){
        try {
            const response = await fetch(`${API_BASE_URL}/Aluno&Professor/${cpf}`,{
                method:"DELETE",
                
            })

            if(!response.ok){
                throw new Error('Erro ao deletar aluno e professor')
            }
        } catch (error) {
            console.error('Erro ao deletar aluno ou professor', error);
            throw error;
        }
    }
}
export default AlunoProfessorService;