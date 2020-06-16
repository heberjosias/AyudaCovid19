import React, {useContext} from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import Buscar from '../ui/Buscar';
import Boton from '../ui/Boton';
import Navegacion from './Navegacion';
import {FirebaseContext} from '../../firebase';


const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Header = () => {

    const {usuario , firebase} = useContext(FirebaseContext);

    return (

        <header
            css={css`        
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
             <ContenedorHeader>
                <div
                    css={css`
                    display: inline-block;                    
                    @media (min-width:768px) {
                        display:flex;
                        align-items: center;
                        justify-content: center;
                        }
                    `}                
                >
                    <Link href="/"
                        css={css`
                            @media (min-width:768px) {
                                justify-content: center;
                                align-items: center;
                                text-align: center;
                            } 
                        `}                    
                    >
                        <img css={css`    
                            height: 60px;
                            cursor: pointer;
                            margin-left: 0;                                                    
                            @media (max-width:768px) {
                                margin-left: 5%;
                                width: 90%;    
                                height: 100%;                        
                            }    
                            @media (max-width:360px) {
                                margin-left: 0;
                                width: 100%;
                                
                            }
                            @media (max-width:320px) {
                                margin-left: 0;
                                width: 100%;
                            }                                                        
                            `}
                        src="/static/img/covid.png" alt="Ayuda Covid 19" />
                    </Link>
                    
                    <div css={css`  
                            padding-top: 1rem;                                          
                            margin-left: 2rem;
                            margin-bottom: 1rem; 
                            @media (max-width:768px) {
                                margin-left: 0;  
                            }                                                                             
                            `}>                              
                        <Navegacion/>
                    </div>

                    <div css={css`
                            @media (min-width:768px) {
                                margin-left: 3rem;  
                            }      
                            `}>
                        <Buscar/>
                    </div>

                </div>
                <div
                    css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                `}                    
                >
                   { usuario ? (
                        <>
                            <p
                                css={css`
                                    display: none;
                                    @media (min-width:768px) {
                                        margin-right: 2rem;
                                        display: flex;
                                        color: #003354;
                                    }                                    
                                `}
                            >Hola: {usuario.displayName}</p>
                            <Boton
                                bgColor="true"
                                onClick={() => firebase.cerrarSesion() }
                            >Cerrar Sesión</Boton>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Boton
                                    bgColor="true"
                                >Login</Boton>
                            </Link>
                            <Link href="/crear-cuenta">
                                <Boton>Crear Cuenta</Boton>
                            </Link>
                        </>
                    ) }
                    
                </div>            
             </ContenedorHeader>
        </header>

      );
}
 
export default Header;