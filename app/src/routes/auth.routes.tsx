import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CadastroInstituicao from '../pages/CadastroInstituicao';


const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#eeeeee'}
    }}>
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />
        <Auth.Screen name="CadastroInstituicao" component={CadastroInstituicao} />
    </Auth.Navigator>
)

export default AuthRoutes;