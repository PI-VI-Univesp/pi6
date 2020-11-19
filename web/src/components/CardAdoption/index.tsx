import React, { ButtonHTMLAttributes } from 'react';
import { Container, Content } from './styles';
import CardAdoptionBody from '../CardAdoptionBody';
import { FaDog, FaCat } from "react-icons/fa";
import { GiFemale, GiMale } from "react-icons/gi";

interface Institution {
    id: string;
    name: string;
    city: string;
    state: string;
}
interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
}

interface CardProps {
    item_id: string;
    name: string;
    breed: string;
    species: string;
    gender: string;
    birth_day: string;
    adoption: User[];
}


const CardAdoption: React.FC<CardProps> = ({ item_id, name, breed, species, gender, birth_day, adoption, ...rest }) => (

    <Container>
        <Content>
            <div className="item" >
                <h1 className="principalTitle"><label id="name" className="title">{name}</label></h1>
            </div>
            <div className="item">
                <FaDog className={species === 'dog' ? 'iconSpecie' : 'invisible'} />
                <FaCat className={species === 'cat' ? 'iconSpecie' : 'invisible'} />
                <GiFemale className={gender === 'F' ? 'iconSpecie' : 'invisible'} />
                <GiMale className={gender === 'M' ? 'iconSpecie' : 'invisible'} />
            </div>
            <div className="item">
                <label className="titleItemCard">raça </label>
                <label id="breed">{breed}</label>
            </div>
            <div className="item">
                <label className="titleItemCard">nascimento </label>
                <label id="breed">{birth_day}</label>
            </div>
        </Content>

        <Content>
            <h2 className="principalTitle">Adotantes:</h2>
            <div>
                <div className="item">
                    <label className="titleItemCard">nome </label>
                    <label id="name">nome</label>
                </div>
                <div className="item">
                    <label className="titleItemCard">contato</label>
                    <label id="phone">telefone / </label>
                    <label id="phone">email </label>
                </div>
                <div className="item">
                    <label className="titleItemCard">residência</label>
                    <label id="phone">cidade - estado</label>
                </div>
            </div>
            {adoption.map(user => (
                <CardAdoptionBody
                    key={user.id}
                    id={user.id}
                />
            ))}
        </Content>
    </Container>
);

export default CardAdoption;
