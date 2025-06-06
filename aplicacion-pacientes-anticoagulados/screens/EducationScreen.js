import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import {AnticoagulantEducation} from '../components/AnticoagulantEducation';
import { MaterialIcons } from '@expo/vector-icons';

const sections = [
  {
    title: "Tratamiento Anticoagulante",
    icon: "medication",
    content: AnticoagulantEducation,
  },
  {
    title: "Factores que afectan el INR",
    icon: "warning",
    content: "El INR puede verse afectado por:\n\n• Dieta...\n• Interacciones...",
  },
  {
    title: "Prevención de Riesgos",
    icon: "security",
    content: "Para prevenir complicaciones:\n\n• Realiza controles...",
  },
  {
    title: "Información Validada",
    icon: "verified",
    content: "Toda la información proporcionada está basada en guías...",
  },
];

const EducationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Información Educativa</Text>
        <Text style={styles.subtitle}>Conoce más sobre tu tratamiento anticoagulante</Text>

        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={styles.section}
            onPress={() => navigation.navigate('Detalle', { section })}
            activeOpacity={0.8}
          >
            <View style={styles.sectionHeader}>
              <MaterialIcons name={section.icon} size={30} color="#2a86ff" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <MaterialIcons name="chevron-right" size={30} color="#999" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    paddingTop: 75
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2a86ff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 15,
    color: '#333',
  },
});

export default EducationScreen;
