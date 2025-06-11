import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import EducationScreen from './screens/EducationScreen.js';
import EducationDetail from './screens/EducationDetail';
import InteractionsScreen from './screens/InteractionsScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import RemindersScreen from './screens/RemindersScreen.js';
import initializeDatabase from './components/Database/initDatabase';
import CaregiverScreen from './screens/CaregiverScreen.js';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    const prepareApp = async () => {
      try {
        await initializeDatabase(); // Aquí se inicializa UNA VEZ
      } catch (e) {
        console.error("Error inicializando DB en App.js:", e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    };
    prepareApp();
  }, []);

  if (!appIsReady) {
    return null; // o un spinner si prefieres
  }
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
