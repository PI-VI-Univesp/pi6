import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { ButtonHTMLAttributes } from 'react';

export const Header = styled.View`
  width: 100%;
  height: 80px;
  padding: 40px 24px 40px;
  background: #ffb84d;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface Pet {
  id: string;
  name: string;
  image_url: string;
  price: number;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const PetContainer = styled.View`
  border-radius: 5px;
  margin-top: 20px;
  flex: 1;
  flex-direction: row;
`;

export const PetList = styled(
  FlatList as new () => FlatList<Pet>,
).attrs({
  numColumns: 1,
  initialNumToRender: 1,

})`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0 10px;
`;

export const Pet = styled.TouchableOpacity`
  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;
  flex: 1;
  margin-bottom: 10px;

`;

export const PetImage = styled.Image`
  height: 200px;
  width: 100%;
  align-self: center;
`;

export const PetDescription = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  margin-top: 6px;
  color: #3d3d4d;
`;

export const PetTitle = styled.Text`
  font-size: 24px;
  margin-top: 10px;
`;

export const PetButton = styled.TouchableOpacity``;
