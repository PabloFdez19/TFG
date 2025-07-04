import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

const AddReminderScreen = ({ route, navigation }) => {
  const { medication } = route.params;
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [isSingleTime, setIsSingleTime] = useState(true);
  
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const toggleDay = (dayIndex) => {
    setSelectedDays(prev =>
      prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex].sort()
    );
  };

  const scheduleNotification = async (weekday = null) => {
  const notificationData = {
    medicationId: medication.id,
  };

  if (isSingleTime) {
    notificationData.isSingleTime = true;
  }

  const content = {
    title: 'Recordatorio de Medicación',
    body: `Es hora de tomar ${medication.name} (Dosis: ${medication.doses})`,
    sound: 'default',
    data: notificationData,
  };

  let trigger;
  if (isSingleTime) {
    if (time <= new Date()) {
      Alert.alert('Hora inválida', 'Selecciona una hora en el futuro.');
      return null;
    }
    trigger = {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: time,
    };
  } else {
    trigger = {
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeats: true,
      ...(weekday !== null && { weekday }),
    };
  }

  try {
    return await Notifications.scheduleNotificationAsync({ content, trigger });
  } catch (e) {
    console.error('Error programando la notificación:', e);
    return null;
  }
};

const handleSaveReminder = async () => {
  if (isRecurrent && selectedDays.length === 0) {
    Alert.alert('Faltan días', 'Si el recordatorio es recurrente, debes seleccionar al menos un día.');
    return;
  }

  // Cancelar notificaciones existentes
  const cancelNotifications = async (ids) => {
    if (!ids) return;
    const idsArray = Array.isArray(ids) ? ids : [ids];
    for (const id of idsArray) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }
  };

  await cancelNotifications(medication.notificationId || medication.notificationIds);

  let notificationIds = [];

  try {
    if (isSingleTime) {
      const id = await scheduleNotification();
      if (id) notificationIds.push(id);
    } else if (isRecurrent) {
      for (const dayIndex of selectedDays) {
        const weekday = dayIndex === 0 ? 7 : dayIndex; // Ajuste para Domingo=7
        const id = await scheduleNotification(weekday);
        if (id) notificationIds.push(id);
      }
    } else {
      // Diario (sin días específicos)
      const id = await scheduleNotification();
      if (id) notificationIds.push(id);
    }
  } catch (error) {
    console.error('Error scheduling notifications:', error);
  }

  if (notificationIds.length === 0) {
    Alert.alert('Error', 'No se pudo programar ninguna notificación.');
    return;
  }

  const reminderData = { time: time.toISOString(), isSingleTime, isRecurrent, selectedDays };
  const updatedMed = { 
    ...medication, 
    notificationIds,  // Usar arreglo de IDs
    reminder: reminderData 
  };

  // Eliminar propiedad antigua si existe
  if (updatedMed.notificationId) {
    delete updatedMed.notificationId;
  }

  try {
    const existingMeds = await AsyncStorage.getItem('medications') || '[]';
    let medications = JSON.parse(existingMeds);
    medications = medications.map(med => med.id === medication.id ? updatedMed : med);
    await AsyncStorage.setItem('medications', JSON.stringify(medications));

    Alert.alert('Recordatorio Guardado', 'El recordatorio se ha guardado correctamente.', [
      { text: 'Entendido', onPress: () => navigation.navigate('Medications') }
    ]);
  } catch (error) {
    console.error('Error saving reminder:', error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordatorio para: {medication.name}</Text>

      <Text style={styles.label}>Hora del Recordatorio</Text>
      <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
        <Ionicons name="time-outline" size={30} color="#2980b9" />
        <Text style={styles.timeButtonText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker 
          value={time} 
          mode="time" 
          display="spinner" 
          onChange={(e, selected) => { 
            setShowTimePicker(false); 
            if (selected) setTime(selected); 
          }} 
        />
      )}

      <View style={styles.separator} />

      <Text style={styles.label}>Frecuencia</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Solo una vez</Text>
        <Switch 
          value={isSingleTime} 
          onValueChange={v => { 
            setIsSingleTime(v); 
            if (v) setIsRecurrent(false); 
          }} 
          trackColor={{ false: '#ccc', true: '#27ae60' }} 
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Diario</Text>
        <Switch 
          value={!isSingleTime && !isRecurrent} 
          onValueChange={v => { 
            if (v) { 
              setIsSingleTime(false); 
              setIsRecurrent(false); 
            } 
          }} 
          trackColor={{ false: '#ccc', true: '#27ae60' }} 
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Días específicos</Text>
        <Switch 
          value={isRecurrent} 
          onValueChange={v => { 
            setIsRecurrent(v); 
            if (v) setIsSingleTime(false); 
          }} 
          disabled={isSingleTime} 
          trackColor={{ false: '#ccc', true: '#27ae60' }} 
        />
      </View>

      {isRecurrent && !isSingleTime && (
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.dayButton, selectedDays.includes(index) && styles.dayButtonSelected]} 
              onPress={() => toggleDay(index)}
            >
              <Text style={[styles.dayButtonText, selectedDays.includes(index) && styles.dayButtonTextSelected]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
        <Ionicons name="checkmark-circle-outline" size={30} color="white" />
        <Text style={styles.saveButtonText}>
          {medication.reminder ? "Actualizar Recordatorio" : "Guardar Recordatorio"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff', paddingTop: 70 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  label: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 },
  timeButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f2f2f7', 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    justifyContent: 'center',
    marginBottom: 20,
  },
  timeButtonText: { fontSize: 28, fontWeight: 'bold', color: '#2980b9', marginLeft: 15 },
  separator: { height: 1, backgroundColor: '#e8e8e8', marginVertical: 25 },
  switchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  switchLabel: { fontSize: 18, color: '#333' },
  daysContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    marginVertical: 15, 
    gap: 10 
  },
  dayButton: { 
    padding: 15, 
    backgroundColor: '#f2f2f7', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#ddd',
    minWidth: 100,
    alignItems: 'center',
  },
  dayButtonSelected: { 
    backgroundColor: '#2980b9', 
    borderColor: '#2980b9' 
  },
  dayButtonText: { fontSize: 16, color: 'black' },
  dayButtonTextSelected: { color: 'white', fontWeight: 'bold' },
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

export default AddReminderScreen;