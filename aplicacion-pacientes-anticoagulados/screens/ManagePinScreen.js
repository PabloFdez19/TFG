// src/screens/ManagePinScreen.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../components/AuthContext';
// COMENTARIO: Se importa AsyncStorage para manipular el almacenamiento.
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManagePinScreen = ({ navigation }) => {
  const { pinIsSet, removePin, logout } = useContext(AuthContext);

  const handleEnableOrChangePin = () => {
    Alert.alert(
      pinIsSet ? "Cambiar PIN" : "Activar PIN",
      "Se cerrará tu sesión actual para configurar el PIN. Serás redirigido a la pantalla de inicio para volver a entrar.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Continuar",
          onPress: async () => {
            // COMENTARIO: Eliminamos la bandera "sin PIN" para forzar la configuración de uno nuevo.
            await AsyncStorage.removeItem('caregiverPinOptOut');
            
            // COMENTARIO: También eliminamos el PIN antiguo si existiera (útil para el caso de "Cambiar PIN").
            await AsyncStorage.removeItem('caregiverPin');
            
            // COMENTARIO: Por último, cerramos sesión. El flujo de autenticación se encargará del resto.
            logout();
          },
        },
      ]
    );
  };

  const handleDisablePin = async () => {
    Alert.alert(
      "Desactivar PIN",
      "Tu cuenta ya no estará protegida por un PIN y la sesión no se cerrará automáticamente. ¿Estás seguro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Desactivar",
          onPress: async () => {
            await removePin(); // Esta función debería eliminar el PIN de AsyncStorage.
            
            // COMENTARIO: Guardamos explícitamente que el usuario ha elegido NO usar PIN.
            // Esto asegura que al volver a entrar, no se le pida configurar uno.
            await AsyncStorage.setItem('caregiverPinOptOut', 'true');
            
            Alert.alert("Éxito", "El PIN se ha eliminado. Tu sesión ahora es ilimitada.");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar PIN</Text>
      <Text style={styles.subtitle}>
        {pinIsSet
          ? "El acceso está protegido por un PIN y la sesión caduca en 30 minutos."
          : "El acceso no requiere PIN y la sesión es ilimitada."}
      </Text>

      {pinIsSet ? (
        <>
          <TouchableOpacity style={styles.button} onPress={handleEnableOrChangePin}>
            <Text style={styles.buttonText}>Cambiar PIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={handleDisablePin}>
            <Text style={styles.buttonText}>Desactivar PIN</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEnableOrChangePin}>
          <Text style={styles.buttonText}>Activar Protección con PIN</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

// ... (tus estilos aquí)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 70,
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2A7F9F',
        textAlign: 'center',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
      },
      button: {
        backgroundColor: '#2A7F9F',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginBottom: 15,
      },
      dangerButton: {
        backgroundColor: '#d9534f',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
      },
      backButton: {
        marginTop: 20,
      },
      backButtonText: {
        fontSize: 16,
        color: '#666',
        textDecorationLine: 'underline',
      },
});

export default ManagePinScreen;