import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import TabRoutes from './tab.routes';
import Home from '../pages/Home';
import PetDetails from '../pages/PetDetails';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
    
    <App.Navigator initialRouteName="Home">
      <App.Screen
        options={{
          cardStyle: { backgroundColor: '#FFB84D' },
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <App.Screen
        name="MainBottom"
        component={TabRoutes}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <App.Screen
        name="PetDetails"
        component={PetDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color="#333"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 24,
          },
          headerRight: () => <Icon name="heart" size={24} color="#F00" />,
          headerRightContainerStyle: {
            marginRight: 24,
          },
          headerTitle: 'Pet',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: '#FFB84D',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
        })}
      />
    </App.Navigator>

)

export default AppRoutes;