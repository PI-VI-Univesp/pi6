import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

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


export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    max-width: 100%;

    padding: 20px;
 
`;

export const Title = styled.Text`
    font-size: 24px;
    color: #232128;
    font-family: 'RobotoSlab-Medium';
    margin: 64px 0 24px;
    
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
    
`;

export const ForgotPasswordText = styled.Text`
    font-size: 16px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Regular';

`;

export const BackToSignIn = styled.TouchableOpacity`
    
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: #eeeeee;
    border-top-width: 1px;
    border-color: #232128;
    padding: 16px 0 ${ 16+ getBottomSpace()}px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const BackToSignInText = styled.Text`
    font-size: 18px;
    color:#000;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;

`;
  