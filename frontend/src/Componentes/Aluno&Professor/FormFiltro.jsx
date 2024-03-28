import AlunoProfessorService from '../services/alunoprofessorService';
import './Conteudo.css'
import './Suport.css'
import { useState } from 'react';
import InputMask from 'react-input-mask';

const alunoprofessorService = new AlunoProfessorService();
function FormFiltro({ onUpdate }) {
    const [filtroData,setFiltroData]=useState({Nome:"",TipoPessoa:"Todos"})

    const handleInputChange = async (event)=>{
        const {name,value} = event.target;
        setFiltroData({ ...filtroData, [name] : value })
    };
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            const alunoprofessoresFiltradas = await alunoprofessorService.filtrar(filtroData);
            console.log("Clicou em Filtrar");
            onUpdate(alunoprofessoresFiltradas);

        } catch (error) {
            console.log("Erro ao filtrar aluno Professor:");
        }
    };

    return ( 
       <form onSubmit={handleSubmit}>
       
       <div className={`col-md-3`}>
                    <label htmlFor="Nome" className="form-label">Nome:</label>
                    <InputMask type="text" mask="" className={`form-control rounded `} id="Nome" name="Nome" placeholder="Nome do aluno ou professor" value={filtroData.Nome} onChange={handleInputChange} />
                    
                        <div className="invalid-feedback">
                        {'Por Favor, digite o Nome! Digite pelo menos 4 letras, apenas letras são permitidas.'}
                        </div>
            </div>
            <div className="Posicao col-md-4 ">
                        <label htmlFor="TipoPessoa" className="form-label">
                            Pessoa:
                        </label>
                        <select className="form-select" id="TipoPessoa" name="TipoPessoa" value={filtroData.TipoPessoa} onChange={handleInputChange} >
                            <option selected disabled value="">
                                Tipo de pessoa...
                            </option>
                            <option value="Todos">Todos</option>
                            <option value="Aluno">Aluno</option>
                            <option value="Professor">Professor</option>
                        </select>
                    </div>
            <button className="btn btn-success mov" id="cadastrar" type="submit"><i class="bi bi-search"></i>  </button>
       </form>
     );
}

export default FormFiltro;