import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { EducationDetailStyle } from '../Styles/EducationStyles';

const EducationDetail = ({ route, navigation }) => {
  const { section } = route.params;
  const ContentComponent = section.content;

  return (
    <ScrollView contentContainerStyle={EducationDetailStyle.container}>
      <View style={EducationDetailStyle.header}>
        <MaterialIcons name={section.icon} size={40} color="#2a86ff" />
        <Text style={EducationDetailStyle.title}>{section.title}</Text>
      </View>
      <View>
        {ContentComponent}
      </View>
      <TouchableOpacity style={EducationDetailStyle.button} onPress={() => navigation.goBack()}>
        <Text style={EducationDetailStyle.buttonText}>Cerrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EducationDetail;
