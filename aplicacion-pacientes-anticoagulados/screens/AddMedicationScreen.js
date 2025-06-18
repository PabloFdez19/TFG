import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Switch, Text, Platform, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

const AddMedicationScreen = ({ route, navigation }) => {
  const [medName, setMedName] = useState('');
  const [doses, setDoses] = useState(1);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [isSingleTime, setIsSingleTime] = useState(true);

  const [medicationToEdit, setMedicationToEdit] = useState(null);
  const [isEditingReminder, setIsEditingReminder] = useState(false);

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  useEffect(() => {
    if (route.params?.medication) {
      const { medication } = route.params;
      setMedicationToEdit(medication);
      setMedName(medication.name);
      setDoses(medication.doses);

      if (medication.reminder) {
        setIsEditingReminder(true);
        navigation.setOptions({ title: 'Editar Recordatorio' });
        setTime(new Date(medication.reminder.time));
        setIsSingleTime(medication.reminder.isSingleTime);
        setIsRecurrent(medication.reminder.isRecurrent);
        setSelectedDays(medication.reminder.selectedDays || []);
      } else {
        navigation.setOptions({ title: 'Añadir Recordatorio' });
      }
    } else {
      navigation.setOptions({ title: 'Añadir Medicamento' });
    }
  }, [route.params?.medication]);

  const toggleDay = (dayIndex) => {
    setSelectedDays(prev => 
      prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex].sort()
    );
  };

  const scheduleNotification = async (medicationName, medicationDoses) => {

    const notificationData = {
      medicationId: medicationToEdit.id,
    };

    if (isSingleTime) {
      notificationData.isSingleTime = true;
    }

    const content = {
      title: 'Recordatorio de Medicación',
      body: `Es hora de tomar ${medicationName} (Dosis: ${medicationDoses})`,
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
        useUTC: false,
        ...(isRecurrent && selectedDays.length > 0 && {
          weekday: selectedDays.map(d => d + 1),
        })
      };
    }

    try {
      return await Notifications.scheduleNotificationAsync({ content, trigger });
    } catch (e) {
      console.error('Error programando la notificación:', e);
      Alert.alert('Error', 'No se pudo programar la notificación.');
      return null;
    }
  };

  const handleSave = async () => {
    if (!medName.trim()) {
      Alert.alert('Falta información', 'Por favor, escribe el nombre del medicamento.');
      return;
    }

    if (medicationToEdit) { await saveReminder(); }
    else { await createNewMedication(); }
  };

  const createNewMedication = async () => {
    const newMedication = { id: Date.now().toString(), name: medName, doses, notificationId: null, reminder: null };
    try {
      const existingMeds = await AsyncStorage.getItem('medications') || '[]';
      const medications = JSON.parse(existingMeds);
      medications.push(newMedication);
      await AsyncStorage.setItem('medications', JSON.stringify(medications));

      Alert.alert(
        'Medicamento Guardado', '¿Quieres programar un recordatorio?',
        [
          { text: 'Ahora no', onPress: () => navigation.goBack(), style: 'cancel' },
          { text: 'Sí, programar', onPress: () => {
              setMedicationToEdit(newMedication);
              navigation.setOptions({ title: 'Añadir Recordatorio' });
          }}
        ]
      );
    } catch (error) { console.error('Error saving new medication:', error); }
  };

  const saveReminder = async () => {
    if (isRecurrent && selectedDays.length === 0) {
      Alert.alert('Faltan días', 'Si el recordatorio es recurrente, debes seleccionar al menos un día.');
      return;
    }

    if (isEditingReminder && medicationToEdit.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(medicationToEdit.notificationId);
    }

    const notificationId = await scheduleNotification(medicationToEdit.name, medicationToEdit.doses);
    if (!notificationId) return;

    const reminderData = { time: time.toISOString(), isSingleTime, isRecurrent, selectedDays };
    const updatedMed = { ...medicationToEdit, notificationId, reminder: reminderData };

    try {
      const existingMeds = await AsyncStorage.getItem('medications') || '[]';
      let medications = JSON.parse(existingMeds);
      medications = medications.map(med => med.id === medicationToEdit.id ? updatedMed : med);
      await AsyncStorage.setItem('medications', JSON.stringify(medications));

      Alert.alert('Recordatorio Guardado', 'El recordatorio se ha guardado correctamente.', [
        { text: 'Entendido', onPress: () => navigation.navigate('Medications') }
      ]);
    } catch (error) { console.error('Error saving reminder:', error); }
  };

  const shouldShowReminderForm = !!medicationToEdit;

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Nombre del Medicamento</Text>
        <TextInput
            style={[styles.input, shouldShowReminderForm && styles.disabledInput]}
            value={medName}
            onChangeText={setMedName}
            editable={!shouldShowReminderForm}
            placeholder="Ej: Paracetamol"
        />
      
        <Text style={styles.label}>Dosis</Text>
        <TextInput
            style={[styles.input, shouldShowReminderForm && styles.disabledInput]}
            value={doses.toString()}
            onChangeText={text => setDoses(Math.max(1, Number(text) || 1))}
            editable={!shouldShowReminderForm}
            keyboardType="numeric"
        />
      
      {shouldShowReminderForm && (
        <>
            <Text style={styles.label}>Hora del Recordatorio</Text>
            <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
                <Ionicons name="time-outline" size={30} color="#2980b9"/>
                <Text style={styles.timeButtonText}>{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            </TouchableOpacity>

            {showTimePicker && (
                <DateTimePicker value={time} mode="time" display="spinner" onChange={(e, selected) => { setShowTimePicker(false); if (selected) setTime(selected); }}/>
            )}
            
            <View style={styles.separator} />
            
            <Text style={styles.label}>Frecuencia</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Solo una vez</Text>
                <Switch value={isSingleTime} onValueChange={v => { setIsSingleTime(v); if(v) setIsRecurrent(false); }} trackColor={{false: '#ccc', true: '#27ae60'}}/>
            </View>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Diario</Text>
                <Switch value={!isSingleTime && !isRecurrent} onValueChange={v => { if(v) { setIsSingleTime(false); setIsRecurrent(false); }}} trackColor={{false: '#ccc', true: '#27ae60'}}/>
            </View>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Días específicos</Text>
                <Switch value={isRecurrent} onValueChange={v => { setIsRecurrent(v); if(v) setIsSingleTime(false); }} disabled={isSingleTime} trackColor={{false: '#ccc', true: '#27ae60'}}/>
            </View>

            {isRecurrent && !isSingleTime && (
                <View style={styles.daysContainer}>
                {daysOfWeek.map((day, index) => (
                    <TouchableOpacity key={index} style={[styles.dayButton, selectedDays.includes(index) && styles.dayButtonSelected]} onPress={() => toggleDay(index)}>
                        <Text style={[styles.dayButtonText, selectedDays.includes(index) && styles.dayButtonTextSelected]}>{day}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
        </>
      )}
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="checkmark-circle-outline" size={30} color="white" />
        <Text style={styles.saveButtonText}>{!medicationToEdit ? "Guardar Medicamento" : "Guardar Recordatorio"}</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- ESTILOS MEJORADOS PARA ACCESIBILIDAD ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff', paddingTop: 70 },
  label: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { backgroundColor: '#f2f2f7', padding: 15, borderRadius: 10, fontSize: 18, marginBottom: 20 },
  disabledInput: { backgroundColor: '#e0e0e0', color: '#888' },
  timeButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f7', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, justifyContent: 'center' },
  timeButtonText: { fontSize: 28, fontWeight: 'bold', color: '#2980b9', marginLeft: 15 },
  separator: { height: 1, backgroundColor: '#e8e8e8', marginVertical: 25 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, },
  switchLabel: { fontSize: 18, color: '#333' },
  daysContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 15, gap: 10 },
  dayButton: { padding: 15, backgroundColor: '#f2f2f7', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' },
  dayButtonSelected: { backgroundColor: '#2980b9', borderColor: '#2980b9' },
  dayButtonText: { fontSize: 16, color: 'black' },
  dayButtonTextSelected: { color: 'white', fontWeight: 'bold' },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#27ae60', paddingVertical: 18, borderRadius: 15, marginTop: 'auto', marginBottom: 20 },
  saveButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
});


export default AddMedicationScreen;