// src/screens/CaregiverPinSetupScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../components/AuthContext';

const CaregiverPinSetupScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const { setupPin, skipPinSetup } = useContext(AuthContext);

  const handleSetPin = async () => {
    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      Alert.alert('Error', 'El PIN debe contener exactamente 4 números.');
      return;
    }
    if (pin !== confirmPin) {
      Alert.alert('Error', 'Los PIN no coinciden. Inténtalo de nuevo.');
      setConfirmPin('');
      return;
    }
    await setupPin(pin);
    // La navegación es automática por el cambio de estado en AuthContext
  };

  const handleSkip = async () => {
    await skipPinSetup();
    // La navegación es automática
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurar PIN de Cuidador</Text>
      <Text style={styles.subtitle}>
        Para proteger el acceso, establece un PIN de 4 dígitos.
      </Text>
      <TextInput
        style={styles.pinInput}
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
        placeholder="Introduce 4 dígitos"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.pinInput}
        value={confirmPin}
        onChangeText={setConfirmPin}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
        placeholder="Confirma el PIN"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleSetPin}>
        <Text style={styles.buttonText}>Guardar PIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleSkip}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Acceder sin PIN</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.exitButton}
        onPress={() => navigation.navigate('Home')}
      > 
        <Text style={styles.exitButtonText}>Volver a Inicio</Text>
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
      secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#2A7F9F',
      },
      secondaryButtonText: {
        color: '#2A7F9F',
      },
      exitButton: { 
      backgroundColor: '#2a86ff',
      paddingVertical: 15, 
      borderRadius: 10, 
      alignSelf:'center',
      marginHorizontal: 20, 
      marginTop: 10,
      alignItems: 'center', 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 }, 
      width:'80%', 
      shadowOpacity: 0.3, 
      shadowRadius: 3, 
      elevation: 5 
    },
    exitButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
});

export default CaregiverPinSetupScreen;