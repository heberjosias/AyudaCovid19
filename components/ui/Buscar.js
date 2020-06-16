import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css} from '@emotion/core';
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 260px;
    @media (max-width:768px) {
       width:100%;
    }
    
`;
const InputSubmit = styled.button`    
    background-color: #003354;
    padding: 1.4rem;
    width: 100%;
    text-align: center;
    color: #FFF;
    font-size: 1.4rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }
    @media (min-width:768px) {
        height: 3rem;
        width: 3rem;
        display: block;
        background-size: 4rem;
        background-image: url('/static/img/buscar.png');
        background-repeat: no-repeat;
        position: absolute;
        right: 1rem;
        top: 1.5px;
        background-color: white;
        border: none;
        text-indent: -9999px;
        &:hover {
            cursor: pointer;
    }

    }
`;

const Buscar = () => {

    const [ busqueda, guardarBusqueda] = useState('');

    const buscarProducto = e => {
        e.preventDefault();

        if(busqueda.trim() === '') return;

        // redireccionar a /buscar
        Router.push({
            pathname: '/buscar', 
            query: { q : busqueda }
        })
    }


    return ( 
        <form
            css={css`
                position: relative;
                @media (max-width:768px) {
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
            `}
            onSubmit={buscarProducto}
        >
            <label htmlFor="buscar"></label>
            <InputText             
                type="text" 
                id="buscar"
                placeholder="Buscar por Nombre o Estado"
                onChange={e =>  guardarBusqueda(e.target.value) }
            />

            <InputSubmit type="submit">Buscar Historia</InputSubmit>
        </form>
     );
}
 
export default Buscar;