import React , { useEffect, useState } from 'react';
import { Container, Date , BodyContent, Name, ButtonPanel} from './styles';
import Button from '../Button';
import  api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useHistory } from 'react-router-dom';
import { FaDog, FaCat } from "react-icons/fa";
import { GiFemale, GiMale } from "react-icons/gi";

interface Institution {
    id: string;
    name: string;
    city: string;
    state: string;
}

interface CardBodyProps {
    pet_id: string;
    date?: string;
    name: string;
    info: string;
    institution: Institution;
    species: string;
    gender: string;
    has_faved_by: boolean;
    has_asked_for_adoption: boolean;
}

const CardBody: React.FC<CardBodyProps> = ({pet_id, date, name, info, has_faved_by, has_asked_for_adoption, institution, species, gender,...rest}) => {
    const history = useHistory();
    const {user} = useAuth();

    return (

    <Container>
    <FaDog className={species === 'dog' ? 'iconSpecie' : 'invisible'} />
    <FaCat className={species === 'cat' ? 'iconSpecie' : 'invisible'}  />
    <GiFemale className={gender === 'F' ? 'iconSpecie' : 'invisible'}/>
    <GiMale className={gender === 'M' ? 'iconSpecie' : 'invisible'}/>
    <Date>{date}</Date>

    <Name>{name}</Name>



    <label>informações:</label>  <BodyContent>{info}</BodyContent>

    <ButtonPanel>

        <Button onClick={() => (history.push(`/cadastroPet/${pet_id}`))}>Editar</Button>

    </ButtonPanel>
    </Container>
    )};

export default CardBody;
