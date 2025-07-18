// screens/AddMedicationScreen.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const AddMedicationScreen = ({ navigation }) => {
  const [medName, setMedName] = useState('');

  const handleSave = async () => {
    if (!medName.trim()) {
      Alert.alert('Falta información', 'Por favor, escribe el nombre del medicamento.');
      return;
    }

    try {
      const existingMeds = await AsyncStorage.getItem('medications') || '[]';
      const medications = JSON.parse(existingMeds);

      const nombreDuplicado = medications.some(med =>
        med.name.trim().toLowerCase() === medName.trim().toLowerCase()
      );

      if (nombreDuplicado) {
        Alert.alert(
          'Nombre duplicado',
          'Ya existe un medicamento con ese nombre. Por favor, elige otro.'
        );
        return;
      }

      const newMedication = {
        id: Date.now().toString(),
        name: medName,
        doses: [], // El array de dosis se mantiene para almacenar las tomas generadas
      };

      medications.push(newMedication);
      await AsyncStorage.setItem('medications', JSON.stringify(medications));

      Alert.alert(
        'Medicamento Guardado',
        'Ahora puedes configurar las dosis y horarios para este medicamento.',
        [
          {
            text: 'Configurar Dosis',
            // MODIFICADO: Navega a la nueva pantalla unificada ManageDoses
            onPress: () => navigation.replace('ManageDoses', { medicationId: newMedication.id }),
          },
        ]
      );
    } catch (error) {
      console.error('Error al guardar el medicamento:', error);
      Alert.alert('Error', 'No se pudo guardar el medicamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Medicamento</Text>
      <TextInput
        style={styles.input}
        value={medName}
        onChangeText={setMedName}
        placeholder="Ej: Sintrom"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="checkmark-circle-outline" size={30} color="white" />
        <Text style={styles.saveButtonText}>Guardar y Configurar Dosis</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.exitButton}
          onPress={navigation.goBack}
        > 
        <View>
          <Text style={styles.exitButtonText}> Salir</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff', paddingTop: 70 },
  label: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: {
    backgroundColor: '#f2f2f7',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27ae60',
    paddingVertical: 18,
    borderRadius: 15,
    marginTop: 'auto',
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  exitButton: {
    backgroundColor: '#2a86ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'stretch',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddMedicationScreen;