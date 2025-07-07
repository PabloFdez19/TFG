// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React, { useEffect, useContext } from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

// Componentes y Pantallas
import initializeDatabase from './components/Database/initDatabase';
import { AuthProvider, AuthContext } from './components/AuthContext';
import HomeScreen from './screens/HomeScreen.js';
import EducationScreen from './screens/EducationScreen.js';
import EducationDetail from './screens/EducationDetail';
import InteractionsScreen from './screens/InteractionsScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import MedicationsScreen from './screens/MedicationScreen.js';
import CaregiverScreen from './screens/CaregiverScreen.js';
import HistoryScreen from './screens/HistoryScreen';
import QuizHomeScreen from './screens/QuizHomeScreen';
import CaregiverAuthScreen from './screens/CaregiverAuthScreen';
import CaregiverPinSetupScreen from './screens/CaregiverPinSetupScreen';
import CaregiverPinLoginScreen from './screens/CaregiverPinLoginScreen';
import AddMedicationScreen from './screens/AddMedicationScreen.js';
import ManageMedications from './components/ManageMedications.js';
import ManageReminders from './components/ManageReminders.js';
import AddReminderScreen from './screens/AddReminderScreen';
import ManagePinScreen from './screens/ManagePinScreen';

const Stack = createStackNavigator();

// Componente de carga inicial
const InitialLoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#2A7F9F" />
  </View>
);

const AppNavigator = () => {
  const { caregiverIsLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <InitialLoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {caregiverIsLoggedIn ? (
        // Pantallas a las que se accede una vez logueado (con o sin PIN)
        <Stack.Group>
          <Stack.Screen name="Caregiver" component={CaregiverScreen} />
          <Stack.Screen name="ManagePin" component={ManagePinScreen} />
          <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
          <Stack.Screen name="manageMedications" component={ManageMedications} />
          <Stack.Screen name="manageReminders" component={ManageReminders} />
          <Stack.Screen name="AddReminder" component={AddReminderScreen} />
        </Stack.Group>
      ) : (
        // Pantallas públicas y flujo de autenticación
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CaregiverAuth" component={CaregiverAuthScreen} />
          <Stack.Screen name="CaregiverPinSetup" component={CaregiverPinSetupScreen} />
          <Stack.Screen name="CaregiverPinLogin" component={CaregiverPinLoginScreen} />
          <Stack.Screen name="Education" component={EducationScreen} />
          <Stack.Screen name="Detalle" component={EducationDetail} options={{ title: '', headerBackTitleVisible: false, ...TransitionPresets.ModalSlideFromBottomIOS }} />
          <Stack.Screen name="Interactions" component={InteractionsScreen} />
          <Stack.Screen name="QuizHome" component={QuizHomeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Medications" component={MedicationsScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await initializeDatabase();
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default', importance: Notifications.AndroidImportance.MAX,
          });
        }
      } catch (e) {
        console.error("Error inicializando:", e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };
    prepareApp();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}