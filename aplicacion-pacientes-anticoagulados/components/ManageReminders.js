// components/ManageReminders.js

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ManageReminders = ({ navigation }) => {
    const [dosesWithReminders, setDosesWithReminders] = useState([]);

    const loadDosesWithReminders = useCallback(async () => {
        try {
            const savedMeds = await AsyncStorage.getItem('medications');
            const medications = savedMeds ? JSON.parse(savedMeds) : [];
            
            const allDosesWithReminders = [];
            medications.forEach(med => {
                if (med.doses && med.doses.length > 0) {
                    med.doses.forEach(dose => {
                        // Solo incluir dosis futuras que tengan un recordatorio
                        if (dose.reminder && new Date(dose.time) > new Date()) { 
                            allDosesWithReminders.push({
                                ...dose,
                                medicationId: med.id,
                                medicationName: med.name,
                            });
                        }
                    });
                }
            });

            allDosesWithReminders.sort((a, b) => new Date(a.time) - new Date(b.time));
            setDosesWithReminders(allDosesWithReminders);

        } catch (error) {
            console.error('Error cargando los recordatorios:', error);
        }
    }, []);

    useFocusEffect(loadDosesWithReminders);

    const deleteReminder = async (medicationId, doseId) => {
        Alert.alert(
            "Eliminar Recordatorio",
            "¿Estás seguro? El recordatorio se cancelará, pero la dosis programada se mantendrá sin aviso.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            const savedMeds = await AsyncStorage.getItem('medications');
                            let meds = savedMeds ? JSON.parse(savedMeds) : [];
                            let notificationIdToDelete = null;

                            const updatedMeds = meds.map(med => {
                                if (med.id === medicationId) {
                                    const updatedDoses = med.doses.map(dose => {
                                        if (dose.id === doseId) {
                                            notificationIdToDelete = dose.reminder?.notificationId;
                                            return { ...dose, reminder: undefined }; // Elimina el objeto reminder
                                        }
                                        return dose;
                                    });
                                    return { ...med, doses: updatedDoses };
                                }
                                return med;
                            });
                            
                            if (notificationIdToDelete) {
                                await Notifications.cancelScheduledNotificationAsync(notificationIdToDelete);
                            }

                            await AsyncStorage.setItem('medications', JSON.stringify(updatedMeds));
                            loadDosesWithReminders(); // Recargar la lista
                        } catch (error) {
                            console.error('Error eliminando el recordatorio:', error);
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.medItem}>
            <View style={styles.medInfo}>
                <Text style={styles.medName}>{item.medicationName}</Text>
                <Text style={styles.medDose}>Dosis: {item.amount} {item.unit || ''}</Text>
                
                <View style={styles.reminderDetail}>
                    <Ionicons name="calendar-outline" size={20} color="#34495e" />
                    <Text style={styles.reminderText}>
                        {new Date(item.time).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}
                    </Text>
                </View>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => navigation.navigate('AddReminder', { medicationId: item.medicationId, doseId: item.id })}
                >
                    <Ionicons name="pencil-outline" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => deleteReminder(item.medicationId, item.id)}
                >
                    <Ionicons name="trash-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={dosesWithReminders}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListHeaderComponent={<Text style={styles.headerTitle}>Recordatorios Activos</Text>}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No hay recordatorios activos.</Text>
                        <Text style={styles.emptySubText}>
                            Puedes añadir o modificar recordatorios desde "Gestionar Medicamentos".
                        </Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 30 }}
            />
            <TouchableOpacity 
                style={styles.exitButton}
                onPress={() => navigation.navigate('Caregiver')}
            > 
                <Text style={styles.exitButtonText}>Volver</Text>
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
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2A7F9F',
        textAlign: 'center',
        marginVertical: 20,
    },
    medItem: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    medInfo: {
        flex: 1,
    },
    medName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    medDose: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    reminderDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e7f3ff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    reminderText: {
        fontSize: 15,
        color: '#2980b9',
        marginLeft: 8,
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'column',
        gap: 15,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#3498db',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
        paddingHorizontal: 20,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    emptySubText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 8,
    },
    exitButton: {
        backgroundColor: '#8e44ad',
        paddingVertical: 15,
        borderRadius: 10,
        alignSelf: 'stretch',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        marginBottom: 45,
    },
    exitButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ManageReminders;