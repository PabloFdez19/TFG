import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

const getNextDateForDay = (baseDate, targetDayIndex) => {
    const nextDate = new Date(baseDate);
    const currentDay = nextDate.getDay();
    let dayDifference = targetDayIndex - currentDay;
    if (dayDifference < 0 || (dayDifference === 0 && new Date() > nextDate)) {
        dayDifference += 7;
    }
    nextDate.setDate(nextDate.getDate() + dayDifference);
    return nextDate;
};

const AddReminderScreen = ({ route, navigation }) => {
    const { medication } = route.params;

    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [frequency, setFrequency] = useState('single');
    const [selectedDays, setSelectedDays] = useState([]);
    const [intervalHours, setIntervalHours] = useState('8');

    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    useEffect(() => {
        if (medication.reminder) {
            const { reminder } = medication;
            setTime(new Date(reminder.time));
            setFrequency(reminder.frequency || 'single');
            if (reminder.frequency === 'recurrent') setSelectedDays(reminder.selectedDays || []);
            if (reminder.frequency === 'cyclical') setIntervalHours(reminder.intervalHours?.toString() || '8');
        }
    }, [medication]);

    const handleSaveReminder = async () => {
        if (frequency === 'recurrent' && selectedDays.length === 0) {
            Alert.alert('Faltan días', 'Selecciona al menos un día.');
            return;
        }

        if (medication.notificationIds) {
            await Promise.all(medication.notificationIds.map(id => Notifications.cancelScheduledNotificationAsync(id)));
        }
        
        const baseContent = {
            title: 'Recordatorio de Medicación',
            body: `Es hora de tomar ${medication.name} (Dosis: ${medication.doses})`,
            sound: 'default',
        };

        let notificationIds = [];
        let reminderData = { time: time.toISOString(), frequency };
        
        try {
            if (frequency === 'single') {
                if (time <= new Date()) {
                    Alert.alert('Hora inválida', 'La hora debe ser en el futuro.');
                    return;
                }
                const content = { ...baseContent, data: { medicationId: medication.id, frequency: 'single' } };
                // --- CORRECCIÓN DE WARNING: Usar el formato de trigger moderno ---
                const trigger = { type: 'date', date: time };
                const id = await Notifications.scheduleNotificationAsync({ content, trigger });
                if (id) notificationIds.push(id);
            }
            
            else if (frequency === 'daily') {
                let firstTriggerDate = new Date(time);
                if (firstTriggerDate <= new Date()) firstTriggerDate.setDate(firstTriggerDate.getDate() + 1);
                const content = { ...baseContent, data: { medicationId: medication.id, frequency: 'daily', originalTime: time.toISOString() } };
                const trigger = { type: 'date', date: firstTriggerDate };
                const id = await Notifications.scheduleNotificationAsync({ content, trigger });
                if (id) notificationIds.push(id);
            }

            else if (frequency === 'cyclical') {
                const interval = parseInt(intervalHours, 10);
                reminderData.intervalHours = interval;
                const content = { ...baseContent, data: { medicationId: medication.id, frequency: 'cyclical', intervalHours: interval, originalTime: time.toISOString() } };
                // Para los cíclicos, el primer trigger es una fecha, luego se reprograma con intervalo
                const firstTriggerDate = new Date(Date.now() + 2 * 1000); // Empezar en 2 segundos
                const trigger = { type: 'date', date: firstTriggerDate };
                const id = await Notifications.scheduleNotificationAsync({ content, trigger });
                if (id) notificationIds.push(id);
            }
                
            else if (frequency === 'recurrent') {
                reminderData.selectedDays = selectedDays;
                for (const dayIndex of selectedDays) {
                    const firstTriggerDate = getNextDateForDay(time, dayIndex);
                    const content = { ...baseContent, data: { medicationId: medication.id, frequency: 'recurrent', originalTime: time.toISOString(), scheduleDay: dayIndex } };
                    const trigger = { type: 'date', date: firstTriggerDate };
                    const id = await Notifications.scheduleNotificationAsync({ content, trigger });
                    if (id) notificationIds.push(id);
                }
            }

            if (notificationIds.length === 0) {
                Alert.alert('Error', 'No se pudo programar el recordatorio.');
                return;
            }

            const updatedMed = { ...medication, reminder: reminderData, notificationIds };
            const existingMeds = await AsyncStorage.getItem('medications') || '[]';
            let medications = JSON.parse(existingMeds);
            medications = medications.map(med => med.id === medication.id ? updatedMed : med);
            await AsyncStorage.setItem('medications', JSON.stringify(medications));

            Alert.alert('Recordatorio Guardado', 'El recordatorio se ha guardado correctamente.', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);

        } catch (e) {
            console.error("Error al programar o guardar:", e);
        }
    };
    
    const FrequencyButton = ({ label, value }) => (
        <TouchableOpacity 
            style={[styles.freqButton, frequency === value && styles.freqButtonActive]}
            onPress={() => setFrequency(value)}
        >
            <Text style={[styles.freqButtonText, frequency === value && styles.freqButtonTextActive]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.title}>Recordatorio para: {medication.name}</Text>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frecuencia</Text>
                    <View style={styles.freqContainer}>
                        <FrequencyButton label="Una vez" value="single" />
                        <FrequencyButton label="Diario" value="daily" />
                        <FrequencyButton label="Días Específicos" value="recurrent" />
                        <FrequencyButton label="Cada X Horas" value="cyclical" />
                    </View>
                </View>

                <View style={styles.section}>
                    {frequency === 'cyclical' && ( <View><Text style={styles.sectionTitle}>Intervalo</Text><View style={styles.inputContainer}><Text style={styles.label}>Repetir cada</Text><TextInput style={styles.input} value={intervalHours} onChangeText={setIntervalHours} keyboardType="number-pad" /><Text style={styles.label}>horas</Text></View></View> )}
                    {frequency !== 'cyclical' && ( <View><Text style={styles.sectionTitle}>Hora</Text><TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}><Ionicons name="time-outline" size={30} color="#2980b9" /><Text style={styles.timeButtonText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></TouchableOpacity></View> )}
                    {frequency === 'recurrent' && ( <View style={{marginTop: 20}}><Text style={styles.sectionTitle}>Días de la semana</Text><View style={styles.daysContainer}>{daysOfWeek.map((day, index) => (<TouchableOpacity key={index} style={[styles.dayButton, selectedDays.includes(index) && styles.dayButtonSelected]} onPress={() => setSelectedDays(prev => prev.includes(index) ? prev.filter(d => d !== index) : [...prev, index])}><Text style={[styles.dayButtonText, selectedDays.includes(index) && styles.dayButtonTextSelected]}>{day.substring(0, 3)}</Text></TouchableOpacity>))}</View></View> )}
                </View>

                {showTimePicker && <DateTimePicker value={time} mode="time" display="spinner" onChange={(e, selected) => { setShowTimePicker(false); if (selected) setTime(selected); }} />}
                
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
                    <Ionicons name="checkmark-circle-outline" size={30} color="white" />
                    <Text style={styles.saveButtonText}>Guardar Recordatorio</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#2c3e50', padding: 20 },
    section: { backgroundColor: 'white', borderRadius: 10, marginHorizontal: 15, marginBottom: 20, padding: 15, borderWidth: 1, borderColor: '#eee' },
    sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 15 },
    freqContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
    freqButton: { paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#f2f2f7', borderRadius: 20, borderWidth: 1, borderColor: '#ddd' },
    freqButtonActive: { backgroundColor: '#2980b9', borderColor: '#2980b9' },
    freqButtonText: { fontSize: 14, color: 'black', fontWeight: '500' },
    freqButtonTextActive: { color: 'white', fontWeight: 'bold' },
    label: { fontSize: 16, color: '#555' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 10 },
    input: { backgroundColor: '#f2f2f7', padding: 10, borderRadius: 10, fontSize: 18, textAlign: 'center', minWidth: 60, fontWeight: 'bold' },
    timeButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f7', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, justifyContent: 'center' },
    timeButtonText: { fontSize: 26, fontWeight: 'bold', color: '#2980b9', marginLeft: 15 },
    daysContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, paddingTop: 10 },
    dayButton: { paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#f2f2f7', borderRadius: 20, borderWidth: 1, borderColor: '#ddd' },
    dayButtonSelected: { backgroundColor: '#2980b9', borderColor: '#2980b9' },
    dayButtonText: { fontSize: 14, color: 'black', fontWeight: '500' },
    dayButtonTextSelected: { color: 'white', fontWeight: 'bold' },
    saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#27ae60', paddingVertical: 16, borderRadius: 15, margin: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
    saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 12 },
});

export default AddReminderScreen;