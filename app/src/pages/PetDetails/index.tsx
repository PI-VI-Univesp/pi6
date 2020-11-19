import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';


import {
  Container,
  Header,
  ScrollContainer,
  PetsContainer,
  Pet,
  PetImageContainer,
  PetContent,
  PetTitle,
  PetDescription,
  PetButton,
  PetButtonText,
  Label,
  PetText
} from './styles';

interface User {
  id: string;
  name: string;
  favorite_pets: Pet[];
}

interface Institution {
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
  birth_day: string;
  breed: string;
  coat: string;
}

const PetDetails: React.FC = () => {
  const { user } = useAuth();

  const [pet, setPet] = useState({} as Pet);
  //const [user_data, setUserData] = useState({} as User);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [askForAdoptionText , setAskForAdoptionText ] = useState("Quero Adotar");
  const [askForAdoptionBgColor , setAskForAdoptionBgColor ] = useState({ backgroundColor: "orange" });

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;
  
  useEffect(() => {
    async function loadPet(): Promise<void> {
      const response = await api.get(`/pets/${routeParams.id}`);
      const user_data = await api.get(`/users/${user.id}`);
      setPet({
        ...response.data,
      });
      setIsFavorite(!!user_data.data.favorite_pets.filter((obj) => (obj.id === routeParams.id )).length);
      setIsCandidate(!!user_data.data.candidate_pets.filter((obj) => (obj.id === routeParams.id )).length);

      if(!!user_data.data.candidate_pets.filter((obj) => (obj.id === routeParams.id )).length) {
        setAskForAdoptionText("Desistir da Adoção");
        setAskForAdoptionBgColor({backgroundColor: "brown"})
      } else {
        setAskForAdoptionText("Quero Adotar");
        setAskForAdoptionBgColor({backgroundColor: "orange"})
      }
    
    }
    loadPet();
  }, [routeParams]);

  // Calculate the correct icon name
  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  const toggleFavorite = useCallback( async () => {
    try{
      const token = await AsyncStorage.getItem('@QueroPet:token');
      if (isFavorite) {
        await api.post(`/users/unfave/${pet.id}`, { "user": user}, { headers: { Authorization: `Bearer ${token}` }}, );
        setIsFavorite(false);
      } else {
        await api.post(`/users/fave/${pet.id}`, {"user": user}, { headers: { Authorization: `Bearer ${token}`}}, );
        setIsFavorite(true);
      }
    } catch (err) {
      console.log(err)
    }
  }, [isFavorite, pet]);


  const toggleCandidate = useCallback( async () => {
    
    try{
      const token = await AsyncStorage.getItem('@QueroPet:token');
      if (isCandidate) {
        await api.post(`/users/unaskadoption/${pet.id}`, { "user": user}, { headers: { Authorization: `Bearer ${token}` }}, );
        setIsCandidate(false);
        setAskForAdoptionText("Quero Adotar");
        setAskForAdoptionBgColor({backgroundColor: "orange"})
      } else {
        await api.post(`/users/askadoption/${pet.id}`, {"user": user}, { headers: { Authorization: `Bearer ${token}`}}, );
        setIsCandidate(true);
        setAskForAdoptionText("Desistir da Adoção");
        setAskForAdoptionBgColor({backgroundColor: "brown"})
      }
    } catch (err) {
      console.log(err)
    }
  }, [isCandidate, pet]);


  useLayoutEffect(() => {
    // Add the favorite icon on the right of the header bar
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcon
          name={favoriteIconName}
          size={24}
          color="#F00"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite]);
  const gender = pet.gender === "F" ? "Fêmea" : "Macho";

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <PetsContainer>
          <Pet>
            <PetImageContainer>
              <Image
                style={{ width: '100%', height: 200 }}
                source={{uri: "http://localhost:3333/files/"+pet.avatar}}
              />
            </PetImageContainer>
            <PetContent>
              <PetTitle>{pet.name}</PetTitle>
              <PetDescription>{pet.info}</PetDescription>
              <Label>Nascimento</Label>
              <PetText>{ pet.birth_day }</PetText>
              <Label>Raça</Label>
              <PetText>{pet.breed}</PetText>
              <Label>Sexo</Label>
              <PetText>{ gender }</PetText>
              <Label>Pelagem</Label>
              <PetText>{  pet.coat }</PetText>
              <Label>Informações</Label>
              <PetText>{ pet.info }</PetText>
              
              <PetButton onPress={() => toggleCandidate()}  style={askForAdoptionBgColor}><PetButtonText>{askForAdoptionText}</PetButtonText></PetButton>
            </PetContent>
          </Pet>
        </PetsContainer>
      </ScrollContainer>
    </Container>
  );
};

export default PetDetails;
