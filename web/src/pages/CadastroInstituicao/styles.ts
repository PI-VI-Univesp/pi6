import styled, { keyframes } from 'styled-components';
import cadastroInBG from '../../assets/cat-login.jpg';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;

`;
export const Image = styled.img`
    height: 150px;
    border-radius: 10px;
    background-size: cover;
    margin-bottom: 40px;
    margin-right: 40px;
    float: left;

`;

export const Content = styled.div`
    width: 100%;
    background:#fff;
    border-radius:4px;
    padding:35px;
    overflow: scroll;
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

    body{
        background: #000;
    }
    form {
        margin: 50px 0;
        width: 100%;
        text-align: left;
        h1 {
            margin-bottom: 10px;
        }
        a {
            color: #666;
            display: block;
            margin-bottom: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.2s;
            text-decoration: underline;
            text-align: right;
            font-size:12px;
            &:hover{
                color: ${shade(0.2, '#FF9000')};
            }
        }

    }

    > a {

        color: #FF9FF;
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

    .radio{
        margin-right: 10px;
    }

    h3 {
        margin: 15px 0px;
        span{
            color:#FF9000;
        }
    }
    .button{
        width: 45%;
        height: 50px;
        padding: 0px;
    }
    .button2{
        width: 150px;
        height: 30px;
        padding: 0px;
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
    textarea
    {        
        height: 100px;
        resize: vertical;
    }
    span{
        text-transform: lowercase;
        font-weight: 500;
        color: #555555;
    }
    select{
        font-size: 16px;
        padding: 17px;
        border-radius:10px;
        border: 1px solid #ccc;
        color: #333;
        margin-left:5px;
        margin-top: 24px;
    }

    input[type='file'] {
        font-family: initial;
      }
     div{
        border-radius: 10px;
        border: 1px solid #ccc;        
      }
      .button{
        border: none;
      }
     
     .item{
        // margin-bottom: 10px;
        // display: flex;
        // align-items: baseline;
        // flex-direction: column;
        border: 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: end;
        span{
            padding-right: 10px;
        }
   }
   span{
       min-width: 110px;
       margin-top: 24px;
       text-align: end;
   }
   .title{
        color: #FF9000;
   }

   @media (max-width: 800px) {    
       .item{
            max-width:100% !important;
            display: flex;
            align-items: baseline !important;
            flex-direction: column;            
            text-align: end;             
       }
       span
        {
            min-width:0px;
        }
        select{           
            margin-left:0px;
        }
        h3{
            display: none;
        }
        .lblRadioButton{
            min-width: 0px;
        }
        .divRadioButton{
            flex-orientation: row;
        }
    
    }   
`;

export const Background = styled.div`
    flex: 1;
    background: url(${cadastroInBG});
    background-size: cover;
`;
