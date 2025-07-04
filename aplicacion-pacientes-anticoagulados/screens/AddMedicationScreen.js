import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const AddMedicationScreen = ({ route, navigation }) => {
  const [medName, setMedName] = useState('');
  const [doses, setDoses] = useState('');
  const [instructions, setInstructions] = useState('');
  const [medicationToEdit, setMedicationToEdit] = useState(null);

  useEffect(() => {
    if (route.params?.medication) {
      const { medication } = route.params;
      setMedicationToEdit(medication);
      setMedName(medication.name);
      setDoses(medication.doses);
      setInstructions(medication.instructions || '');
      navigation.setOptions({ title: 'Editar Medicamento' });
    } else {
      navigation.setOptions({ title: 'Añadir Medicamento' });
    }
  }, [route.params?.medication]);

  const handleSave = async () => {
    if (!medName.trim()) {
      Alert.alert('Falta información', 'Por favor, escribe el nombre del medicamento.');
      return;
    }

    const doseValue = parseInt(doses, 10);
    if (isNaN(doseValue) || doseValue <= 0) {
      Alert.alert('Dosis inválida', 'Por favor, escribe un número entero positivo para la dosis.');
      return;
    }

    try {
      const existingMeds = await AsyncStorage.getItem('medications') || '[]';
      const medications = JSON.parse(existingMeds);

      const nombreDuplicado = medications.some(med =>
        med.name.trim().toLowerCase() === medName.trim().toLowerCase() &&
        (!medicationToEdit || med.id !== medicationToEdit.id)
      );

      if (nombreDuplicado) {
        Alert.alert(
          'Nombre duplicado',
          'Ya existe un medicamento con ese nombre. Por favor, elige otro.'
        );
        return;
      }

      if (medicationToEdit) {
        await updateMedication();
      } else {
        await createNewMedication();
      }
    } catch (error) {
      console.error('Error al validar medicamentos:', error);
    }
  };

  const updateMedication = async () => {
    const updatedMed = { 
      ...medicationToEdit, 
      name: medName, 
      doses, 
      instructions 
    };
    try {
      const existingMeds = await AsyncStorage.getItem('medications') || '[]';
      let medications = JSON.parse(existingMeds);
      medications = medications.map(med => med.id === medicationToEdit.id ? updatedMed : med);
      await AsyncStorage.setItem('medications', JSON.stringify(medications));
      
      Alert.alert('Medicamento Actualizado', 'Los datos del medicamento se han actualizado correctamente.', [
        { text: 'Entendido', onPress: () => navigation.navigate('Medications') }
      ]);
    } catch (error) {
      console.error('Error updating medication:', error);
    }
  };

  const createNewMedication = async () => {
    const newMedication = { 
      id: Date.now().toString(), 
      name: medName, 
      doses, 
      instructions, 
      notificationId: null, 
      reminder: null 
    };
    try {
      const existingMeds = await AsyncStorage.getItem('medications') || '[]';
      const medications = JSON.parse(existingMeds);
      medications.push(newMedication);
      await AsyncStorage.setItem('medications', JSON.stringify(medications));

      Alert.alert(
        'Medicamento Guardado', 
        '¿Quieres programar un recordatorio?',
        [
          { text: 'Ahora no', onPress: () => navigation.navigate('Medications'), style: 'cancel' },
          {
            text: 'Sí, programar', 
            onPress: () => {
              navigation.navigate('AddReminder', { medication: newMedication });
            }
          }
        ]
      );
    } catch (error) { 
      console.error('Error saving new medication:', error); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Medicamento</Text>
      <TextInput
        style={styles.input}
        value={medName}
        onChangeText={setMedName}
        placeholder="Ej: Paracetamol"
      />

      <Text style={styles.label}>Dosis</Text>
      <TextInput
        style={styles.input}
        value={doses}
        onChangeText={text => {
          // Permite solo números enteros
          const cleanedText = text.replace(/[^0-9]/g, '');
          setDoses(cleanedText);
        }}
        keyboardType="numeric"
        placeholder="Ej: 1"
      />

      <Text style={styles.label}>Instrucciones de Uso (Opcional)</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Ej: Tomar después de comer"
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="checkmark-circle-outline" size={30} color="white" />
        <Text style={styles.saveButtonText}>
          {medicationToEdit ? "Actualizar Medicamento" : "Guardar Medicamento"}
        </Text>
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
    marginBottom: 20 
  },
  saveButtonText: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginLeft: 12 
  },
});

export default AddMedicationScreen;