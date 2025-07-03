import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CaregiverScreen = ({ navigation }) => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Modo Cuidador</Text>
        <Text style={styles.subtitle}>Gestión completa de medicaciones</Text>
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
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '100%',
    height: 120,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 15,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default CaregiverScreen;