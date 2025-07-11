// HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import styles from '../Styles/HomeStyle.js';
import { useEmergency } from '../components/emergencyCall.js';
import { AuthContext } from '../components/AuthContext';

const HomeScreen = ({ navigation }) => {

  // --- CAMBIO: Traemos los nuevos valores del contexto ---
  const { pinIsSet, caregiverIsLoggedIn, hasOptedOut, skipPinSetup, checkAuthState, sessionEndTime, activateCaregiverMode } = useContext(AuthContext);

  const handleCaregiverPress = async () => {
    // Primero, refrescamos el estado por si acaso.
    await checkAuthState();

    // --- CAMBIO: Nueva lógica para activar una sesión existente ---
    // 1. Comprobamos si hay una sesión válida esperando ser activada.
    if (sessionEndTime && Date.now() < sessionEndTime) {
      activateCaregiverMode(); // Esto cambiará el estado y provocará el cambio de vista.
      return; // Salimos de la función.
    }

    // 2. Si no había sesión en espera, la lógica anterior se ejecuta.
    if (pinIsSet) {
      navigation.navigate('CaregiverPinLogin');
    } else if (hasOptedOut) {
      await skipPinSetup(); // Esta función ya activa el modo cuidador.
    } else {
      navigation.navigate('CaregiverPinSetup');
    }
  };

  const menuItems = [
    {
      title: "Información Educativa",
      icon: <MaterialIcons name="info" size={28} color="#2A7F9F" />,
      screen: 'Education'
    },
    {
      title: "Interacciones Medicamentosas",
      icon: <FontAwesome5 name="pills" size={24} color="#2A7F9F" />,
      screen: 'Interactions'
    },
    {
      title: "Cuestionario de Conocimiento",
      icon: <MaterialIcons name="quiz" size={28} color="#2A7F9F" />,
      screen: 'QuizHome'
    },
    {
      title: "Recordatorios de Medicación",
      icon: <Ionicons name="alarm" size={28} color="#2A7F9F" />,
      screen: 'Medications'
    },
    {
      title: "Modo Cuidador",
      icon: <Feather name="user" size={28} color="#2A7F9F" />,
      onPress: handleCaregiverPress,
    }
  ];

  const { triggerEmergency } = useEmergency({
    callNumber: '653773662',
    whatsappNumber: '653773662',
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/medical-icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Bienvenido a Anticoagulados</Text>
        <Text style={styles.subtitle}>Gestiona tu tratamiento anticoagulante</Text>
      </View>

      
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuCardWrapper}
            onPress={item.onPress ? item.onPress : () => navigation.navigate(item.screen)}
            activeOpacity={0.8}
          >
            <View style={styles.menuCardLarge}>
              <View style={styles.iconContainerLarge}>
                {item.icon}
              </View>
              <Text style={styles.menuTextLarge}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.emergencyContainer}>
        <Text style={styles.emergencyTitle}>¿Necesitas ayuda urgente?</Text>
        <TouchableOpacity style={styles.emergencyButton} onPress={triggerEmergency}>
          <Text style={styles.emergencyButtonText}>Contactar emergencias</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;