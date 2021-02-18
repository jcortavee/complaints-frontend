import { useState } from "react";
import { useHistory } from "react-router-dom";


const NewServiceType = ({authenticate}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = { username, password };

        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(auth)
            });
    
        if (response.ok) {
            const res = await response.json();
            localStorage.setItem("accessToken", res.accessToken);
            history.push('/');
            authenticate(true);
        }

    }

    

    return (
        <div className="container">
            <div className="row mt-70">
                <div className="col-sm-6 offset-sm-3 text-left">
                    <h2>Iniciar sesión</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Usuario</label>
                            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Contraseña</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="description" />
                        </div>

                        <button className="btn btn-primary btn-lg btn-block">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default NewServiceType;