import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const AnticoagulantEducation = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>¿Qué es el tratamiento anticoagulante?</Text>
      <Text style={styles.text}>
        El tratamiento anticoagulante consiste en tomar medicamentos que ayudan a prevenir
        la formación de coágulos en la sangre. Estos coágulos pueden bloquear venas o arterias
        y causar problemas como infartos o derrames cerebrales. No eliminan los coágulos existentes,
        pero sí evitan que se formen nuevos.
      </Text>

      <Text style={styles.title}>¿Por qué es importante seguir este tratamiento?</Text>
      <Text style={styles.text}>
        Muchas personas mayores toman anticoagulantes por afecciones como arritmias, trombosis,
        embolias o por tener una prótesis en el corazón. Este tratamiento ayuda a evitar complicaciones graves.
      </Text>
      <Text style={styles.subtitle}>Recomendaciones importantes:</Text>
      <Text style={styles.bullet}>• Tomar el medicamento siempre a la misma hora.</Text>
      <Text style={styles.bullet}>• No olvidar ninguna dosis.</Text>
      <Text style={styles.bullet}>• Evitar ciertos alimentos y medicamentos sin consultar.</Text>
      <Text style={styles.bullet}>• Hacerse análisis de sangre periódicamente.</Text>

      <Text style={styles.title}>Estudio de Izazola-Conde y colaboradores</Text>
      <Text style={styles.text}>
        Un estudio realizado en 2014 encontró que muchos pacientes con anticoagulantes no entendían bien su tratamiento.
        Se les enseñó cómo cuidarse mejor, y los que recibieron educación mejoraron notablemente su conocimiento.
        Esto muestra que aprender sobre el tratamiento es clave para usarlo correctamente.
      </Text>

      <Text style={styles.title}>Consejos prácticos</Text>
      <Text style={styles.bullet}>• Siga las indicaciones de su médico al pie de la letra.</Text>
      <Text style={styles.bullet}>• Avise a médicos y dentistas que toma anticoagulantes.</Text>
      <Text style={styles.bullet}>• Evite caídas o golpes que puedan causar sangrados.</Text>
      <Text style={styles.bullet}>• Pregunte antes de tomar nuevos medicamentos o suplementos.</Text>
      <Text style={styles.bullet}>• Mantenga una dieta estable, especialmente con alimentos como espinaca o brócoli.</Text>

      <Text style={styles.title}>¿Tiene dudas?</Text>
      <Text style={styles.text}>
        Siempre puede hablar con su médico o enfermera. Ellos están para ayudarle. También puede pedir folletos o
        materiales educativos que le expliquen con claridad todo lo que necesita saber.
      </Text>

      <Text style={styles.footer}>
        Recuerde: entender su tratamiento le ayuda a vivir más seguro y con mejor calidad de vida.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#003366',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
    textAlign: 'justify'
  },
  text: {
    fontSize: 22,
    lineHeight: 24,
    color: '#444',
    marginTop: 10,
    textAlign: 'justify'
  },
  bullet: {
    fontSize: 22,
    marginLeft: 10,
    marginTop: 6,
    color: '#444',
  },
  footer: {
    fontSize: 22,
    marginTop: 30,
    fontWeight: '600',
    color: '#005c2d',
    textAlign: 'justify',
  }
});

export default AnticoagulantEducation;
