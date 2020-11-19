import React, { useRef, useCallback } from 'react';

import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import TextArea from '../../components/TextArea';
//precisa desses imports 
// import { FiUser , FiMail , FiLock, FiPhone, FiMapPin } from 'react-native-vector-icons/fi';
// import { FaRegAddressCard } from "react-icons/fa";
// import { AiOutlineFieldNumber } from "react-icons/ai";

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import {
    Container,
    Title,
    BackToSignIn,
    BackToSignInText,
    CreateAccountButton,
    CreateAccountButtonText
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';


//import logoImg from '../../assets/logo.png';
interface SignUpFormData {
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

const Cadastro: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const handleSignUp = useCallback(async (data: object) => {
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
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            await api.post('/users', data);
            Alert.alert('Cadastro atualizado!', 'dados salvos com sucesso.');
            navigation.goBack();

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                console.log(errors);
                Alert.alert(
                    'Erro ao salvar',
                    'preencha corretamente todos os campos obrigatórios',
                );
            }
            console.log(err);
            Alert.alert(
                'Erro ao salvar',
                'preencha corretamente todos os campos obrigatórios',
            );
        }

    }, [navigation]);
    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <View>
                            <Title>cadastro</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            {/* <img src={imgPhoto}></img>
                            <input type="file" id="file" name="filename" value="" />
                            <Button type="submit" name="sendPhoto" className="button button2">enviar</Button> */}
                            <h3><span>Dados</span></h3>
                            <span>Nome</span>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="nome"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />
                            <span>documento</span>


                            <Input
                                ref={emailInputRef}
                                autoCapitalize="none"
                                autoCorrect={false}
                                name="social_id"
                                icon="address-card"
                                placeholder="000.000.000-00"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <label>
                                <input type="radio" value="CNPJ" className="radio" />
                                CNPJ
                            </label>
                            <label>
                                <input type="radio" value="CPF" className="radio" />
                                CPF
                            </label>

                            <Input
                                name="social_id"
                                placeholder="00.000.000/0000-00"
                                icon="FaRegAddressCard"
                            />
                            <label>informações</label>
                            {/* <TextArea name="info" defaultValue={user.info} placeholder="" /> */}
                            {/* esta dando erro no defaultValue */}

                            <h3><span>Contato</span></h3>
                            <span>e-mail</span>
                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                name="email"
                                icon="mail"
                                placeholder="Email"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <span>informações</span>

                            <textarea
                                name="info"
                                placeholder="informações"
                            />
                            <h3><span>Contato</span></h3>
                            <span>e-mail</span>

                            <Input
                                name="email"
                                placeholder="email@email.com.br"
                                icon="mail"
                            />
                            <span>Telefone</span>

                            <Input
                                name="phone"
                                placeholder="(XX) XXXXX-XXXX"
                                icon="phone"
                            />
                            <span>celular</span>
                            <Input
                                name="phone"
                                placeholder="(XX) XXXXX-XXXX"
                                icon="phone"
                            />
                            <h3><span>Endereço</span></h3>
                            <span>endereço</span>

                            <Input
                                name="street"
                                placeholder="rua, avenida"
                                icon="MapPin"
                            />
                            <span>número</span>

                            <Input
                                name="number"
                                placeholder="número"
                                icon="AiOutlineFieldNumber"
                            />
                            <span>complemento</span>

                            <Input
                                name="complement"
                                placeholder="complemento, bloco, apartamento, casa"
                                icon="FiMapPin"
                            />
                            <span>bairro</span>

                            <Input
                                name="neightborhood"
                                placeholder="bairro"
                                icon="FiMapPin"
                            />
                            <span>cidade</span>

                            <Input
                                name="city"
                                placeholder="cidade"
                                icon="FiMapPin"
                            />
                            <span>uf</span>

                            <Input
                                name="state"
                                placeholder="uf"
                                icon="FiMapPin" />
                            <span>cep</span>

                            <Input
                                name="zipcode"
                                placeholder="cep"
                                icon="FiMapPin"
                            />

                            <h3><span>Senha</span></h3>
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                textContentType="newPassword"
                                icon="lock"
                                placeholder="senha"
                                returnKeyType="send"
                                onSubmitEditing={() => { formRef.current.submitForm(); }}
                            />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                textContentType="newPassword"
                                icon="lock"
                                placeholder="confirmar senha"
                                returnKeyType="send"
                                onSubmitEditing={() => { formRef.current.submitForm(); }}
                            />
                            <Button onPress={() => { formRef.current.submitForm(); }}>Salvar</Button>
                            <CreateAccountButton onPress={() => navigation.navigate('dashboard')}>
                                <Icon name="voltar" size={20} color="#ff9000" />
                                <CreateAccountButtonText>
                                    voltar
                             </CreateAccountButtonText>
                            </CreateAccountButton>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#000" />
                <BackToSignInText>
                    Voltar para logon
            </BackToSignInText>
            </BackToSignIn>
        </>
    );


};

export default Cadastro;