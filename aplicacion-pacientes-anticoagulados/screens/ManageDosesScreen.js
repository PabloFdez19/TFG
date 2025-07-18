// screens/ManageDosesScreen.js

import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, SectionList,
  Alert, TouchableOpacity, TextInput,
  ScrollView, ActivityIndicator, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

const DoseForm = ({ medication, onDosesGenerated }) => {
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [times, setTimes] = useState([new Date()]);
    const [startDate, setStartDate] = useState(new Date());
    const [interval, setInterval] = useState('8');
    const [selectedDays, setSelectedDays] = useState([]);
    // --- MODIFICACIÓN: El estado ahora representa días, no número de dosis ---
    const [durationInDays, setDurationInDays] = useState('14'); 
    const [showPicker, setShowPicker] = useState(false);
    const [pickerConfig, setPickerConfig] = useState({ mode: 'time', index: 0 });

    const onPickerChange = (event, selectedValue) => {
        setShowPicker(false);
        if (event.type === 'dismissed') { return; }
        if (selectedValue) {
            if (pickerConfig.mode === 'date') {
                setStartDate(selectedValue);
            } else {
                const newTimes = [...times];
                newTimes[pickerConfig.index] = selectedValue;
                setTimes(newTimes);
            }
        }
    };
    
    const showTimePicker = (index) => { setPickerConfig({ mode: 'time', index }); setShowPicker(true); };
    const showDatePicker = () => { setPickerConfig({ mode: 'date' }); setShowPicker(true); };
    const addTime = () => setTimes([...times, new Date()]);
    const removeTime = (index) => setTimes(times.filter((_, i) => i !== index));

    // --- MODIFICACIÓN CLAVE: Lógica de generación de dosis reescrita ---
    const handleGenerateDoses = async () => {
        if (!amount.trim() || !unit.trim() || !durationInDays.trim()) {
            Alert.alert('Faltan datos', 'Por favor, completa la cantidad, unidad y duración.');
            return;
        }

        const newDoses = [];
        const daysToGenerate = parseInt(durationInDays, 10);
        if (isNaN(daysToGenerate) || daysToGenerate <= 0) {
            Alert.alert('Duración inválida', 'La duración debe ser un número positivo de días.');
            return;
        }
        
        const localStartDate = new Date(startDate);
        localStartDate.setHours(0,0,0,0);
        
        const endDate = new Date(localStartDate);
        endDate.setDate(localStartDate.getDate() + daysToGenerate);

        if (frequency === 'interval_hours') {
            const intervalHours = parseInt(interval, 10);
            if (isNaN(intervalHours) || intervalHours <= 0) {
                Alert.alert('Intervalo inválido', 'El intervalo en horas debe ser un número positivo.');
                return;
            }
            let doseTime = new Date(localStartDate);
            doseTime.setHours(times[0].getHours(), times[0].getMinutes(), 0, 0);

            while (doseTime < endDate) {
                if (doseTime > new Date()) {
                    newDoses.push({ id: `${Date.now()}_${newDoses.length}`, amount, unit, time: doseTime.toISOString() });
                }
                doseTime.setHours(doseTime.getHours() + intervalHours);
            }
        } else {
            let currentDate = new Date(localStartDate);
            while(currentDate < endDate) {
                let shouldAddDoseToday = false;
                if (frequency === 'daily') {
                    shouldAddDoseToday = true;
                } else if (frequency === 'weekly' && selectedDays.includes(currentDate.getDay())) {
                    shouldAddDoseToday = true;
                }
                
                if (shouldAddDoseToday) {
                    for (const time of times) {
                        const doseTime = new Date(currentDate);
                        doseTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

                        if (doseTime > new Date()) {
                           newDoses.push({ id: `${Date.now()}_${newDoses.length}`, amount, unit, time: doseTime.toISOString() });
                        }
                    }
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        onDosesGenerated(newDoses);
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.sectionForm}><Text style={styles.sectionTitleForm}>1. Dosis</Text><View style={styles.inlineInputs}><TextInput style={[styles.input, {flex: 1}]} placeholder="Cantidad (ej: 1)" value={amount} onChangeText={setAmount} keyboardType="numeric" /><TextInput style={[styles.input, {flex: 1}]} placeholder="Unidad (ej: pastilla)" value={unit} onChangeText={setUnit} /></View></View>
            <View style={styles.sectionForm}><Text style={styles.sectionTitleForm}>2. Frecuencia y Horario</Text><View style={styles.freqContainer}><TouchableOpacity style={[styles.freqButton, frequency === 'daily' && styles.freqButtonActive]} onPress={() => setFrequency('daily')}><Text style={[styles.freqText, frequency === 'daily' && styles.freqTextActive]}>Diario</Text></TouchableOpacity><TouchableOpacity style={[styles.freqButton, frequency === 'weekly' && styles.freqButtonActive]} onPress={() => setFrequency('weekly')}><Text style={[styles.freqText, frequency === 'weekly' && styles.freqTextActive]}>Semanal</Text></TouchableOpacity><TouchableOpacity style={[styles.freqButton, frequency === 'interval_hours' && styles.freqButtonActive]} onPress={() => setFrequency('interval_hours')}><Text style={[styles.freqText, frequency === 'interval_hours' && styles.freqTextActive]}>Intervalo</Text></TouchableOpacity></View>{frequency === 'weekly' && (<View style={styles.daysContainer}>{daysOfWeek.map((day, index) => (<TouchableOpacity key={index} style={[styles.dayButton, selectedDays.includes(index) && styles.dayButtonSelected]} onPress={() => setSelectedDays(prev => prev.includes(index) ? prev.filter(d => d !== index) : [...prev, index])}><Text style={[styles.dayText, selectedDays.includes(index) && styles.dayTextSelected]}>{day}</Text></TouchableOpacity>))}</View>)}{frequency === 'interval_hours' ? (<View style={styles.timeSection}><Text style={styles.label}>Empezar el ciclo a las:</Text><TouchableOpacity style={styles.timeButton} onPress={() => showTimePicker(0)}><Ionicons name="time-outline" size={24} color="#2980b9" /><Text style={styles.timeText}>{times[0].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></TouchableOpacity></View>) : (<View style={styles.timeSection}><Text style={styles.label}>Horas de toma:</Text>{times.map((time, index) => (<View key={index} style={styles.timeRow}><TouchableOpacity style={styles.timeButton} onPress={() => showTimePicker(index)}><Ionicons name="alarm-outline" size={24} color="#2980b9" /><Text style={styles.timeText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></TouchableOpacity>{times.length > 1 && <TouchableOpacity onPress={() => removeTime(index)}><Ionicons name="close-circle" size={28} color="#e74c3c" /></TouchableOpacity>}</View>))}<TouchableOpacity style={styles.addTimeButton} onPress={addTime}><Text style={styles.addTimeText}>+ Añadir hora</Text></TouchableOpacity></View>)}</View>
            <View style={styles.sectionForm}>
                <Text style={styles.sectionTitleForm}>3. Duración del Tratamiento</Text>
                <TouchableOpacity style={[styles.timeButton, {marginBottom: 10}]} onPress={showDatePicker}>
                    <Ionicons name="calendar-outline" size={24} color="#2980b9" />
                    <Text style={styles.timeText}>Empezar el {startDate.toLocaleDateString('es-ES')}</Text>
                </TouchableOpacity>
                {/* --- MODIFICACIÓN: El input ahora pide días --- */}
                <View style={styles.inlineInputs}>
                    {frequency === 'interval_hours' && (
                        <TextInput style={[styles.input, {flex: 1}]} placeholder="Intervalo (horas)" value={interval} onChangeText={setInterval} keyboardType="numeric" />
                    )}
                    <TextInput style={[styles.input, {flex: 1}]} placeholder="Duración (días)" value={durationInDays} onChangeText={setDurationInDays} keyboardType="numeric" />
                </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleGenerateDoses}><Ionicons name="checkmark-circle" size={30} color="white" /><Text style={styles.saveButtonText}>Generar Dosis</Text></TouchableOpacity>
            
            {showPicker && (
                <DateTimePicker
                    value={pickerConfig.mode === 'date' ? startDate : times[pickerConfig.index]}
                    mode={pickerConfig.mode}
                    display="default"
                    onChange={onPickerChange}
                    is24Hour={true}
                />
            )}
        </View>
    )
};

const ManageDosesScreen = ({ route, navigation }) => {
    const { medicationId } = route.params;
    const [medication, setMedication] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [doseSections, setDoseSections] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const loadAndGroupDoses = async () => {
                setIsLoading(true);
                try {
                    const savedMeds = await AsyncStorage.getItem('medications');
                    const meds = savedMeds ? JSON.parse(savedMeds) : [];
                    const currentMed = meds.find(m => m.id === medicationId);
                    
                    if (currentMed) {
                        setMedication(currentMed);
                        const futureDoses = (currentMed.doses || [])
                            .filter(d => new Date(d.time) > new Date())
                            .sort((a, b) => new Date(a.time) - new Date(b.time));

                        const grouped = futureDoses.reduce((acc, dose) => {
                            const key = `${dose.amount} ${dose.unit || ''}`;
                            if (!acc[key]) acc[key] = [];
                            acc[key].push(dose);
                            return acc;
                        }, {});

                        const sections = Object.keys(grouped).map(key => ({
                            title: `Dosis de ${key}`,
                            data: grouped[key]
                        }));
                        
                        setDoseSections(sections);
                    }
                } catch (error) {
                    Alert.alert("Error", "No se pudieron cargar los datos de la medicación.");
                } finally {
                    setIsLoading(false);
                }
            };

            loadAndGroupDoses();
        }, [medicationId])
    );
    
    const handleDosesGenerated = async (newDoses) => {
        if (newDoses.length === 0) {
            Alert.alert("No se generaron dosis", "No se crearon nuevas dosis. Revisa que las fechas y horas sean en el futuro.");
            return;
        }

        try {
            const dosesWithReminders = await Promise.all(newDoses.map(async (dose) => {
                const trigger = { type: 'date', date: new Date(dose.time) };
                const notificationId = await Notifications.scheduleNotificationAsync({
                    content: { title: `Recordatorio: ${medication.name}`, body: `Es hora de tu dosis: ${dose.amount} ${dose.unit}.`, sound: 'default', data: { medicationId: medication.id, doseId: dose.id } },
                    trigger,
                });
                return { ...dose, reminder: { notificationId, time: dose.time, frequency: 'single' } };
            }));

            const savedMeds = await AsyncStorage.getItem('medications');
            let meds = savedMeds ? JSON.parse(savedMeds) : [];
            const updatedMeds = meds.map(med => {
                if (med.id === medicationId) return { ...med, doses: [...(med.doses || []), ...dosesWithReminders] };
                return med;
            });

            await AsyncStorage.setItem('medications', JSON.stringify(updatedMeds));
            Alert.alert('Pauta Guardada', `${dosesWithReminders.length} dosis han sido programadas.`, [
                { text: 'OK', onPress: () => { setShowForm(false); navigation.push('ManageDoses', { medicationId }); navigation.goBack(); } }
            ]);
        } catch (error) {
            console.error('Error al guardar las dosis:', error);
            Alert.alert("Error", "Ocurrió un error al programar los recordatorios.");
        }
    };
    
    const handleDeleteDose = async (doseIdToDelete) => {
         Alert.alert("Eliminar Dosis", "¿Estás seguro de que quieres eliminar esta dosis y su recordatorio?",
            [{ text: "Cancelar", style: "cancel" }, { text: "Eliminar", style: "destructive", onPress: async () => {
                try {
                    const savedMeds = await AsyncStorage.getItem('medications');
                    let meds = savedMeds ? JSON.parse(savedMeds) : [];
                    const updatedMeds = meds.map(med => {
                        if (med.id === medicationId) {
                            const doseToDelete = med.doses.find(d => d.id === doseIdToDelete);
                            if (doseToDelete?.reminder?.notificationId) {
                                Notifications.cancelScheduledNotificationAsync(doseToDelete.reminder.notificationId);
                            }
                            return { ...med, doses: med.doses.filter(d => d.id !== doseIdToDelete) };
                        }
                        return med;
                    });
                    await AsyncStorage.setItem('medications', JSON.stringify(updatedMeds));
                    navigation.push('ManageDoses', { medicationId });
                    navigation.goBack();
                } catch (error) {
                     console.error('Error al eliminar la dosis:', error);
                     Alert.alert("Error", "No se pudo eliminar la dosis.");
                }
            }}]);
    };

    const renderDoseItem = ({ item }) => (
        <View style={styles.doseItem}>
            <View style={styles.doseInfo}><Ionicons name="medkit-outline" size={24} color="#3498db" /><View style={{flex: 1, marginLeft: 15}}><Text style={styles.doseAmount}>{item.amount} {item.unit}</Text><Text style={styles.doseTime}>{new Date(item.time).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</Text></View></View>
            <View style={styles.doseActions}><TouchableOpacity onPress={() => navigation.navigate('AddReminder', { medicationId, doseId: item.id })}><Ionicons name="alarm-outline" size={26} color="#f39c12" /></TouchableOpacity><TouchableOpacity onPress={() => handleDeleteDose(item.id)}><Ionicons name="trash-outline" size={26} color="#e74c3c" /></TouchableOpacity></View>
        </View>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    if (isLoading || !medication) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#2A7F9F" /></View>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f2f2f7' }}>
            <ScrollView 
                style={styles.container} 
                contentContainerStyle={{ paddingBottom: 100 }} 
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.headerTitle}>Gestionar Dosis de</Text>
                <Text style={styles.medName}>{medication.name}</Text>
                <View style={styles.listSection}>
                    <Text style={styles.listHeader}>Próximas Dosis Programadas</Text>
                    <SectionList
                        sections={doseSections}
                        keyExtractor={(item, index) => item.id + index}
                        renderItem={renderDoseItem}
                        renderSectionHeader={renderSectionHeader}
                        ListEmptyComponent={<Text style={styles.emptyText}>No hay dosis futuras. Añade una pauta.</Text>}
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    />
                </View>
                <TouchableOpacity style={styles.toggleFormButton} onPress={() => setShowForm(!showForm)}><Ionicons name={showForm ? "close-circle-outline" : "add-circle-outline"} size={22} color="white"/><Text style={styles.toggleFormButtonText}>{showForm ? 'Cancelar' : 'Añadir Nueva Pauta'}</Text></TouchableOpacity>
                
                {showForm && <DoseForm medication={medication} onDosesGenerated={handleDosesGenerated} />}
            </ScrollView>
            
            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles remain the same, so they are omitted for brevity
const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 70, paddingHorizontal: 15 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f7' },
    headerTitle: { fontSize: 22, fontWeight: '600', textAlign: 'center', color: '#333' },
    medName: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#2A7F9F', marginBottom: 20 },
    listSection: { backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    listHeader: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
    sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#34495e', backgroundColor: '#ecf0f1', paddingVertical: 8, paddingHorizontal: 15, marginTop: 15, borderRadius: 8 },
    doseItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    doseInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    doseAmount: { fontSize: 18, fontWeight: 'bold' },
    doseTime: { fontSize: 14, color: '#555' },
    doseActions: { flexDirection: 'row', gap: 20, alignItems: 'center'},
    emptyText: { textAlign: 'center', fontStyle: 'italic', color: '#666', padding: 20 },
    toggleFormButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3498db', paddingVertical: 15, borderRadius: 10, marginVertical: 20 },
    toggleFormButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
    footer: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 40, 
        backgroundColor: '#f2f2f7',
        borderTopWidth: 1,
        borderTopColor: '#ddd'
    },
    backButton: {
        backgroundColor: '#2a86ff',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    backButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    formContainer: { paddingBottom: 20 },
    sectionForm: { backgroundColor: 'white', marginVertical: 10, borderRadius: 15, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    sectionTitleForm: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15, borderBottomWidth: 2, borderBottomColor: '#2A7F9F', paddingBottom: 5 },
    inlineInputs: { flexDirection: 'row', gap: 10, marginTop: 10 },
    input: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, fontSize: 16 },
    freqContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10, flexWrap: 'wrap', gap: 5 },
    freqButton: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#e0e0e0' },
    freqButtonActive: { backgroundColor: '#2A7F9F' },
    freqText: { fontSize: 14, fontWeight: '600', color: 'black' },
    freqTextActive: { color: 'white' },
    daysContainer: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 20 },
    dayButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ecf0f1' },
    dayButtonSelected: { backgroundColor: '#3498db' },
    dayText: { fontSize: 14, fontWeight: 'bold', color: 'black' },
    dayTextSelected: { color: 'white' },
    label: { fontSize: 16, color: '#34495e', fontWeight: '500', marginBottom: 10 },
    timeSection: { marginTop: 20 },
    timeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    timeButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e7f3ff', padding: 15, borderRadius: 10, flex: 1, marginRight: 10 },
    timeText: { fontSize: 18, fontWeight: 'bold', color: '#2980b9', marginLeft: 10 },
    addTimeButton: { backgroundColor: '#2ecc71', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    addTimeText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#27ae60', paddingVertical: 18, borderRadius: 15, marginVertical: 10 },
    saveButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
});

export default ManageDosesScreen;