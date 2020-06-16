import React, {useState, useContext} from 'react';
import {css} from '@emotion/core';
import Router, {useRouter} from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import {Formulario, Campo, InputSubmit, Error, Select} from '../components/ui/Formulario';

import {FirebaseContext} from '../firebase';
import Error404 from '../components/layout/404';


//validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
  nombre: '',
  estado: '',
  zona: '',
  ayuda:'',
  //imagen:'',
  email: '',
  telefono: '',
  descripcion: ''
}

const estados = [
  { "clave": "AGS", "nombre": "Aguascalientes" },
  { "clave": "BC",  "nombre": "Baja California Norte" },
  { "clave": "BCS", "nombre": "Baja California Sur" },
  { "clave": "CHI", "nombre": "Chihuahua" },
  { "clave": "CHS", "nombre": "Chiapas" },
  { "clave": "CMP", "nombre": "Campeche" },
  { "clave": "CMX", "nombre": "Ciudad de México" },
  { "clave": "COA", "nombre": "Coahuila" },
  { "clave": "COL", "nombre": "Colima" },
  { "clave": "DGO", "nombre": "Durango" },
  { "clave": "GRO", "nombre": "Guerrero" },
  { "clave": "GTO", "nombre": "Guanajuato" },
  { "clave": "HGO", "nombre": "Hidalgo" },
  { "clave": "JAL", "nombre": "Jalisco" },
  { "clave": "MCH", "nombre": "Michoacán" },
  { "clave": "MEX", "nombre": "Estado de México" },
  { "clave": "MOR", "nombre": "Morelos" },
  { "clave": "NAY", "nombre": "Nayarit" },
  { "clave": "NL",  "nombre": "Nuevo León" },
  { "clave": "OAX", "nombre": "Oaxaca" },
  { "clave": "PUE", "nombre": "Puebla" },
  { "clave": "QR",  "nombre": "Quintana Roo" },
  { "clave": "QRO", "nombre": "Querétaro" },
  { "clave": "SIN", "nombre": "Sinaloa" },
  { "clave": "SLP", "nombre": "San Luis Potosí" },
  { "clave": "SON", "nombre": "Sonora" },
  { "clave": "TAB", "nombre": "Tabasco" },
  { "clave": "TLX", "nombre": "Tlaxcala" },
  { "clave": "TMS", "nombre": "Tamaulipas" },
  { "clave": "VER", "nombre": "Veracruz" },
  { "clave": "YUC", "nombre": "Yucatán" },
  { "clave": "ZAC", "nombre": "Zacatecas" } 
]


