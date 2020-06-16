import React from 'react';
import styled from '@emotion/styled'; 
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link';

const Producto = styled.li`
    @media (max-width:768px) {
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e1e1e1;
    } 
    padding: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`;
const DescripcionProducto = styled.div`
    flex: 0 1 100%;
    @media (min-width:768px) {
        flex: 0 1 80%;
        display: grid;
        grid-template-columns: 1fr 3fr;
        column-gap: 2rem;
    } 

`;

const Titulo = styled.a`
    font-size: 3rem;
    font-weight: bold;
    color: #003354;
    margin: 0;
    text-decoration: underline;
    text-decoration-color: #003354;
    :hover {
        cursor: pointer;
        color: #F26101;
        text-decoration-color: #F26101;
    }
`;

const Estado = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #91BED4;
`;

const TextoDescripcion = styled.p`
    font-size: 1.5rem;
    margin: 0;
    color: #888;
`;

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .2rem 1rem;
        margin-right: 2rem;
    }
    img {
        width: 2rem;
        margin-right: 2rem;
    }
    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        color: #003354;
        font-weight: 700;
        &:last-of-type {
            margin: 0;
        }
    }
`;

const Publicado = styled.p`
    font-size: 1.5rem;
    margin: 1;
    color: #888;
`;

const Imagen = styled.img`
    display: none;
    @media (min-width:768px) {
        display: flex;
        max-width: 300px;
        cursor: pointer;
    } 
    
`;

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center; 
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;
    div {
        font-size: 2rem;
        color: #003354;
    }
    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
        color: #003354;
    }
`;

const DetallesProducto = ({producto}) => {
    
    const { id, ayuda, comentarios, creado, descripcion, estado, zona, nombre, urlimagen, votos } = producto;

    return ( 
        <Producto>
            <DescripcionProducto>
                <div>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                        <Imagen src={urlimagen}  />
                    </Link>                    
                </div>

                <div>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                        <Titulo>{nombre}</Titulo>
                    </Link>                    
                    <Estado>{estado} / {zona} / {ayuda}</Estado>
                    <TextoDescripcion>{descripcion}</TextoDescripcion>
                    <Comentarios>
                        <div>
                            <img src="/static/img/comentario.png" />
                            <p>{comentarios.length} Comentarios</p>
                        </div>
                    </Comentarios>
                    <Publicado>Publicado hace: { formatDistanceToNow( new Date(creado), {locale: es} )} </Publicado>
                </div>
            </DescripcionProducto>
            <Votos>
                <div> &#9650; </div>
                <p>{votos}</p>
            </Votos>
        </Producto>
     );
}
 
export default DetallesProducto;