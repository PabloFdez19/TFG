import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MedicationsScreen = ({ navigation }) => {
  const [medications, setMedications] = useState([]);

  const cleanExpiredReminders = (medications) => {
    const now = new Date();
    return medications.map(med => {
      if (
        med.reminder &&
        med.reminder.isSingleTime &&
        new Date(med.reminder.time) <= now
      ) {
        return { ...med, reminder: null, notificationId: null };
      }
      return med;
    });
  };

  const loadMedications = useCallback(async () => {
    try {
      const savedMeds = await AsyncStorage.getItem('medications');
      let meds = savedMeds ? JSON.parse(savedMeds) : [];

      const cleaned = cleanExpiredReminders(meds);
      setMedications(cleaned);
      await AsyncStorage.setItem('medications', JSON.stringify(cleaned));
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMedications();
    }, [loadMedications])
  );

  const deleteReminder = async (medicationId) => {
    Alert.alert(
      "Eliminar Recordatorio",
      "¿Estás seguro de que quieres eliminar el recordatorio para este medicamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, eliminar",
          onPress: async () => {
            try {
              const medToUpdate = medications.find(m => m.id === medicationId);
              if (medToUpdate && medToUpdate.notificationId) {
                await Notifications.cancelScheduledNotificationAsync(medToUpdate.notificationId);
              }

              const updatedMeds = medications.map(med => 
                med.id === medicationId ? { ...med, notificationId: null, reminder: null } : med
              );
              
              await AsyncStorage.setItem('medications', JSON.stringify(updatedMeds));
              setMedications(updatedMeds);
            } catch (error) {
              console.error('Error deleting reminder:', error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const deleteMedication = async (id) => {
    Alert.alert(
      "Eliminar Medicamento",
      "Esto eliminará el medicamento y cualquier recordatorio que tenga. ¿Estás seguro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, eliminar",
          onPress: async () => {
            try {
                const medToDelete = medications.find(m => m.id === id);
                if (medToDelete && medToDelete.notificationId) {
                    await Notifications.cancelScheduledNotificationAsync(medToDelete.notificationId);
                }
                
                const updatedMeds = medications.filter(m => m.id !== id);
                await AsyncStorage.setItem('medications', JSON.stringify(updatedMeds));
                setMedications(updatedMeds);
            } catch (error) {
                console.error('Error deleting medication:', error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };
  
  const getReminderText = (reminder) => {
    if (!reminder) return 'Sin recordatorio programado';
    
    const time = new Date(reminder.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (reminder.isSingleTime) return `Una sola vez a las ${time}`;
    if (reminder.isRecurrent && reminder.selectedDays?.length > 0) {
      const days = reminder.selectedDays.map(d => ['Do','Lu','Ma','Mi','Ju','Vi','Sá'][d]).join(', ');
      return `Recordatorio a las ${time} los días: ${days}`;
    }
    return `Todos los días a las ${time}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.medItem}>
      <Text style={styles.medName}>{item.name}</Text>
      <Text style={styles.medDose}>Dosis: {item.doses}</Text>
      <View style={styles.reminderInfo}>
        <Ionicons name="alarm-outline" size={24} color="#34495e" />
        <Text style={styles.reminderText}>{getReminderText(item.reminder)}</Text>
      </View>
      
      <View style={styles.separator} />

      <View style={styles.buttonContainer}>
        {item.reminder ? (
          <>
            <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => navigation.navigate('AddMedication', { medication: item })}>
              <Ionicons name="pencil-outline" size={20} color="white" />
              <Text style={styles.actionButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteReminderButton]} onPress={() => deleteReminder(item.id)}>
               <Ionicons name="notifications-off-outline" size={20} color="white" />
              <Text style={styles.actionButtonText}>Quitar</Text>
            </TouchableOpacity>
          </>
        ) : (
            <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={() => navigation.navigate('AddMedication', { medication: item })}>
               <Ionicons name="notifications-outline" size={20} color="white" />
              <Text style={styles.actionButtonText}>Añadir Recordatorio</Text>
            </TouchableOpacity>
        )}
      </View>
       <TouchableOpacity style={styles.deleteMedButton} onPress={() => deleteMedication(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#c0392b" />
          <Text style={styles.deleteMedButtonText}>Eliminar Medicamento</Text>
       </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
            <TouchableOpacity style={styles.mainAddButton} onPress={() => navigation.navigate('AddMedication')}>
                <Ionicons name="add-circle" size={30} color="white" />
                <Text style={styles.mainAddButtonText}>Añadir Nuevo Medicamento</Text>
            </TouchableOpacity>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay medicamentos guardados.</Text>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

// --- ESTILOS MEJORADOS PARA ACCESIBILIDAD ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f7', paddingTop: 70 },
  medItem: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  medName: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  medDose: { fontSize: 18, color: '#555', marginBottom: 15 },
  reminderInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  reminderText: { fontSize: 18, color: '#34495e', marginLeft: 10, fontStyle: 'italic', flexShrink: 1 },
  separator: { height: 1, backgroundColor: '#e8e8e8', marginVertical: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 10, flex: 1, marginHorizontal: 5 },
  actionButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  addButton: { backgroundColor: '#3498db' },
  editButton: { backgroundColor: '#f39c12' },
  deleteReminderButton: { backgroundColor: '#e74c3c' },
  deleteMedButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 20 },
  deleteMedButtonText: { fontSize: 16, color: '#c0392b', marginLeft: 8, textDecorationLine: 'underline' },
  emptyText: { textAlign: 'center', marginTop: 60, fontSize: 20, color: '#666' },
  mainAddButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#27ae60', paddingVertical: 18, borderRadius: 15, margin: 15 },
  mainAddButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
});


export default MedicationsScreen;