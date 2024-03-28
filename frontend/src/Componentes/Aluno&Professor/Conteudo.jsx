import "./Conteudo.css";
import "./Suport.css";
import React, { useEffect, useState } from "react";
import { isValid, parse } from "date-fns";
import InputMask from "react-input-mask";
import AlunoProfessorService from "../services/alunoprofessorService";
import FormFiltro from "./FormFiltro";

const alunoprofessorService = new AlunoProfessorService();
function Conteudo() {
    const [Nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [DataNascimento, setDataNascimento] = useState("");
    const [Email, setEmail] = useState("");
    const [Cidade, setCidade] = useState("");
    const [Rua, setRua] = useState("");
    const [Telefone, setTelefone] = useState("");
    const [cep, setCEP] = useState("");
    const [nomeValido, setNomeValido] = useState(true);
    const [cpfValido, setCPFValido] = useState(true);
    const [dataNascimentoValida, setDataNascimentoValida] = useState(true);
    const [emailValido, setEmailValido] = useState(true);
    const [cidadeValida, setCidadeValida] = useState(true);
    const [ruaValida, setRuaValida] = useState(true);
    const [telefoneValido, setTelefoneValido] = useState(true);
    const [cepValido, setCEPValido] = useState(true);
    const [alunoprofessores, setAlunoProfessores] = useState([]);
    const [alunoprofessorData, setAlunoProfessorData] = useState({
        Nome: "",
        cpf: "",
        DataNascimento: "",
        Email: "",
        Cidade: "",
        Telefone: "",
        Rua: "",
        cep: "",
        TipoPessoa: "Professor",
    });
    const [selecteAluPro, setSelecteAluPro] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const formatDate = (date) => {
        return `${new Date(date).getFullYear()}-${(new Date(date).getMonth())
            .toString()
            .padStart(2, "0")}-${new Date(date)
                .getDate()
                .toString()
                .padStart(2, "0")}`;
    };

    useEffect(() => {
        if (selecteAluPro != null) {
            setAlunoProfessorData({
                ...selecteAluPro,
                 DataNascimento: formatDate(selecteAluPro.DataNascimento)
            });
            setIsEditMode(true);
        } else {
            setIsEditMode(false);
        }
    }, [selecteAluPro]);

    

    const handleEdit = async (alunoprofessores) => {
        setSelecteAluPro(alunoprofessores);
    };

    const carregaAlunoProfessor = async () => {
        try {
            const dados = await alunoprofessorService.getAllAlunoProfessor();
            console.log(dados);
            setAlunoProfessores(dados);
        } catch (error) {
            console.error("Erro ao carregar Aluno ou Professor:", error);
        }
    };
    useEffect(() => {
        carregaAlunoProfessor();
    }, []);

    const handleDelete = async (cpf) => {
        // eslint-disable-next-line no-restricted-globals
        let resposta = confirm("Tem certeza que deseja excluir esse usuário?");
    if (resposta === true) {
        console.log("Excluindo usuário...");
        await alunoprofessorService.deleteAlunoProfessor(cpf);
        console.log("Usuário excluído. Carregando dados...");
        await carregaAlunoProfessor();
        console.log("Dados carregados. Exibindo alerta...");
        alert("Aluno ou professor excluído com sucesso");
    } else {
        console.log("Exclusão cancelada. Exibindo alerta...");
        alert("Exclusão cancelada");
    }
        
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAlunoProfessorData({ ...alunoprofessorData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (selecteAluPro == null) {
                await alunoprofessorService.createAlunoProfessor(alunoprofessorData);
                alert("Aluno ou professor cadastrado com sucesso");
            } else {
                await alunoprofessorService.updateAlunoProfessor(
                    selecteAluPro.cpf,
                    alunoprofessorData
                );
                alert("Aluno ou professor atualizado com sucesso");
                setIsEditMode(false)
            }
            handleUpdate();
            setAlunoProfessorData({
                Nome: "",
                cpf: "",
                DataNascimento: "",
                Email: "",
                Cidade: "",
                Telefone: "",
                Rua: "",
                cep: "",
                TipoPessoa: "",
            });
            setSelecteAluPro(null);
        } catch (error) {
            alert("Aluno ou professor não foi cadastrado com sucesso");
        }
    };

    const handleUpdate = async () => {
        await carregaAlunoProfessor();
    };
    const handleUpdateFiltro = async (alunoprofessoresFiltradas) => {
        setAlunoProfessores(alunoprofessoresFiltradas)
    };
    

    const validarNome = () => {
        const regexNome = /^[a-zA-Z\sáÁéÉíÍóÓúÚàÀèÈìÌòÒùÙãÃõÕâÂêÊîÎôÔûÛäÄëËïÏöÖüÜçÇ]+$/;
        const novoNomeValido = Nome.length >= 4 && regexNome.test(Nome);
        setNomeValido(novoNomeValido);
    };
    const validarCPF = () => {
        const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const novoCPFValido = regexCPF.test(cpf) && validarDigitosCPF(cpf);
        setCPFValido(novoCPFValido);
    };
    const validarDigitosCPF = (cpf) => {
        const cpfNumeros = cpf.replace(/[^\d]/g, "");

        let soma = 0;
        let resto;

        if (
            cpfNumeros === "00000000000" ||
            cpfNumeros === "11111111111" ||
            cpfNumeros === "22222222222" ||
            cpfNumeros === "33333333333" ||
            cpfNumeros === "44444444444" ||
            cpfNumeros === "55555555555" ||
            cpfNumeros === "66666666666" ||
            cpfNumeros === "77777777777" ||
            cpfNumeros === "88888888888" ||
            cpfNumeros === "99999999999"
        ) {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpfNumeros.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpfNumeros.substring(9, 10))) {
            return false;
        }

        soma = 0;

        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpfNumeros.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        return resto === parseInt(cpfNumeros.substring(10, 11));
    };

    const validarDataNascimento = () => {
        const novaDataNascimentoValida = isValid(
            parse(DataNascimento, "dd/MM/yyyy", new Date())
        );

        console.log(novaDataNascimentoValida);
        setDataNascimentoValida(novaDataNascimentoValida);
    };

    const validarEmail = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const novoEmailValido = regexEmail.test(Email);
        setEmailValido(novoEmailValido);
    };

    const validarCidade = () => {
        const regexCidade =
            /^[a-zA-Z\sáÁéÉíÍóÓúÚàÀèÈìÌòÒùÙãÃõÕâÂêÊîÎôÔûÛäÄëËïÏöÖüÜçÇ]+$/;
        const novaCidadeValida = Cidade.length >= 3 && regexCidade.test(Cidade);
        setCidadeValida(novaCidadeValida);
    };

    const validarRua = () => {
        const regexRua = /^[a-zA-Z0-9 ]+$/;
        const novaRuaValida = Rua.length >= 3 && regexRua.test(Rua);
        setRuaValida(novaRuaValida);
    };

    const validarTelefone = () => {
        
        const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        const novoTelefoneValido = regexTelefone.test(Telefone);
        setTelefoneValido(novoTelefoneValido);
    };

    const validarCEP = () => {
        
        const regexCEP = /^\d{5}-\d{3}$/;
        const novoCEPValido = regexCEP.test(cep);
        setCEPValido(novoCEPValido);
    };
    
    const isFormValid =
        (Nome.length >= 3 &&
        cpf.length >= 14 &&
        Email.length >= 5 &&
        Cidade.length >= 3 &&
        Rua.length >= 1 &&
        Telefone.length >= 1 &&
        cep.length >= 1 &&
        DataNascimento.length >= 0) || isEditMode

    const handleNomeChange = (e) => {
        const nomeSemNumeros = e.target.value.replace(/[0-9]/g, "");
        setNome(nomeSemNumeros);
        validarNome();
    };

    const handleCPFChange = (e) => {
        setCPF(e.target.value);
        validarCPF();
    };

    function formatarData(datastra) {
       
        var data = new Date(datastra);
                var dia = data.getDate().toString().padStart(2, '0'),
                    mes = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
                    ano = data.getFullYear();
                return dia+"/"+mes+"/"+ano;
             }
        
             
            const handleDataNascimentoChange = (e) => {
                const dataFormatada =formatarData( e.target.value)
                setDataNascimento(dataFormatada);
                validarDataNascimento();
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleCidadeChange = (e) => {
        const cidadeSemNumeros = e.target.value.replace(/[0-9]/g, "");
        setCidade(cidadeSemNumeros);
        validarCidade();
    };

    const handleRuaChange = (e) => {
        const ruaSemCaracteresEspeciais = e.target.value.replace(
            /[^a-zA-Z0-9 ]/g,
            ""
        ); 
        setRua(ruaSemCaracteresEspeciais);
        validarRua();
    };
    const handleTelefoneChange = (e) => {
        const telefoneNumerico = e.target.value.replace(/\D/g, "");
        const telefoneMascarado = `(${telefoneNumerico.slice(
            0,
            2
        )}) ${telefoneNumerico.slice(2, 7)}-${telefoneNumerico.slice(7, 11)}`;
        setTelefone(telefoneMascarado);
        validarTelefone();
    };

    const handleCEPChange = (e) => {
        const cepNumerico = e.target.value.replace(/\D/g, "");
        const cepMascarado = `${cepNumerico.slice(0, 5)}-${cepNumerico.slice(
            5,
            8
        )}`;
        setCEP(cepMascarado);
        validarCEP();
    };

    /*const handleGravarClick = () =>{
          if (isFormValid){
              const dados = {nome, cpf, dataNascimento, sala, email, cidade, rua, telefone, cep, nomeValido}
  
          }
      }*/
    const handleMultipleNomeChanges = (event) => {
        handleInputChange(event);
        handleNomeChange(event);
    };
    const handleMultipleCPFChanges = (event) => {
        handleInputChange(event);
        handleCPFChange(event);
    };
    const handleMultipleDataNacimentoChanges = (event) => {
        handleInputChange(event);
        handleDataNascimentoChange(event);
    };
    const handleMultipleEmailChanges = (event) => {
        handleInputChange(event);
        handleEmailChange(event);
    };
    const handleMultipleCidadeChanges = (event) => {
        handleInputChange(event);
        handleCidadeChange(event);
    };
    const handleMultipleRuaChanges = (event) => {
        handleInputChange(event);
        handleRuaChange(event);
    };
    const handleMultipleTelefoneChanges = (event) => {
        handleInputChange(event);
        handleTelefoneChange(event);
    };

    const handleMultipleCEPChanges = (event) => {
        handleInputChange(event);
        handleCEPChange(event);
    };

    useEffect(() => {
        document.title = "MaxSoft";
    }, []);

    return (
        <div className="Conteiner">
            <div className="cabecalhos">
                <h2 className="cor_fonte">Cadastro de Alunos & Professores</h2>
            </div>
            <div className="Conteudos">
                <form
                    id="formCadastroAlunoProfessor"
                    method="POST"
                    action="#"
                    className="row g-3 needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div
                        className={`form-group col-md-5 ${nomeValido ? "" : "has-error"}`}
                    >
                        <label htmlFor="Nome" className="form-label">
                            Nome:
                        </label>
                        <InputMask
                            type="text"
                            mask=""
                            className={`form-control rounded ${nomeValido ? "" : "is-invalid"
                                }`}
                            id="Nome"
                            name="Nome"
                            placeholder="Digite o seu Nome Completo"
                            value={alunoprofessorData.Nome}
                            onBlur={validarNome}
                            onChange={handleMultipleNomeChanges}
                            required
                        />
                        <div className="invalid-feedback">
                            {nomeValido
                                ? "Por Favor, digite o Nome!"
                                : "Digite pelo menos 4 letras, apenas letras são permitidas."}
                        </div>
                    </div>
                    <div
                        className={`form-group col-md-5 ${cpfValido ? "" : "has-error"}`}
                    >
                        <label htmlFor="cpf" className="form-label">
                            CPF:
                        </label>
                        <InputMask
                            mask="999.999.999-99"
                            maskPlaceholder={null}
                            className={`form-control ${cpfValido ? "" : "is-invalid"}`}
                            id="cpf"
                            name="cpf"
                            value={alunoprofessorData.cpf}
                            onBlur={validarCPF}
                            onChange={handleMultipleCPFChanges}
                            placeholder="Digite o CPF"
                            required
                        />
                        <div className="invalid-feedback">
                            {cpfValido ? "Por Favor, digite o CPF!" : "CPF inválido."}
                        </div>
                    </div>
                    <div
                        className={`form-group col-md-5 ${dataNascimentoValida ? "" : "has-error"
                            }`}
                    >
                        <label htmlFor="DataNascimento" className="form-label">
                            Data de Nascimento:
                        </label>
                        <InputMask
                            type="date"
                            
                            className={`form-control ${dataNascimentoValida ? "" : "is-invalid"
                                }`}
                            id="DataNascimento"
                            name="DataNascimento"
                            placeholder="DD/MM/YYYY"
                            value={alunoprofessorData.DataNascimento}
                            onChange={handleMultipleDataNacimentoChanges}
                            max={`${new Date().getFullYear() - 10}-${new Date().getMonth().toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`}
                            min={`${new Date().getFullYear() - 70}-${new Date().getMonth().toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`}
                            required
                        />
                        <div className="invalid-feedback">
                            {dataNascimentoValida
                                ? "Por favor, digite a Data de Nascimento!"
                                : "Data de Nascimento inválida."}
                        </div>
                    </div>
                    <div
                        className={`form-group col-md-5 ${emailValido ? "" : "has-error"}`}
                    >
                        <label htmlFor="Email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            className={`form-control ${emailValido ? "" : "is-invalid"}`}
                            id="Email"
                            name="Email"
                            value={alunoprofessorData.Email}
                            onBlur={validarEmail}
                            onChange={handleMultipleEmailChanges}
                            placeholder="name@example.com"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor, informe um email válido!
                        </div>
                    </div>
                    <div
                        className={`form-group col-md-5 ${cidadeValida ? "" : "has-error"}`}
                    >
                        <label htmlFor="Cidade" className="form-label">
                            Cidade:
                        </label>
                        <InputMask
                            mask=""
                            className={`form-control ${cidadeValida ? "" : "is-invalid"}`}
                            id="Cidade"
                            name="Cidade"
                            value={alunoprofessorData.Cidade}
                            placeholder="Digite a cidade"
                            onBlur={validarCidade}
                            onChange={handleMultipleCidadeChanges}
                            required
                        />
                        <div className="invalid-feedback">Por favor, informe a cidade!</div>
                    </div>
                    <div className="form-group col-md-5  ">
                        <label htmlFor="Rua" className="form-label">
                            Rua:
                        </label>
                        <input
                            type="text"
                            className={`form-control ${ruaValida ? "" : "is-invalid"}`}
                            id="Rua"
                            name="Rua"
                            value={alunoprofessorData.Rua}
                            placeholder="Digite a rua"
                            onBlur={validarRua}
                            onChange={handleMultipleRuaChanges}
                            required
                        />
                        <div className="invalid-feedback">Por favor, informe a rua!</div>
                    </div>
                    <div className="form-group1 col-md-4 ">
                        <label htmlFor="Telefone" className="form-label">
                            Telefone:
                        </label>
                        <InputMask
                            mask="(99) 99999-9999"
                            maskPlaceholder={null}
                            className={`form-control ${telefoneValido ? "" : "is-invalid"}`}
                            id="Telefone"
                            name="Telefone"
                            placeholder="(99) 99999-9999"
                            value={alunoprofessorData.Telefone}
                            onBlur={validarTelefone}
                            onChange={handleMultipleTelefoneChanges}
                            required
                        />
                        <div className="invalid-feedback">Por favor, informe o número!</div>
                    </div>
                    <div className="form-group2 col-md-4 p1">
                        <label htmlFor="cep" className="form-label">
                            CEP:
                        </label>
                        <InputMask
                            mask="99999-999"
                            maskPlaceholder={null}
                            className={`form-control ${cepValido ? "" : "is-invalid"}`}
                            id="cep"
                            name="cep"
                            placeholder="12345-678"
                            value={alunoprofessorData.cep}
                            onBlur={validarCEP}
                            onChange={handleMultipleCEPChanges}
                            required
                        />
                        <div className="invalid-feedback">Por favor, informe o CEP!</div>
                    </div>
                    <div className="form-group3 col-md-4 ">
                        <label htmlFor="TipoPessoa" className="form-label">
                            Pessoa:
                        </label>
                        <select
                            className="form-select"
                            id="TipoPessoa"
                            name="TipoPessoa"
                            value={alunoprofessorData.TipoPessoa}
                            onChange={handleInputChange}
                            required
                        >
                            <option selected disabled value="">
                                Tipo de pessoa...
                            </option>
                            <option value="Aluno">Aluno</option>
                            <option value="Professor">Professor</option>
                        </select>
                    </div>
                    <div className="col-12 centralizar justify-content-evenly">
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                                disabled={!isFormValid}
                            ><i class="bi bi-person-add"></i>   {isEditMode ? 'Atualizar' : 'Cadastrar'}
                            </button>
                    </div>
                </form>
            </div>
            <div className="janela">
                <FormFiltro onUpdate={handleUpdateFiltro}></FormFiltro>
                <div className="tabela">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Dt.Nacimento</th>
                                <th scope="col">Email</th>
                                <th scope="col">Cidade</th>
                                <th scope="col">Rua</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">CEP</th>
                                <th scope="col">Pessoa</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunoprofessores.map((alunop) => (
                                <tr key={alunop.cpf} >
                                    <th scope="row">{alunop.Nome}</th>
                                    <td>{alunop.cpf}</td>
                                    <td>
                                    {`${new Date(alunop.DataNascimento).getDate().toString().padStart(2, "0")}/${new Date(alunop.DataNascimento).getMonth().toString().padStart(2, "0")}/${new Date(alunop.DataNascimento).getFullYear()}`}
                                    </td>
                                    <td>{alunop.Email}</td>
                                    <td>{alunop.Cidade}</td>
                                    <td>{alunop.Rua}</td>
                                    <td>{alunop.Telefone}</td>
                                    <td>{alunop.cep}</td>
                                    <td>{alunop.TipoPessoa}</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                            id="atualizar"
                                            onClick={() => handleEdit(alunop)}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>

                                        <button
                                            className="btn btn-danger "
                                            id="excluir"
                                            type="button"
                                            onClick={() => handleDelete(alunop.cpf)}
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
    );
}

export default Conteudo;
