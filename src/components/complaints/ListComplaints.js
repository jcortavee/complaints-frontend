import { Link } from 'react-router-dom';
import useGetData from "../../hooks/useGetData";
const ListComplaints = () => {

    const { response: complaints } = useGetData('http://localhost:3000/api/complaints');

    return (
        <div className="container">
            <div className="row">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Queja</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            complaints && complaints.map(complaint => (
                                <tr key={complaint.id}>
                                    <th scope="row">{complaint.id}</th>
                                    <td>{complaint.firstName}</td>
                                    <td>{complaint.lastName}</td>
                                    <td>{complaint.email}</td>
                                    <td>{complaint.serviceType.name}</td>
                                    <td>{complaint.complaint}</td>
                                    <td><Link className="btn btn-warning" to={`/complaint/${complaint.id}`} role="button">Ver queja</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default ListComplaints;