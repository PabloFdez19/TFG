// QuizScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import questions from '../components/Preguntas.js';
import QuizStyles from '../Styles/QuizStyles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const navigation = useNavigation();

  // Seleccionar 15 preguntas aleatorias al cargar el componente
  useEffect(() => {
    setIsLoading(true);
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 15));
    setIsLoading(false);
  }, []);

  const saveAttempt = useCallback(async () => {
    const newAttempt = {
      date: new Date().toISOString(),
      score: score,
      total: selectedQuestions.length,
    };
  
    try {
      const history = await AsyncStorage.getItem('@quiz_history');
      let attempts = history ? JSON.parse(history) : [];
      attempts.push(newAttempt);
      await AsyncStorage.setItem('@quiz_history', JSON.stringify(attempts));
    } catch (error) {
      console.error('Error saving attempt:', error);
    }
  }, [score, selectedQuestions.length]);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    
    setTimeout(() => {
      if (selectedOption === selectedQuestions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      
      setSelectedAnswer(null);
      
      if (currentQuestion < selectedQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 800);
  };
  useEffect(() => {
    if (showResult) {
      saveAttempt();
      clearSavedQuiz(); // Limpiar guardado al completar
    }
  }, [showResult, saveAttempt]);

  useEffect(() => {
    const loadSavedQuiz = async () => {
      setIsLoading(true);
      try {
        const savedQuiz = await AsyncStorage.getItem('@saved_quiz');
        
        if (savedQuiz) {
          const { questions: savedQuestions, currentIndex, currentScore } = JSON.parse(savedQuiz);
          setSelectedQuestions(savedQuestions);
          setCurrentQuestion(currentIndex);
          setScore(currentScore);
          Alert.alert(
            'Quiz guardado encontrado',
            '¿Deseas continuar donde lo dejaste?',
            [
              { text: 'Nuevo quiz', onPress: () => restartQuiz() },
              { text: 'Continuar', onPress: () => console.log('Continuando quiz guardado') }
            ]
          );
        } else {
          restartQuiz();
        }
      } catch (error) {
        console.error('Error cargando quiz:', error);
        restartQuiz();
      }
      setIsLoading(false);
    };

    loadSavedQuiz();
  }, []);

  // Función para guardar el progreso
  const saveProgress = async () => {
    try {
      const quizState = {
        questions: selectedQuestions,
        currentIndex: currentQuestion,
        currentScore: score
      };
      await AsyncStorage.setItem('@saved_quiz', JSON.stringify(quizState));
    } catch (error) {
      console.error('Error saving quiz:', error);
      throw error;
    }
  };

  // Función para salir del quiz
  const handleExit = async () => {
    setIsExiting(true);
    
    try {
      // Guardar progreso antes de salir
      await saveProgress();
      
      // Navegar hacia atrás
      navigation.goBack();
      
      // Mostrar confirmación
      Alert.alert(
        'Progreso guardado',
        'Puedes continuar donde lo dejaste cuando vuelvas',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error al salir:', error);
      Alert.alert(
        'Error',
        'No se pudo guardar tu progreso. ¿Deseas salir de todas formas?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salir', onPress: () => navigation.goBack() }
        ]
      );
    } finally {
      setIsExiting(false);
    }
  };

  // Función para borrar quiz guardado al completar
  const clearSavedQuiz = async () => {
    try {
      await AsyncStorage.removeItem('@saved_quiz');
    } catch (error) {
      console.error('Error clearing quiz:', error);
    }
  };

  const restartQuiz = async () => {
    await clearSavedQuiz();
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 15));
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (isLoading || selectedQuestions.length === 0) {
    return (
      <View style={QuizStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E86C1" />
        <Text style={QuizStyles.loadingText}>Preparando el cuestionario...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={QuizStyles.container}>
      {showResult ? (
        <View style={QuizStyles.resultContainer}>
          <Text style={QuizStyles.resultTitle}>Resultado Final</Text>
          
          <View style={QuizStyles.scoreContainer}>
            <Text style={QuizStyles.scoreText}>{score} / {selectedQuestions.length}</Text>
            <Text style={QuizStyles.scoreSubtitle}>Respuestas correctas</Text>
          </View>
          
          <View style={QuizStyles.scoreBar}>
            <View 
              style={[
                QuizStyles.scoreProgress, 
                {width: `${(score / selectedQuestions.length) * 100}%`}
              ]}
            />
          </View>
          
          <Text style={QuizStyles.resultMessage}>
            {score >= selectedQuestions.length * 0.7 
              ? "¡Excelente! Demuestras un gran conocimiento sobre anticoagulantes." 
              : "¡Buen intento! Sigue aprendiendo sobre tu tratamiento anticoagulante."}
          </Text>
          
          <TouchableOpacity style={QuizStyles.restartButton} onPress={restartQuiz}>
            <Text style={QuizStyles.restartButtonText}>Volver a Intentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={QuizStyles.questionContainer}>
          <View style={QuizStyles.progressContainer}>
            <Text style={QuizStyles.progressText}>Pregunta {currentQuestion + 1} de {selectedQuestions.length}</Text>
            <View style={QuizStyles.progressBar}>
              <View 
                style={[
                  QuizStyles.progressFill, 
                  {width: `${((currentQuestion + 1) / selectedQuestions.length) * 100}%`}
                ]}
              />
            </View>
          </View>
          
          <Text style={QuizStyles.questionText}>{selectedQuestions[currentQuestion].question}</Text>
          
          <View style={QuizStyles.optionsContainer}>
            {selectedQuestions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === selectedQuestions[currentQuestion].correctAnswer;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    QuizStyles.optionButton,
                    isSelected && isCorrect && QuizStyles.correctOption,
                    isSelected && !isCorrect && QuizStyles.incorrectOption,
                  ]}
                  onPress={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                >
                  <Text 
                    style={[
                      QuizStyles.optionText,
                      isSelected && QuizStyles.selectedOptionText
                    ]}
                  >
                    {option}
                  </Text>
                  {isSelected && isCorrect && (
                    <Text style={QuizStyles.feedbackText}>✓ Correcto</Text>
                  )}
                  {isSelected && !isCorrect && (
                    <Text style={QuizStyles.feedbackText}>✗ Incorrecto</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
      {!showResult && (
        <TouchableOpacity 
          style={QuizStyles.exitButton}
          onPress={handleExit}
          disabled={isExiting}
        >
          <Text style={QuizStyles.exitButtonText}>
            {isExiting ? 'Guardando...' : 'Salir y Guardar Progreso'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default QuizScreen;