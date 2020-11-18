import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      labelPosition: 'beside-icon',
      activeTintColor: '#333',
      labelStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontWeight: '600',
      },
      inactiveTintColor: '#B7B7CC',
    }}
  >
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => <Icon size={25} name="list" color={color} />,
        title: 'Listagem',
      }}
      name="HomeStack"
      component={Dashboard}
    />
    <Tab.Screen
      name="Orders"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon size={25} name="shopping-bag" color={color} />
        ),
        title: 'Pedidos',
      }}
      component={Orders}
    />

    <Tab.Screen
      name="Favorites"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon size={25} name="heart" color={color} />
        ),
        title: 'Favoritos',
      }}
      component={Favorites}
    />
    <Tab.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon size={25} name="user" color={color} />
        ),
        title: 'Perfil',
      }}
      component={Profile}
    />
  </Tab.Navigator>
);

export default TabRoutes;
