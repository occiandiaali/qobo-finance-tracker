// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import * as React from 'react';
// import {StatusBar} from 'react-native';
// import LandingScreen from './src/screens/Home/LandingScreen';
// import BarChartScreen from './src/screens/Home/BarChartScreen';
// import CreateEntryScreen from './src/screens/Transactions/CreateEntryScreen';
// import LearningCentral from './src/screens/Learning/LearningCentral';
// import NotificationScreen from './src/screens/Transactions/NotificationScreen';
// import ProfileScreen from './src/screens/Profile/ProfileScreen';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

// const theme = {
//   ...DefaultTheme,
//   dark: true,
//   roundness: 10,
//   colors: {
//     ...DefaultTheme.colors,
//     background: '#FAFAFA',

//     primary: '#006BE5',
//     card: '#FAFAFA',
//     text: '#000000',
//     white: '#FFFFFF',

//     lightGray: '#9F9F9F',
//     gray: '#7B7B7B',
//     darkGray: '#555a64',

//     success: '#299F48',
//     warning: '#ff8d00',
//     danger: '#ff2424',
//   },
//   fonts: {
//     ...DefaultTheme.fonts,
//     small: 13,
//     regular: 15,
//     bigger: 18,
//   },
// };

// const Tab = createBottomTabNavigator();
// const HomeStack = createNativeStackNavigator();
// const TransactionStack = createNativeStackNavigator();
// const ProfileStack = createNativeStackNavigator();

// const HomeStackScreen = () => (
//   <HomeStack.Navigator>
//     <HomeStack.Screen
//       options={{headerShown: false}}
//       name="Landing"
//       component={LandingScreen}
//     />
//     <HomeStack.Screen
//       options={{
//         headerStyle: {backgroundColor: '#9999ff'},
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           color: '#fff',
//         },
//       }}
//       name="Chart Overview"
//       component={BarChartScreen}
//     />
//     <HomeStack.Screen name="Learning Central" component={LearningCentral} />
//   </HomeStack.Navigator>
// );

// const TransactionStackScreen = () => (
//   <TransactionStack.Navigator>
//     <TransactionStack.Screen
//       options={{headerShown: false}}
//       name="CreateEntry"
//       component={CreateEntryScreen}
//     />
//     <TransactionStack.Screen
//       name="Notification"
//       component={NotificationScreen}
//     />
//   </TransactionStack.Navigator>
// );

// const ProfileStackScreen = () => (
//   <ProfileStack.Navigator>
//     <ProfileStack.Screen
//       options={{headerShown: false}}
//       name="User"
//       component={ProfileScreen}
//     />
//   </ProfileStack.Navigator>
// );

// export default function App() {
//   return (
//     <PaperProvider theme={theme}>
//       <NavigationContainer>
//         <StatusBar backgroundColor="rgba(50, 50, 255, 0.5)" />
//         <Tab.Navigator
//           screenOptions={({route}) => ({
//             tabBarIcon: ({focused, color, size}) => {
//               let iconName;
//               if (route.name === 'Home') {
//                 iconName = focused ? 'home' : 'home-outline';
//               } else if (route.name === 'Transaction') {
//                 iconName = focused ? 'folder' : 'folder-outline';
//               } else if (route.name === 'Profile') {
//                 iconName = focused ? 'person' : 'person-outline';
//               }
//               return <Ionicons name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: '#6666ff',
//             tabBarInactiveTintColor: 'gray',
//           })}>
//           <Tab.Screen
//             options={{headerShown: false}}
//             name="Home"
//             component={HomeStackScreen}
//           />
//           <Tab.Screen
//             options={{headerShown: false}}
//             name="Transaction"
//             component={TransactionStackScreen}
//           />
//           <Tab.Screen
//             options={{headerShown: false}}
//             name="Profile"
//             component={ProfileStackScreen}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {StatusBar} from 'react-native';
import LandingScreen from './src/screens/Home/LandingScreen';
import BarChartScreen from './src/screens/Home/BarChartScreen';
import CreateEntryScreen from './src/screens/Transactions/CreateEntryScreen';
import LearningCentral from './src/screens/Learning/LearningCentral';
import NotificationScreen from './src/screens/Transactions/NotificationScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

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

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      // tabBarStyle: {backgroundColor: '#d8d4fa'},
      tabBarStyle: {
        backgroundColor: '#7777ff',
        paddingBottom: 4,
      },
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Create') {
          // iconName = focused ? 'add-circle' : 'add-circle-outline';
          iconName = 'add-circle';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
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
      name="Create"
      component={CreateEntryScreen}
    />
    <Tab.Screen
      options={{headerShown: false}}
      name="Profile"
      component={ProfileScreen}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor="rgba(50, 50, 255, 0.5)" />
        <Stack.Navigator>
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
            name="Chart Overview"
            component={BarChartScreen}
          />
          <Stack.Screen name="Learning Central" component={LearningCentral} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
