import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;
const CreadorProducto = styled.p`
    padding: .2rem 2rem;
    background-color: #91BED4;
    color: #fff;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
`;

const Producto = () => {

    // state del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario ] = useState({});
    const [consultarDB, guardarConsultarDB ] = useState(true);

    //Routing para obtener ID actual
    const router = useRouter();
    const {query : {id}} = router;

    // context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if(id && consultarDB) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('historias').doc(id);
                const producto = await productoQuery.get();
                //console.log(producto.data());
                if(producto.exists) {
                   guardarProducto( producto.data() );
                   guardarConsultarDB(false);
                } else {
                    guardarError(true);
                    guardarConsultarDB(false);
                }
            }
            obtenerProducto();
        }
    }, [id, producto]);

    if(Object.keys(producto).length === 0 && !error)  return 'Cargando...';

    //Obtener todos los datos de las historias
    const { ayuda, comentarios, creado, descripcion, email, estado, zona, nombre, telefono, urlimagen, votos, creador, haVotado } = producto;

    let emailto = `mailto:${producto.email}`
    let tel = `tel:${telefono}`

    // Administrar y validar los votos
    const votarProducto = () => {
        if(!usuario) {
            return router.push('/login')
        }

        // obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;

        // Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid) ) return;

        // guardar el ID del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];

        //  Actualizar en la BD
        firebase.db.collection('historias').doc(id).update({ 
            votos: nuevoTotal, 
            haVotado: nuevoHaVotado 
        })

        // Actualizar el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })

        guardarConsultarDB(true); // hay un voto, por lo tanto consultar a la BD
    }

    // Funciones para crear comentarios
    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    }

    // Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if(creador.id == id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault();

        if(!usuario) {
            return router.push('/login')
        }

        // información extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        // Actualizar la BD
        firebase.db.collection('historias').doc(id).update({
            comentarios: nuevosComentarios
        })

        // Actualizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        guardarConsultarDB(true); // hay un COMENTARIO, por lo tanto consultar a la BD
    }

    // función que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
        if(!usuario) return false;

        if(creador.id === usuario.uid) {
            return true
        }
    }

    // elimina un producto de la bd
    const eliminarProducto = async () => {

        if(!usuario) {
            return router.push('/login')
        }

        if(creador.id !== usuario.uid) {
            return router.push('/')
        }

        try {
            await firebase.db.collection('historias').doc(id).delete();
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }    

    return ( 
    
        <Layout>
            <>
                { error ? <Error404 /> : ( 

                    <div className="contenedor">
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                        color: #003354;
                    `}>{nombre} </h1>

                    <ContenedorProducto>
                        <div>
                            <img src={urlimagen} />
                            <h2 css={css`                                
                                margin-top: 1rem;
                                color: #91BED4;
                            `}>{estado} / {zona}</h2>  
                            <h2 css={css`                                
                                color: #91BED4;
                            `}>{ayuda}</h2>                               
                            <h2 css={css`                                
                                color: #003354;
                            `}></h2>                                
                            <p>{descripcion}</p>

                            <div>
                                <a css={css`                                
                                color: #003354;                                    
                            `} href={emailto}>{email}</a>
                            </div>
                            <div>
                                <a css={css`                                
                                color: #003354;                                    
                            `} href={tel}>{telefono}</a>
                            </div>   

                            { usuario && (
                                <>
                                    <h2 css={css`                                
                                        margin-top: 2rem;
                                        color: #003354;                                    
                                    `}>Agregar Comentario</h2>
                                    <form
                                        onSubmit={agregarComentario}
                                    >
                                        <Campo>
                                            <input
                                                type="text"
                                                name="mensaje"
                                                onChange={comentarioChange}
                                            />
                                        </Campo>
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar Comentario"
                                        />
                                    </form>
                                </>
                            )
                            
                            }

                            <h2 css={css`
                                margin: 2rem 0;
                                color: #003354; 
                            `}>Comentarios:</h2>
                            {comentarios.length === 0 ? "Aún no hay comentarios." : (
                                <ul>
                                    {comentarios.map(comentario => (
                                        <li css={css`
                                        border: 1px solid #e1e1e1;
                                        padding: 2rem;
                                        `}                                            
                                        >
                                            <p>{comentario.mensaje}</p>
                                            <p>Escrito por: 
                                                <span css={css`
                                                        font-weight:bold;
                                                    `}>{' '}{comentario.usuarioNombre}
                                                </span> 
                                            </p> 
                                            { esCreador( comentario.usuarioId ) && <CreadorProducto>Creador de la Historia</CreadorProducto> }
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                        <aside>                                
                            <Boton                                    
                                bgColor="true"
                                href={emailto}
                            >Enviar Email</Boton>
                            <Boton                                    
                                bgColor="true"
                                href={tel}
                            >LLamar</Boton>
                            <div
                                css={css`
                                    margin-top: 5rem;
                                `}
                            >
                                <p css={css`
                                    text-align: center;
                                    color: #003354;
                                    font-size: 2.5rem;
                                `}>Votos: {votos}</p>

                                { usuario && (
                                    <Boton
                                        css={css`
                                        background-color: #F26101;
                                        color: white;
                                        `}
                                        onClick={votarProducto}
                                    >
                                        Votar
                                    </Boton>
                                ) }
                                <p>Historia publicada hace: { formatDistanceToNow( new Date(creado), {locale: es} )} por {creador.nombre}.</p>
                            </div>

                        </aside>
                    </ContenedorProducto>
                    { puedeBorrar() && 
                            <Boton
                                onClick={eliminarProducto}
                            >Eliminar Historia</Boton>
                    }
                    </div>


                )}

            </>
        </Layout>

        
    );
}
 
export default Producto;
