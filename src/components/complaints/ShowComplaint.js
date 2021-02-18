import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from "react-router-dom";
import useGetData from "../../hooks/useGetData";

const ShowComplaint = () => {
    const history = useHistory();
    const { id } = useParams();
    const { response: complaintResponse } = useGetData("http://localhost:3000/api/complaints/" + id);
    const { response: complaintsStatus } = useGetData('http://localhost:3000/api/complaint-status');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [complaint, setComplaint] = useState('');
    const [serviceTypeId, setServiceTypeId] = useState('');
    const [serviceStatusId, setServiceStatusId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const complaintBody = { firstName, lastName, email, complaint, serviceTypeId, serviceStatusId };
        
        fetch('http://localhost:3000/api/complaints/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(complaintBody)
            }).then(() => {
                history.push('/');
            })
    }

    if (complaintResponse) {
        if (firstName === '') {
            setFirstName(complaintResponse.firstName)
        }
        if (lastName === '') {
            setLastName(complaintResponse.lastName)
        }
        if (email === '') {
            setEmail(complaintResponse.email)
        }
        if (complaint === '') {
            setComplaint(complaintResponse.complaint)
        }
        if (serviceTypeId === '') {
            setServiceTypeId(complaintResponse.serviceTypeId)
        }
        if (serviceStatusId === '') {
            setServiceStatusId(complaintResponse.serviceStatusId)
        }
    }


    return complaintResponse && (
        <div className="container">
            <div className="row">
                <div className="col-sm-12" style={{marginBottom: "20px"}}>
                    <div className="row">
                        <Link className="stretched-link text-left" to='/complaint'>Todas las quejas</Link>
                    </div>
                </div>
                <div className="col-sm-6 offset-sm-3">
                    <div className="card" style={{ width: "28rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{ complaintResponse.firstName + " " + complaintResponse.lastName }</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{ complaintResponse.email }</h6>
                            <p className="card-text">{ complaintResponse.complaint }</p>

                            <form onSubmit={handleSubmit}>
                                <div classame="form-group">
                                    <label htmlFor="serviceStatus">Estado</label>
                                    <select className="form-control mb-2" id="serviceStatus" value={serviceStatusId} onChange={(e) => setServiceStatusId(e.target.value)}>
                                        {
                                            complaintsStatus && complaintsStatus.map((complaintStatus) => {
                                                return (<option value={complaintStatus.id} key={complaintStatus.id}>{complaintStatus.name}</option>)
                                            })
                                        }
                                    </select>

                                    <button className="btn btn-warning btn-lg btn-block">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ShowComplaint;