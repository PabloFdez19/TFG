import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { AnticoagulantEducationStyle } from '../Styles/EducationStyles';

const Riesgos = () => {
    return (
        <ScrollView>
            <Text style={AnticoagulantEducationStyle.title}>Conocimientos esenciales sobre anticoagulación oral</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Estos son los aspectos clave que todo paciente anticoagulado debe conocer para manejar su tratamiento con seguridad:
            </Text>

            <Text style={AnticoagulantEducationStyle.title}>1. Propósito del tratamiento</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Los anticoagulantes orales previenen la formación de coágulos sanguíneos peligrosos que pueden causar:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Accidentes cerebrovasculares</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Trombosis venosa profunda</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Embolias pulmonares</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Es fundamental entender por qué necesita esta medicación para seguir el tratamiento correctamente.
            </Text>

            <Text style={AnticoagulantEducationStyle.title}>2. Monitoreo del INR</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Los pacientes deben comprender estos aspectos sobre el INR:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Qué es el INR y por qué es importante</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Con qué frecuencia deben hacerse pruebas</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Cómo interpretar los resultados</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Cada paciente tiene un rango objetivo de INR específico que debe mantener.
            </Text>

            <Text style={AnticoagulantEducationStyle.title}>3. Manejo de la medicación</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Aspectos importantes sobre la toma de anticoagulantes:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Qué hacer si olvida una dosis</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Cómo ajustar la dosis según indicación médica</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Por qué no debe cambiar la dosis por su cuenta</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Nunca suspenda su anticoagulante sin consultar primero con su médico.
            </Text>

            <Text style={AnticoagulantEducationStyle.title}>4. Interacciones importantes</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Estas sustancias pueden afectar su tratamiento:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Medicamentos de venta libre</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Antibióticos</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Antiinflamatorios no esteroideos</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Suplementos herbales</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Alcohol</Text>

            <Text style={AnticoagulantEducationStyle.title}>5. Signos de alerta</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Reconozca estas señales que requieren atención médica:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Sangrado excesivo o prolongado</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Hematomas inexplicables</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Dolor de cabeza intenso o repentino</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Dificultad para respirar</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Dolor o hinchazón en extremidades</Text>

            <Text style={AnticoagulantEducationStyle.title}>6. Situaciones especiales</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Tenga en cuenta estas circunstancias que requieren precaución:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Procedimientos dentales</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Cirugías o intervenciones médicas</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Viajes (llevar medicación suficiente)</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Actividades con riesgo de traumatismos</Text>

            <Text style={AnticoagulantEducationStyle.title}>7. Recomendaciones de estilo de vida</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Para convivir mejor con su tratamiento:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Mantenga una actividad física moderada y segura</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Limite el consumo de alcohol</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Extreme precauciones para evitar caídas</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Use identificación médica de anticoagulado</Text>

            <Text style={AnticoagulantEducationStyle.title}>Beneficios de estar bien informado</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Los pacientes que comprenden su tratamiento:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Logran mejor control de su coagulación</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Tienen menos complicaciones</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Siguen mejor su tratamiento</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Disfrutan de mejor calidad de vida</Text>

            <Text style={AnticoagulantEducationStyle.footer}>
                Esta información es general. Consulte siempre con su médico para recomendaciones personalizadas.
            </Text>
        </ScrollView>
    );
};

export default Riesgos;