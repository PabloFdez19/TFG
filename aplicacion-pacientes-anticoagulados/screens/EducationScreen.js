import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EducationScreen = () => {
  const sections = [
    {
      title: "Tratamiento Anticoagulante",
      icon: "medication",
      content: "Los anticoagulantes orales como Sintrom® y Aldocumar® son medicamentos que ayudan a prevenir la formación de coágulos sanguíneos. Actúan inhibiendo la vitamina K, necesaria para la coagulación."
    },
    {
      title: "Factores que afectan el INR",
      icon: "warning",
      content: "El INR puede verse afectado por:\n\n• Dieta (consumo de vitamina K)\n• Interacciones con otros medicamentos\n• Enfermedades intercurrentes\n• Cambios en el estilo de vida\n• Consumo de alcohol"
    },
    {
      title: "Prevención de Riesgos",
      icon: "security",
      content: "Para prevenir complicaciones:\n\n• Realiza controles regulares de INR\n• Informa a todos tus médicos sobre tu tratamiento\n• Usa pulsera de identificación de anticoagulado\n• Evita actividades de alto riesgo de traumatismos"
    },
    {
      title: "Información Validada",
      icon: "verified",
      content: "Toda la información proporcionada está basada en guías clínicas actualizadas y evidencia científica revisada por especialistas en hematología y anticoagulación."
    }
  ];

  const [expandedSection, setExpandedSection] = React.useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Información Educativa</Text>
      <Text style={styles.subtitle}>
        Conoce más sobre tu tratamiento anticoagulante y cómo manejarlo adecuadamente
      </Text>

      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => toggleSection(index)}
            activeOpacity={0.7}
          >
            <MaterialIcons name={section.icon} size={24} color="#2a86ff" />
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <MaterialIcons 
              name={expandedSection === index ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedSection === index && (
            <Text style={styles.sectionContent}>{section.content}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2a86ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  sectionContent: {
    padding: 15,
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    whiteSpace: 'pre-line',
  },
});

export default EducationScreen;