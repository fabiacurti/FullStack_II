import React from 'react';
import TabelaTipoLivro from './TabelaTipoLivro.jsx';




function TipoLivro() {




    return (
        <>
            <div className="container centralizacao">
                <div className="row">
                    <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
                        <div className="flex-container-cabecalho">
                            <div className="cabecalho" style={{ }}>Tipos Livros
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <TabelaTipoLivro></TabelaTipoLivro>
            </div>
        </>
    );
}

export default TipoLivro;
