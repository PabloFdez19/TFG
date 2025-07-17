// screens/MedicationScreen.js

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MedicationsScreen = ({ navigation }) => {
  const [scheduledDoses, setScheduledDoses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- MODIFICACIÓN CLAVE ---
  // La lógica ahora agrupa por tipo de dosis y muestra solo la más próxima.
  const loadScheduledDoses = useCallback(async () => {
    setIsLoading(true);
    try {
      const savedMeds = await AsyncStorage.getItem('medications');
      const medications = savedMeds ? JSON.parse(savedMeds) : [];
      
      const allFutureDoses = [];
      const now = new Date();

      // 1. Obtener todas las dosis futuras de todos los medicamentos
      medications.forEach(med => {
        if (med.doses && med.doses.length > 0) {
          med.doses.forEach(dose => {
            if (new Date(dose.time) >= now) {
                allFutureDoses.push({
                ...dose,
                medicationName: med.name,
                });
            }
          });
        }
      });

      // 2. Ordenar todas las dosis de la más próxima a la más lejana
      allFutureDoses.sort((a, b) => new Date(a.time) - new Date(b.time));

      // 3. Filtrar para quedarse solo con la primera aparición de cada tipo de dosis
      const nextUniqueDoses = [];
      const processedDoseTypes = new Set();

      allFutureDoses.forEach(dose => {
        // Se crea una clave única por medicamento y tipo de dosis (cantidad + unidad)
        const doseTypeKey = `${dose.medicationName}-${dose.amount}-${dose.unit}`;
        
        // Si no hemos añadido ya una dosis de este tipo, la añadimos
        if (!processedDoseTypes.has(doseTypeKey)) {
          nextUniqueDoses.push(dose);
          processedDoseTypes.add(doseTypeKey);
        }
      });

      setScheduledDoses(nextUniqueDoses);
    } catch (error) {
      console.error('Error cargando las dosis programadas:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadScheduledDoses();
    }, [loadScheduledDoses])
  );

  const renderItem = ({ item }) => (
    <View style={styles.medItem}>
      <Text style={styles.medName}>{item.medicationName}</Text>
      <Text style={styles.medDose}>Próxima dosis: {item.amount} {item.unit || ''}</Text>
      
      <View style={styles.reminderInfo}>
        <Ionicons name="calendar-outline" size={20} color="#34495e" />
        <Text style={styles.reminderText}>
            {new Date(item.time).toLocaleString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
        </Text>
      </View>

      {item.reminder && (
        <View style={styles.instructionsContainer}>
          <Ionicons name="alarm-outline" size={20} color="#16a085" />
          <Text style={styles.instructionsText}>Recordatorio activado</Text>
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color="#2A7F9F"/>
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={scheduledDoses}
        keyExtractor={item => `${item.id}-${item.medicationName}`}
        renderItem={renderItem}
        ListHeaderComponent={<Text style={styles.headerTitle}>Próximas Dosis</Text>}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay dosis programadas.</Text>
                <Text style={styles.emptySubText}>
                    Pídele a tu cuidador que añada tus medicamentos y dosis.
                </Text>
            </View>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <TouchableOpacity 
          style={styles.exitButton}
          onPress={() => navigation.navigate('Home')}
        > 
        <Text style={styles.exitButtonText}> Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f7', paddingTop: 70 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  exitButton: {
    backgroundColor: '#2a86ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'stretch',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 45,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#e8f8f5',
    padding: 8,
    borderRadius: 8,
  },
  instructionsText: {
    fontSize: 16,
    color: '#16a085',
    marginLeft: 10,
    fontWeight: '500'
  },
  medName: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  medDose: { fontSize: 18, color: '#555', marginBottom: 15 },
  reminderInfo: { flexDirection: 'row', alignItems: 'center' },
  reminderText: { fontSize: 16, color: '#34495e', marginLeft: 10, flexShrink: 1, fontWeight: '500' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  emptySubText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});

export default MedicationsScreen;