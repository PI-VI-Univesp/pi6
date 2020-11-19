import styled , { keyframes } from 'styled-components';
import HomeBg from '../../assets/dog-home.jpg';
import {shade} from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`

    place-content: center;
    width: 100%;
    padding-left: 50px;
    overflow: auto;
    background: url(${HomeBg}) no-repeat center;
    background-size: cover;
    img {
        max-width: 340px;
    }

`;


const appearFromLeft = keyframes`
    from {
        opacity:0;
        transform: translateX(-50px);

    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${appearFromLeft} 1s;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        h1 {
            margin-bottom: 24px;
        }
        a {
            color: #666;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover{
                color: ${shade(0.2, '#666')};
            }
        }

    }
    > a {

        color: #FF9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        &:hover{
            color: ${shade(0.2, '#FF9000')};

        }
        svg {
            margin-right: 16px;
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${HomeBg}) no-repeat center;
    background-size: cover;
`;

