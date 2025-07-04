// HistoryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('@quiz_history');
        if (history) {
          setAttempts(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2E86C1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Historial de Intentos</Text>
      
      {attempts.length === 0 ? (
        <Text style={styles.emptyText}>No hay intentos registrados</Text>
      ) : (
        attempts.map((attempt, index) => (
          <View key={index} style={styles.attemptContainer}>
            <Text style={styles.dateText}>{new Date(attempt.date).toLocaleString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}</Text>
            <Text style={styles.scoreText}>Puntuación: {attempt.score}/{attempt.total}</Text>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreFill, 
                  {width: `${(attempt.score / attempt.total) * 100}%`}
                ]}
              />
            </View>
          </View>
        ))
      )}
      <TouchableOpacity 
          style={styles.exitButton}
          onPress={navigation.goBack}
        > 
        <View>
          <Text style={styles.exitButtonText}> Salir</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E86C1',
  },
  attemptContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 16,
    marginVertical: 5,
  },
  scoreBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    backgroundColor: '#2E86C1',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
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
  },
  exitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;