export default function validarCrearProducto(valores) {

    let errores = {};

    // validar el nombre del usuario
    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    // validar estado de la republica
    if(!valores.estado) {
        errores.estado = "El Estado es obligatorio";
    }

    // validar delegación o municipio
    if(!valores.zona) {
        errores.zona = "Delegación o Municipio es obligatorio";
    }

    // validar tipo de ayuda
    if(!valores.ayuda) {
        errores.ayuda = "El tipo de Ayuda es Obligatorio";
    }    

    // validar el email
    if(!valores.email) {
        errores.email = "El Email es Obligatorio";
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email) ) {
        errores.email = "Email no válido"
    }

    // validar teléfono
    if(!valores.telefono) {
        errores.telefono = "El Teléfono de Contacto es Obligatorio";
    }   

    // validar descripción
    if(!valores.descripcion) {
        errores.descripcion = "Agregar una descripción sobre tu Historia";
    }   


    return errores;
}