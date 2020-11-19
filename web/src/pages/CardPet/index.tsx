import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, AnimationContainer } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import InputFormulario from '../../components/InputFormulario';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import imgPhoto from '../../assets/cat-login.jpg';
import api from '../../services/api';
import MainMenu from '../../components/MainMenu';

import { FaDog, FaCat } from "react-icons/fa";
import { GiFemale, GiMale } from "react-icons/gi";

interface User {
    id: string;
    name: string;
}

interface Institution {
    id: string;
    name: string;
    state: string;
    city: string;
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
    birth_day: string;
    breed: string;
    coat: string;
    avatar_url: string;
}


const CadastroInstituicao: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast, removeToast } = useToast();
    const history = useHistory();
    const location = useLocation();
    const pet_id = location.pathname.split('/')[2];

    const [ pets, setPets ] = useState<Pet[]>(() => {
        const storagedPets = localStorage.getItem('@QueroPet:pets');
        if (storagedPets){
            return JSON.parse(storagedPets);
        }
        return [];
    });

    useEffect(()=> {
        localStorage.setItem('@QueroPet:pets', JSON.stringify(pets));
    }, [pets]);

    useEffect(()=>{
        api.get(`pets/`).then(response => {
            setPets(response.data);
        });

    },[]);

    const pet = pets.filter( (p) => (p.id === pet_id) )[0];

    return (
        <Container>
            <MainMenu>
            <img className="logo" src={logoImg} alt="QueroPet" />
                <h1 className="title">Cadastro</h1>

                <ul>
                    <li><Link to='/cadastroInstituicao'>Meu Cadastro</Link></li>
                    <li><Link to='/alterarsenha'>Alterar Senha</Link></li>
                </ul>
                <h1>Pets</h1>
                <ul>
                    <li><Link to='/novoPet'>Adicionar Novo Pet</Link></li>
                    <li><Link to='/'>Meus Pets</Link></li>
                    <li><Link to='/'>Pedidos de Adoção</Link></li>
                </ul>
            </MainMenu>
            <Content>
                <AnimationContainer>
                    <h1 className="principalTitle"><label id="name" className="title">{pet.name}</label></h1>

                        <div className="item" >
                            <FaDog className={pet.species === 'dog' ? 'iconSpecie' : 'invisible'} />
                            <FaCat className={pet.species === 'cat' ? 'iconSpecie' : 'invisible'}  />
                            <GiFemale className={pet.gender === 'F' ? 'iconSpecie' : 'invisible'}/>
                            <GiMale className={pet.gender === 'M' ? 'iconSpecie' : 'invisible'}/>

                        </div>

                        <div className="item">
                            <label className="titleItemCard">Nascimento </label>
                            <label id="bithday">{pet.birth_day}</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">raça </label>
                            <label id="breed">{pet.breed}</label>
                        </div>

                        <div className="item">
                            <label className="titleItemCard">Pelagem </label>
                            <label id="coat">{pet.coat}</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Informações </label>
                            <label id="info" className="textJustify">{pet.info}</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">instituição </label>
                            <label id="instituicao" >{pet.institution.name}</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Localização </label>
                            <label id="instituicao" >{pet.institution.city} - {pet.institution.state}</label>
                        </div>
                        <div className="item">
                            <div className="button" >
                                <Link to="/home" >voltar</Link></div>
                                <Button className="button" onClick={() => (history.push(`/cadastroPet/${pet_id}`))}>editar</Button>
                            </div>
                </AnimationContainer>
            </Content>
            <Content>
                <img src={pet.avatar_url} alt="QueroPet" />
            </Content>
        </Container>
    );

};
export default CadastroInstituicao;
