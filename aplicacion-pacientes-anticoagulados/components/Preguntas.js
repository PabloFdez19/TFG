const questions = [
  {
    id: 1,
    question: '¿Qué es el INR?',
    options: ['Un tipo de anticoagulante', 'Una medida de coagulación sanguínea', 'Una vitamina esencial'],
    correctAnswer: 'Una medida de coagulación sanguínea',
  },
  {
    id: 2,
    question: '¿Qué alimentos pueden alterar significativamente el efecto de la warfarina?',
    options: ['Manzanas y peras', 'Espinacas y brócoli', 'Arroz y pasta'],
    correctAnswer: 'Espinacas y brócoli',
  },
  {
    id: 3,
    question: '¿Qué debe hacer un paciente si olvida una dosis de su anticoagulante?',
    options: ['Tomar dos dosis juntas', 'Consultar las instrucciones específicas con su médico', 'Suspender el tratamiento por 24 horas'],
    correctAnswer: 'Consultar las instrucciones específicas con su médico',
  },
  {
    id: 4,
    question: '¿Cuál es el principal riesgo de tomar antiinflamatorios junto con anticoagulantes?',
    options: ['Aumento de la presión arterial', 'Mayor riesgo de sangrado', 'Reducción del efecto anticoagulante'],
    correctAnswer: 'Mayor riesgo de sangrado',
  },
  {
    id: 5,
    question: '¿Qué debe hacer un paciente anticoagulado antes de un procedimiento dental?',
    options: ['Suspender la medicación 1 semana antes', 'Informar al dentista sobre su tratamiento', 'Aumentar la dosis de anticoagulante'],
    correctAnswer: 'Informar al dentista sobre su tratamiento',
  },
  {
    id: 6,
    question: '¿Cuál es la acción recomendada ante un INR >5 sin sangrado?',
    options: ['Aumentar la dosis de anticoagulante', 'Suspender 1-2 dosis y administrar vitamina K', 'No tomar ninguna medida'],
    correctAnswer: 'Suspender 1-2 dosis y administrar vitamina K',
  },
  {
    id: 7,
    question: '¿Qué suplemento herbal debe evitarse completamente con anticoagulantes?',
    options: ['Hierba de San Juan', 'Manzanilla', 'Té de menta'],
    correctAnswer: 'Hierba de San Juan',
  },
  {
    id: 8,
    question: '¿Qué señal requiere atención médica inmediata en pacientes anticoagulados?',
    options: ['Dolor de cabeza leve', 'Sangrado que no para en 10 minutos', 'Cansancio después de ejercicio'],
    correctAnswer: 'Sangrado que no para en 10 minutos',
  },
  {
    id: 9,
    question: '¿Por qué es importante mantener un consumo constante de vegetales verdes?',
    options: ['Para evitar deficiencias nutricionales', 'Por su contenido variable de vitamina K', 'Para mejorar la absorción del medicamento'],
    correctAnswer: 'Por su contenido variable de vitamina K',
  },
  {
    id: 10,
    question: '¿Qué precaución debe tomar un paciente anticoagulado al cepillarse los dientes?',
    options: ['Usar cepillo dental duro', 'Cepillarse con suavidad usando cepillo blando', 'Evitar el uso de hilo dental'],
    correctAnswer: 'Cepillarse con suavidad usando cepillo blando',
  },
  {
    id: 11,
    question: '¿Qué medicamento es una alternativa más segura a los AINEs para pacientes anticoagulados?',
    options: ['Ibuprofeno', 'Paracetamol', 'Aspirina'],
    correctAnswer: 'Paracetamol',
  },
  {
    id: 12,
    question: '¿Qué debe hacer un paciente anticoagulado que sufre una caída con impacto?',
    options: ['Solo observar si no hay síntomas', 'Acudir a evaluación médica aunque no haya síntomas', 'Aumentar la dosis de anticoagulante'],
    correctAnswer: 'Acudir a evaluación médica aunque no haya síntomas',
  },
  {
    id: 13,
    question: '¿Qué efecto tiene el consumo excesivo de alcohol en la anticoagulación?',
    options: ['Mejora el control del INR', 'Puede aumentar o disminuir el INR según el patrón de consumo', 'No tiene ningún efecto'],
    correctAnswer: 'Puede aumentar o disminuir el INR según el patrón de consumo',
  },
  {
    id: 14,
    question: '¿Qué debe hacer un paciente anticoagulado que planea viajar?',
    options: ['Suspender la medicación durante el viaje', 'Llevar medicación suficiente e identificación médica', 'Reducir la dosis a la mitad'],
    correctAnswer: 'Llevar medicación suficiente e identificación médica',
  },
  {
    id: 15,
    question: '¿Qué alimentos ricos en vitamina K deben consumirse con moderación?',
    options: ['Carne roja y pollo', 'Verduras de hoja verde y aceites vegetales', 'Frutas cítricas'],
    correctAnswer: 'Verduras de hoja verde y aceites vegetales',
  },
  {
    id: 16,
    question: '¿Por qué es peligroso el pomelo/toronja con anticoagulantes?',
    options: ['Aumenta el apetito', 'Interfiere con el metabolismo hepático', 'Causa deshidratación'],
    correctAnswer: 'Interfiere con el metabolismo hepático',
  },
  {
    id: 17,
    question: '¿Qué debe hacer un paciente anticoagulado ante vómitos persistentes?',
    options: ['Controlar el INR urgentemente', 'Suspender la medicación permanentemente', 'Duplicar la siguiente dosis'],
    correctAnswer: 'Controlar el INR urgentemente',
  },
  {
    id: 18,
    question: '¿Qué documento debe llevar siempre consigo un paciente anticoagulado?',
    options: ['Recetas médicas antiguas', 'Tarjeta de identificación de anticoagulado', 'Resultados de análisis anteriores'],
    correctAnswer: 'Tarjeta de identificación de anticoagulado',
  },
  {
    id: 19,
    question: '¿Qué precaución especial debe tener una mujer en edad fértil anticoagulada?',
    options: ['Usar anticoncepción efectiva', 'Aumentar el consumo de calcio', 'Evitar completamente el ejercicio'],
    correctAnswer: 'Usar anticoncepción efectiva',
  },
  {
    id: 20,
    question: '¿Qué señal podría indicar una hemorragia digestiva?',
    options: ['Heces negras y alquitranadas', 'Orina de color amarillo intenso', 'Sudoración excesiva'],
    correctAnswer: 'Heces negras y alquitranadas',
  },
  {
    id: 21,
    question: '¿Qué tipo de actividades deportivas deben evitar los pacientes anticoagulados?',
    options: ['Natación', 'Ciclismo estático', 'Deportes de contacto con riesgo de traumatismos'],
    correctAnswer: 'Deportes de contacto con riesgo de traumatismos',
  },
  {
    id: 22,
    question: '¿Qué medicamento para el colesterol puede interactuar con anticoagulantes?',
    options: ['Simvastatina', 'Metformina', 'Omeprazol'],
    correctAnswer: 'Simvastatina',
  },
  {
    id: 23,
    question: '¿Qué debe hacer un paciente si nota hematomas inexplicables?',
    options: ['Ignorarlos si son pequeños', 'Evaluar INR y hemoglobina', 'Aplicar calor local'],
    correctAnswer: 'Evaluar INR y hemoglobina',
  },
  {
    id: 24,
    question: '¿Qué fruta puede inhibir el metabolismo de la warfarina?',
    options: ['Plátano', 'Manzana', 'Granada'],
    correctAnswer: 'Granada',
  },
  {
    id: 25,
    question: '¿Cuál es la recomendación sobre el uso de maquinillas de afeitar?',
    options: ['Usar maquinilla eléctrica en lugar de navaja', 'Usar navaja tradicional', 'No afeitarse'],
    correctAnswer: 'Usar maquinilla eléctrica en lugar de navaja',
  },
  {
    id: 26,
    question: '¿Qué antibióticos requieren especial precaución con anticoagulantes?',
    options: ['Ciprofloxacino y metronidazol', 'Amoxicilina', 'Azitromicina'],
    correctAnswer: 'Ciprofloxacino y metronidazol',
  },
  {
    id: 27,
    question: '¿Qué debe hacer un paciente anticoagulado que sufre un traumatismo craneal leve?',
    options: ['Acudir inmediatamente a urgencias', 'Observar en casa durante 24 horas', 'Tomar analgésicos fuertes'],
    correctAnswer: 'Acudir inmediatamente a urgencias',
  },
  {
    id: 28,
    question: '¿Qué alimento puede potenciar el efecto anticoagulante?',
    options: ['Arándanos (cranberries)', 'Zanahorias', 'Pepino'],
    correctAnswer: 'Arándanos (cranberries)',
  },
  {
    id: 29,
    question: '¿Qué precaución es importante para prevenir sangrados bucales?',
    options: ['Usar enjuagues bucales medicinales', 'Cepillarse con suavidad usando cepillo blando', 'Evitar el consumo de agua fría'],
    correctAnswer: 'Cepillarse con suavidad usando cepillo blando',
  },
  {
    id: 30,
    question: '¿Qué profesional de salud debe coordinar la suspensión de anticoagulantes antes de cirugía?',
    options: ['Fisioterapeuta', 'Hematólogo o cardiólogo', 'Nutricionista'],
    correctAnswer: 'Hematólogo o cardiólogo',
  },
  {
    id: 31,
    question: '¿Qué efecto tiene la vitamina K en la warfarina?',
    options: ['Potencia su efecto', 'Antagoniza su efecto', 'Mejora su sabor'],
    correctAnswer: 'Antagoniza su efecto',
  },
  {
    id: 32,
    question: '¿Qué suplemento debe evitarse por su alto contenido en vitamina K?',
    options: ['Vitamina C', 'Aceite de hígado de bacalao', 'Calcio'],
    correctAnswer: 'Aceite de hígado de bacalao',
  },
  {
    id: 33,
    question: '¿Qué tipo de sangrado requiere aplicación de presión local durante 10-15 minutos?',
    options: ['Sangrado activo (epistaxis, gingivorragia)', 'Hemorragia digestiva', 'Sangrado intracraneal'],
    correctAnswer: 'Sangrado activo (epistaxis, gingivorragia)',
  },
  {
    id: 34,
    question: '¿Qué medicamento para la tiroides puede requerir ajuste de dosis de anticoagulantes?',
    options: ['Metformina', 'Levotiroxina', 'Omeprazol'],
    correctAnswer: 'Levotiroxina',
  },
  {
    id: 35,
    question: '¿Qué bebida contiene vitamina K y compuestos que afectan el metabolismo de warfarina?',
    options: ['Agua mineral', 'Té verde', 'Jugo de naranja'],
    correctAnswer: 'Té verde',
  },
  {
    id: 36,
    question: '¿Qué debe hacer un paciente con diarrea persistente?',
    options: ['Controlar el INR urgentemente', 'Suspender la medicación por 3 días', 'Duplicar la dosis de anticoagulante'],
    correctAnswer: 'Controlar el INR urgentemente',
  },
  {
    id: 37,
    question: '¿Qué señal podría indicar un accidente cerebrovascular?',
    options: ['Dolor de cabeza intenso o repentino', 'Acidez estomacal', 'Picor en la piel'],
    correctAnswer: 'Dolor de cabeza intenso o repentino',
  },
  {
    id: 38,
    question: '¿Qué alimento de origen animal tiene alto contenido en vitamina K?',
    options: ['Pechuga de pollo', 'Hígado de res/pollo', 'Huevos'],
    correctAnswer: 'Hígado de res/pollo',
  },
  {
    id: 39,
    question: '¿Qué antiarrítmico requiere ajuste de dosis de warfarina?',
    options: ['Amiodarona', 'Metoprolol', 'Digoxina'],
    correctAnswer: 'Amiodarona',
  },
  {
    id: 40,
    question: '¿Por qué es importante usar pastilleros semanales?',
    options: ['Para organizar mejor la medicación', 'Para reducir el costo del tratamiento', 'Para evitar la refrigeración de medicamentos'],
    correctAnswer: 'Para organizar mejor la medicación',
  },
  {
    id: 41,
    question: '¿Qué anticoagulantes deben evitarse juntos por riesgo hemorrágico?',
    options: ['Warfarina y dabigatrán', 'Insulina y metformina', 'Paracetamol e ibuprofeno'],
    correctAnswer: 'Warfarina y dabigatrán',
  },
  {
    id: 42,
    question: '¿Qué debe hacer un paciente anticoagulado que presenta hematuria?',
    options: ['Aumentar la ingesta de agua', 'Acudir a urgencias inmediatamente', 'Tomar un antiinflamatorio'],
    correctAnswer: 'Acudir a urgencias inmediatamente',
  },
  {
    id: 43,
    question: '¿Qué hierba puede disminuir el efecto anticoagulante?',
    options: ['Ginseng', 'Manzanilla', 'Menta'],
    correctAnswer: 'Ginseng',
  },
  {
    id: 44,
    question: '¿Qué precaución es importante en el hogar para pacientes anticoagulados?',
    options: ['Tener alfombras resbaladizas', 'Modificar el entorno para prevenir caídas', 'Usar bañera en lugar de ducha'],
    correctAnswer: 'Modificar el entorno para prevenir caídas',
  },
  {
    id: 45,
    question: '¿Qué analgésico puede potenciar el efecto anticoagulante en uso crónico?',
    options: ['Paracetamol (>2g/día)', 'Ibuprofeno', 'Aspirina'],
    correctAnswer: 'Paracetamol (>2g/día)',
  },
  {
    id: 46,
    question: '¿Qué debe hacer un paciente anticoagulado antes de tomar un nuevo medicamento?',
    options: ['Consultar siempre con su médico', 'Tomar media dosis inicialmente', 'Suspender el anticoagulante temporalmente'],
    correctAnswer: 'Consultar siempre con su médico',
  },
  {
    id: 47,
    question: '¿Qué vitamina en altas dosis tiene efecto antiplaquetario adicional?',
    options: ['Vitamina C', 'Vitamina D', 'Vitamina E'],
    correctAnswer: 'Vitamina E',
  },
  {
    id: 48,
    question: '¿Qué situación requiere reversión inmediata de la anticoagulación?',
    options: ['Hemorragia intracraneal confirmada', 'Resfriado común', 'Dolor muscular leve'],
    correctAnswer: 'Hemorragia intracraneal confirmada',
  },
  {
    id: 49,
    question: '¿Qué alimento debe consumirse con mucha moderación por su efecto en el INR?',
    options: ['Pomelo/toronja', 'Manzana', 'Papa'],
    correctAnswer: 'Pomelo/toronja',
  },
  {
    id: 50,
    question: '¿Qué beneficio principal obtienen los pacientes que comprenden su tratamiento anticoagulante?',
    options: ['Pueden automedicarse', 'Logran mejor control y menos complicaciones', 'Pueden suspender los análisis de sangre'],
    correctAnswer: 'Logran mejor control y menos complicaciones',
  },
  {
    id: 51,
    question: '¿Qué condición médica es una indicación común para anticoagulantes en personas mayores?',
    options: ['Diabetes tipo 2', 'Arritmias cardíacas', 'Hipertensión leve'],
    correctAnswer: 'Arritmias cardíacas'
  },
  {
    id: 52,
    question: 'Según estudios, ¿qué porcentaje de pacientes sabía el nombre de su anticoagulante?',
    options: ['44.4%', '75.2%', '30.1%'],
    correctAnswer: '44.4%'
  },
  {
    id: 53,
    question: '¿Qué debe hacer un paciente si presenta heces negras y alquitranadas?',
    options: ['Aumentar la ingesta de fibra', 'Acudir a urgencias inmediatamente', 'Tomar antiácidos'],
    correctAnswer: 'Acudir a urgencias inmediatamente'
  },
  {
    id: 54,
    question: '¿Qué efecto tiene el consumo agudo de alcohol en el INR?',
    options: ['Disminuye el INR', 'Aumenta el INR', 'No tiene efecto'],
    correctAnswer: 'Aumenta el INR'
  },
  {
    id: 55,
    question: '¿Qué vegetal contiene vitamina K pero puede consumirse en cantidades consistentes?',
    options: ['Papa', 'Espinaca', 'Zanahoria'],
    correctAnswer: 'Espinaca'
  },
  {
    id: 56,
    question: '¿Qué antibiótico requiere monitorización frecuente del INR durante su uso?',
    options: ['Amoxicilina', 'Ciprofloxacino', 'Azitromicina'],
    correctAnswer: 'Ciprofloxacino'
  },
  {
    id: 57,
    question: 'Ante un INR >9 sin sangrado, ¿qué acción se recomienda?',
    options: ['Administrar vitamina K', 'Duplicar la dosis de anticoagulante', 'Suspender el tratamiento permanentemente'],
    correctAnswer: 'Administrar vitamina K'
  },
  {
    id: 58,
    question: '¿Qué suplemento debe evitarse por su contenido de vitamina K?',
    options: ['Vitamina D', 'Aceite de hígado de bacalao', 'Calcio'],
    correctAnswer: 'Aceite de hígado de bacalao'
  },
  {
    id: 59,
    question: '¿Qué síntoma podría indicar una trombosis venosa profunda?',
    options: ['Dolor o hinchazón en extremidades', 'Dolor de cabeza leve', 'Acidez estomacal'],
    correctAnswer: 'Dolor o hinchazón en extremidades'
  },
  {
    id: 60,
    question: '¿Con qué frecuencia deben realizarse controles de INR después de un ajuste de dosis?',
    options: ['Cada 6 meses', 'Cada 24-48 horas', 'Anualmente'],
    correctAnswer: 'Cada 24-48 horas'
  },
  {
    id: 61,
    question: '¿Qué medicamento para la diabetes puede interactuar con anticoagulantes?',
    options: ['Metformina', 'Glibenclamida', 'Insulina'],
    correctAnswer: 'Glibenclamida'
  },
  {
    id: 62,
    question: '¿Qué medida ayuda a prevenir sangrados durante el cepillado dental?',
    options: ['Usar cepillo dental duro', 'Cepillarse con suavidad usando cepillo blando', 'Evitar el cepillado'],
    correctAnswer: 'Cepillarse con suavidad usando cepillo blando'
  },
  {
    id: 63,
    question: '¿Qué fruta debe consumirse con moderación por su efecto en el metabolismo de warfarina?',
    options: ['Banana', 'Granada', 'Uvas'],
    correctAnswer: 'Granada'
  },
  {
    id: 64,
    question: '¿Cuánto tiempo debe aplicarse presión directa en caso de sangrado activo?',
    options: ['1-2 minutos', '10-15 minutos', '30 minutos'],
    correctAnswer: '10-15 minutos'
  },
  {
    id: 65,
    question: '¿Qué tipo de té debe limitarse o evitarse por su contenido de vitamina K?',
    options: ['Té negro', 'Té verde', 'Manzanilla'],
    correctAnswer: 'Té verde'
  },
  {
    id: 66,
    question: '¿Qué medicamento antiarrítmico requiere ajuste de dosis de warfarina?',
    options: ['Amiodarona', 'Digoxina', 'Atenolol'],
    correctAnswer: 'Amiodarona'
  },
  {
    id: 67,
    question: '¿Qué precaución debe tomarse con el consumo de ajo?',
    options: ['Evitar completamente', 'Evitar suplementos, uso culinario moderado es aceptable', 'Consumir en grandes cantidades'],
    correctAnswer: 'Evitar suplementos, uso culinario moderado es aceptable'
  },
  {
    id: 68,
    question: 'En viajes, ¿qué debe llevar siempre un paciente anticoagulado?',
    options: ['Certificado de vacunación', 'Medicación suficiente e identificación médica', 'Suplementos vitamínicos'],
    correctAnswer: 'Medicación suficiente e identificación médica'
  },
  {
    id: 69,
    question: '¿Qué situación requiere suspensión inmediata de warfarina?',
    options: ['Resfriado común', 'Embarazo confirmado o sospechado', 'Dolor muscular leve'],
    correctAnswer: 'Embarazo confirmado o sospechado'
  },
  {
    id: 70,
    question: '¿Qué medicamento para el colesterol puede interactuar con anticoagulantes?',
    options: ['Atorvastatina', 'Ezetimiba', 'Colestiramina'],
    correctAnswer: 'Atorvastatina'
  },
  {
    id: 71,
    question: '¿Qué alimento puede potenciar el efecto anticoagulante?',
    options: ['Arándanos (cranberries)', 'Manzanas', 'Pepinos'],
    correctAnswer: 'Arándanos (cranberries)'
  },
  {
    id: 72,
    question: '¿Qué debe hacer un paciente con diarrea persistente por más de 24 horas?',
    options: ['Controlar el INR urgentemente', 'Suspender la medicación permanentemente', 'Aumentar la dosis de anticoagulante'],
    correctAnswer: 'Controlar el INR urgentemente'
  },
  {
    id: 73,
    question: '¿Qué hierba medicinal puede reducir el efecto anticoagulante?',
    options: ['Hierba de San Juan', 'Manzanilla', 'Valeriana'],
    correctAnswer: 'Hierba de San Juan'
  },
  {
    id: 74,
    question: '¿Qué tipo de sangrado requiere aplicación de hielo en la zona afectada?',
    options: ['Hemorragia digestiva', 'Hematomas extensos', 'Sangrado intracraneal'],
    correctAnswer: 'Hematomas extensos'
  },
  {
    id: 75,
    question: '¿Qué anticoagulante es teratogénico y debe suspenderse en embarazo?',
    options: ['Heparina', 'Warfarina', 'Rivaroxabán'],
    correctAnswer: 'Warfarina'
  },
  {
    id: 76,
    question: '¿Qué medicamento para la tiroides puede alterar el INR?',
    options: ['Metimazol', 'Levotiroxina', 'Propiltiouracilo'],
    correctAnswer: 'Levotiroxina'
  },
  {
    id: 77,
    question: '¿Qué verdura tiene alto contenido de vitamina K?',
    options: ['Coles de Bruselas', 'Calabacín', 'Berenjena'],
    correctAnswer: 'Coles de Bruselas'
  },
  {
    id: 78,
    question: '¿Qué acción inmediata se recomienda para sangrado nasal persistente?',
    options: ['Inclinar la cabeza hacia atrás', 'Aplicar presión directa durante 10-15 minutos', 'Tomar un antiinflamatorio'],
    correctAnswer: 'Aplicar presión directa durante 10-15 minutos'
  },
  {
    id: 79,
    question: '¿Qué tipo de actividades deben evitarse para prevenir traumatismos?',
    options: ['Caminar', 'Natación', 'Deportes de contacto'],
    correctAnswer: 'Deportes de contacto'
  },
  {
    id: 80,
    question: '¿Qué medicamento debe evitarse como analgésico en pacientes anticoagulados?',
    options: ['Paracetamol', 'Ibuprofeno', 'Tramadol'],
    correctAnswer: 'Ibuprofeno'
  },
  {
    id: 81,
    question: '¿Qué vitamina en altas dosis puede aumentar el riesgo hemorrágico?',
    options: ['Vitamina C', 'Vitamina E', 'Vitamina B12'],
    correctAnswer: 'Vitamina E'
  },
  {
    id: 82,
    question: '¿Qué debe hacer un paciente si olvida una dosis de warfarina?',
    options: ['Tomar doble dosis al día siguiente', 'Consultar instrucciones específicas con su médico', 'Suspender el tratamiento por una semana'],
    correctAnswer: 'Consultar instrucciones específicas con su médico'
  },
  {
    id: 83,
    question: '¿Qué alimento animal es rico en vitamina K?',
    options: ['Pechuga de pollo', 'Hígado de res', 'Salmón'],
    correctAnswer: 'Hígado de res'
  },
  {
    id: 84,
    question: '¿Qué señal podría indicar una embolia pulmonar?',
    options: ['Dificultad para respirar', 'Dolor de garganta', 'Picor en la piel'],
    correctAnswer: 'Dificultad para respirar'
  },
  {
    id: 85,
    question: '¿Qué medicamento antifúngico requiere ajuste de dosis de warfarina?',
    options: ['Fluconazol', 'Nistatina', 'Terbinafina'],
    correctAnswer: 'Fluconazol'
  },
  {
    id: 86,
    question: '¿Qué medida ayuda a organizar la medicación semanalmente?',
    options: ['Pastillero semanal', 'Refrigerar los medicamentos', 'Mezclar todas las pastillas en un frasco'],
    correctAnswer: 'Pastillero semanal'
  },
  {
    id: 87,
    question: '¿Qué anticoagulantes no deben asociarse por riesgo hemorrágico?',
    options: ['Warfarina y dabigatrán', 'Heparina y enoxaparina', 'Aspirina y clopidogrel'],
    correctAnswer: 'Warfarina y dabigatrán'
  },
  {
    id: 88,
    question: '¿Qué precaución debe tomarse con el perejil?',
    options: ['Consumir libremente', 'Usar como condimento en pequeñas cantidades consistentes', 'Evitar completamente'],
    correctAnswer: 'Usar como condimento en pequeñas cantidades consistentes'
  },
  {
    id: 89,
    question: '¿Qué debe hacer un paciente antes de una extracción dental?',
    options: ['Suspender anticoagulantes por cuenta propia', 'Coordinar con hematólogo/cardiólogo', 'Aumentar la dosis de anticoagulante'],
    correctAnswer: 'Coordinar con hematólogo/cardiólogo'
  },
  {
    id: 90,
    question: '¿Qué bebida debe evitarse completamente con anticoagulantes?',
    options: ['Agua mineral', 'Jugo de naranja', 'Pomelo/toronja'],
    correctAnswer: 'Pomelo/toronja'
  },
  {
    id: 91,
    question: '¿Qué tipo de hemorragia requiere administración de PCC (complejo protrombínico)?',
    options: ['Epistaxis leve', 'Hemorragia intracraneal', 'Moretón pequeño'],
    correctAnswer: 'Hemorragia intracraneal'
  },
  {
    id: 92,
    question: '¿Qué vegetal de hoja verde tiene menor contenido de vitamina K?',
    options: ['Lechuga romana', 'Espinaca', 'Col rizada'],
    correctAnswer: 'Lechuga romana'
  },
  {
    id: 93,
    question: '¿Qué antidepresivo tiene menor interacción con anticoagulantes?',
    options: ['Fluoxetina', 'Sertralina', 'Escitalopram'],
    correctAnswer: 'Escitalopram'
  },
  {
    id: 94,
    question: '¿Qué acción tomar ante un INR <2 en un paciente con válvula cardíaca mecánica?',
    options: ['Suspender la medicación', 'Consultar para posible ajuste de dosis', 'Tomar dosis doble'],
    correctAnswer: 'Consultar para posible ajuste de dosis'
  },
  {
    id: 95,
    question: '¿Qué factor es crucial para mantener estable el INR?',
    options: ['Consistencia en la dieta', 'Cambios frecuentes en actividad física', 'Variar horarios de medicación'],
    correctAnswer: 'Consistencia en la dieta'
  },
  {
    id: 96,
    question: '¿Qué medicamento para acidez puede afectar la absorción de vitamina K?',
    options: ['Omeprazol', 'Antiácidos de magnesio', 'Ranitidina'],
    correctAnswer: 'Omeprazol'
  },
  {
    id: 97,
    question: '¿Qué fruto seco contiene vitamina E que puede potenciar el efecto anticoagulante?',
    options: ['Almendras', 'Nueces', 'Cacahuates'],
    correctAnswer: 'Almendras'
  },
  {
    id: 98,
    question: '¿Qué debe hacer un paciente si presenta fiebre persistente?',
    options: ['Automedicarse con antibióticos', 'Consultar por posible interacción medicamentosa', 'Ignorarlo si es leve'],
    correctAnswer: 'Consultar por posible interacción medicamentosa'
  },
  {
    id: 99,
    question: '¿Qué aceites vegetales contienen vitamina K?',
    options: ['Aceite de soja, canola, oliva', 'Aceite de coco', 'Aceite de girasol'],
    correctAnswer: 'Aceite de soja, canola, oliva'
  },
  {
    id: 100,
    question: '¿Qué beneficio principal se obtiene con educación sobre anticoagulación?',
    options: ['Reducción de costos médicos', 'Mejor control terapéutico y menos complicaciones', 'Posibilidad de automedicación'],
    correctAnswer: 'Mejor control terapéutico y menos complicaciones'
  }
];

export default questions;