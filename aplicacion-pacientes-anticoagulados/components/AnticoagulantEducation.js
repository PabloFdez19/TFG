import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { AnticoagulantEducationStyle } from '../Styles/EducationStyles';

const AnticoagulantEducation = () => {
  return (
    <ScrollView>
      <Text style={AnticoagulantEducationStyle.title}>¿Qué es el tratamiento anticoagulante?</Text>
      <Text style={AnticoagulantEducationStyle.text}>
        El tratamiento anticoagulante consiste en tomar medicamentos que ayudan a prevenir
        la formación de coágulos en la sangre. Estos coágulos pueden bloquear venas o arterias
        y causar problemas como infartos o derrames cerebrales. No eliminan los coágulos existentes,
        pero sí evitan que se formen nuevos.
      </Text>

      <Text style={AnticoagulantEducationStyle.title}>¿Por qué es importante seguir este tratamiento?</Text>
      <Text style={AnticoagulantEducationStyle.text}>
        Muchas personas mayores toman anticoagulantes por afecciones como arritmias, trombosis,
        embolias o por tener una prótesis en el corazón. Este tratamiento ayuda a evitar complicaciones graves.
      </Text>
      <Text style={AnticoagulantEducationStyle.subtitle}>Recomendaciones importantes:</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>• Tomar el medicamento siempre a la misma hora.</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>• No olvidar ninguna dosis.</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>• Evitar ciertos alimentos y medicamentos sin consultar.</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>• Hacerse análisis de sangre periódicamente.</Text>

      <Text style={AnticoagulantEducationStyle.title}>Estudio de Izazola-Conde y colaboradores</Text>
      <Text style={AnticoagulantEducationStyle.text}>
        Un estudio realizado en 2014 encontró que muchos pacientes con anticoagulantes no entendían bien su tratamiento.
        Se les enseñó cómo cuidarse mejor, y los que recibieron educación mejoraron notablemente su conocimiento.
        Esto muestra que aprender sobre el tratamiento es clave para usarlo correctamente.
      </Text>

      <Text style={AnticoagulantEducationStyle.title}>Consejos prácticos</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>• Siga las indicaciones de su médico al pie de la letra.</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>• Avise a médicos y dentistas que toma anticoagulantes.</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>• Evite caídas o golpes que puedan causar sangrados.</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>• Pregunte antes de tomar nuevos medicamentos o suplementos.</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>• Mantenga una dieta estable, especialmente con alimentos como espinaca o brócoli.</Text>

      <Text style={AnticoagulantEducationStyle.title}>¿Tiene dudas?</Text>
      <Text style={AnticoagulantEducationStyle.text}>
        Siempre puede hablar con su médico o enfermera. Ellos están para ayudarle. También puede pedir folletos o
        materiales educativos que le expliquen con claridad todo lo que necesita saber.
      </Text>

      <Text style={AnticoagulantEducationStyle.footer}>
        Recuerde: entender su tratamiento le ayuda a vivir más seguro y con mejor calidad de vida.
      </Text>
    </ScrollView>
  );
};

export default AnticoagulantEducation;
