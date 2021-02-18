import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = ({authenticate, isAuthenticate}) => {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const history = useHistory();

    const handleLogOut = (e) => {
        e.preventDefault();

        localStorage.removeItem('accessToken');
        history.push('/');
        authenticate(false);
        setToken(null);
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">MIS QUEJAS</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    { isAuthenticate &&
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/complaint">Quejas</Link>
                            </li>
                            <li className="nav-item text-right">
                                <Link className="nav-link" to="/service-types">Tipos de servicio</Link>
                            </li>
                        </ul> 
                    }
                    { !isAuthenticate &&
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/complaint/new">Agregar queja</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Ingresar</Link>
                            </li>
                        </ul> 
                    }
                </ul>
                    { isAuthenticate &&
                        <ul className="navbar-nav">
                            <li className="nav-item text-right">
                                <Link className="nav-link" to="/users">Usuarios</Link>
                            </li>
                            <button className="btn btn-outline-danger" onClick={handleLogOut}>Salir</button>
                        </ul> 
                    }
            </div>
        </nav>
    );
}
 
export default Navbar;