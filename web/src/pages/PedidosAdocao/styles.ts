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

    .item{
        margin-bottom: 20px;
        margin-top: 10px;
       display: flex;
   align-items: baseline;
   }
   
`;

export const Background = styled.div`
    flex: 1;
    background: url(${HomeBg}) no-repeat center;
    background-size: cover;
`;

