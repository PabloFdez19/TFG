import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

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
      screen: 'Reminders'
    },
    {
      title: "Modo Cuidador",
      icon: <Feather name="user" size={28} color="#2A7F9F" />,
      screen: 'Caregiver'
    }
  ];

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
            style={styles.menuCard}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.iconContainer}>
              {item.icon}
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.emergencyContainer}>
        <Text style={styles.emergencyTitle}>¿Necesitas ayuda urgente?</Text>
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>Contactar emergencias</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F9FA',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A7F9F',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#E6F2F7',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  emergencyContainer: {
    backgroundColor: '#FFF8F8',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
    textAlign: 'center',
  },
  emergencyButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;