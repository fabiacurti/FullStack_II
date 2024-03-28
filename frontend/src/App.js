import AluEPro from "./Componentes/Aluno&Professor/AluEPro";
import Editoras from "./Componentes/Editora/Editoras";
import Generos from "./Componentes/Genero/Generos";
import Autor from "./Componentes/Autor/Autor";
import TipoLivro from "./Componentes/TipoLivro/TipoLivro";
import ListaLivros from './Componentes/Livro/listaLivros';
import Login from './Componentes/Login/Login'; 
import NavBar from "./Componentes/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Emprestimo from "./Componentes/Emprestimos/Emprestimo";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="login" element={<Login />} /> 
        <Route path="Aluno&Professor">
          <Route path="Aluno-Professor" element={<AluEPro />} />
        </Route>
        <Route path="Autor">
          <Route path="" element={<Autor />} /> 
        </Route>
        <Route path="Generos">
          <Route path="" element={<Generos />} /> 
        </Route>
        <Route path="livros">
          <Route path="" element={<ListaLivros />} /> 
        </Route>
        <Route path="Editoras">
          <Route path="" element={<Editoras />} /> 
        </Route>
        <Route path="TipoLivro">
          <Route path="" element={<TipoLivro />} /> 
        </Route>
        <Route path="Emprestimo">
          <Route path="" element={<Emprestimo />} /> 
        </Route>
      </Routes>     
    </BrowserRouter>
  );
}

export default App;
