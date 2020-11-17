import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import  api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { 
    Text,
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView ,
    Platform,
    TextInput, 
    Alert
} from 'react-native';

import {
    Container,
    PetContainer,
    PetImage,
    PetList,
    Pet,
    PetTitle,
    PetDescription,
    PetButton,
    Header
  } from './styles';

interface Institution {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
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
}

const Home: React.FC = () => {
    const { signOut } = useAuth();
    const navigation = useNavigation();
    const [ pets, setPets ] = useState<Pet[]>(() => {
        /*const storagedPets = localStorage.getItem('@QueroPet:pets');
        if (storagedPets){
            return JSON.parse(storagedPets);
        }*/
        return [];
    });

    async function handleNavigate(id: string): Promise<void> {
      navigation.navigate('PetDetails', {
        id,
      });
    }
  

    useEffect(()=>{
        async function loadPets(): Promise<void> {
            const response = await api.get(`pets/`);
            setPets(response.data);
            
        }
        
       
        loadPets();

    },[]);

    return (
        <Container>
        <Header>
          <Image style={{height: 80 }} source={Logo} />
          <Icon
            name="log-out"
            size={24}
            color="#333"
            onPress={() => navigation.navigate('Home')}
          />
        </Header>
        <PetContainer>
          <PetList
            data={pets}
            keyExtractor={item => item.id}
            
            ListFooterComponentStyle={{
              height: 80,
            }}
            renderItem={({item}) => (
              <Pet key={item.id} onPress={() => handleNavigate(item.id)}>
                <PetImage source={{uri: "https://source.unsplash.com/user/erondu/600x400" }} />
                <PetTitle>{item.name}</PetTitle>
                <PetTitle>{item.gender}</PetTitle>
                <PetTitle>{item.species}</PetTitle>
                <PetDescription>{item.info}</PetDescription>
                <PetButton><Text>Favoritar</Text></PetButton>
              </Pet>
            )}
          />
        </PetContainer>
      </Container>
    );
}
export default Home;