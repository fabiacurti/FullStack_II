
import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
            <div className="col-lg-6 col-md-8 col-sm-10 mx-auto col sidebar">
                <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark " style={{ width: '21%', position: 'fixed', zIndex: 1000, left: 0, top: 0, height: '100%' }}>
                <Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"><use href="/bootstrap"></use></svg>
                    <span className="fs-4">MaxSoft</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                    <Link href="/" className="nav-link" aria-current="page">
                    <NavLink className="nav-link activate bi me-2 text-white" width="16" height="16" to="/Aluno&Professor"><i class="bi bi-person-vcard"></i>   Aluno & Professor</NavLink>
                    </Link>
                    </li>
                    <li>
                    <Link href="/" className="nav-link text-white ">
                    <NavLink className="nav-link activate bi me-2 text-white" width="16" height="16" to="/Autor"><i class="bi bi-pencil"></i>  Autor</NavLink>
                    </Link>
                    </li>
                    <li>
                    <Link href="/" className="nav-link text-white">
                    <NavLink className="nav-link activate bi me-2 text-white" width="16" height="16" to="/Generos"><i class="bi bi-repeat"></i>   Generos</NavLink>
                        
                    </Link>
                    </li>
                    <li>
                    <Link href="/" className="nav-link text-white">
                    <NavLink className="nav-link activate bi me-2 text-white" width="16" height="16" to="/Livros"><i class="bi bi-journal-text"></i>   Livro</NavLink>
                    </Link>
                    </li>
                    <li>
                    <Link href="/" className="nav-link text-white">
                    <NavLink className="nav-link activate bi me-2 text-white" width="16" height="16" to="/Editoras"><i class="bi bi-book"></i>   Editoras</NavLink>
                    </Link>
                    </li>
                    <li>
                    <Link href="/" className="nav-link text-white">
                    <NavLink className="nav-link activate bi me-2 text-white" width="16" height="16" to="/TipoLivro"><i class="bi bi-book"></i>   Tipo de livro</NavLink>
                    </Link>
                    </li>
                    <li>
                    <Link href="/" className="nav-link text-white">
                    <NavLink className="nav-link activate bi me-2 text-white" width="16" height="16" to="/Emprestimo"><i class="bi bi-book"></i> Emprestimos</NavLink>
                    </Link>
                    </li>
                </ul>
                <hr />
                </div>
            </div>
  );
}

export default NavBar;
