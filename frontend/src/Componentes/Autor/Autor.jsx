import React from 'react';
import TabelaAutor from './TabelaAutor.jsx';




function Autor() {




    return (
        <>
            <div className="container centralizacao">
                <div className="row">
                    <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
                        <div className="flex-container-cabecalho">
                            <div className="cabecalho" style={{ }}>Autor
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <TabelaAutor></TabelaAutor>
            </div>
        </>
    );
}

export default Autor;
