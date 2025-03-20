import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const interactions = [
  { id: '1', type: 'Alimento', name: 'Espinacas', effect: 'Aumenta INR' },
  { id: '2', type: 'Medicamento', name: 'Ibuprofeno', effect: 'Aumenta INR' },
  // Más interacciones...
];

const InteractionList = () => {
  return (
    <FlatList
      data={interactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{item.type} - {item.effect}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
});

export default InteractionList;