import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import AnticoagulantEducation from '../components/AnticoagulantEducation';
import { MaterialIcons } from '@expo/vector-icons';
import { EducationStyle } from '../Styles/EducationStyles';
import INR from '../components/INR';
import Riesgos from '../components/Riesgos';

const sections = [
  {
    title: "Tratamiento Anticoagulante",
    icon: "medication",
    content: <AnticoagulantEducation />
  },
  {
    title: "Factores que afectan el INR",
    icon: "warning",
    content: <INR />,
  },
  {
    title: "Prevención de Riesgos",
    icon: "security",
    content: <Riesgos />
  },
  {
    title: "Información Validada",
    icon: "verified",
    content: "Toda la información proporcionada está basada en guías...",
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default EducationScreen;
