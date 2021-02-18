import { Link } from 'react-router-dom';
import useGetData from "../../hooks/useGetData";
const ListServiceTypes = () => {
    const { response: users } = useGetData('http://localhost:3000/api/users');

    return (
        <div className="container">
            <div className="row mb-5">
                <Link className="btn btn-primary" to="/users/new" role="button">Nuevo usuario</Link>
            </div>
            <div className="row">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map(user => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default ListServiceTypes;