import React from "react"; 
const Input = (props) => { //kullandığımız değşkenleri props üzerinden aldık
    const {label,error,name, onChange,type} = props
    const className = error ? "form-control is-invalid" : "form-control";
    return(
        <div className="form-group">
        <label className="mb-3 mt-3">{label}</label>  
        <input className={className} name={name} onChange={onChange} type={type}/>   
        <div className="invalid-feedback">{error}</div>  
    </div>
    )
}

export default Input; //bir componentin içinde olan bir çok fonksiyondan hangisinin varsayılan olarak çalıştırılıcağını belirtir.