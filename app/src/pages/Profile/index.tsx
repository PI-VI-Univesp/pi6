import React , { useState, useRef, useCallback } from 'react';

import { 
     Image,
     View,
     ScrollView,
     KeyboardAvoidingView ,
     Platform,
     TextInput, 
     Alert
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

import { 
    Header,
    Container,
    Title, 
    BackToSignIn,
    BackToSignInText 
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';


import logoImg from '../../assets/logo.png';
interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    phone: string;   
    city: string;   
    state: string;   
    social_id: string;   
    info: string;   
    street: string;   
    number: string;   
    complement: string;   
    neightborhood: string;   

}

const EditProfile: React.FC = () => {
    const { user , signOut} = useAuth();

    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState();

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const handleEditProfile = useCallback( async (data: object) => {
        try {
            data["type"] = selectedValue;
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                phone: Yup.string().required('Telefone obrigatório'),
                city: Yup.string().required('Cidade Obrigatória'),
                state: Yup.string().required('Estado obrigatório'),
                social_id: Yup.string(),
                info: Yup.string(),
                street: Yup.string(),
                number: Yup.string(),
                complement: Yup.string(),
                neightborhood: Yup.string(),
                password: Yup.string()
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            
            await api.put(`/users/${user.id}`, data);
            Alert.alert('Cadastro atualizado com sucesso !');
            navigation.goBack();

        } catch (err) {
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                console.log(errors);
                Alert.alert(
                    'Erro no cadastro',
                    'Occorreu um erro ao fazer o cadastro, tente novamente',
                );
            }
            console.log(err);
            Alert.alert(
                'Erro no cadastro',
                'Occorreu um erro ao fazer o cadastro, tente novamente',
            );
        }

    },[navigation]);
    return (
        <>
        <Header>
          <Image style={{height: 80}} source={Logo} />
          <Icon
            name="log-out"
            size={24}
            color="#333"
            onPress={signOut}
          />
        </Header>
        
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding': undefined }
            style={{flex: 1}}
            enabled
        >   
            
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                >
                   
                <Container>
                <Title>Editar Perfil</Title>
                    <Form ref={formRef} onSubmit={handleEditProfile}>
                        <Input 
                            autoCapitalize="words" 
                            name="name" 
                            icon="user" 
                            placeholder="Nome"
                            defaultValue={user.name}
                            returnKeyType="next"

                        />
                        <Input 
                            autoCapitalize="words" 
                            name="social_id" 
                            icon="layers" 
                            defaultValue={user.social_id}
                            placeholder="CPF"  
                            returnKeyType="next"

                        />
                        <Input 
                            autoCapitalize="words" 
                            name="info" 
                            icon="info"
                            defaultValue={user.info}
                            placeholder="Informações"  
                            returnKeyType="next"

                        />
                       <Input 
                            autoCapitalize="words" 
                            name="phone" 
                            icon="phone" 
                            placeholder="Telefone"
                            defaultValue={user.phone}
                            returnKeyType="next"

                        />
                        <Input 
                            autoCapitalize="words" 
                            name="street" 
                            icon="map-pin" 
                            placeholder="Rua"
                            defaultValue={user.street}
                            returnKeyType="next"
  
                        />
                        <Input 
                            autoCapitalize="words" 
                            name="number" 
                            icon="map-pin" 
                            placeholder="Número"  
                            defaultValue={user.number}
                            returnKeyType="next"

                        />
                        <Input 
                            autoCapitalize="words" 
                            name="complement" 
                            icon="map-pin" 
                            defaultValue={user.complement}
                            placeholder="Complemento"  
                            returnKeyType="next"

                        />
                        <Input 
                            autoCapitalize="words" 
                            name="neightborhood" 
                            icon="map-pin" 
                            placeholder="Bairro"
                            defaultValue={user.neightborhood}
                            returnKeyType="next"

                        />
                        <Input 
                            autoCapitalize="words" 
                            name="city" 
                            icon="map-pin" 
                            placeholder="Cidade"
                            defaultValue={user.city}
                            returnKeyType="next"

                        />
                        <Input 
                            autoCapitalize="words" 
                            name="state" 
                            icon="map-pin" 
                            placeholder="Estado"
                            defaultValue={user.state}
                            returnKeyType="next"

                        />
                        <Input 
                            autoCapitalize="words" 
                            name="zipcode" 
                            icon="map-pin" 
                            placeholder="CEP"
                            defaultValue={user.zipcode}
                            returnKeyType="next"

                        />
                        
                    </Form>
                    <Button onPress={() => { formRef.current.submitForm();} }>Salvar</Button>

                </Container>
            </ScrollView>
        </KeyboardAvoidingView>


        </>
    );

    
};

export default EditProfile;