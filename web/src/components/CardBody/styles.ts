import styled from 'styled-components';
import {shade} from 'polished';

export const Container = styled.div`

    padding: 15px;
    background-color:#fff;
    width:100%;
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;


    .iconSpecie{
        color: #ff90008c;
        display: block;
        font-size: 3.0rem;
        float: right;
    }
    .invisible{
        display: none;
    }

`;

export const Date = styled.p`
    font-family: 'Roboto Slab', serif;
    font-size: 16px;

    font-weight: 600;
    color: grey;
`;

export const BodyContent = styled.p`
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
    font-weight: 600;
    color: grey;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const Name = styled.h2`
    font-family: 'Roboto Slab', serif;
    font-size: 36px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
`;

export const ButtonPanel = styled.div`
    display: flex;
    margin-right: 5px;

`;


/*export const Name = styled.div`
    font-family: 'Roboto Slab', serif;
    font-size: 36px;
    font-weight: 600;
    color: #333;
`;*/
