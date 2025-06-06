// hooks/useEmergency.js
import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import * as Location from 'expo-location';

export const useEmergency = ({ callNumber = '112', whatsappNumber = '34123456789' } = {}) => {
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationGranted(status === 'granted');
    })();
  }, []);

  const triggerEmergency = async () => {
    if (locationGranted) {
      try {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const message = `¡Emergencia! Mi ubicación es: https://maps.google.com/?q=${latitude},${longitude}`;
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        const supported = await Linking.canOpenURL(whatsappURL);

        if (supported) {
          await Linking.openURL(whatsappURL);
        } else {
          Alert.alert('Error', 'No se pudo abrir WhatsApp');
        }
      } catch (error) {
        console.error('Error obteniendo ubicación:', error);
        Alert.alert('Error', 'No se pudo obtener la ubicación');
      }
    }

    Alert.alert(
      "Llamar a emergencias",
      `¿Quieres llamar al ${callNumber}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Llamar", onPress: () => Linking.openURL(`tel:${callNumber}`) }
      ]
    );
  };

  return { triggerEmergency };
};
