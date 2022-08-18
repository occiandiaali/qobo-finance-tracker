import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import LandingScreen from './src/screens/Home/LandingScreen';
import BarChartScreen from './src/screens/Home/BarChartScreen';
import LineChartScreen from './src/screens/Home/LineChartScreen';
import TransactionScreen from './src/screens/Transactions/TransactionScreen';
import NotificationScreen from './src/screens/Transactions/NotificationScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const TransactionStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{headerShown: false}}
      name="Landing"
      component={LandingScreen}
    />
    <HomeStack.Screen name="Bars" component={BarChartScreen} />
    <HomeStack.Screen name="Lines" component={LineChartScreen} />
  </HomeStack.Navigator>
);

const TransactionStackScreen = () => (
  <TransactionStack.Navigator>
    <TransactionStack.Screen
      options={{headerShown: false}}
      name="CreateTransaction"
      component={TransactionScreen}
    />
    <TransactionStack.Screen
      name="Notification"
      component={NotificationScreen}
    />
  </TransactionStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Transaction') {
              iconName = focused ? 'folder' : 'folder-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeStackScreen}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Transaction"
          component={TransactionStackScreen}
        />
        <Tab.Screen name="Profile" component={TransactionStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
