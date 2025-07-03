// QuizHomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuizHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#2E86C1',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizHomeScreen;