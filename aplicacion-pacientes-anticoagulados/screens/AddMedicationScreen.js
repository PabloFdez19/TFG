import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const AddMedicationScreen = () => {
  const [medName, setMedName] = useState('');
  const [doses, setDoses] = useState(1);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [isSingleTime, setIsSingleTime] = useState(false);

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const toggleDay = (dayIndex) => {
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(selectedDays.filter(d => d !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex].sort());
    }
  };

  const scheduleNotification = async () => {
    let notificationId;
    
    if (isSingleTime) {
      // Notificación única
      notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio de medicación',
          body: `Es hora de tomar ${medName} - Dosis: ${doses}`,
          sound: 'default',
        },
        trigger: {
          date: time,
        },
      });
    } else if (isRecurrent) {
      // Notificación recurrente con días específicos
      notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio de medicación',
          body: `Es hora de tomar ${medName} - Dosis: ${doses}`,
          sound: 'default',
        },
        trigger: {
          hour: time.getHours(),
          minute: time.getMinutes(),
          repeats: true,
          weekday: selectedDays.map(d => d + 1), // 1=Domingo, 2=Lunes...
        },
      });
    } else {
      // Diario recurrente
      notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio de medicación',
          body: `Es hora de tomar ${medName} - Dosis: ${doses}`,
          sound: 'default',
        },
        trigger: {
          hour: time.getHours(),
          minute: time.getMinutes(),
          repeats: true,
        },
      });
    }

    return notificationId;
  };

  const saveMedication = async () => {
    if (!medName.trim()) {
      alert('Ingresa el nombre del medicamento');
      return;
    }

    const notificationId = await scheduleNotification();
    
    const newMedication = {
      id: Date.now().toString(),
      name: medName,
      doses,
      time: time.toISOString(),
      isRecurrent,
      selectedDays,
      isSingleTime,
      notificationId
    };

    try {
      const existingMeds = await AsyncStorage.getItem('medications');
      const medications = existingMeds ? JSON.parse(existingMeds) : [];
      medications.push(newMedication);
      await AsyncStorage.setItem('medications', JSON.stringify(medications));
      
      alert('Medicación guardada con éxito!');
      resetForm();
    } catch (error) {
      console.error('Error saving medication:', error);
    }
  };

  const resetForm = () => {
    setMedName('');
    setDoses(1);
    setTime(new Date());
    setIsRecurrent(false);
    setSelectedDays([]);
    setIsSingleTime(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del medicamento"
        value={medName}
        onChangeText={setMedName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Dosis diarias"
        keyboardType="numeric"
        value={doses.toString()}
        onChangeText={text => setDoses(Number(text) || 1)}
      />
      
      <Button 
        title={`Hora: ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`} 
        onPress={() => setShowTimePicker(true)} 
      />
      
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="clock"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}
      
      <View style={styles.switchContainer}>
        <Text>Notificación única:</Text>
        <Switch
          value={isSingleTime}
          onValueChange={value => {
            setIsSingleTime(value);
            if (value) setIsRecurrent(false);
          }}
        />
      </View>
      
      <View style={styles.switchContainer}>
        <Text>Recurrente (días específicos):</Text>
        <Switch
          value={isRecurrent}
          onValueChange={value => {
            setIsRecurrent(value);
            if (value) setIsSingleTime(false);
          }}
          disabled={isSingleTime}
        />
      </View>
      
      {isRecurrent && (
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day, index) => (
            <Button
              key={index}
              title={day}
              onPress={() => toggleDay(index)}
              color={selectedDays.includes(index) ? 'green' : 'gray'}
            />
          ))}
        </View>
      )}
      
      <Button title="Guardar Recordatorio" onPress={saveMedication} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});

export default AddMedicationScreen;