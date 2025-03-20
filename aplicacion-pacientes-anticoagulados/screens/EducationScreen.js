import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EducationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información Educativa</Text>
      <Text style={styles.text}>
        Aquí encontrarás información detallada sobre el tratamiento anticoagulante, factores que afectan el INR, y cómo manejar complicaciones.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EducationScreen;