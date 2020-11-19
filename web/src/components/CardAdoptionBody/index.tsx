import React , { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface Institution {
    id: string;
    name: string;
    city: string;
    state: string;
}
interface User {
    id: string;
    // name: string;
    // phone: string;
    // email: string;    
}

interface CardProps {
    id: string;
}

const CardAdoptionBody: React.FC<CardProps> = ({  id, ...rest}) => (

    //pegar lista de user passada por parametro e listar informações

        <Container>
            <div className="item">
                <label className="titleItemCard">name</label>
                <label id="name">{id}</label>
                <label className="titleItemCard">email</label>
                <label id="email">name</label>
                <label className="titleItemCard">telefone</label>
                <label id="phone">phone</label>
                <label className="titleItemCard">cidade</label>
                <label id="city">city - state</label>            
            </div>
        </Container>
    );

export default CardAdoptionBody;
