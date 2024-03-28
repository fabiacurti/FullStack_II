import EditoraService from '../services/EditoraService.js';
import { useState } from 'react';


const editoraService = new EditoraService();

function FormFiltro({ onUpdate }) {
    const [filtroData,setFiltroData]=useState({Nome:""})

    const handleInputChange = async (event)=>{
        const {name,value} = event.target;
        setFiltroData({ ...filtroData, [name] : value })
    };
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            const editorasFiltradas = await editoraService.filtrar(filtroData);
            console.log("Clicou em Filtrar");
            onUpdate(editorasFiltradas);

        } catch (error) {
            console.log("Erro ao filtrar editora:");
        }
    };


    return ( 

        <form onSubmit={handleSubmit}>

        <div className="form-group col-md-5">
            <label htmlFor="Nome" className="form-label">Filtrar por Nome:</label>
            <input type="text" className="form-control" id="Nome" name="Nome" value={filtroData.Nome} onChange={handleInputChange} placeholder="Digite o Nome" />
          </div>
          <button className="btn btn-primary" id="btnFiltrar" type="submit">Filtrar</button>

        </form>
     );
}

export default FormFiltro;