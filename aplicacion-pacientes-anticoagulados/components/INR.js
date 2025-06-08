import React from 'react';
import { ScrollView, Text } from 'react-native';
import { AnticoagulantEducationStyle } from '../Styles/EducationStyles';

const INR = () => {
    return (
        <ScrollView>
            <Text style={AnticoagulantEducationStyle.title}>¿Qué son los anticoagulantes orales?</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Los anticoagulantes orales como el Sintrom® (acenocumarol) o Warfarina son medicamentos que previenen la formación de coágulos sanguíneos. Actúan inhibiendo la vitamina K, necesaria para la coagulación.
            </Text>

            <Text style={AnticoagulantEducationStyle.title}>Importancia del control del INR</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                El INR (International Normalized Ratio) mide el tiempo de coagulación de su sangre. Según el estudio de Núñez-Cózar y García-Vázquez (2015), solo el 44.4% de los pacientes conocía correctamente su rango terapéutico de INR.
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Debe realizarse controles periódicos según indicación médica</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Mantenga su INR dentro del rango recomendado para evitar complicaciones</Text>

            <Text style={AnticoagulantEducationStyle.title}>Recomendaciones nutricionales</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Según Vallejo-Mora y Olveira-Fuster (2018), la dieta es fundamental en pacientes anticoagulados:
            </Text>
            <Text style={AnticoagulantEducationStyle.subtitle}>Alimentos con vitamina K (moderar su consumo):</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Verduras de hoja verde (espinacas, coles, brócoli)</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Hígado y vísceras</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Aceites vegetales (soja, canola, oliva)</Text>
            <Text style={AnticoagulantEducationStyle.subtitle}>Recomendaciones generales:</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Mantenga un consumo constante de alimentos con vitamina K</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Evite cambios bruscos en la dieta</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Limite el consumo de alcohol</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Consulte antes tomar suplementos nutricionales</Text>

            <Text style={AnticoagulantEducationStyle.title}>Interacciones medicamentosas</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                El estudio de Núñez-Cózar y García-Vázquez (2015) mostró que solo el 38.9% de los pacientes conocía las interacciones con otros medicamentos:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Antibióticos pueden aumentar el efecto anticoagulante</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Antiinflamatorios aumentan el riesgo de sangrado</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Hierbas como ginseng, ginkgo biloba o manzanilla pueden afectar</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Siempre consulte antes de tomar nuevos medicamentos</Text>

            <Text style={AnticoagulantEducationStyle.title}>Conocimientos sobre el tratamiento</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Según el estudio mencionado, existen importantes lagunas de conocimiento:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Solo el 44.4% sabía el nombre de su anticoagulante</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• El 55.6% desconocía qué hacer si olvidaba una dosis</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• El 61.1% no sabía reconocer signos de sobredosis</Text>

            <Text style={AnticoagulantEducationStyle.title}>Recomendaciones prácticas</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Tome la medicación siempre a la misma hora</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Si olvida una dosis, consulte las instrucciones específicas</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Reconozca signos de alarma: sangrado anormal, dolor de cabeza intenso, hematomas</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Lleve siempre una identificación de que está anticoagulado</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Informe a todos sus profesionales sanitarios</Text>

            <Text style={AnticoagulantEducationStyle.title}>¿Dónde acudir si tiene dudas?</Text>
            <Text style={AnticoagulantEducationStyle.text}>
                Como muestra el estudio, la educación es fundamental. No dude en consultar con:
            </Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Su médico de referencia</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Enfermera de anticoagulación</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Farmacéutico</Text>
            <Text style={AnticoagulantEducationStyle.bullet}>• Unidades especializadas en anticoagulación</Text>

            <Text style={AnticoagulantEducationStyle.footer}>
                Recuerde: Un buen conocimiento de su tratamiento mejora su seguridad y calidad de vida.
            </Text>
        </ScrollView>
    );
};

export default INR;