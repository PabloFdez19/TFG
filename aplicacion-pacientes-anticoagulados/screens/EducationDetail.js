import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { EducationDetailStyle, AnticoagulantEducationStyle } from '../Styles/EducationStyles';

const EducationDetail = ({ route, navigation }) => {
  const { section } = route.params;
  const { title, icon, content } = section;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);

  const textoPlano = content.map(item => item.texto).join(' ');

  const leerContenido = async () => {
    try {
      // Detener cualquier discurso en curso
      Speech.stop();
      setIsSpeaking(true);
      setError(null);
      
      // Iniciar nuevo discurso
      await Speech.speak(textoPlano, {
        language: 'es-ES',  // Idioma español de España
        rate: 0.85,          // Velocidad reducida
        pitch: 1.0,         // Tono normal
        volume: 0.9,        // Volumen casi completo
        onStart: () => setIsSpeaking(true),
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: (error) => {
          setIsSpeaking(false);
          setError(`Error de voz: ${error}`);
        }
      });
    } catch (error) {
      setIsSpeaking(false);
      setError(`Error al iniciar voz: ${error.message}`);
    }
  };

  const detenerVoz = () => {
    Speech.stop();
    setIsSpeaking(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      detenerVoz();
    });

    // Limpieza al desmontar el componente
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  const renderItem = (item, index) => {
    const estilo =
      item.tipo === 'title'
        ? AnticoagulantEducationStyle.title
        : item.tipo === 'subtitle'
          ? AnticoagulantEducationStyle.subtitle
          : item.tipo === 'bullet'
            ? AnticoagulantEducationStyle.bullet
            : item.tipo === 'footer'
              ? AnticoagulantEducationStyle.footer
              : AnticoagulantEducationStyle.text;

    const texto = item.tipo === 'bullet' ? `• ${item.texto}` : item.texto;

    return (
      <Text key={index} style={estilo}>
        {texto}
      </Text>
    ); 
  };

  return (
    <ScrollView contentContainerStyle={EducationDetailStyle.container}>
      <View style={EducationDetailStyle.header}>
        <MaterialIcons name={icon} size={40} color="#2a86ff" />
        <Text style={EducationDetailStyle.title}>{title}</Text>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        {content.map(renderItem)}
      </View>

      <View style={EducationDetailStyle.buttonContainer}>
        {isSpeaking ? (
          <TouchableOpacity 
            style={[EducationDetailStyle.button_narrator, EducationDetailStyle.stopButton]}
            onPress={detenerVoz}
          >
            <Text style={EducationDetailStyle.buttonText_narrator}>⏹ Detener lectura</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[EducationDetailStyle.button_narrator, EducationDetailStyle.speakButton]}
            onPress={leerContenido}
          >
            <Text style={EducationDetailStyle.buttonText_narrator}>🔊 Leer en voz alta</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View style={EducationDetailStyle.errorContainer}>
          <Text style={EducationDetailStyle.errorText}>{error}</Text>
          <Text style={EducationDetailStyle.hintText}>
            Asegúrate de tener instalado un motor de voz en español en tu dispositivo
          </Text>
        </View>
      )}

      <TouchableOpacity 
        style={EducationDetailStyle.button} 
        onPress={() => {
          Speech.stop();
          navigation.goBack();
        }}
      >
        <Text style={EducationDetailStyle.buttonText}>Cerrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EducationDetail;