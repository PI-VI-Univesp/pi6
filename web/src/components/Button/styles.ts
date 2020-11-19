import styled from 'styled-components';
import {shade} from 'polished';

export const Container = styled.button`
    background: #FF9000;
    border-radius: 10px;
    border: 0;
    color: #FFFFFF;
    padding: 16px;
    width: 100%;
    margin-top: 16px;
    margin-right: 16px;
    font-weight: 500;
    height: 56px;
    transition: background-color 0.2s;
    &:hover{
        background: ${shade(0.2, '#FF9000')};
    }
`;
