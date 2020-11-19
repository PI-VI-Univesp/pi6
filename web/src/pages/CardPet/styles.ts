import styled, { keyframes } from 'styled-components';
import HomeBg from '../../assets/dog-home.jpg';
import cadastroInBG from '../../assets/cat-login.jpg';


import { shade } from 'polished';
export const Container = styled.div`

    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    img {
        max-width: 640px;
        height: 90vh;
        border-radius: 10px;
        background-size: cover;
    }
    .logo{
        width: 250px;
        height: 120px;
    }
    display: flex;
    flex: 1;
    width: 100%;

    background:#fff;
    border-radius:10px;
    padding:25px;

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


    animation: ${appearFromLeft} 1s;

    body{
        background: #000;
    }
    .item{
        margin-bottom: 20px;
        margin-top: 10px;
       display: flex;
   align-items: baseline;
   }
   .titleItemCard{
    font-weight: bold;
    padding-right:10px;
    text-transform: lowercase;
    min-width: 120px;
   }
   .title{
    color: #FF9000;
   }
.item .button{
    margin-top: 20px;
    width: 150px;
}
    .button a {
        text-decoration: none;
        background: #FF9000;
        border-radius: 10px;
        border: 0;
        color: #FFFFFF;
        padding: 16px;
        width: 100%;
        margin-top: 16px !important;
        margin-left: 20px;
        font-weight: 500;
        height: 56px;
        transition: background-color 0.2s;
        &:hover{
            background: ${shade(0.2, '#FF9000')};
            color: #FFFFFF;
        }
        text-align: center;
        font-size: initial;
        margin-bottom: 0px;
        height: 50px;
    }

    span{
        text-transform: lowercase;
    }
    .iconSpecie{
        color: #ff90008c;
        display: block;
        font-size: 3.0rem;
    }
    .principalTitle{
        margin-bottom: 27px;
    }
    .textJustify{
    text-align: justify;
    }
    .invisible{
        display: none;
    }
`;


