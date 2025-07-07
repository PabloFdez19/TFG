// src/screens/CaregiverAuthScreen.js
import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CaregiverAuthScreen = ({ navigation }) => {
  // COMENTARIO: Obtenemos login y skipPinSetup para manejar la sesión.
  const { skipPinSetup, login } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      const decideRoute = async () => {
        const optedOut = await AsyncStorage.getItem('caregiverPinOptOut');
        const pin = await AsyncStorage.getItem('caregiverPin');
        // COMENTARIO: Obtenemos el timestamp del último login.
        const sessionTimestamp = await AsyncStorage.getItem('caregiverSessionTimestamp');

        if (pin) {
          // COMENTARIO: Si hay un PIN configurado, revisamos la sesión.
          if (sessionTimestamp) {
            const now = new Date().getTime();
            const lastLogin = parseInt(sessionTimestamp, 10);
            const thirtyMinutes = 30 * 60 * 1000;

            if (now - lastLogin < thirtyMinutes) {
              // 1. Sesión activa: Entrar directamente.
              // Usamos skipPinSetup porque ya hace el login directo.
              skipPinSetup(); 
              return; 
            }
          }
          // 2. Si no hay sesión o ha caducado, pedimos que se introduzca el PIN.
          navigation.replace('CaregiverPinLogin');

        } else if (optedOut === 'true') {
          // 3. Si se eligió "sin PIN", se inicia sesión directamente.
          skipPinSetup();

        } else {
          // 4. Si no hay ninguna configuración (primera vez o se quiere cambiar), vamos a la pantalla de decisión.
          navigation.replace('CaregiverPinSetup');
        }
      };

      decideRoute();
    }, [navigation, skipPinSetup, login])
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2A7F9F" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CaregiverAuthScreen;