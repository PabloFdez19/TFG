// src/screens/CaregiverPinLoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../components/AuthContext';

const CaregiverPinLoginScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const { login } = useContext(AuthContext); // Cambiado a loginWithPin

  const handleLogin = async () => {
    const success = await login(pin); // Usamos la nueva función
    if (success) {
      // La navegación es automática por el cambio de estado en AuthContext
    } else {
      Alert.alert('Error', 'PIN incorrecto. Inténtalo de nuevo.');
      setPin('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acceso al Modo Cuidador</Text>
      <Text style={styles.subtitle}>Introduce tu PIN de 4 dígitos.</Text>
      <TextInput
        style={styles.pinInput}
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
        placeholder="PIN"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
};

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
        marginBottom: 30,
        paddingHorizontal: 20,
      },
      pinInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        fontSize: 20,
        textAlign: 'center',
        width: '60%',
        marginBottom: 20,
        color: '#333',
      },
      button: {
        backgroundColor: '#2A7F9F',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginBottom: 15,
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


export default CaregiverPinLoginScreen;