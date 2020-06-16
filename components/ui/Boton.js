import styled from '@emotion/styled';

const Boton = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: 2rem auto; 
    margin-left: 2px;
    margin-right: 2px;
    text-align: center;
    background-color: ${props => props.bgColor ? '#003354' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};
    &:last-of-type {
        margin-right:0;
    }
    &:hover {
        cursor: pointer;
    }
`;

export default Boton;