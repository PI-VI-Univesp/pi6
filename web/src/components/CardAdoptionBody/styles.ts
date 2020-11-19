import styled from 'styled-components';
import {shade} from 'polished';

interface CardProps{
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.article`

    width:600px;
    display: block;
    margin: 60px auto;
    box-shadow: 10px 5px 40px 20px darken(#341cac, 5%);
    transition: .25s;

    &:hover {
        box-shadow: 10px 5px 40px 20px darken(#341cac, 10%);
        cursor: pointer;

        .button-primary {
        transform: translate(10px, 0);
        }
    }





`;
