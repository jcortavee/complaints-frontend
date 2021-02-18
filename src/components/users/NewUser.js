import { useState } from "react";
import { useHistory } from "react-router-dom";


const NewServiceType = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = { username, password, email };

        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(auth),
            headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("accessToken"),
              },
            });
    
        if (response.ok) {
            history.push('/users');
        }

    }

    

    return (
        <div className="container">
            <div className="row mt-70">
                <div className="col-sm-6 offset-sm-3 text-left">
                    <h2>Crear usuario</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Usuario</label>
                            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo</label>
                            <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Contraseña</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="description" />
                        </div>

                        <button className="btn btn-success btn-lg btn-block">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default NewServiceType;