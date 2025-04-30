import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen.js';
import EducationScreen from './screens/EducationScreen.js';
import InteractionsScreen from './screens/InteractionsScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import RemindersScreen from './screens/RemindersScreen.js';
import CaregiverScreen from './screens/CaregiverScreen.js';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Configuración de las pestañas principales
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2A7F9F',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#FFF',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarItemStyle: {
          margin: 5,
          borderRadius: 10,
        },
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Educación" 
        component={EducationStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="info" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Interacciones" 
        component={InteractionsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="pills" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Recordatorios" 
        component={RemindersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="alarm" size={28} color={color} /> // Cambiado de "md-alarm" a "alarm"
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack para la pantalla de Inicio
function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen 
        name="Cuidador" 
        component={CaregiverScreen} 
        options={{ headerShown: true, title: 'Cuidador' }}
      />
    </Stack.Navigator>
  );
}

// Stack para la pantalla de Educación
function EducationStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducaciónMain" component={EducationScreen} />
      <Stack.Screen 
        name="Cuestionario" 
        component={QuizScreen} 
        options={{ headerShown: true, title: 'Cuestionario' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <HomeTabs />
    </NavigationContainer>
  );
}