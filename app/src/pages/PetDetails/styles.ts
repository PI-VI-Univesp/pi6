import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  padding: 40px 24px 20px;
  background: #c72828;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  },
})`
  margin-top: -40px;
`;

export const PetsContainer = styled.View`
  padding: 0 24px;
`;

export const Pet = styled.View`
  display: flex;
  flex-direction: column;
  background: #f0f0f5;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const PetImageContainer = styled.View`
  background: #ffb84d;
  overflow: hidden;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

export const PetContent = styled.View`
  padding: 24px;
`;

export const PetTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #3d3d4d;
`;

export const PetDescription = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 25px;
  margin-top: 8px;
  color: #3d3d4d;
`;

export const Title = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #3d3d4d;
`;

export const PetButton = styled.TouchableOpacity`    
  display: flex;
  background-color: #FF9000;
  color: #FFF;
  padding: 15px;
  margin: 10px;
  align-items: center;
  margin-top: 24px;
  text-decoration: none;

`;

export const PetButtonText = styled.Text`    
  color: #FFF;
  font-size: 24px;
`;


export const ButtonText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #fff;
  flex: 1;
  text-align: center;
`;

export const IconContainer = styled.View`
  background-color: #41c900;
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;