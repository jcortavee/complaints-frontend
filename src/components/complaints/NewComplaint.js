import { useState } from "react";
import { useHistory } from "react-router-dom";
import useGetData from "../../hooks/useGetData";

const NewComplaint = () => {
    const history = useHistory();
    const { response: serviceTypes } = useGetData('http://localhost:3000/api/service-types');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [complaint, setComplaint] = useState('');
    const [serviceTypeId, setServiceTypeId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const complaintBody = { firstName, lastName, email, complaint, serviceTypeId, serviceStatusId: 1 };

        fetch('http://localhost:3000/api/complaints', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(complaintBody)
            }).then(() => {
                history.push('/');
            })
    }

    return (
        <div className="container">
            <div className="row mt-70">
                <div className="col-sm-6 offset-sm-3 text-left">
                    <h2>Envía tu queja</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="firstName">Nombre</label>
                                    <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" id="firstName" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="lastName">Apellido</label>
                                    <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" id="lastName" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="email">Correo</label>
                                    <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                            
                                <div className="form-group">
                                    <label htmlFor="serviceType">Tipo de servicio</label>
                                    <select className="form-control" id="serviceType" value={serviceTypeId} onChange={(e) => setServiceTypeId(e.target.value)}>
                                        {
                                            serviceTypes && serviceTypes.map((serviceType, index) => {
                                                if (index === 0 && serviceTypeId === '') {
                                                    setServiceTypeId(serviceType.id);
                                                }
                                                return (
                                                    <option value={serviceType.id} key={serviceType.id}>{serviceType.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="complaint">Queja</label>
                        <textarea className="form-control"
                            id="complaint" required value={complaint} onChange={(e) => setComplaint(e.target.value)}></textarea>
                        </div>

                        <button className="btn btn-primary btn-lg btn-block">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default NewComplaint;