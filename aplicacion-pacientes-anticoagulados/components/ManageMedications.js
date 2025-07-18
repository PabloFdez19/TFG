// components/ManageMedications.js

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

const ManageMedications = ({ navigation }) => {
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

    const deleteMedication = async (id) => {
        const medicationToDelete = medications.find(m => m.id === id);
        if (!medicationToDelete) return;

        Alert.alert(
            "Eliminar Medicamento",
            `¿Estás seguro de que quieres eliminar "${medicationToDelete.name}" y todas sus dosis? Esta acción no se puede deshacer.`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            if (medicationToDelete.doses && medicationToDelete.doses.length > 0) {
                                for (const dose of medicationToDelete.doses) {
                                    if (dose.reminder?.notificationId) {
                                        await Notifications.cancelScheduledNotificationAsync(dose.reminder.notificationId);
                                    }
                                }
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

    const renderItem = ({ item }) => (
        <View style={styles.medItem}>
            <View style={styles.medInfo}>
                <Text style={styles.medName}>{item.name}</Text>
                <Text style={styles.medDose}>
                    {(item.doses || []).filter(d => new Date(d.time) > new Date()).length} dosis futuras programadas
                </Text>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => navigation.navigate('ManageDoses', { medicationId: item.id })}
                >
                    <Ionicons name="calendar-outline" size={22} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => deleteMedication(item.id)}
                >
                    <Ionicons name="trash-outline" size={22} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={medications}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.headerTitle}>Gestionar Medicamentos</Text>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No hay medicamentos guardados.</Text>
                        <Text style={styles.emptySubText}>
                            Ve a "Añadir Medicación" para empezar.
                        </Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 30 }}
            />
            {/* --- MODIFICACIÓN --- */}
            {/* Se ha eliminado el botón de "Añadir Nuevo Medicamento" de esta pantalla */}
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    medDose: {
        fontSize: 16,
        color: '#555',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
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
        flex: 1,
        justifyContent: 'center',
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
        backgroundColor: '#2a86ff',
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

export default ManageMedications;