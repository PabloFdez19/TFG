import React, { useEffect } from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Tts from 'react-native-tts';
import { EducationDetailStyle, AnticoagulantEducationStyle } from '../Styles/EducationStyles';

const EducationDetail = ({ route, navigation }) => {
  const { section } = route.params;
  const { title, icon, content } = section;

  useEffect(() => {
    Tts.setDefaultLanguage('es-ES');
    Tts.setDefaultRate(0.5);
  }, []);

  const textoPlano = content.map(item => item.texto).join(' ');

  const leerContenido = () => {
    Tts.stop();
    Tts.speak(textoPlano);
  };

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

      <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
        <Button title="🔊 Leer en voz alta" onPress={leerContenido} />
      </View>

      <TouchableOpacity style={EducationDetailStyle.button} onPress={() => navigation.goBack()}>
        <Text style={EducationDetailStyle.buttonText}>Cerrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EducationDetail;
