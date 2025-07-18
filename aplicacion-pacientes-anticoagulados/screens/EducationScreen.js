import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { EducationStyle } from '../Styles/EducationStyles';
import contenidoData from '../components/contenido_educativo.json';

const sections = [
  {
    title: "Tratamiento Anticoagulante",
    icon: "medication",
    content: contenidoData['AnticoagulantEducation']
  },
  {
    title: "Factores que afectan el INR",
    icon: "warning",
    content: contenidoData['INR']
  },
  {
    title: "Prevención de Riesgos",
    icon: "security",
    content: contenidoData['Riesgos']
  },
  {
    title: "Información Validada",
    icon: "verified",
    content: contenidoData['InformacionValidada']
  },
];

const EducationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={EducationStyle.safeArea}>
      <ScrollView contentContainerStyle={EducationStyle.container}>
        <Text style={EducationStyle.header}>Información Educativa</Text>
        <Text style={EducationStyle.subtitle}>Conoce más sobre tu tratamiento anticoagulante</Text>

        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={EducationStyle.section}
            onPress={() => navigation.navigate('Detalle', { section })}
            activeOpacity={0.8}
          >
            <View style={EducationStyle.sectionHeader}>
              <MaterialIcons name={section.icon} size={30} color="#2a86ff" />
              <Text style={EducationStyle.sectionTitle}>{section.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={EducationStyle.button} onPress={() => navigation.goBack()}>
          <Text style={EducationStyle.buttonText}>Atras</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EducationScreen;
