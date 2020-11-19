import styled, {css} from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps{
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}
export const Container = styled.div<ContainerProps>`

    
    background: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #ccc;
    color: #777;
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    & + div {
        margin-top: 16px;
    }

    ${props => props.isErrored && css`
            border: 2px solid #c53030;

    `}

    ${props => props.isFocused && css`
        color: #FF9000;
        border: 2px solid #FF9000;
    `}

    ${props => props.isFilled && css`
        color: #FF9000;

    `}

    input {
        background: transparent;
        flex:1 ;
        border: 0;
        color: #333;

        &::placeholder {
            color: #ccc;
        }

    }
    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    svg {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`;
