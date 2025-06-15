import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.9;

const QuizStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9F9',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9F9',
  },
  loadingText: {
    fontSize: 20,
    marginTop: 20,
    color: '#2C3E50',
  },
  progressContainer: {
    marginBottom: 25,
    width: '100%',
  },
  progressText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#2C3E50',
    fontWeight: '500',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#D5D8DC',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E86C1',
  },
  questionContainer: {
    width: '100%',
  },
  questionText: {
    fontSize: 26,
    marginBottom: 30,
    color: '#2C3E50',
    fontWeight: '600',
    lineHeight: 35,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#D6DBDF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 20,
    color: '#2C3E50',
    lineHeight: 26,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  correctOption: {
    backgroundColor: '#D5F5E3',
    borderColor: '#27AE60',
  },
  incorrectOption: {
    backgroundColor: '#FADBD8',
    borderColor: '#E74C3C',
  },
  feedbackText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E86C1',
  },
  scoreSubtitle: {
    fontSize: 22,
    color: '#566573',
    marginTop: 5,
  },
  scoreBar: {
    height: 20,
    width: '80%',
    backgroundColor: '#D5D8DC',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 40,
  },
  scoreProgress: {
    height: '100%',
    backgroundColor: '#2E86C1',
  },
  resultMessage: {
    fontSize: 22,
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  restartButton: {
    backgroundColor: '#2E86C1',
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 12,
    width: buttonWidth,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuizStyles;