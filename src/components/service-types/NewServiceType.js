import { useState } from "react";
import { useHistory } from "react-router-dom";
import FormServiceType from "./FormServiceType";


const NewServiceType = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        const serviceType = { name, description };

        fetch('http://localhost:3000/api/service-types', {
            method: 'POST',
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
                    <h2>Nuevo tipo de servicio</h2>

                    <FormServiceType name={name} setName={setName} description={description}
                        setDescription={setDescription} handleSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
 
export default NewServiceType;