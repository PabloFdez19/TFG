import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const questions = [
  {
    id: 1,
    question: '¿Qué es el INR?',
    options: ['Un tipo de medicamento', 'Una medida de coagulación sanguínea', 'Una vitamina'],
    correctAnswer: 'Una medida de coagulación sanguínea',
  },
  {
    id: 2,
    question: '¿Qué alimentos pueden alterar el INR?',
    options: ['Manzanas', 'Espinacas', 'Pollo'],
    correctAnswer: 'Espinacas',
  },
  // Agrega más preguntas aquí...
];

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <View style={styles.container}>
      {showResult ? (
        <View>
          <Text style={styles.resultText}>Tu puntuación: {score} / {questions.length}</Text>
          <Button title="Reiniciar cuestionario" onPress={() => { setCurrentQuestion(0); setScore(0); setShowResult(false); }} />
        </View>
      ) : (
        <View>
          <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
          {questions[currentQuestion].options.map((option, index) => (
            <Button key={index} title={option} onPress={() => handleAnswer(option)} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default QuizScreen;