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
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlineFieldNumber, AiOutlineInfoCircle } from "react-icons/ai";
import MainMenu from '../../components/MainMenu';

interface CadastroInstituicaoFormData {
    name: string;
    social_id: string;
    info: string;
    email: string;
    phone: string;
    PhoneType: string;
    street: string;
    number: string;
    complement: string;
    neightborhood: string;
    city: string;
    state: string;
    zipcode: string;
    password: string;
}


const CadastroInstituicao: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();


    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('@QueroPet:user') || "{}");

    const [ phoneType, setPhoneType ] = useState(user.phone_type);

    useEffect(()=> {
        localStorage.setItem('@QueroPet:user_phone_type', phoneType);
    }, [phoneType]);


    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                social_id: Yup.string().required('Documento obrigatório'),
                email: Yup.string().required('Email obrigatório').email("Digite um e-mail válido"),
                phone: Yup.string().required('Telefone obrigatório'),
                street: Yup.string().required('Endereço obrigatório'),
                number: Yup.string().required('Número obrigatório'),
                neightborhood: Yup.string().required('Bairro obrigatório'),
                city: Yup.string().required('Cidade obrigatória'),
                state: Yup.string().required('Estado obrigatório'),
                zipcode: Yup.string().required('CEP obrigatório'),
                info: Yup.string(),
                // O usuário não deveria ser obrigado a alterar a senha nesse
                // formulário. Talvez seja o caso de criar um fluxo só para
                // alteração de senha.

                //password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            if (localStorage.getItem('@QueroPet:user_phone_type') === "trabalho") {
                user.phone_type = "work"
            }

            if (localStorage.getItem('@QueroPet:user_phone_type') === "celular") {
                user.phone_type = "mobile"
            }

            if  (localStorage.getItem('@QueroPet:user_phone_type') === "residencial") {
                user.phone_type = "home"
            }
            const merged = { ...user, ...data }
            await api.put(`/users/${user.id}`, merged);
            localStorage.setItem('@QueroPet:user', JSON.stringify(merged));
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro atualizado!',
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
                description: 'preencha corretamente todos os campos obrigatórios' +err,

            });
        }

    }, [addToast, history]);

    const phone_type_work = user.phone_type === 'work' ? true : false;
    const phone_type_mobile = user.phone_type === 'mobile' ? true : false;
    const phone_type_home = user.phone_type === 'home' ? true : false;

    return (
        <Container>
            <MainMenu/>
            <Content>
                <AnimationContainer>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1><span>meu Cadastro</span></h1>

                        <h3><span>Dados</span></h3>
                        <div className="item" style={{ maxWidth: '600px' }}>
                            <span>Nome</span>
                            <Input name="name" defaultValue={user.name} placeholder="Nome" icon={FiUser} />
                        </div>
                        <div className="item" style={{ maxWidth: '300px' }}>
                            <span >CNPJ</span>
                            <Input name="social_id" defaultValue={user.social_id} placeholder="00.000.000/0000-00" icon={FaRegAddressCard} />

                        </div>
                        <div className="item" style={{ maxWidth: '600px' }}>
                            <span>informações</span>
                            <TextArea name="info" defaultValue={user.info} placeholder="" icon={AiOutlineInfoCircle} />
                        </div>
                        <h3><span>Contato</span></h3>
                        <div className="item" style={{ maxWidth: '600px' }}>
                            <span>e-mail</span>
                            <Input name="email" defaultValue={user.email} placeholder="email@email.com.br" icon={FiMail} />
                        </div>

                        <div className="item" style={{ maxWidth: '300px' }}>
                            <span>Telefone</span>
                            <Input name="phone" defaultValue={user.phone}  placeholder="(XX) XXXXX-XXXX" icon={FiPhone} />
                            <select onChange={ (obj) => ( setPhoneType(obj.target.value))}>
                                <option key="MOBILE" defaultValue="MOBILE" selected={phone_type_mobile}>celular</option>
                                <option key="HOME" defaultValue="HOME" selected={phone_type_home}>residencial</option>
                                <option key="WORK" defaultValue="WORK" selected={phone_type_work}>trabalho</option>
                            </select>
                        </div>
                        <h3><span>Endereço</span></h3>

                        <div className="item" style={{ maxWidth: '600px' }}>
                            <span>rua</span>

                            <Input name="street" defaultValue={user.street} placeholder="rua, avenida" icon={FiMapPin} />
                        </div>
                        <div className="item" style={{ maxWidth: '300px' }}>
                            <span>número</span>
                            <Input name="number" defaultValue={user.number} placeholder="número" icon={AiOutlineFieldNumber} />
                        </div>
                        <div className="item" style={{ maxWidth: '300px' }}>
                            <span>complemento</span>

                            <Input name="complement" defaultValue={user.complement} placeholder="bloco, apartamento, casa" icon={FiMapPin} />
                        </div>
                        <div className="item" style={{ maxWidth: '300px' }}>
                            <span>bairro</span>

                            <Input name="neightborhood" defaultValue={user.neightborhood} placeholder="" icon={FiMapPin} />
                        </div>
                        <div className="item" style={{ maxWidth: '300px' }}>

                            <span>cidade</span>

                            <Input name="city" defaultValue={user.city} placeholder="" icon={FiMapPin} />
                        </div>
                        <div className="item" style={{ maxWidth: '300px' }}>
                            <span>estado</span>
                            <Input name="state" defaultValue={user.state} placeholder="" icon={FiMapPin} />
                        </div>
                        <div className="item" style={{ maxWidth: '300px' }}>

                            <span>cep</span>
                            <Input name="zipcode" defaultValue={user.zipcode} placeholder="00000-000" icon={FiMapPin} />
                        </div>

                        <div style={{ maxWidth: '300px', border:'none' }}>
                            <Button type="submit" className="button">salvar</Button>
                            <div className="button" style={{ float: "right" }}>
                                <Link to="/">voltar</Link>
                            </div>
                        </div>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />

        </Container>
    );

};
export default CadastroInstituicao;
