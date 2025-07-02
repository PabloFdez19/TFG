import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
        Alert.alert(
            "Eliminar Medicamento",
            "¿Estás seguro de que quieres eliminar este medicamento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
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
                <Text style={styles.medDose}>Dosis: {item.doses}</Text>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => navigation.navigate('AddMedication', { medication: item })}
                >
                    <Ionicons name="pencil-outline" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => deleteMedication(item.id)}
                >
                    <Ionicons name="trash-outline" size={20} color="white" />
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
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay medicamentos guardados</Text>
                }
                contentContainerStyle={{ paddingBottom: 30 }}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddMedication')}
            >
                <Ionicons name="add" size={30} color="white" />
                <Text style={styles.addButtonText}>Añadir Medicamento</Text>
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
    medItem: {
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
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#f39c12',
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

export default ManageMedications;