import React, { useCallback, useRef} from 'react';
import {FiArrowLeft, FiUser , FiMail , FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, AnimationContainer, Background } from './styles';
import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}


const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {addToast} = useToast();
    const history = useHistory();

    const userTypeOption = [
        { value: 'adopter', label: 'Quero adotar' },
        { value: 'institution', label: 'Sou uma instituição' }
    ]

    const handleSubmit = useCallback( async (data: object) => {
        try {

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email("Digite um e-mail válido"),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro Realizado',
                description: 'Você já pode fazer seu logon!'
            });

        } catch (err) {
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                console.log(errors);
            }
            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Occorreu um erro ao fazer o cadastro, tente novamente',
            });
        }

    },[addToast, history]);
    return (
        <Container>
            <Background />
            <Content>
            <AnimationContainer>
                <img src={logoImg} alt="QueroPet"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>
                    <Select name="type" options={userTypeOption} defaultValue={userTypeOption[0]}/>
                    <Input icon={FiUser} name="name" placeholder="Nome"/>
                    <Input icon={FiMail} name="email" placeholder="E-Mail"/>
                    <Input type="password" name="password" icon={FiLock} placeholder="Senha" />

                    <Button type="submit">Cadastrar</Button>
                </Form>

                <Link to="/"><FiArrowLeft/>Voltar para Logon</Link>
                </AnimationContainer>
            </Content>

        </Container>
    );
};
export default SignUp;
