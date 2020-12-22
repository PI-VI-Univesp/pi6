import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 150: 40}px;
`;


export const Title = styled.Text`
    font-size: 24px;
    color: #f4ede8;
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
  
export const CreateAccountButton = styled.TouchableOpacity`
    
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

export const CreateAccountButtonText = styled.Text`
    font-size: 18px;
    color: #ff9000;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;

`;