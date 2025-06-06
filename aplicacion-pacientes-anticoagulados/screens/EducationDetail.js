import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EducationDetail = ({ route, navigation }) => {
  const { section } = route.params;
  const ContentComponent = section.content;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name={section.icon} size={40} color="#2a86ff" />
        <Text style={styles.title}>{section.title}</Text>
      </View>
      <View>
        {ContentComponent ? <ContentComponent /> : null}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cerrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 75,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#333',
  },
  content: {
    fontSize: 20,
    lineHeight: 30,
    color: '#444',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2a86ff',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    width: '60%',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default EducationDetail;
