import React, { useEffect, useState } from 'react';
import TipoLivroService from '../services/tipoLivroService.js';

const tipoLivroService = new TipoLivroService()


function FormTipoLivro({ selectedTipoLivro, onUpdate, setSelectedTipoLivro }) {


    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (selectedTipoLivro != null) {
            setTipoLivroData({
                ...selectedTipoLivro,
            });
            setIsEditMode(true);
        } else {
            setIsEditMode(false);
        }
    }, [selectedTipoLivro]);



    const [alerta, setAlerta] = useState('')
    const [tipoLivroData, setTipoLivroData] = useState({
        nome: "",
        faixaEtaria: "",
        nivelLeitura: "",
        formato: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setTipoLivroData({ ...tipoLivroData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (selectedTipoLivro == null) {
                await tipoLivroService.createTipoLivro(tipoLivroData);
                setAlerta("TipoLivro cadastrado com sucesso!");
                setNome('');
                setFaixaEtaria('');
                setNivelLeitura('');
                setFormato('');
            } else {
                await tipoLivroService.updateTipoLivro(selectedTipoLivro.ID, tipoLivroData);
                setAlerta("TipoLivro atualizado com sucesso!");
                setIsEditMode(false);

                onUpdate();
                setTipoLivroData({
                    nome: "",
                    faixaEtaria: "",
                    nivelLeitura: "",
                    formato: "",
                });

            }

        } catch (error) {
            setAlerta("TipoLivro não foi cadastrado !");
        } finally {
            setTimeout(() => {
                setAlerta('');
            }, 2500);
        }
    };


    const [nome, setNome] = useState('');
    const [faixaEtaria, setFaixaEtaria] = useState('');
    const [nivelLeitura, setNivelLeitura] = useState('');
    const [formato, setFormato] = useState('');
    const isFormValid =
        (nome.length >= 3 &&
            faixaEtaria.length !== 0 &&
            nivelLeitura.length !== 0 &&
            formato.length !== 0) || isEditMode

    const receberSoLetra = (valor) => {
        const regexSomenteLetras = /^[a-zA-Z\sáÁéÉíÍóÓúÚàÀèÈìÌòÒùÙãÃõÕâÂêÊîÎôÔûÛäÄëËïÏöÖüÜçÇ]*$/;
        return regexSomenteLetras.test(valor) || valor === ""
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
                                value={nome || tipoLivroData.nome}
                                type="text"
                                className={`form-control`}
                                name="nome"
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
                                Faixa Etaria:
                            </label>
                            <select
                                value={tipoLivroData.faixaEtaria}
                                className={`form-select`}
                                name="faixaEtaria"

                                onChange={(e) => {
                                    setFaixaEtaria(e.target.value);
                                    handleInputChange(e);
                                }}
                                required
                            >
                                <option selected disabled value="">
                                    Selecione a faixa etaria...
                                </option>
                                <option value="Livre">Livre</option>
                                <option value="10 Anos">10 anos</option>
                                <option value="12 Anos">12 anos</option>
                                <option value="14 Anos">14 anos</option>
                                <option value="16 Anos">16 anos</option>
                                <option value="18 Anos">18 anos</option>
                            </select>
                        </div>





                        <div className={`form-group col-md-5`}>
                            <label>
                                Nivel de Leitura:
                            </label>
                            <select
                                value={tipoLivroData.nivelLeitura}
                                className={`form-select`}
                                name="nivelLeitura"

                                onChange={(e) => {
                                    setNivelLeitura(e.target.value);
                                    handleInputChange(e);
                                }}
                                required
                            >
                                <option selected disabled value="">
                                    Selecione o nivel de leiura...
                                </option>
                                <option value="Elementar">Elementar</option>
                                <option value="Inspecional">Inspecional</option>
                                <option value="Analítica">Analítica</option>
                                <option value="Sintópica">Sintópica</option>
                            </select>
                        </div>




                        <div className={`form-group col-md-5`}>
                            <label>
                                Formato:
                            </label>
                            <select
                                value={tipoLivroData.formato}
                                className={`form-select`}
                                name="formato"

                                onChange={(e) => {
                                    setFormato(e.target.value);
                                    handleInputChange(e);
                                }}
                                required
                            >
                                <option selected disabled value="">
                                    Selecione o tipo de formato...
                                </option>
                                <option value="Fisico">Fisico</option>
                                <option value="Digital">Digital</option>
                            </select>
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

export default FormTipoLivro;
