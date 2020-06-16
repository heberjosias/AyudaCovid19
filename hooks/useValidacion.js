import React, {useState, useEffect} from 'react';

const useValidacion = (stateInicial, validar, fn) => {

    const [valores, guardarValores] = useState(stateInicial);
    const [errores, guardarErrores] = useState({});
    const [submitform, guardarSubmitForm] = useState(false);

    useEffect(() => {
       if(submitform){
           const noErrores = Object.keys(errores).length === 0; 
           if(noErrores){
               fn(); //Fn = Función que se ejecuta en el componente
           }
           guardarSubmitForm(false);
       }
    }, [errores]);

    //Función que se ejecuta conforme el usuario escribe
    const handleChange = e =>{
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    //Función que se ejecuta conforme el usuario envía el form
    const handleSubmit = e =>{
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }    

    //cuando se realiza el evento blur
    const handleBlur = e => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleChange,
        handleBlur,
        handleSubmit
    };
}
 

export default useValidacion ;
