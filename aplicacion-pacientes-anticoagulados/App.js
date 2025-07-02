import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import EducationScreen from './screens/EducationScreen.js';
import EducationDetail from './screens/EducationDetail';
import InteractionsScreen from './screens/InteractionsScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import MedicationsScreen from './screens/MedicationScreen.js';
import initializeDatabase from './components/Database/initDatabase';
import AddMedicationScreen from './screens/AddMedicationScreen.js';
import CaregiverScreen from './screens/CaregiverScreen.js';
import ManageMedications from './components/ManageMedications.js';
import ManageReminders from './components/ManageReminders.js';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const notificationListener = useRef();
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

  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesitan permisos para las notificaciones!');
      }

      // Configurar canal para Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      // Configurar notificaciones para iOS
      if (Platform.OS === 'ios') {
        await Notifications.setNotificationCategoryAsync('default', {
          actions: [
            {
              identifier: 'SNOOZE',
              buttonTitle: 'Snooze',
              options: { opensAppToForeground: true },
            },
          ],
        });
      }
    };

    setupNotifications();

    // Escuchar notificaciones recibidas
    notificationListener.current = Notifications.addNotificationReceivedListener(async notification => {
      const { data } = notification.request.content;

      if (data?.isSingleTime && data?.medicationId) {
        try {
          const stored = await AsyncStorage.getItem('medications') || '[]';
          let medications = JSON.parse(stored);
          medications = medications.map(med =>
            med.id === data.medicationId
              ? { ...med, notificationId: null, reminder: null }
              : med
          );
          await AsyncStorage.setItem('medications', JSON.stringify(medications));
          console.log('Recordatorio de una sola vez eliminado');
        } catch (err) {
          console.error('Error eliminando recordatorio una vez mostrado:', err);
        }
      }
    });

    return () => {
      // CORRECCIÓN: Usar el método remove() directamente de la suscripción
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
    };
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
        <Stack.Screen name="manageMedications" component={ManageMedications} />
        <Stack.Screen name="manageReminders" component={ManageReminders} />
        <Stack.Screen
          name="Medications"
          component={MedicationsScreen}
          options={{ title: 'Mis Medicamentos' }}
        />
        <Stack.Screen
          name="AddMedication"
          component={AddMedicationScreen}
          options={{ title: 'Añadir Medicamento' }}
        />
        <Stack.Screen name="Caregiver" component={CaregiverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
