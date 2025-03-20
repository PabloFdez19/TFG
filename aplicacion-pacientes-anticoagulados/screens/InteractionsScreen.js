import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InteractionList from '../components/InteractionList';

const InteractionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interacciones</Text>
      <InteractionList />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default InteractionsScreen;