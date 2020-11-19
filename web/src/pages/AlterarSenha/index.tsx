import React, { useCallback, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, AnimationContainer, Background, Image } from './styles';
import { useAuth, AuthProvider } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlineFieldNumber, AiOutlineInfoCircle } from "react-icons/ai";
import MainMenu from '../../components/MainMenu';
import { MdPets } from "react-icons/md";

interface AlterarSenhaFormData {
    password: string;
}


const AlterarSenha: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('@QueroPet:user') || "{}");

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
                confirmpassword: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            await api.put(`/users/${user.id}`, data);
            const merged = { ...user, ...data }
            localStorage.setItem('@QueroPet:user', JSON.stringify(merged));
            history.push('/');

            addToast({
                type: 'success',
                title: 'Senha salva.',
                description: 'Sua senha foi alterada com sucesso!'
            });

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
            addToast({
                type: 'error',
                title: 'Erro ao salvar',
                description: 'Occorreu um erro ao salvar, tente novamente.',
            });
        }

    }, [addToast, history]);

    return (
        <Container>
            <MainMenu/>
            <Content>
                <AnimationContainer>
                    <h1><span>Alterar senha</span></h1>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <div className="item">
                            <span className="titleItemCard">senha atual</span>
                            <Input type="password" name="actualPassword" icon={FiLock} placeholder="Senha" />

                        </div>
                        <div className="item">
                            <span className="titleItemCard">nova senha</span>
                            <Input type="password" name="password" icon={FiLock} placeholder="Senha" />
                        </div>
                        <div className="item">
                            <span className="titleItemCard">nova senha</span>
                            <Input type="password" name="confirmarpassword" icon={FiLock} placeholder="Confirmar Senha" />
                        </div>
                        <div className="item">
                            <Button type="submit">Salvar</Button>
                        </div>
                    </Form>
                </AnimationContainer>
            </Content>

        </Container>
    );
}
export default AlterarSenha;
