import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Platform, StatusBar } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import styles from '../Styles/HomeStyle.js';
import { useEmergency } from '../components/emergencyCall.js';

const HomeScreen = ({ navigation }) => {
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
      screen: 'Quiz'
    },
    {
      title: "Recordatorios de Medicación",
      icon: <Ionicons name="alarm" size={28} color="#2A7F9F" />,
      screen: 'Medications'
    },
    {
      title: "Modo Cuidador",
      icon: <Feather name="user" size={28} color="#2A7F9F" />,
      screen: 'Caregiver'
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
          source={require('../assets/medical-icon.png')} // Asegúrate de tener esta imagen
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
            onPress={() => navigation.navigate(item.screen)}
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