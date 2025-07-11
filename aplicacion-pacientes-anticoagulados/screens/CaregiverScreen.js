// screens/CaregiverScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';

// ✅ Componente para el temporizador de la sesión
const SessionTimer = () => {
  const { sessionEndTime, logout } = useContext(AuthContext);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!sessionEndTime) {
      setTimeLeft('');
      return;
    }

    const interval = setInterval(() => {
      const remaining = sessionEndTime - Date.now();

      if (remaining <= 0) {
        clearInterval(interval);
        Alert.alert("Sesión Caducada", "Tu sesión ha expirado por seguridad.");
        logout();
      } else {
        const minutes = Math.floor((remaining / 1000 / 60) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);
        setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionEndTime, logout]);

  if (!timeLeft) {
    return null; // No mostrar nada si no hay tiempo
  }

  return (
    <View style={styles.timerContainer}>
      <Ionicons name="time-outline" size={20} color="#e67e22" />
      <Text style={styles.timerText}>Tiempo de sesión restante: {timeLeft}</Text>
    </View>
  );
};


const CaregiverScreen = ({ navigation }) => {
  const { logout, pinIsSet, exitCaregiverMode } = useContext(AuthContext);

  const menuItems = [
    {
      title: "Añadir Medicación",
      icon: <Ionicons name="add-circle-outline" size={28} color="#2A7F9F" />,
      screen: 'AddMedication'
    },
    {
      title: "Gestionar Medicaciones",
      icon: <Ionicons name="list-outline" size={28} color="#2A7F9F" />,
      screen: 'manageMedications'
    },
    {
      title: "Gestionar Recordatorios",
      icon: <Ionicons name="alarm-outline" size={28} color="#2A7F9F" />,
      screen: 'manageReminders'
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres salir del Modo Cuidador? Tu sesión temporal se cerrará.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Salir", onPress: logout }
      ]
    );
  };
  
  const handleExitToHome = () => {
    exitCaregiverMode();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Modo Cuidador</Text>
        <Text style={styles.subtitle}>Gestión completa de medicaciones</Text>
        {pinIsSet && <SessionTimer />}
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuCard}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              {item.icon}
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManagePin')}>
          <Text style={styles.buttonText}>Gestionar PIN</Text>
      </TouchableOpacity>
      
      {pinIsSet && (
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity 
        style={styles.exitButton}
        onPress={handleExitToHome}
     > 
        <Text style={styles.exitButtonText}>Salir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2A7F9F',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
  },
  timerText: {
    marginLeft: 8,
    color: '#856404',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuContainer: {},
  button: {
    backgroundColor: '#2A7F9F',
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    alignSelf: 'center',
    width: '80%',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  menuCard: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 20,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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

export default CaregiverScreen;