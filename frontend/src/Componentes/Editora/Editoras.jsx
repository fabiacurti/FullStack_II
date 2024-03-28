import React, { useEffect, useState } from 'react';
import Cabecalho_Editoras from './Cabecalho_Editoras.jsx';
import InputMask from 'react-input-mask';
import './Editoras.css';
import EditoraService from '../services/EditoraService.js';
import FormFiltro from './FormFiltro.jsx';



const editoraService = new EditoraService();




function Editoras() {
  const [CNPJValido, setCNPJValido] = useState(true);
  const [FundacaoValida] = useState(true);
  const [EmailValido] = useState(true);
  const [NomeValido] = useState(true);
  const [editora, setEditora] = useState([]);
  const [selectedEditora,setSelectedEditora]=useState(null)
  const [editoraData,setEditoraData] =useState({Nome:"",Fundacao:"",CNPJ:"",Contato:"",Email:""})

  
  const handleUpdateFiltro = async (editorasFiltradas) => {
    setEditora(editorasFiltradas)
};



const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Tem certeza que deseja excluir esta editora?');

  if (confirmDelete) {
    await editoraService.deleteEditora(id);
    await carregaEditoras();
  }
};


  useEffect(()=>{
  if(selectedEditora!=null){
    setEditoraData(selectedEditora)
  } } , [selectedEditora])

  const carregaEditoras= async ()=>{
    try {
      const dados= await editoraService.getAllEditora();
      setEditora(dados)
    } catch (error) {
      console.error('erro ao carregar livros', error)
    }
  }
  useEffect(()=>{
      carregaEditoras()
      
    },[]);

    const handleEdit = async(Editoras)=>{
      console.log('o')
      setSelectedEditora(Editoras)
    };


  const calcularDigitoVerificador = (CNPJ) => {
    const multiplicadores1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const multiplicadores2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const calcularDigito = (CNPJ, multiplicadores) => {
      let soma = 0;
      for (let i = 0; i < multiplicadores.length; i++) {
        soma += parseInt(CNPJ[i]) * multiplicadores[i];
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const digito1 = calcularDigito(CNPJ, multiplicadores1);
    const digito2 = calcularDigito(CNPJ + digito1, multiplicadores2);

    return `${digito1}${digito2}`;
  };

  const handleCNPJChange = (event) => {
    const CNPJValue = event.target.value.replace(/\D/g, '');

    if (CNPJValue.length === 14) {
      const digitoVerificador = calcularDigitoVerificador(CNPJValue.substr(0, 12));
      const isCNPJValid = CNPJValue.substr(12, 2) === digitoVerificador;
      setCNPJValido(isCNPJValid);
      event.target.setCustomValidity(isCNPJValid ? '' : 'Por favor, digite um CNPJ válido!');
    } else {
      setCNPJValido(false);
      event.target.setCustomValidity('Por favor, digite um CNPJ válido!');
    }
  };


//=======================


  const handleInputChange =(event)=>{
    const {name,value}=event.target;
    setEditoraData({...editoraData,[name]:value})
  }

  const handleSubmit=async (event)=>{
    event.preventDefault();
  try {
    if(selectedEditora==null){
      await editoraService.creatEditora(editoraData)
      alert('Editora cadastrada com sucesso')
    }else{
      await editoraService.updateEditora(selectedEditora.id,editoraData);
      console.log('i')
      alert ('Editora atualizada com sucesso')

    } 
    handleUpdate()
    setEditoraData({Nome:"",Fundacao:"",CNPJ:"",Contato:"",Email:""})

    
  }  catch (error) {
    alert('Editora não foi cadastrada')
  }
  }




const handleUpdate = async ()=> {
  await carregaEditoras()
}


  return (
    <>
      <Cabecalho_Editoras/>
      <div className='conterner'>
        <div className="formulario fundo">
          <form id="formCadastroEditora" className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
          
          <div className="form-group col-md-5">
        <label htmlFor="Nome" className="form-label">
          Nome da Editora:
        </label>
        <input
          type="text"
          className={`form-control rounded ${NomeValido ? '' : 'is-invalid'}`}
          id="Nome"
          name="Nome"
          value={editoraData.Nome}
          placeholder="Digite o Nome da Editora"
          minLength="5"
          required
          onChange={handleInputChange}
          
        />
        <div className="invalid-feedback">
          O Nome da Editora deve ter pelo menos 1 caractere.
        </div>
      </div>
            
        <div className="form-group col-md-5">
        <label htmlFor="Fundacao" className="form-label">Data de Fundação:</label>
        <input
          type="date"
          className={`form-control ${FundacaoValida ? '' : 'is-invalid'}`}
          id="Fundacao"
          name="Fundacao"
          value={editoraData.Fundacao}
          max={`${new Date().getFullYear() - 10}-${new Date().getMonth().toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`}
          required
          
          onChange={handleInputChange}
          maxLength="18"
        />
        <div className="invalid-feedback">
          A Data de Fundação não pode ser no futuro.
        </div>
      </div>
            
            
      <div className="form-group col-md-5">
        <label htmlFor="CNPJ" className="form-label">
          CNPJ:
        </label>
        <InputMask
          mask="99.999.999/9999-99"
          maskChar=""
          className={`form-control ${CNPJValido ? '' : 'is-invalid'}`}
          id="CNPJ"
          name="CNPJ"
          value={editoraData.CNPJ}
          placeholder="Digite o CNPJ"
          onBlur={handleCNPJChange}
          maxLength="18"
          required
          onChange={handleInputChange}
        />
        <div className="invalid-feedback">Por favor, digite um CNPJ válido!</div>
      </div>
            
            
            <div className="form-group col-md-5">
              <label htmlFor="Contato" className="form-label">Contato:</label>
              <input
                type="text"
                className="form-control"
                id="Contato"
                name="Contato"
                value={editoraData.Contato}
                placeholder="Digite o Contato"
                
                onChange={handleInputChange}
                maxLength="15"
                required
              />
              <div className="invalid-feedback">
                Por favor, digite um número de Contato válido!
              </div>
            </div>
            
            <div className="form-group col-md-5">
              <label htmlFor="Email" className="form-label">E-mail:</label>
              <input
                type="Email"
                className={`form-control ${EmailValido ? '' : 'is-invalid'}`}
                id="Email"
                name="Email"
                value={editoraData.Email}
                placeholder="name@example.com"
                required
                
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                Por favor, digite um e-mail válido!
              </div>
            </div>
            
            <div className="col-12 centralizar justify-content-evenly">
          <button
            className="btn btn-outline-success"
            type="submit"
            
          >
            Cadastrar
          </button>
          
        </div>
      </form>

          <div style={{ margin: '20px' }}></div>
          <div id="mensagem"></div>

          

        </div>

        
        

        
        <div className="conteudo-extra">
        
          <FormFiltro onUpdate={handleUpdateFiltro}></FormFiltro>
      
          <div id="tabela"> 
            <div id="espacoTabela"></div>

            



            
            
              
            <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Fundação</th>
                            <th scope="col">CNPJ</th>
                            <th scope="col">Contato</th>
                            <th scope="col">E-mail</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { editora.map((Edit)=>(
                            <tr>
                                <th>{Edit.id}</th>
                                <td>{Edit.Nome}</td>
                                <td>{Edit.Fundacao}</td>
                                <td>{Edit.CNPJ}</td>
                                <td>{Edit.Contato}</td>
                                <td>{Edit.Email}</td>
                                <td>
                                    <button
                                                type="button"
                                                class="btn btn-primary"
                                                id="atualizar"
                                                onClick={() => handleEdit(Edit)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>

                                    <button
                                                className="btn btn-danger "
                                                id="excluir"
                                                type="button"
                                                onClick={() => handleDelete(Edit.id)}
                                            >  
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </td>
                            </tr>
                            
                            ))}
                          
                            


                        </tbody>
                    </table>
             
                    
                
          </div>
        </div>
      </div>

    </>
  );
}

export default Editoras;