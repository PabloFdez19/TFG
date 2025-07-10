// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React, { useEffect, useContext } from 'react';
import { Platform, View, ActivityIndicator, AppState, Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componentes y Pantallas
import { DatabaseProvider } from './components/DatabaseContext';
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
import CaregiverPinSetupScreen from './screens/CaregiverPinSetupScreen';
import CaregiverPinLoginScreen from './screens/CaregiverPinLoginScreen';
import AddMedicationScreen from './screens/AddMedicationScreen.js';
import ManageMedications from './components/ManageMedications.js';
import ManageReminders from './components/ManageReminders.js';
import AddReminderScreen from './screens/AddReminderScreen';
import ManagePinScreen from './screens/ManagePinScreen';

// ... (resto de tus importaciones y configuraciones de notificaciones sin cambios)

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const getNextTrigger = (notification) => {
    const { frequency, originalTime, intervalHours, scheduleDay } = notification.request.content.data;
    const now = new Date();
    let nextTriggerDate = new Date(originalTime);

    if (frequency === 'daily') {
        nextTriggerDate.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
        if (nextTriggerDate <= now) {
            nextTriggerDate.setDate(nextTriggerDate.getDate() + 1);
        }
    } else if (frequency === 'cyclical') {
        nextTriggerDate = new Date(now.getTime() + (parseInt(intervalHours, 10) * 60 * 60 * 1000));
    } else if (frequency === 'recurrent') {
        // Tu lógica para notificaciones recurrentes
    }

    return nextTriggerDate;
};


const Stack = createStackNavigator();

const InitialLoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#2A7F9F" />
  </View>
);

const AppNavigator = () => {
   const { caregiverIsLoggedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {caregiverIsLoggedIn ? (
        <Stack.Group key="caregiver-stack">
          <Stack.Screen name="Caregiver" component={CaregiverScreen} />
          <Stack.Screen name="ManagePin" component={ManagePinScreen} />
          <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
          <Stack.Screen name="manageMedications" component={ManageMedications} />
          <Stack.Screen name="manageReminders" component={ManageReminders} />
          <Stack.Screen name="AddReminder" component={AddReminderScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group key="public-stack">
          <Stack.Screen name="Home" component={HomeScreen} />
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

const AppContent = () => {
    // ✅ AHORA SOLO NECESITAMOS `isLoading` Y `checkAuthState` PARA EL MANEJO DEL ESTADO DE LA APP
    const { isLoading, checkAuthState } = useContext(AuthContext);

    useEffect(() => {
        const prepare = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permisos necesarios', 'No se podrán recibir recordatorios si no habilitas las notificaciones.');
                }
                
                if (Platform.OS === 'android') {
                    await Notifications.setNotificationChannelAsync('default', {
                        name: 'default',
                        importance: Notifications.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: '#FF231F7C',
                    });
                }
                await initializeDatabase();
                // ✅ YA NO LLAMAMOS a checkAuthState() aquí. AuthProvider lo hace por sí mismo.
            } catch (e) {
                console.warn(e);
            } finally {
                // El `isLoading` del contexto se encargará de ocultar el splash screen
                // cuando `checkAuthState` termine en el proveedor.
                if (!isLoading) {
                    await SplashScreen.hideAsync();
                }
            }
        };
        prepare();
    }, []); // El array de dependencias ahora está vacío

    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);
    
    useEffect(() => {
        const receivedListener = Notifications.addNotificationReceivedListener(async (notification) => {
            // ... (tu lógica de notificaciones sin cambios)
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(async (response) => {
            // ... (tu lógica de notificaciones sin cambios)
        });

        return () => {
            receivedListener.remove();
            responseListener.remove();
        };
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                // ✅ Mantenemos esta llamada para refrescar el estado si la app vuelve del segundo plano
                checkAuthState();
            }
        });
        return () => subscription.remove();
    }, [checkAuthState]);

    if (isLoading) {
        return <InitialLoadingScreen />;
    }
    
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}

export default function App() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <AppContent />
      </DatabaseProvider>
    </AuthProvider>
  );
}