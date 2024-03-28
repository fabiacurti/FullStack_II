import React, { useEffect, useState } from 'react';
import AutorService from '../services/autorService.js';

const autorService = new AutorService()


function FormAutor({ selectedAutor, onUpdate, setSelectedAutor }) {

    const formatDate = (date) => {
        return `${new Date(date).getFullYear()}-${(new Date(date).getMonth())
            .toString()
            .padStart(2, "0")}-${new Date(date)
                .getDate()
                .toString()
                .padStart(2, "0")}`;
    };

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (selectedAutor != null) {
            setAutorData({
                ...selectedAutor,
                DNascimento: formatDate(selectedAutor.DNascimento)
            });
            setIsEditMode(true);
        } else {
            setIsEditMode(false);
        }
    }, [selectedAutor]);



    const [alerta, setAlerta] = useState('')
    const [autorData, setAutorData] = useState({
        Nome: "",
        Sobrenome: "",
        DNascimento: "",
        CidadeNascimento: "",
        Genero: "",
        Email: "",
        QntObras: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setAutorData({ ...autorData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (selectedAutor == null) {
                await autorService.createAutor(autorData);
                setAlerta("Autor cadastrado com sucesso!");
                setNome('');
                setSobrenome('');
                setDNascimento('');
                setCidadeNascimento('');
                setGenero('');
                setEmail('');
                setQntObras('');
            } else {
                await autorService.updateAutor(selectedAutor.ID, autorData);
                setAlerta("Autor atualizado com sucesso!");
                setIsEditMode(false);

                onUpdate();
                setAutorData({
                    Nome: "",
                    Sobrenome: "",
                    DNascimento: "",
                    CidadeNascimento: "",
                    Genero: "",
                    Email: "",
                    QntObras: ""
                });

            }

        } catch (error) {
            setAlerta("Autor não foi cadastrado !");
        } finally {
            setTimeout(() => {
                setAlerta('');
            }, 2500);
        }
    };


    const [Nome, setNome] = useState('');
    const [Sobrenome, setSobrenome] = useState('');
    const [DNascimento, setDNascimento] = useState('');
    const [CidadeNascimento, setCidadeNascimento] = useState('');
    const [Genero, setGenero] = useState('');
    const [Email, setEmail] = useState('');
    const [QntObras, setQntObras] = useState('');
    const isFormValid =
        (Nome.length >= 3 &&
            Sobrenome.length >= 3 &&
            DNascimento != null &&
            CidadeNascimento.length >= 3 &&
            Genero.length !== 0 &&
            Email.length >= 7 && Email.length <= 1100 &&
            QntObras.length > 0) || isEditMode

    const receberSoLetra = (valor) => {
        const regexSomenteLetras = /^[a-zA-Z\sáÁéÉíÍóÓúÚàÀèÈìÌòÒùÙãÃõÕâÂêÊîÎôÔûÛäÄëËïÏöÖüÜçÇ]*$/;
        return regexSomenteLetras.test(valor) || valor === ""
    }

    const relebeSoNumero = (valor) => {
        const regexSomenteNumero = /^[0-9]+$/;
        return regexSomenteNumero.test(valor) || valor === ""
    }



    return (
        <>

            <div className='conterner'>
                <div className="formulario fundo">
                    <form
                        className="row g-3 needs-validation"
                        onSubmit={handleSubmit}
                    >
                        <div className={`form-group col-md-5`}>
                            <label>
                                Nome:
                            </label>
                            <input
                                value={Nome || autorData.Nome}
                                type="text"
                                className={`form-control`}
                                name="Nome"
                                placeholder="Digite o Nome"
                                onChange={(e) => {
                                    setNome(prev => receberSoLetra(e.target.value) ? e.target.value : prev);
                                    handleInputChange(e);
                                }}
                                required
                            />
                            <div className="invalid-feedback">
                                Por Favor, digite o Nome!
                            </div>
                        </div>

                        <div className={`form-group col-md-5`}>
                            <label>
                                Sobrenome:
                            </label>
                            <input
                                value={Sobrenome || autorData.Sobrenome}
                                type="text"
                                className={`form-control`}
                                name="Sobrenome"
                                placeholder="Digite o sobrenome"
                                onChange={(e) => {
                                    setSobrenome(prev => receberSoLetra(e.target.value) ? e.target.value : prev);
                                    handleInputChange(e);
                                }}
                                required
                            />
                            <div className="invalid-feedback">
                                Por Favor, digite o Sobrenome!
                            </div>
                        </div>

                        <div className={`form-group col-md-5`}>
                            <label>
                                Data de Nascimento:
                            </label>
                            <input
                                value={autorData.DNascimento}
                                type="date"
                                className={`form-control`}
                                name="DNascimento"
                                onChange={(e) => {
                                    setDNascimento(e.target.value);
                                    handleInputChange(e);
                                }}
                                max={`${new Date().getFullYear() - 10}-${new Date().getMonth().toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`}
                                required

                            />
                            <div className="invalid-feedback">
                                Por favor, informe a data de nascimento!
                            </div>
                        </div>

                        <div className={`form-group col-md-5`}>
                            <label>
                                Cidade de nascimento:
                            </label>
                            <input
                                value={CidadeNascimento || autorData.CidadeNascimento}
                                type="text"
                                className={`form-control`}
                                name="CidadeNascimento"
                                placeholder="Digite a cidade"
                                onChange={(e) => {
                                    setCidadeNascimento(prev => receberSoLetra(e.target.value) ? e.target.value : prev);
                                    handleInputChange(e);
                                }}
                                required
                            />
                            <div className="invalid-feedback">
                                Por favor, informe a cidade!
                            </div>
                        </div>

                        <div className={`form-group col-md-5`}>
                            <label>
                                Gênero:
                            </label>
                            <select
                                value={autorData.Genero}
                                className={`form-select`}
                                name="Genero"

                                onChange={(e) => {
                                    setGenero(e.target.value);
                                    handleInputChange(e);
                                }}
                                required
                            >
                                <option selected disabled value="">
                                    Selecione o Gênero...
                                </option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div className={`form-group col-md-5`}>
                            <label>
                                Email:
                            </label>
                            <input
                                value={autorData.Email}
                                type="email"
                                className={`form-control`}
                                name="Email"
                                placeholder="name@example.com"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    handleInputChange(e);
                                }}
                                required
                            />
                            <div className="invalid-feedback">
                                Por favor, informe um email válido!
                            </div>
                        </div>

                        <div className={`form-group col-md-3`}>
                            <label>
                                Obras Publicadas:
                            </label>
                            <input
                                value={QntObras || autorData.QntObras}
                                type="text"
                                className={`form-control`}
                                name="QntObras"
                                placeholder="Número de obras publicadas"
                                onChange={(e) => {
                                    setQntObras(prev => relebeSoNumero(e.target.value) ? e.target.value : prev);
                                    handleInputChange(e);
                                }}
                                required
                            />
                            <div className="invalid-feedback">
                                Por favor, informe o número de obras publicadas!
                            </div>
                        </div>

                        <div className="col-12 centralizar justify-content-evenly">
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                                disabled={!isFormValid}
                            >
                                {isEditMode ? 'Atualizar' : 'Cadastrar'}
                            </button>
                        </div>

                        {alerta && (

                            <div className="text-center mt-3">


                                <p className='bg-success p-2 rounded d-inline'>{alerta}</p>
                            </div>
                        )}
                    </form>

                </div>


            </div>
        </>
    );
}

export default FormAutor;
