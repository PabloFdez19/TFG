import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const CaregiverScreen = () => {
  const [patientName, setPatientName] = useState('');
  const [medicationDetails, setMedicationDetails] = useState('');

  const handleSave = () => {
    alert('Información guardada correctamente');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modo Cuidador</Text>
      <Text style={styles.label}>Nombre del Paciente:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre del paciente"
        value={patientName}
        onChangeText={setPatientName}
      />
      <Text style={styles.label}>Detalles de la Medicación:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Ingresa los detalles de la medicación"
        multiline
        value={medicationDetails}
        onChangeText={setMedicationDetails}
      />
      <Button title="Guardar" onPress={handleSave} />
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default CaregiverScreen;