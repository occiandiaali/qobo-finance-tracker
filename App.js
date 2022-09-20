import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {StatusBar} from 'react-native';
import LandingScreen from './src/screens/Home/LandingScreen';
import BarChartScreen from './src/screens/Home/BarChartScreen';
import CreateEntryScreen from './src/screens/Transactions/CreateEntryScreen';
import LearningCentral from './src/screens/Learning/LearningCentral';
import LineChartScreen from './src/screens/Home/LineChartScreen';
import NotificationScreen from './src/screens/Transactions/NotificationScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import NewsScreen from './src/screens/Home/NewsScreen';
import NewsDetailScreen from './src/screens/Home/NewsDetailScreen';
import Splasher from './src/screens/Splash/Splasher';
import VideoPlayer from './src/screens/Learning/VideoPlayer';
import VideoSearch from './src/screens/Learning/VideoSearch';

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAFAFA',

    primary: '#006BE5',
    card: '#FAFAFA',
    text: '#000000',
    white: '#FFFFFF',

    lightGray: '#9F9F9F',
    gray: '#7B7B7B',
    darkGray: '#555a64',

    success: '#299F48',
    warning: '#ff8d00',
    danger: '#ff2424',
  },
  fonts: {
    ...DefaultTheme.fonts,
    small: 13,
    regular: 15,
    bigger: 18,
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const LearningStack = createNativeStackNavigator();

const LearningStackScreen = () => (
  <LearningStack.Navigator initialRouteName="LearningCentral">
    <LearningStack.Screen
      options={{headerShown: false}}
      name="LearningCentral"
      component={LearningCentral}
    />
    <LearningStack.Screen
      name="VideoSearch"
      component={VideoSearch}
      options={{
        headerShown: false,
      }}
    />
  </LearningStack.Navigator>
);

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarStyle: {
        backgroundColor: '#7777ff',
        paddingBottom: 4,
      },
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Stats') {
          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        } else if (route.name === 'Create') {
          // iconName = focused ? 'add-circle' : 'add-circle-outline';
          iconName = 'add-circle';
        } else if (route.name === 'News') {
          iconName = focused ? 'newspaper' : 'newspaper-outline';
        } else if (route.name === 'Videos') {
          iconName = focused ? 'videocam' : 'videocam-outline';
        }
        return (
          <Ionicons
            style={
              iconName === 'add-circle'
                ? {fontSize: 54, paddingBottom: 18, position: 'absolute'}
                : null
            }
            name={iconName}
            size={size}
            color={color}
          />
        );
      },
      // tabBarActiveTintColor: '#6666ff',
      // tabBarInactiveTintColor: '#9999ff',
      tabBarActiveTintColor: '#2222ff',
      tabBarInactiveTintColor: '#fff',
    })}>
    <Tab.Screen
      options={{headerShown: false}}
      name="Home"
      component={LandingScreen}
    />
    <Tab.Screen
      options={{headerShown: false}}
      name="Stats"
      component={BarChartScreen}
    />
    <Tab.Screen
      options={{headerShown: false}}
      name="Create"
      component={CreateEntryScreen}
    />
    <Tab.Screen
      options={{headerShown: false}}
      name="News"
      component={NewsScreen}
    />
    <Tab.Screen
      options={{headerShown: false}}
      name="Videos"
      component={LearningStackScreen}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor="rgba(50, 50, 255, 0.5)" />
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            options={{headerShown: false}}
            name="Splash"
            component={Splasher}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Landing"
            component={HomeTabs}
          />
          <Stack.Screen
            options={{
              headerStyle: {backgroundColor: '#9999ff'},
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: '#fff',
              },
            }}
            name="Bar Charts"
            component={BarChartScreen}
          />
          <Stack.Screen name="Line Charts" component={LineChartScreen} />
          <Stack.Screen
            options={{
              title: '',
              headerStyle: {backgroundColor: '#9999ff'},
              headerTintColor: '#fff',
            }}
            name="News Detail"
            component={NewsDetailScreen}
          />
          <Stack.Screen
            options={{
              title: '',
              headerStyle: {backgroundColor: '#9999ff'},
              headerTintColor: '#fff',
            }}
            name="Notification"
            component={NotificationScreen}
          />
          <Stack.Screen
            options={{
              title: '',
              headerStyle: {backgroundColor: '#9999ff'},
              headerTintColor: '#fff',
            }}
            name="VideoPlayer"
            component={VideoPlayer}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
