import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

const MedicationsScreen = ({ navigation }) => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const savedMeds = await AsyncStorage.getItem('medications');
      if (savedMeds) setMedications(JSON.parse(savedMeds));
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  };

  const deleteMedication = async (id) => {
    try {
      // Cancelar la notificación
      const medToDelete = medications.find(m => m.id === id);
      if (medToDelete) {
        await Notifications.cancelScheduledNotificationAsync(medToDelete.notificationId);
      }
      
      // Eliminar de almacenamiento
      const updatedMeds = medications.filter(m => m.id !== id);
      await AsyncStorage.setItem('medications', JSON.stringify(updatedMeds));
      setMedications(updatedMeds);
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMedications();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button
        title="Agregar Nueva Medicación"
        onPress={() => navigation.navigate('AddMedication')}
      />
      
      <FlatList
        data={medications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.medItem}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text>Dosis: {item.doses} por día</Text>
            <Text>Hora: {new Date(item.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            <Text>Tipo: {item.isSingleTime ? 'Única vez' : item.isRecurrent ? 'Recurrente' : 'Diario'}</Text>
            
            {item.isRecurrent && (
              <Text>Días: {item.selectedDays.map(d => ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][d]).join(', ')}</Text>
            )}
            
            <Button title="Eliminar" onPress={() => deleteMedication(item.id)} color="red" />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay medicamentos registrados</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMedication')}
      >
        <Ionicons name="add" size={30} color="white" />
        <Text style={styles.addButtonText}>Añadir Medicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingTop: 65,
  },
  medItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MedicationsScreen;