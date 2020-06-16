import React from 'react';
import {css} from '@emotion/core';

const Footer = () => {
    return ( 
        <div css={css`
        color: #91BED4;
        bottom: 0px;
        align-items: center;
        text-align: center;
        `} >
            <p css={css`
                margin: 0px;
            `}>Proyecto sin fines de lucro.</p>            
            <a css={css`
                margin: 0px;
                color: #91BED4;
            `} href="https://www.linkedin.com/in/heberjosias/" target="blank">Desarrollado por <span css={css`
                color: #003354;
            `}>Heber Josías</span></a>
        </div>        
     );
}
 
export default Footer;