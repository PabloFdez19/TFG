import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App Anticoagulados</Text>
      <Button title="Información Educativa" onPress={() => navigation.navigate('Education')} />
      <Button title="Interacciones" onPress={() => navigation.navigate('Interactions')} />
      <Button title="Cuestionario" onPress={() => navigation.navigate('Quiz')} />
      <Button title="Recordatorios" onPress={() => navigation.navigate('Reminders')} />
      <Button title="Modo Cuidador" onPress={() => navigation.navigate('Caregiver')} />
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
});

export default HomeScreen;