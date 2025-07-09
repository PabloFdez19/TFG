// src/screens/CaregiverAuthScreen.js
import React, { useContext, useEffect } from 'react'; // Cambiamos useFocusEffect por useEffect
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../components/AuthContext';

const CaregiverAuthScreen = ({ navigation }) => {
  // Obtenemos la función para comprobar el estado desde el contexto
  const { checkAuthState } = useContext(AuthContext);

  // Usamos useEffect para que se ejecute solo una vez al montar la pantalla
  useEffect(() => {
    const determineRoute = async () => {
      // 1. Llamamos a la función que ahora nos devuelve el estado
      const { isLoggedIn, isPinSet } = await checkAuthState();

      // 2. Tomamos la decisión correcta
      if (isLoggedIn) {
        // Si la sesión ya está iniciada (por tiempo o por no tener PIN),
        // no hacemos nada. El navegador principal en App.js se encargará
        // de mostrar las pantallas del cuidador automáticamente.
        return;
      } else {
        // Si no hay sesión, decidimos a dónde ir
        if (isPinSet) {
          // Si hay un PIN, vamos a la pantalla de login
          navigation.replace('CaregiverPinLogin');
        } else {
          // Si no hay PIN, vamos a la pantalla para crearlo
          navigation.replace('CaregiverPinSetup');
        }
      }
    };

    determineRoute();
  }, [checkAuthState, navigation]);

  // Mientras se ejecuta la comprobación, mostramos una pantalla de carga
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