import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuizHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.buttonText}>Comenzar Nuevo Quiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.buttonText}>Ver Historial de Intentos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.exitButton}
        onPress={() => navigation.goBack()}
      > 
        <Text style={styles.exitButtonText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  mainButtonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2a86ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exitButton: {
    backgroundColor: '#2a86ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default QuizHomeScreen;
