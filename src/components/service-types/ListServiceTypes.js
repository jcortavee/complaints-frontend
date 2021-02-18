import { Link } from 'react-router-dom';
import useGetData from "../../hooks/useGetData";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
const ListServiceTypes = () => {
    const history = useHistory();
    const [serviceTypes, setServiceTypes] = useState(null);
    const { response: response } = useGetData('http://localhost:3000/api/service-types');

    if (response && !serviceTypes) {
        setServiceTypes(response);
    }


    const handleDelete = (id) => {
        fetch('http://localhost:3000/api/service-types/' + id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/service-types');
            const newServiceTypes = serviceTypes.filter(serviceType => serviceType.id !== id);
            setServiceTypes(newServiceTypes);
        }) 
    }

    return (
        <div className="container">
            <div className="row mb-5">
                <Link className="btn btn-primary" to="/service-types/new" role="button">Nuevo tipo de servicio</Link>
            </div>
            <div className="row">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            serviceTypes && serviceTypes.map(serviceType => (
                                <tr key={serviceType.id}>
                                    <th scope="row">{serviceType.id}</th>
                                    <td>{serviceType.name}</td>
                                    <td>{serviceType.description}</td>
                                    <td>
                                        <Link className="btn btn-warning mr-2" to={`/service-types/${serviceType.id}`} role="button">Editar</Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(serviceType.id)} role="button">Eliminar</button>
                                    </td>
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