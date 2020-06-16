import React, {useContext} from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import {FirebaseContext} from '../../firebase';

const Nav = styled.nav`     
    @media (max-width:768px) {
        justify-content: center;
        align-items: center;
        text-align: center;
    }      
    a {
        font-size: 1.8rem;
        padding-top: 2rem;
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;
        &:last-of-type {
            margin-right: 0;
        }
        @media (max-width:767px) {
            font-weight: bold;
            font-size: 2rem;
            margin-right: 3rem;
            margin-left: 0rem;
            color: #003354;
            text-decoration: underline;
            text-decoration-color: #003354;


        }      
    }
`;

const Navegacion = () => {

    const {usuario} = useContext(FirebaseContext);

    return ( 
        <Nav>
            <Link href="/"><a>Inicio</a></Link>
            <Link href="/populares"><a>Más Votadas</a></Link>
            {usuario && (
                <Link href="/nuevo-producto"><a>Crear Historia</a></Link>
            )}
            
        </Nav>
     );
}
 
export default Navegacion;