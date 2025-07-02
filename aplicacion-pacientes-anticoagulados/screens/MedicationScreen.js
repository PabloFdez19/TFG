import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MedicationsScreen = ({ navigation }) => {
  const [medications, setMedications] = useState([]);

  const loadMedications = useCallback(async () => {
    try {
      const savedMeds = await AsyncStorage.getItem('medications');
      const meds = savedMeds ? JSON.parse(savedMeds) : [];
      setMedications(meds);
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMedications();
    }, [loadMedications])
  );

  const getReminderText = (reminder) => {
    if (!reminder) return 'Sin recordatorio programado';

    const time = new Date(reminder.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (reminder.isSingleTime) return `Una sola vez a las ${time}`;
    if (reminder.isRecurrent && reminder.selectedDays?.length > 0) {
      const days = reminder.selectedDays.map(d => ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'][d]).join(', ');
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
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay medicamentos guardados.</Text>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

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
  reminderInfo: { flexDirection: 'row', alignItems: 'center' },
  reminderText: { fontSize: 18, color: '#34495e', marginLeft: 10, fontStyle: 'italic', flexShrink: 1 },
  emptyText: { textAlign: 'center', marginTop: 60, fontSize: 20, color: '#666' },
});

export default MedicationsScreen;