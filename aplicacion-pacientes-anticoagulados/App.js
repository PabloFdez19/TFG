import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EducationScreen from './screens/EducationScreen';
import InteractionsScreen from './screens/InteractionsScreen';
import QuizScreen from './screens/QuizScreen';
import RemindersScreen from './screens/RemindersScreen';
import CaregiverScreen from './screens/CaregiverScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' }} // Título personalizado
        />
        <Stack.Screen
          name="Education"
          component={EducationScreen}
          options={{ title: 'Información Educativa' }} // Título personalizado
        />
        <Stack.Screen
          name="Interactions"
          component={InteractionsScreen}
          options={{ title: 'Interacciones' }} // Título personalizado
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: 'Cuestionario Interactivo' }} // Título personalizado
        />
        <Stack.Screen
          name="Reminders"
          component={RemindersScreen}
          options={{ title: 'Recordatorios y Notificaciones' }} // Título personalizado
        />
        <Stack.Screen
          name="Caregiver"
          component={CaregiverScreen}
          options={{ title: 'Modo Cuidador' }} // Título personalizado
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
