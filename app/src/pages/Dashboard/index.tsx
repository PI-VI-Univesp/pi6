import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import  api from '../../services/api';
import { useAuth, signOut } from '../../hooks/auth';

import { 
    Image,
} from 'react-native';

import {
    Container,
    PetContainer,
    PetImage,
    PetList,
    Pet,
    PetTitle,
    PetDescription,
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
    avatar_url: string;
}

const Home: React.FC = () => {
    const { signOut } = useAuth();
    const navigation = useNavigation();
    const [ pets, setPets ] = useState<Pet[]>(() => {
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
            onPress={signOut}
          />
        </Header>
        <PetContainer>
          <PetList
            data={pets}
            keyExtractor={item => item.id}
            
            ListFooterComponentStyle={{
              height: 80,
            }}
            renderItem={({item}) => { 
              let genderIcon = faVenus;
              
              if(item.gender === "M"){
                genderIcon = faMars;
              }
              return(
                <Pet key={item.id} onPress={() => handleNavigate(item.id)}>
                  <PetImage source={{uri: item.avatar_url}} />
                    <PetTitle>{item.name}<FontAwesomeIcon icon={ genderIcon } size={24}/></PetTitle>
                  <PetDescription>{item.info}</PetDescription>
                </Pet>
            )}}/>
          
        </PetContainer>
      </Container>
    )}

export default Home;