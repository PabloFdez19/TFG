import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';

const RemindersScreen = () => {
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);

  const toggleReminder = () => {
    setIsReminderEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordatorios de Medicación</Text>
      <View style={styles.reminderContainer}>
        <Text style={styles.reminderText}>Activar recordatorio</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isReminderEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleReminder}
          value={isReminderEnabled}
        />
      </View>
      {isReminderEnabled && (
        <View>
          <Text style={styles.reminderText}>Configura la hora del recordatorio:</Text>
          <Button title="Seleccionar hora" onPress={() => alert('Aquí iría la lógica para seleccionar la hora')} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  reminderText: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default RemindersScreen;