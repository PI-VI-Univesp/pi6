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
} from './styles';

interface User {
  id: string;
  name: string;
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
  const [isFavorite, setIsFavorite] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadPet(): Promise<void> {
      const response = await api.get(`/pets/${routeParams.id}`);
      setPet({
        ...response.data,
      });
    }
    loadPet();
  }, [routeParams]);

  // Calculate the correct icon name
  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  const toggleFavorite = useCallback( async () => {
    const token = AsyncStorage.getItem('@QueroPet:token');
    console.log(token)

    if (isFavorite) {
      api.post(`/users/unfave/${pet.id}`, {});
    } else {
      api.post(`/users/fave/${pet.id}`, {});
    }
  }, [isFavorite, pet]);

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

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <PetsContainer>
          <Pet>
            <PetImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{uri: "https://source.unsplash.com/user/erondu/600x400" }}
              />
            </PetImageContainer>
            <PetContent>
              <PetTitle>{pet.name}</PetTitle>

              <PetDescription>{pet.info}</PetDescription>
              <PetTitle>espécie</PetTitle>
              <PetDescription>{pet.species}</PetDescription>
              <PetTitle>Nascimento</PetTitle>
              <PetDescription>{ pet.birth_day }</PetDescription>
              <PetTitle>raça</PetTitle>
              <PetDescription>{pet.breed}</PetDescription>
              <PetTitle>Sexo</PetTitle>
              <PetDescription>{ pet.gender }</PetDescription>
              <PetTitle>Pelagem</PetTitle>
              <PetDescription>{  pet.coat }</PetDescription>
              <PetTitle>Informações</PetTitle>
              <PetDescription>{ pet.info }</PetDescription>
              <PetButton><PetDescription>Adotar</PetDescription></PetButton>
            </PetContent>
          </Pet>
        </PetsContainer>
      </ScrollContainer>
    </Container>
  );
};

export default PetDetails;
