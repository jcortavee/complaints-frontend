const FormServiceType = ({name, setName, description, setDescription, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" />
            </div>

            <button className="btn btn-primary btn-lg btn-block">Guardar</button>
        </form>
    );
}
 
export default FormServiceType;