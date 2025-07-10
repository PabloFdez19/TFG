// HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import styles from '../Styles/HomeStyle.js';
import { useEmergency } from '../components/emergencyCall.js';
import { AuthContext } from '../components/AuthContext';

const HomeScreen = ({ navigation }) => {

  const { pinIsSet, caregiverIsLoggedIn, hasOptedOut, skipPinSetup, checkAuthState } = useContext(AuthContext);

  const handleCaregiverPress = async () => {
    // Primero, refrescamos el estado por si acaso. Es una buena práctica.
    await checkAuthState();

    if (caregiverIsLoggedIn) {
      // Si ya está logueado (sesión activa o sin PIN), la navegación principal se encarga
      return; 
    }
    
    // Si no está logueado, decidimos a dónde ir.
    if (pinIsSet) {
      // 1. Si hay un PIN configurado, vamos a la pantalla de login.
      navigation.navigate('CaregiverPinLogin');
    } else if (hasOptedOut) {
      // 2. Si NO hay PIN pero SÍ ha elegido omitirlo, "logueamos" directamente.
      await skipPinSetup();
    } else {
      // 3. Si NO hay PIN y NO ha elegido omitirlo, vamos a la pantalla de configuración.
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