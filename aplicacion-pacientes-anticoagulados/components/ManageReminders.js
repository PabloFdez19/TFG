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

    const getReminderText = (reminder) => {
        if (!reminder) return 'Sin recordatorio';

        const time = new Date(reminder.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (reminder.isSingleTime) return `Una vez: ${time}`;
        if (reminder.isRecurrent && reminder.selectedDays?.length > 0) {
            const days = reminder.selectedDays.map(d => ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'][d]).join(', ');
            return `Recurrente: ${time} (${days})`;
        }
        return `Diario: ${time}`;
    };

    const renderItem = ({ item }) => (
        <View style={styles.reminderItem}>
            <View style={styles.reminderInfo}>
                <Text style={styles.medName}>{item.name}</Text>
                <View style={styles.reminderDetail}>
                    <Ionicons name="alarm-outline" size={20} color="#34495e" />
                    <Text style={styles.reminderText}>{getReminderText(item.reminder)}</Text>
                </View>
            </View>

            {item.reminder && (
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => navigation.navigate('AddMedication', { medication: item })}
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
            )}
        </View>
    );

    // Filtrar solo medicamentos con recordatorios
    const medicationsWithReminders = medications.filter(m => m.reminder);

    return (
        <View style={styles.container}>
            <FlatList
                data={medicationsWithReminders}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay recordatorios programados</Text>
                }
                contentContainerStyle={{ paddingBottom: 30 }}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddMedication')}
            >
                <Ionicons name="add" size={30} color="white" />
                <Text style={styles.addButtonText}>Añadir Recordatorio</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
        paddingTop: 70,
    },
    reminderItem: {
        backgroundColor: 'white',
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    reminderInfo: {
        flex: 1,
    },
    medName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    reminderDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reminderText: {
        fontSize: 16,
        color: '#34495e',
        marginLeft: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#3498db',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 60,
        fontSize: 18,
        color: '#666',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#27ae60',
        paddingVertical: 15,
        borderRadius: 10,
        margin: 15,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default ManageReminders;