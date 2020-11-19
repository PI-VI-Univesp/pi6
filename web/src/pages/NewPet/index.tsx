import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, AnimationContainer, Background, Image } from './styles';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { FaBirthdayCake, FaCat, FaDog } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import MainMenu from '../../components/MainMenu';
import { AiOutlineInfoCircle } from "react-icons/ai";

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
}

interface CadastroPetFormData {
    name: string;
    species: string;
    birth_day: string;
    coat: string;
    gender: string;
    breed: string;
    info: string;
    avatar: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}


const NewPet: React.FC = () => {

    const formRef = useRef  <FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('@QueroPet:user') || "{}");
    console.log('aaaaaaaaa')
    const [speciesFelina, setSpeciesFelina] = useState(false);

    const [speciesCanina, setSpeciesCanina] = useState(true);

    const setSpecies = (ele: any) => {
        localStorage.setItem('@QueroPet:pet_species', ele.target.value)
        setSpeciesFelina(localStorage.getItem('@QueroPet:pet_species') === 'cat' ? true : false)
        setSpeciesCanina(localStorage.getItem('@QueroPet:pet_species') === 'dog' ? true : false)
        return
    }

    useEffect(() => {
        if(speciesFelina){
            localStorage.setItem('@QueroPet:pet_species','cat');
        } else {
            localStorage.setItem('@QueroPet:pet_species','dog');
        }
    },[speciesFelina, speciesCanina]);

    const [speciesFemale, setSpeciesFemale] = useState(true);

    const [speciesMale, setSpeciesMale] = useState(false);

    const setGender = (ele: any) => {
        localStorage.setItem('@QueroPet:pet_gender', ele.target.value)
        setSpeciesFemale(localStorage.getItem('@QueroPet:pet_gender') === 'F' ? true : false)
        setSpeciesMale(localStorage.getItem('@QueroPet:pet_gender') === 'M' ? true : false)
        return
    }

    useEffect(() => {
        if(speciesFemale){
            localStorage.setItem('@QueroPet:pet_gender','F');
        } else {
            localStorage.setItem('@QueroPet:pet_gender','M');
        }
    },[speciesFemale, speciesMale]);

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                birth_day: Yup.string().required('Nascimento obrigatório'),
                coat: Yup.string().required('Pelagem obrigatória'),
                breed: Yup.string().required('Raça obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const merged = { ...{
                "user_id": user.id,
                "gender": localStorage.getItem('@QueroPet:pet_gender'),
                "species": localStorage.getItem('@QueroPet:pet_species')
            }, ...data }

            await api.post(`/pets`, merged);
            localStorage.setItem('@QueroPet:pet', JSON.stringify(merged));
            console.log(merged)
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro salvo!',
                description: 'dados salvos com sucesso.'
            });

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
            addToast({
                type: 'error',
                title: 'Erro ao salvar',
                description: 'preencha corretamente todos os campos obrigatórios'+err,
            });
        }

    }, [addToast, history]);

    return (
        <Container>
            <MainMenu>

            <img className="logo" src={logoImg} alt="QueroPet" />
                <h1 className="title">Cadastro</h1>

                <ul>
                    <li><Link to='/cadastroInstituicao'>Meu Cadastro</Link></li>
                    <li><Link to='/cadastroInstituicao'>Alterar Senha</Link></li>
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
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1><span>Cadastro pet</span></h1>
                        <div className="item">
                            <Image src={'https://source.unsplash.com/user/erondu/600x400'}></Image>
                            <input type="file" id="file" name="filename" value="" />
                            <Button type="submit" name="sendPhoto" className="button button2">enviar</Button>
                        </div>


                        <div className="item" style={{ maxWidth: '600px' }}>
                            <span className="titleItemCard">nome </span>
                            <Input name="name" placeholder="Nome" icon={MdPets} />
                        </div>
                        <div className="item divRadioButton">
                            <span className="titleItemCard">espécie:</span>
                            <label>
                                <input type="radio" name="species" value="dog" onChange={setSpecies} className="radio" checked={speciesCanina}/> canina
                            </label>
                            <label>
                                <input type="radio" name="species" value="cat" onChange={setSpecies} className="radio"  checked={speciesFelina}/> felina
                            </label>
                        </div>
                        <div className="item divRadioButton">
                            <span className="titleItemCard">gênero:</span>
                            <label>
                                <input type="radio" name="gender" value="F" onChange={setGender}  className="radio" defaultChecked={speciesFemale}/> Fêmea
                            </label>
                            <label>
                                <input type="radio" name="gender" value="M" onChange={setGender}  className="radio" checked={speciesMale}/> Macho
                            </label>
                        </div>
                        <div className="item" style={{ maxWidth: '300px' }}>
                            <span className="titleItemCard">Nascimento </span>
                            <Input name="birth_day" placeholder="XX/XX/XXXX" icon={FaBirthdayCake} />
                        </div>
                        <div className="item" style={{ maxWidth: '600px' }}>

                            <span className="titleItemCard">raça </span>
                            <Input name="breed" placeholder="Dálmata, SRD, outros." icon={FaDog} />
                        </div>
                        <div className="item" style={{ maxWidth: '600px' }}>

                            <span className="titleItemCard">Pelagem </span>
                            <Input name="coat" placeholder="Curta, Tricolor, Característica" icon={FaCat} />
                        </div>
                        <div className="item" style={{ maxWidth: '600px' }}>
                            <span className="titleItemCard">Informações </span>
                            <TextArea name="info" placeholder="" icon={AiOutlineInfoCircle}/>
                        </div>
                        <div style={{ maxWidth: '300px', border:'none' }}>
                        <Button type="submit" className="button">salvar</Button>
                        <div className="button" style={{ float: "right" }}>
                            <Link to="/home">voltar</Link>
                        </div>
                        </div>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />

        </Container >
    );

};
export default NewPet;
