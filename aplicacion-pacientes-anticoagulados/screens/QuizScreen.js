// QuizScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import questions from '../components/Preguntas.js';
import QuizStyles from '../Styles/QuizStyles.js';

const QuizScreen = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Seleccionar 15 preguntas aleatorias al cargar el componente
  useEffect(() => {
    setIsLoading(true);
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 15));
    setIsLoading(false);
  }, []);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    
    // Retraso para permitir ver la retroalimentación antes de avanzar
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

  const restartQuiz = () => {
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
    </ScrollView>
  );
};

export default QuizScreen;