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

// --- INICIO DE CAMBIOS ---

// 1. Lista de recomendaciones y consejos
const recommendations = [
    "Toma tu dosis siempre a la misma hora. La constancia es clave.",
    "Si olvidas una dosis, ¡no la dupliques! Consulta a tu médico si tienes dudas.",
    "Mantén tu dieta estable, sin cambios bruscos en el consumo de verduras de hoja verde.",
    "No tomes nuevos medicamentos, vitaminas o hierbas sin consultar a tu médico.",
    "Informa siempre a tus médicos y dentistas que tomas anticoagulantes.",
    "Evita el consumo excesivo de alcohol.",
    "Usa un cepillo de dientes suave para evitar el sangrado de encías.",
    "Ante cualquier golpe fuerte o caída, especialmente en la cabeza, acude a urgencias.",
    "Lleva siempre una identificación que indique tu tratamiento anticoagulante.",
    "No te saltes los controles de INR. Son esenciales para tu seguridad.",
];

// 2. Función para mostrar la recomendación diaria
const showDailyRecommendation = async () => {
    try {
        const today = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
        const lastShownDate = await AsyncStorage.getItem('lastRecommendationDate');

        if (lastShownDate === today) {
            return; // Ya se mostró hoy
        }

        const randomIndex = Math.floor(Math.random() * recommendations.length);
        const recommendation = recommendations[randomIndex];

        Alert.alert(
            "Consejo del Día 💡",
            recommendation,
            [{ text: "Entendido" }]
        );

        await AsyncStorage.setItem('lastRecommendationDate', today);
    } catch (error) {
        console.error("Error al mostrar la recomendación diaria:", error);
    }
};

// --- FIN DE CAMBIOS ---


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
                
                // --- INICIO DE CAMBIOS ---
                // 3. Llamamos a la función de recomendación aquí
                await showDailyRecommendation();
                // --- FIN DE CAMBIOS ---
                
            } catch (e) {
                console.warn(e);
            } finally {
                if (!isLoading) {
                    await SplashScreen.hideAsync();
                }
            }
        };
        prepare();
    }, []);

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