// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React, { useEffect, useContext } from 'react';
import { Platform, View, ActivityIndicator, AppState } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { DatabaseProvider } from './components/DatabaseContext';
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
import CaregiverPinSetupScreen from './screens/CaregiverPinSetupScreen';
import CaregiverPinLoginScreen from './screens/CaregiverPinLoginScreen';
import AddMedicationScreen from './screens/AddMedicationScreen.js';
import ManageMedications from './components/ManageMedications.js';
import ManageReminders from './components/ManageReminders.js';
import AddReminderScreen from './screens/AddReminderScreen';
import ManagePinScreen from './screens/ManagePinScreen';

// 1. Configura cómo se deben mostrar las notificaciones cuando la app está abierta
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Función para obtener el próximo trigger de una notificación recurrente
const getNextTrigger = (notification) => {
    const { frequency, originalTime, intervalHours, scheduleDay } = notification.request.content.data;
    const now = new Date();
    let nextTriggerDate = new Date(originalTime);

    if (frequency === 'daily') {
        // Si la hora de hoy ya pasó, programar para mañana, si no, para hoy
        nextTriggerDate.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
        if (nextTriggerDate <= now) {
            nextTriggerDate.setDate(nextTriggerDate.getDate() + 1);
        }
    } else if (frequency === 'cyclical') {
        // Programar para "intervalHours" en el futuro desde ahora
        nextTriggerDate = new Date(now.getTime() + intervalHours * 60 * 60 * 1000);
    } else if (frequency === 'recurrent') {
        // Calcular el próximo día de la semana correcto
        const daysUntilNext = (scheduleDay - now.getDay() + 7) % 7;
        const dayOffset = daysUntilNext === 0 ? 7 : daysUntilNext; // Siempre programar para la próxima semana
        nextTriggerDate.setDate(now.getDate() + dayOffset);
    }

    return nextTriggerDate;
};

const Stack = createStackNavigator();

// Componente de carga inicial
const InitialLoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#2A7F9F" />
  </View>
);

const AppNavigator = () => {
   const { caregiverIsLoggedIn, isLoading, checkAuthState, logout } = useContext(AuthContext);

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
    const { isLoading, checkAuthState } = useContext(AuthContext);

    // Este efecto se ejecuta una sola vez al iniciar la app
    useEffect(() => {
        const prepare = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permisos necesarios', 'No se podrán recibir recordatorios si no habilitas las notificaciones.');
                }
                
                // 3. Configuramos el canal de Android (muy importante)
                if (Platform.OS === 'android') {
                    await Notifications.setNotificationChannelAsync('default', {
                        name: 'default',
                        importance: Notifications.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: '#FF231F7C',
                    });
                }
                await initializeDatabase();
                await checkAuthState(); // Comprueba la sesión una vez
            } catch (e) {
                console.warn(e);
            } finally {
                await SplashScreen.hideAsync();
            }
        };
        prepare();
    }, [checkAuthState]);

    // Este efecto escucha si la app vuelve a primer plano
    useEffect(() => {
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            // Este oyente es útil para depurar en el futuro.
            // Se activa en cuanto llega la notificación, incluso con la app en segundo plano.
            console.log("Notificación recibida en primer/segundo plano:", notification.request.content.data);
        });
        
        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("\n--- USUARIO HA PULSADO UNA NOTIFICACIÓN ---");
            const data = response.notification.request.content.data;
            
            // Log para ver exactamente qué datos llegan
            console.log(">>> Datos recibidos:", JSON.stringify(data, null, 2));

            // --- INICIO DEL CAMBIO IMPORTANTE ---
            // Ahora la condición es simple y directa: ¿es recurrente?
            if (data && data.isRecurring === true) {
                console.log(">>> DECISIÓN: Reprogramar porque 'isRecurring' es true.");
                const nextTrigger = getNextTrigger(response.notification);
                Notifications.scheduleNotificationAsync({
                    content: response.notification.request.content,
                    trigger: nextTrigger,
                });
            } else {
                console.log(">>> DECISIÓN: No reprogramar porque 'isRecurring' es false o no existe.");
            }
            // --- FIN DEL CAMBIO IMPORTANTE ---
        });

        // Limpieza al desmontar el componente
        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkAuthState(); // Vuelve a comprobar la sesión
            }
        });
        return () => subscription.remove();
    }, [checkAuthState]);

    // Muestra el loading solo al principio
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
