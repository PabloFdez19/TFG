import React from 'react';
import { ScrollView, Text } from 'react-native';
import { AnticoagulantEducationStyle } from '../Styles/EducationStyles';

const InformacionValidada = () => {
  return (
    <ScrollView style={AnticoagulantEducationStyle.container}>
      <Text style={AnticoagulantEducationStyle.header}>Guía Práctica para Pacientes Anticoagulados</Text>

      <Text style={AnticoagulantEducationStyle.subtitle}>Control de su Tratamiento</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>✓ Realice sus análisis de sangre (INR) con la frecuencia que le indique su médico</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>✓ Mantenga un registro de sus resultados y dosis</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>✓ No modifique su dosis sin consultar</Text>

      <Text style={AnticoagulantEducationStyle.subtitle}>Recordatorios Útiles</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Tome su medicación siempre a la misma hora</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Configure alarmas o use aplicaciones de recordatorio</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Programe sus próximas citas y análisis con anticipación</Text>

      <Text style={AnticoagulantEducationStyle.subtitle}>Alimentación</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Mantenga un consumo regular de vegetales verdes (no los elimine, pero sea constante)</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Limite el consumo de alcohol (máximo 1-2 bebidas ocasionales)</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Consulte antes de tomar suplementos vitamínicos o herbales</Text>

      <Text style={AnticoagulantEducationStyle.subtitle}>Señales de Alerta</Text>
      <Text style={AnticoagulantEducationStyle.warningBullet}>❗ Sangrado que no para en 10 minutos</Text>
      <Text style={AnticoagulantEducationStyle.warningBullet}>❗ Sangrado en orina o heces (orina roja/heces negras)</Text>
      <Text style={AnticoagulantEducationStyle.warningBullet}>❗ Dolor de cabeza intenso e inusual</Text>
      <Text style={AnticoagulantEducationStyle.warningBullet}>❗ Hinchazón o dolor en extremidades</Text>
      <Text style={AnticoagulantEducationStyle.warningBullet}>❗ Fiebre persistente o malestar general</Text>

      <Text style={AnticoagulantEducationStyle.subtitle}>Precauciones Diarias</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Use maquinilla eléctrica en lugar de navaja</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Cepíllese con suavidad usando cepillo blando</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Utilice guantes para trabajos manuales</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Use calzado seguro para evitar caídas</Text>

      <Text style={AnticoagulantEducationStyle.subtitle}>Medicamentos que deben evitarse</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Aspirina (salvo indicación médica)</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Ibuprofeno y otros antiinflamatorios</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Algunos antibióticos (siempre consulte)</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Suplementos herbales no autorizados</Text>

      <Text style={AnticoagulantEducationStyle.subtitle}>En caso de emergencia</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Lleve siempre su tarjeta de anticoagulado</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Informe a cualquier profesional de salud que le atienda</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Tenga a mano los teléfonos de emergencia</Text>

      <Text style={AnticoagulantEducationStyle.subtitle}>Consejos para no olvidar</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Use pastilleros semanales para organizar su medicación</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Pida recordatorios por mensaje de texto si su centro lo ofrece</Text>
      <Text style={AnticoagulantEducationStyle.bullet}>Designe a un familiar como "ayudante" para recordatorios</Text>

      <Text style={AnticoagulantEducationStyle.footer}>
        Recuerde: Un buen control de su anticoagulación le permite vivir con normalidad y seguridad.
        Ante cualquier duda, consulte a su médico o enfermera.
      </Text>
    </ScrollView>
  );
};

export default InformacionValidada;