const NuevoProducto = () => {

  // state de las imagenes
  const [nombreimagen, guardarNombre] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [ progreso, guardarProgreso ] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState('');

  const [error, guardarError] = useState(false);

  const {valores, errores, handleChange, handleBlur, handleSubmit} = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  //extraer valores
  const { nombre, estado, zona, ayuda, imagen, email, telefono, descripcion} = valores;
  
  // hook de routing para redireccionar
  const router = useRouter();

  // context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  //función para crear el producto
  async function crearProducto() {

    // si el usuario no esta autenticado llevar al login
    if(!usuario) {
      return router.push('/login');
    }

    // crear el objeto de nuevo producto 
    const producto = {
      nombre, 
      estado,
      zona, 
      ayuda,
      urlimagen,
      email,
      telefono,       
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(), 
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      }, 
      haVotado: []
    }    

    // insertarlo en la base de datos
    firebase.db.collection('historias').add(producto);

    return router.push('/');

  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
      guardarSubiendo(error);
      console.error(error);
  };

  const handleUploadSuccess = nombre => {
      guardarProgreso(100);
      guardarSubiendo(false);
      guardarNombre(nombre)
      firebase
          .storage
          .ref("historias")
          .child(nombre)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            guardarUrlImagen(url);
          } );
  };  


  return (
    <div>
      <Layout>
        { !usuario ? <Error404 /> : (

              <>
              <h1
                css={css`
                  text-align: center; 
                  margin-bottom: 5rem;
                  margin-top: 5rem;
                  color: #003354;
                `}
              >Crear Nueva Historia </h1>
              <Formulario
                onSubmit={handleSubmit}
                noValidate
              >
                <fieldset>
                  <legend>Información General</legend>          
                    <Campo>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                          type="text"
                          id="nombre"
                          placeholder="Tu Nombre"
                          name="nombre"        
                          value={nombre}
                          onChange={handleChange}  
                          //onBlur={handleBlur}    
                        />
                    </Campo>
                    {errores.nombre && <Error>{errores.nombre}</Error>}
                    <Campo>
                        <label htmlFor="estado">Estado</label>
                        <Select 
                          id="estado"
                          name="estado"        
                          value={estado}
                          onChange={handleChange}  
                          //onBlur={handleBlur}    
                        >
                          <option value=""> Seleccione... </option>
                          <option value="Aguascalientes"> Aguascalientes </option>
                          <option value="Baja California Norte"> Baja California Norte </option>
                          <option value="Baja California Sur"> Baja California Sur </option>
                          <option value="Chihuahua"> Chihuahua </option>
                          <option value="Chiapas"> Chiapas </option>
                          <option value="Campeche"> Campeche </option>
                          <option value="Ciudad de México"> Ciudad de México </option>
                          <option value="Coahuila"> Coahuila </option>
                          <option value="Colima"> Colima </option>
                          <option value="Durango"> Durango </option>
                          <option value="Estado de México"> Estado de México </option>
                          <option value="Guerrero"> Guerrero </option>
                          <option value="Guanajuato"> Guanajuato </option>
                          <option value="Hidalgo"> Hidalgo </option>
                          <option value="Jalisco"> Jalisco </option>
                          <option value="Michoacán"> Michoacán </option>
                          <option value="Morelos"> Morelos </option>
                          <option value="Nayarit"> Nayarit </option>
                          <option value="Nuevo León"> Nuevo León </option>
                          <option value="Oaxaca"> Oaxaca </option>
                          <option value="Puebla"> Puebla </option>
                          <option value="Quintana Roo"> Quintana Roo </option>
                          <option value="Querétaro"> Querétaro </option>
                          <option value="Sinaloa"> Sinaloa </option>
                          <option value="San Luis Potosí"> San Luis Potosí </option>
                          <option value="Sonora"> Sonora </option>
                          <option value="Tabasco"> Tabasco </option>
                          <option value="Tlaxcala"> Tlaxcala </option>
                          <option value="Tamaulipas"> Tamaulipas </option>
                          <option value="Veracruz"> Veracruz </option>
                          <option value="Yucatán"> Yucatán </option>
                          <option value="Zacatecas"> Zacatecas </option>
                        </Select>
                    </Campo>              
                    {errores.estado && <Error>{errores.estado}</Error>}
                    <Campo>
                        <label htmlFor="zona">Delegación o Municipio</label>
                        <input
                          type="text"
                          id="zona"
                          placeholder="Tu Delegación o Municipio"
                          name="zona"        
                          value={zona}
                          onChange={handleChange}  
                          //onBlur={handleBlur}    
                        />
                    </Campo>                    
                    {errores.zona && <Error>{errores.zona}</Error>}
                    <Campo>
                      <label htmlFor="ayuda">Tipo de Ayuda</label>
                        <Select 
                            id="ayuda"
                            name="ayuda"        
                            value={ayuda}
                            onChange={handleChange}
                        >
                            <option value=""> Seleccione... </option>
                            <option value="Ayuda Económica"> Ayuda Económica </option>
                            <option value="Ayuda Alimentaria"> Ayuda Alimentaria </option>
                            <option value="Ayuda Específica"> Ayuda Específica </option>
                            
                        </Select>
                    </Campo>


                    {errores.ayuda && <Error>{errores.ayuda}</Error>}
                    <Campo>
                        <label htmlFor="imagen">Imagen</label>
                        <FileUploader
                            css={css`
                            width: 100%;
                            
                          `}
                          accept="image/*"
                          id="imagen"
                          name="imagen"
                          randomizeFilename
                          storageRef={firebase.storage.ref("historias")}
                          onUploadStart={handleUploadStart}
                          onUploadError={handleUploadError}
                          onUploadSuccess={handleUploadSuccess}
                          onProgress={handleProgress}
                        />
                    </Campo>                       
                  
                  </fieldset> 
                  
                  <fieldset>
                    <legend>Formas de Contacto</legend>
                    <Campo>
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Tu Email"
                          name="email"   
                          value={email}
                          onChange={handleChange}      
                          //onBlur={handleBlur}           
                        />
                    </Campo> 
                    {errores.email && <Error>{errores.email}</Error>}
                    <Campo>
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                          type="text"
                          id="telefono"
                          placeholder="Tu Teléfono"
                          name="telefono"   
                          value={telefono}
                          onChange={handleChange}      
                          //onBlur={handleBlur}           
                        />
                    </Campo>            
                    {errores.telefono && <Error>{errores.telefono}</Error>}          
                  </fieldset>

                  <fieldset>
                    <legend>Descripción</legend>
                      <Campo>
                        <label htmlFor="descripcion">Tu Historia:</label>
                        <textarea
                          id="descripcion"
                          name="descripcion"    
                          value={descripcion}
                          onChange={handleChange} 
                          //onBlur={handleBlur}               
                        />
                      </Campo>        
                      {errores.descripcion && <Error>{errores.descripcion}</Error>}              
                  </fieldset>

                  {error && <Error>{error}</Error>}
                  <InputSubmit
                    type="submit"
                    value="Crear Historia"
                  />
              </Formulario>
              </>

          )}
 
      </Layout>
    </div>
  )

}

export default NuevoProducto
