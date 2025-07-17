// screens/AddReminderScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const AddReminderScreen = ({ route, navigation }) => {
  const { medicationId, doseId } = route.params;
  const [medication, setMedication] = useState(null);
  const [dose, setDose] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // --- CORRECCIÓN #1 ---
  // Se ha corregido la forma en que se usa `useFocusEffect` para evitar el error.
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const savedMeds = await AsyncStorage.getItem('medications');
          const meds = savedMeds ? JSON.parse(savedMeds) : [];
          const currentMed = meds.find(m => m.id === medicationId);
          if (currentMed) {
            setMedication(currentMed);
            const currentDose = currentMed.doses.find(d => d.id === doseId);
            if (currentDose) {
              setDose(currentDose);
              setTime(new Date(currentDose.time)); 
            }
          }
        } catch (error) {
          console.error("Error cargando datos:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadData();
    }, [medicationId, doseId])
  );

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (event.type === 'set' && selectedTime) {
      setShowTimePicker(false);
      setTime(selectedTime);
    } else {
      setShowTimePicker(false);
    }
  };

  const handleSaveReminder = async () => {
    if (time <= new Date()) {
        Alert.alert("Hora inválida", "La hora para el recordatorio debe ser en el futuro.");
        return;
    }

    if (dose?.reminder?.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(dose.reminder.notificationId);
    }

    const content = {
      title: `Recordatorio: ${medication.name}`,
      body: `Es hora de tomar tu dosis de ${dose.amount} ${dose.unit}.`,
      sound: 'default',
      data: { medicationId, doseId },
    };

    try {
        // --- CORRECCIÓN #2 ---
        // Se ha actualizado el formato del 'trigger' para la notificación.
        const trigger = { type: 'date', date: time };
        const notificationId = await Notifications.scheduleNotificationAsync({ content, trigger });
        
        const updatedReminder = { time: time.toISOString(), frequency: 'single', notificationId };

        const savedMeds = await AsyncStorage.getItem('medications');
        let meds = savedMeds ? JSON.parse(savedMeds) : [];
        meds = meds.map(m => {
            if (m.id === medicationId) {
                const updatedDoses = m.doses.map(d => {
                    if (d.id === doseId) {
                        return { ...d, time: time.toISOString(), reminder: updatedReminder };
                    }
                    return d;

                });
                return { ...m, doses: updatedDoses };
            }
            return m;
        });
        await AsyncStorage.setItem('medications', JSON.stringify(meds));

        Alert.alert('Recordatorio Actualizado', 'La hora de la dosis y el recordatorio se han guardado correctamente.', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);

    } catch (error) {
        console.error("Error al programar o guardar:", error);
        Alert.alert("Error", `No se pudo guardar el recordatorio. ${error.message}`);
    }
  };

  if (isLoading || !medication || !dose) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#2A7F9F" /></View>;
  }
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.title}>Modificar Dosis</Text>
        <Text style={styles.subtitle}>{medication.name} - {dose.amount} {dose.unit}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nueva hora de la dosis</Text>
          <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
            <Ionicons name="time-outline" size={30} color="#2980b9" />
            <Text style={styles.timeButtonText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
        </View>

        {showTimePicker && <DateTimePicker value={time} mode="time" display="spinner" is24Hour={true} onChange={handleTimeChange} />}
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
          <Ionicons name="checkmark-circle-outline" size={30} color="white" />
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>

         <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        > 
            <Text style={styles.backButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f7', paddingTop: 70 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#2c3e50', paddingHorizontal: 20 },
    subtitle: { fontSize: 18, textAlign: 'center', color: '#34495e', marginBottom: 30 },
    section: { backgroundColor: 'white', borderRadius: 15, marginHorizontal: 15, marginBottom: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    sectionTitle: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 20, textAlign: 'center' },
    timeButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e7f3ff', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, justifyContent: 'center' },
    timeButtonText: { fontSize: 32, fontWeight: 'bold', color: '#2980b9', marginLeft: 15 },
    saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#27ae60', paddingVertical: 16, borderRadius: 15, marginHorizontal: 20, marginTop: 20 },
    saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 12 },
    backButton: { backgroundColor: '#95a5a6', paddingVertical: 15, borderRadius: 10, marginHorizontal: 20, marginTop: 10, alignItems: 'center' },
    backButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default AddReminderScreen;