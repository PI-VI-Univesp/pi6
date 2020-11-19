import React, { ButtonHTMLAttributes } from 'react';
import { Container, Content } from './styles';
import CardAdoptionBody from '../CardAdoptionBody';
import { FaDog, FaCat } from "react-icons/fa";
import { GiFemale, GiMale } from "react-icons/gi";


interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    candidate_pets: Pet[];
}

interface Pet {
    id: string;
    name: string;
    has_faved_by: User[];
    has_asked_for_adoption: User[];
    info: string;
    header_name: string;
    image: string;
    species: string;
    gender: string;
    breed: string;
    birth_day: string;
    avatar: string;
}


const CardAdoption: React.FC<User> = ({ id, name, phone, email, city, state, candidate_pets,  ...rest }) => (

    <Container>
        <Content>
            <div>
                <div className="item">
                    <label className="titleItemCard">nome </label>
                    <label id="name">{name}</label>
                </div>
                <div className="item">
                    <label className="titleItemCard">contato</label>
                    <label id="phone">{phone} / </label>
                    <label id="email"> {email} </label>
                </div>
                <div className="item">
                    <label className="titleItemCard">residência</label>
                    <label id="location">{city} - {state}</label>
                </div>
                <div className="item">
                    <label className="titleItemCard">Interessado em adotar:</label>
                    <label id="pets"></label>
                </div>
                <ul>
                    {candidate_pets.map((pet)=> (
                        <li><a href={`/cardPet/${pet.id}`}> {pet.name}</a> </li>
                    ))}

                </ul>
            </div>

        </Content>
    </Container>
);

export default CardAdoption;
