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


interface Pet {
    id: string;
    name: string;
    has_faved_by: User[];
    has_asked_for_adoption: User[];
    info: string;
    header_name: string;
    image: string;
    institution: Institution;
    species: string;
    gender: string;
    breed: string;
    birth_day: string;
}

const PedidosAdocao: React.FC = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('@QueroPet:user') || "{}");
    const location = useLocation();
    const tipoPesquisa = location.pathname.split('/')[2];

    const [ pets, setPets ] = useState<Pet[]>(() => {
        const storagedPets = localStorage.getItem('@QueroPet:pets');
        if (storagedPets){
            return JSON.parse(storagedPets);
        }
        return [];
    });

    useEffect(()=> {
        localStorage.setItem('@QueroPet:pets', JSON.stringify(pets) );
    }, [pets]);

    useEffect(()=>{
        api.get(`pets/`).then(response => {
            setPets(response.data);
        });

    },[]);



    function getListaPets(){
//*ajustar  para trazer somente pets que possuem
//registros no campo has_asked_for_adoption*/
        //return pets.filter( (p) => (p.institution.id === user.id && p.has_asked_for_adoption !== null));
        return pets.filter( (p) => (p.institution.id === user.id));
    }
    const listaPets = getListaPets();

    return(

        <Container>
            <MainMenu/>
            <Content>
            { listaPets.map( pet => (
                    <CardAdoption
                    key={pet.id}
                    item_id={pet.id}
                    name={pet.name}
                    breed ={pet.breed}
                    species={pet.species}
                    gender={pet.gender}
                    birth_day={pet.birth_day}
                    adoption={ pet.has_asked_for_adoption}
                    />
                ))}
            </Content>
        </Container>
    )
}
export default PedidosAdocao;
