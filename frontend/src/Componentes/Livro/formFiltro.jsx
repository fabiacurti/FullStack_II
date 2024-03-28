import { useState } from "react";
import LivroService from "../services/livroService";
const livroService = new LivroService();

function FormFiltro({ onUpdate }) {
  const [filtroData, setFiltroData] = useState({
    NomeLivro: "",
    genero: "Todos",
  });

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const livroFiltro = await livroService.buscar(filtroData);
      onUpdate(livroFiltro);
    } catch (error) {}
  };
  return (
    <div>
      <h2>Buscar livro</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome do Livro: &nbsp;</label>&nbsp;
          
          <input
            type="text"
            name="NomeLivro"
            value={filtroData.NomeLivro}
            onChange={handleInputChange}
          />&nbsp;&nbsp;&nbsp;&nbsp;
          <select 
            name="genero"
            value={filtroData.genero}
            onChange={handleInputChange}
          >s
            <option value="Todos">Todos</option>
            <option value="Infantil">Infantil</option>
            <option value="Ficcao">Ficção</option>
            <option value="Terror">Terror</option>
            <option value="Fantasia">Fantasia</option>
          </select>
&nbsp;
        <button type="submit">buscar</button>
      </form>
    </div>
  );
}

export default FormFiltro;
