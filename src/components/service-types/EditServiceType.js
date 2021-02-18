import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import FormServiceType from "./FormServiceType";
import useGetData from "../../hooks/useGetData";


const EditServiceType = () => {
    const { id } = useParams();
    const { response: serviceType } = useGetData("http://localhost:3000/api/service-types/" + id);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    if (serviceType) {
        if (name === '') {
            setName(serviceType.name)
        }

        if (description === '') {
            setDescription(serviceType.description)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const serviceType = { name, description };

        fetch('http://localhost:3000/api/service-types/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serviceType)
            }).then(() => {
                history.push('/service-types');
            })
    }

    

    return (
        <div className="container">
            <div className="row mt-70">
                <div className="col-sm-6 offset-sm-3 text-left">
                    <h2>Editar tipo de servicio</h2>

                    <FormServiceType name={name} setName={setName} 
                        description={description}
                        setDescription={setDescription} handleSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
 
export default EditServiceType;