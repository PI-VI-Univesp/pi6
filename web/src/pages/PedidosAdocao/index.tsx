import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Container, Content } from './styles';
import  CardAdoption  from '../../components/CardAdoption';
import  MainMenu  from '../../components/MainMenu';
import  api from '../../services/api';
import logoImg from '../../assets/logo.svg';

interface PetParams {
    pet: string;
}

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

const PedidosAdocao: React.FC = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('@QueroPet:user') || "{}");
    const location = useLocation();
    const tipoPesquisa = location.pathname.split('/')[2];

    const [ candidates, setCandidates ] = useState<User[]>(() => {
        const storagedCandidates = localStorage.getItem('@QueroPet:candidates');
        if (storagedCandidates){
            return JSON.parse(storagedCandidates);
        }
        return [];
    });

    useEffect(()=> {
        localStorage.setItem('@QueroPet:candidates', JSON.stringify(candidates) );
    }, [candidates]);

    useEffect(()=>{
        const token = localStorage.getItem('@QueroPet:token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        api.post(`users/pendingrequests/`, {},  config ).then(response => {
            console.log(response.data);
            setCandidates(response.data);
        });

    },[]);
    console.log(candidates)
    return(

        <Container>
            <MainMenu/>
            <Content>
            { candidates.map( candidate => (
                    <CardAdoption
                    id={candidate.id}
                    name={candidate.name}
                    phone= {candidate.phone}
                    email= {candidate.email}
                    city={candidate.city}
                    state={candidate.state}
                    candidate_pets={candidate.candidate_pets}
                    />
                ))}
            </Content>
        </Container>
    )
}
export default PedidosAdocao;
