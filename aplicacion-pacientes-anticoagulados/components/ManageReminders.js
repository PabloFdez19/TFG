import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ManageReminders = ({ navigation }) => {
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

    const deleteReminder = async (medicationId) => {
        Alert.alert(
            "Eliminar Recordatorio",
            "¿Estás seguro de que quieres eliminar este recordatorio?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            const medToDelete = medications.find(m => m.id === medicationId);
                            if (medToDelete && medToDelete.notificationIds) {
                                for (const id of medToDelete.notificationIds) {
                                    await Notifications.cancelScheduledNotificationAsync(id);
                                }
                            }

                            const updatedMeds = medications.map(med =>
                                med.id === medicationId ? { ...med, notificationIds: [], reminder: null } : med
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

    // --- FUNCIÓN CORREGIDA PARA LEER EL TEXTO DEL RECORDATORIO ---
    const getReminderText = (reminder) => {
        if (!reminder) return 'Sin recordatorio';

        const time = new Date(reminder.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        switch (reminder.frequency) {
            case 'single':
                return `Una vez: ${time}`;
            case 'daily':
                return `Diario: ${time}`;
            case 'cyclical':
                return `Cada ${reminder.intervalHours} horas`;
            case 'recurrent':
                const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
                const days = reminder.selectedDays.map(d => daysOfWeek[d]).join(', ');
                return `Días Específicos: ${time} (${days})`;
            default:
                return `Recordatorio programado: ${time}`;
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.medItem}>
            <View style={styles.medInfo}>
                <Text style={styles.medName}>{item.name}</Text>
                <Text style={styles.medDose}>Dosis: {item.doses}</Text>
                {item.instructions && (
                    <Text style={styles.instructionsText}>Instrucciones: {item.instructions}</Text>
                )}
                
                {item.reminder ? (
                    <View style={styles.reminderDetail}>
                        <Ionicons name="alarm-outline" size={20} color="#34495e" />
                        <Text style={styles.reminderText}>{getReminderText(item.reminder)}</Text>
                    </View>
                ) : (
                    <Text style={styles.noReminderText}>Sin recordatorio programado</Text>
                )}
            </View>

            {item.reminder ? (
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => navigation.navigate('AddReminder', { medication: item })}
                    >
                        <Ionicons name="pencil-outline" size={18} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => deleteReminder(item.id)}
                    >
                        <Ionicons name="trash-outline" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.addReminderButton}
                    onPress={() => navigation.navigate('AddReminder', { medication: item })}
                >
                    <Ionicons name="add" size={20} color="white" />
                    <Text style={styles.addReminderText}>Añadir</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={medications}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay medicamentos guardados</Text>}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
            <TouchableOpacity 
                style={styles.exitButton}
                onPress={() => navigation.navigate('Caregiver')}
            > 
                <Text style={styles.exitButtonText}>Salir</Text>
            </TouchableOpacity>
        </View>
    );
};

// Estilos (sin cambios)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f7', paddingTop: 70 },
    exitButton: { backgroundColor: '#2a86ff', paddingVertical: 15, borderRadius: 10, marginHorizontal: 20, marginVertical: 10, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5, marginBottom: 50 },
    exitButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    medItem: { backgroundColor: 'white', padding: 15, marginHorizontal: 15, marginVertical: 8, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    medInfo: { flex: 1 },
    medName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    medDose: { fontSize: 16, color: '#555', marginBottom: 5 },
    instructionsText: { fontSize: 14, color: '#7f8c8d', marginBottom: 10, fontStyle: 'italic' },
    reminderDetail: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    reminderText: { fontSize: 16, color: '#34495e', marginLeft: 10 },
    noReminderText: { fontSize: 16, color: '#e74c3c', fontStyle: 'italic', marginTop: 5 },
    actionsContainer: { flexDirection: 'row', gap: 10 },
    actionButton: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    editButton: { backgroundColor: '#f39c12' },
    deleteButton: { backgroundColor: '#e74c3c' },
    addReminderButton: { backgroundColor: '#27ae60', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
    addReminderText: { color: 'white', fontSize: 16, fontWeight: '500', marginLeft: 5 },
    emptyText: { textAlign: 'center', marginTop: 60, fontSize: 18, color: '#666' },
});

export default ManageReminders;