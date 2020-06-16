import styled from '@emotion/styled';

export const Formulario = styled.form`
    @media (max-width:768px) {
        max-width: 100%;
        width: 95%;
    }
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;
    margin-bottom: 5rem;
    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        padding: 2rem;
    }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    label {
        @media (max-width:768px) {
            flex: 18px;
        }
        flex: 0 0 150px;
        font-size: 1.8rem;
    }
    input, 
    textarea {
        flex: 1;
        padding: 1rem;
    }
    textarea {
        height: 300px;
    }
`;

export const InputSubmit = styled.input`
    background-color: #003354;
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }
`;

export const Error = styled.p`
    background-color: red;
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #FFF;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`;

export const Select = styled.select`
    flex: 3;
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid;
    -webkit-appearance: none;
`;