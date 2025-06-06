import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import EducationScreen from './screens/EducationScreen.js';
import EducationDetail from './screens/EducationDetail';
import InteractionsScreen from './screens/InteractionsScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import RemindersScreen from './screens/RemindersScreen.js';
import CaregiverScreen from './screens/CaregiverScreen.js';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Education" component={EducationScreen} />
        <Stack.Screen
          name="Detalle"
          component={EducationDetail}
          options={{
            title: '',
            headerBackTitleVisible: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen name="Interactions" component={InteractionsScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Reminders" component={RemindersScreen} />
        <Stack.Screen name="Caregiver" component={CaregiverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
