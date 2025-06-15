const datos = [
  {
    nombre: 'Vitamina K (espinacas, brócoli, col rizada)',
    tipo: 'alimento',
    descripcion: 'La vitamina K antagoniza el efecto de la warfarina, reduciendo su eficacia anticoagulante',
    riesgo: 'alto',
    accion_recomendada: 'Mantener ingesta constante. No evitar completamente pero sí consumir cantidades similares semanalmente',
  },
  {
    nombre: 'Hígado de res/pollo',
    tipo: 'alimento',
    descripcion: 'Alto contenido en vitamina K que puede disminuir el INR',
    riesgo: 'alto',
    accion_recomendada: 'Limitar consumo o mantenerlo muy consistente',
  },
  {
    nombre: 'Coles de Bruselas',
    tipo: 'alimento',
    descripcion: 'Contenido muy alto de vitamina K que puede interferir con la warfarina',
    riesgo: 'alto',
    accion_recomendada: 'Consumir en cantidades pequeñas y consistentes',
  },
  {
    nombre: 'Aceites vegetales (soja, canola, oliva)',
    tipo: 'alimento',
    descripcion: 'Contienen cantidades significativas de vitamina K',
    riesgo: 'medio',
    accion_recomendada: 'Usar las mismas marcas y cantidades regularmente',
  },
  {
    nombre: 'Aguacate',
    tipo: 'alimento',
    descripcion: 'Contiene vitamina K y puede afectar el INR',
    riesgo: 'medio',
    accion_recomendada: 'Mantener porciones consistentes',
  },
  {
    nombre: 'Té verde',
    tipo: 'bebida',
    descripcion: 'Contiene vitamina K y compuestos que pueden afectar el metabolismo de la warfarina',
    riesgo: 'medio-alto',
    accion_recomendada: 'Limitar o evitar su consumo',
  },
  {
    nombre: 'Arándanos (cranberries)',
    tipo: 'alimento',
    descripcion: 'Pueden potenciar el efecto de la warfarina aumentando el INR',
    riesgo: 'alto',
    accion_recomendada: 'Evitar o consumir con mucha moderación y consistencia',
  },
  {
    nombre: 'Pomelo/toronja',
    tipo: 'alimento',
    descripcion: 'Interfiere con el metabolismo hepático de la warfarina',
    riesgo: 'alto',
    accion_recomendada: 'Evitar completamente',
  },
  {
    nombre: 'Ajo en grandes cantidades',
    tipo: 'alimento',
    descripcion: 'Puede aumentar el efecto anticoagulante',
    riesgo: 'medio',
    accion_recomendada: 'Evitar suplementos. Uso culinario moderado es aceptable',
  },
  {
    nombre: 'Jengibre en grandes cantidades',
    tipo: 'alimento',
    descripcion: 'Puede potenciar el efecto anticoagulante',
    riesgo: 'medio',
    accion_recomendada: 'Limitar consumo excesivo',
  },
  {
    nombre: 'Soja y productos derivados',
    tipo: 'alimento',
    descripcion: 'Puede interferir con el metabolismo de la warfarina',
    riesgo: 'medio',
    accion_recomendada: 'Consumir con moderación y consistencia',
  },
  {
    nombre: 'Alimentos ricos en vitamina E (almendras, espinacas, semillas)',
    tipo: 'alimento',
    descripcion: 'Altas dosis pueden potenciar el efecto anticoagulante',
    riesgo: 'medio',
    accion_recomendada: 'Evitar suplementos. Consumo dietético moderado es aceptable',
  },
  {
    nombre: 'Alcohol',
    tipo: 'bebida',
    descripcion: 'El consumo agudo puede aumentar el INR, mientras el crónico puede disminuirlo',
    riesgo: 'alto',
    accion_recomendada: 'Limitar a 1-2 bebidas ocasionales. Evitar consumo excesivo',
  },
  {
    nombre: 'Regaliz negro',
    tipo: 'alimento',
    descripcion: 'Puede disminuir el efecto de la warfarina',
    riesgo: 'medio',
    accion_recomendada: 'Evitar consumo regular',
  },
  {
    nombre: 'Hojas de mostaza',
    tipo: 'alimento',
    descripcion: 'Alto contenido de vitamina K',
    riesgo: 'medio-alto',
    accion_recomendada: 'Consumir en cantidades consistentes',
  },
  {
    nombre: 'Perejil',
    tipo: 'alimento',
    descripcion: 'Contiene cantidades significativas de vitamina K',
    riesgo: 'medio',
    accion_recomendada: 'Usar como condimento en pequeñas cantidades consistentes',
  },
  {
    nombre: 'Endivias',
    tipo: 'alimento',
    descripcion: 'Contiene vitamina K que puede afectar el INR',
    riesgo: 'medio',
    accion_recomendada: 'Mantener consumo constante',
  },
  {
    nombre: 'Lechuga (especialmente romana)',
    tipo: 'alimento',
    descripcion: 'Contiene cantidades moderadas de vitamina K',
    riesgo: 'medio',
    accion_recomendada: 'Mantener porciones consistentes',
  },
  {
    nombre: 'Coliflor',
    tipo: 'alimento',
    descripcion: 'Contiene vitamina K en cantidades moderadas',
    riesgo: 'bajo-medio',
    accion_recomendada: 'Consumir en cantidades normales y consistentes',
  },
  {
    nombre: 'Higos secos',
    tipo: 'alimento',
    descripcion: 'Contienen vitamina K y pueden afectar el INR',
    riesgo: 'medio',
    accion_recomendada: 'Consumir con moderación y consistencia',
  },
  {
    nombre: 'Kiwi',
    tipo: 'alimento',
    descripcion: 'Contiene cantidades moderadas de vitamina K',
    riesgo: 'bajo-medio',
    accion_recomendada: 'Mantener consumo constante',
  },
  {
    nombre: 'Granada',
    tipo: 'alimento',
    descripcion: 'Puede inhibir el metabolismo de la warfarina',
    riesgo: 'medio',
    accion_recomendada: 'Consumir con moderación',
  },
  {
    nombre: 'Aceite de hígado de bacalao',
    tipo: 'suplemento',
    descripcion: 'Alto contenido en vitamina K y otros compuestos que afectan coagulación',
    riesgo: 'alto',
    accion_recomendada: 'Evitar suplementos',
  },
  {
    nombre: 'Antiinflamatorios no esteroideos (AINEs: ibuprofeno, naproxeno, diclofenaco)',
    tipo: 'medicamento',
    descripcion: 'Aumentan el riesgo de sangrado por efecto antiplaquetario y erosión gástrica',
    riesgo: 'alto',
    accion_recomendada: 'Evitar uso concomitante. Usar paracetamol como alternativa analgésica',
  },
  {
    nombre: 'Aspirina (ácido acetilsalicílico)',
    tipo: 'medicamento',
    descripcion: 'Efecto sinérgico que aumenta riesgo de sangrado gastrointestinal',
    riesgo: 'alto',
    accion_recomendada: 'Solo usar si indicación cardiovascular específica bajo supervisión médica',
  },
  {
    nombre: 'Antibióticos (ciprofloxacino, cotrimoxazol, metronidazol)',
    tipo: 'medicamento',
    descripcion: 'Alteran metabolismo hepático aumentando efecto anticoagulante',
    riesgo: 'alto',
    accion_recomendada: 'Monitorizar INR frecuentemente durante tratamiento',
  },
  {
    nombre: 'Antifúngicos azoles (fluconazol, itraconazol, voriconazol)',
    tipo: 'medicamento',
    descripcion: 'Inhiben CYP2C9 potenciando efecto de warfarina',
    riesgo: 'alto',
    accion_recomendada: 'Ajustar dosis y monitorizar INR. Considerar alternativas',
  },
  {
    nombre: 'Amiodarona',
    tipo: 'medicamento',
    descripcion: 'Inhibe metabolismo de warfarina prolongando su efecto',
    riesgo: 'alto',
    accion_recomendada: 'Reducir dosis de warfarina en 30-50% e intensificar monitorización',
  },
  {
    nombre: 'Carbamazepina',
    tipo: 'medicamento',
    descripcion: 'Induce enzimas hepáticas disminuyendo efecto anticoagulante',
    riesgo: 'alto',
    accion_recomendada: 'Ajustar dosis y monitorizar INR tras iniciar/suspender',
  },
  {
    nombre: 'Omeprazol y otros IBP',
    tipo: 'medicamento',
    descripcion: 'Pueden alterar absorción de vitamina K a largo plazo',
    riesgo: 'medio',
    accion_recomendada: 'Monitorizar INR si se inicia/suspende tratamiento prolongado',
  },
  {
    nombre: 'Simvastatina/atorvastatina',
    tipo: 'medicamento',
    descripcion: 'Pueden potenciar efecto anticoagulante por competición enzimática',
    riesgo: 'medio',
    accion_recomendada: 'Monitorizar INR al iniciar/suspender',
  },
  {
    nombre: 'Levotiroxina',
    tipo: 'medicamento',
    descripcion: 'Aumenta metabolismo de warfarina requiriendo dosis mayores',
    riesgo: 'medio',
    accion_recomendada: 'Monitorizar INR tras ajustes de dosis en hipotiroidismo',
  },
  {
    nombre: 'Antidepresivos (fluoxetina, sertralina, fluvoxamina)',
    tipo: 'medicamento',
    descripcion: 'Inhiben CYP2C9 aumentando efecto anticoagulante',
    riesgo: 'medio-alto',
    accion_recomendada: 'Preferir ISRS con menor interacción (escitalopram)',
  },
  {
    nombre: 'Hierba de San Juan (Hypericum perforatum)',
    tipo: 'fitoterapico',
    descripcion: 'Induce enzimas hepáticas reduciendo efecto anticoagulante',
    riesgo: 'alto',
    accion_recomendada: 'Evitar completamente por variabilidad en interacción',
  },
  {
    nombre: 'Fenitoína',
    tipo: 'medicamento',
    descripcion: 'Interacción bidireccional compleja que afecta ambos fármacos',
    riesgo: 'alto',
    accion_recomendada: 'Monitorización estrecha de INR y niveles de fenitoína',
  },
  {
    nombre: 'Rifampicina',
    tipo: 'medicamento',
    descripcion: 'Potente inductor enzimático que reduce efecto de warfarina',
    riesgo: 'alto',
    accion_recomendada: 'Ajustar dosis durante y después del tratamiento',
  },
  {
    nombre: 'Tamoxifeno',
    tipo: 'medicamento',
    descripcion: 'Potencia efecto anticoagulante por mecanismo sinérgico',
    riesgo: 'medio',
    accion_recomendada: 'Monitorizar INR al iniciar/suspender',
  },
  {
    nombre: 'Vitamina E en altas dosis',
    tipo: 'suplemento',
    descripcion: 'Efecto antiplaquetario adicional que aumenta riesgo hemorrágico',
    riesgo: 'medio',
    accion_recomendada: 'Evitar dosis >400 UI/día',
  },
  {
    nombre: 'Clopidogrel',
    tipo: 'medicamento',
    descripcion: 'Efecto antiplaquetario sinérgico que aumenta sangrados',
    riesgo: 'alto',
    accion_recomendada: 'Evaluar relación riesgo-beneficio individualmente',
  },
  {
    nombre: 'Dabigatrán/rivaroxabán/apixabán',
    tipo: 'medicamento',
    descripcion: 'Interacción teórica por mecanismos complementarios',
    riesgo: 'alto',
    accion_recomendada: 'Generalmente evitar asociación por riesgo hemorrágico',
  },
  {
    nombre: 'Ginseng',
    tipo: 'fitoterapico',
    descripcion: 'Puede disminuir efecto anticoagulante por mecanismo incierto',
    riesgo: 'medio',
    accion_recomendada: 'Evitar uso concomitante',
  },
  {
    nombre: 'Paracetamol (uso crónico >2g/día)',
    tipo: 'medicamento',
    descripcion: 'Puede potenciar efecto anticoagulante',
    riesgo: 'medio',
    accion_recomendada: 'Limitar dosis y monitorizar INR si uso prolongado',
  },
  {
    nombre: 'Eritromicina/claritromicina',
    tipo: 'medicamento',
    descripcion: 'Inhiben metabolismo de warfarina aumentando su efecto',
    riesgo: 'alto',
    accion_recomendada: 'Monitorizar INR durante tratamiento',
  },
  {
    nombre: 'Sulfonilureas (glibenclamida)',
    tipo: 'medicamento',
    descripcion: 'Competencia por proteínas plasmáticas que altera INR',
    riesgo: 'medio',
    accion_recomendada: 'Monitorizar glucemia e INR al ajustar dosis',
  },
];

const situaciones = [
  {
    situacion: 'Sangrado activo (epistaxis, gingivorragia, hematuria)',
    nivel_riesgo: 'alto',
    acciones_inmediatas: [
      'Aplicar presión local directa durante 10-15 min',
      'Usar hielo en zona de sangrado (excepto heridas craneofaciales)',
      'Mantener posición elevada del área afectada',
      'Si no cede en 20 min, acudir a urgencias'
    ],
    seguimiento: 'Control INR dentro de 24-48 horas',
    prevencion: 'Evitar maniobras traumáticas (sonarse fuerte, cepillado dental agresivo)'
  },
  {
    situacion: 'Traumatismo craneoencefálico (incluso leve)',
    nivel_riesgo: 'alto', // Cambiado de "altísimo"
    acciones_inmediatas: [
      'Acudir inmediatamente a urgencias aunque no haya síntomas',
      'Realizar TAC craneal urgente',
      'Considerar reversión anticoagulación según protocolo',
      'Monitorización neurológica estrecha'
    ],
    seguimiento: 'Control INR seriado y evaluación por neurología',
    prevencion: 'Uso de protecciones en actividades de riesgo'
  },
  {
    situacion: 'Hemorragia digestiva (hematemesis, melenas)',
    nivel_riesgo: 'alto',
    acciones_inmediatas: [
      'Ayuno absoluto',
      'Acudir a urgencias inmediatamente',
      'Preparar hemograma, coagulación y grupo sanguíneo',
      'Considerar endoscopia urgente'
    ],
    seguimiento: 'Gastroenterología en 72h tras evento agudo',
    prevencion: 'Profilaxis con IBP si historia previa de úlcera'
  },
  {
    situacion: 'Procedimientos invasivos programados',
    nivel_riesgo: 'medio-alto', // Cambiado de "variable"
    acciones_inmediatas: [
      'Coordinar con hematólogo/cardiólogo 1 semana antes',
      'Evaluar riesgo hemorrágico vs. tromboembólico',
      'Suspensión temporal según protocolo (generalmente 3-5 días antes)',
      'Puente con HBPM si indicado'
    ],
    seguimiento: 'Reiniciar anticoagulación 24-48h post-procedimiento según sangrado',
    prevencion: 'Planificación multidisciplinar anticipada'
  },
  {
    situacion: 'Diarrea/vómitos persistentes (>24h)',
    nivel_riesgo: 'medio', // Cambiado de "medio-alto"
    acciones_inmediatas: [
      'Control INR urgente (posible alteración absorción)',
      'Hidratación oral/intravenosa',
      'Ajustar dosis según INR y estado clínico',
      'Considerar anticoagulación parenteral si intolerancia oral prolongada'
    ],
    seguimiento: 'Monitorizar INR cada 48h hasta normalización',
    prevencion: 'Tratamiento precoz de gastroenteritis'
  },
  {
    situacion: 'Hemorragia intracraneal confirmada',
    nivel_riesgo: 'alto', // Cambiado de "vital"
    acciones_inmediatas: [
      'Reversión inmediata con PCC/K vitamina IV',
      'Manejo en unidad de ictus/neurocríticos',
      'Suspender anticoagulante',
      'Evaluar reanudación tras 2-4 semanas según riesgo'
    ],
    seguimiento: 'RMN cerebral a los 7 días y seguimiento neurológico',
    prevencion: 'Control estricto de PA y evitar fluctuaciones bruscas de INR'
  },
  {
    situacion: 'INR >5 sin sangrado',
    nivel_riesgo: 'medio-alto', // Cambiado de "alto"
    acciones_inmediatas: [
      'Suspender 1-2 dosis de warfarina',
      'Administrar vitamina K oral (1-2.5mg) según protocolo',
      'Reiniciar con dosis reducida (10-20% menos)',
      'Control INR en 24-48h'
    ],
    seguimiento: 'Determinar causa (cambios dieta, medicación, cumplimiento)',
    prevencion: 'Educación sobre adherencia y factores modificables'
  },
  {
    situacion: 'INR >9 sin sangrado',
    nivel_riesgo: 'alto', // Cambiado de "altísimo"
    acciones_inmediatas: [
      'Administrar vitamina K (2.5-5mg VO/IV)',
      'Considerar PCC si factores de riesgo hemorrágico',
      'Suspender warfarina hasta INR terapéutico',
      'Monitorización hospitalaria si comorbilidades'
    ],
    seguimiento: 'Reevaluar esquema terapéutico a largo plazo',
    prevencion: 'Automonitorización INR si disponible'
  },
  {
    situacion: 'Hematomas extensos/spontáneos',
    nivel_riesgo: 'medio', // Cambiado de "medio-alto"
    acciones_inmediatas: [
      'Aplicar compresión fría intermitente',
      'Evaluar INR y hemoglobina',
      'Considerar ecografía si sospecha de hematoma organizado',
      'Ajustar dosis si INR elevado'
    ],
    seguimiento: 'Control evolutivo cada 48h hasta resolución',
    prevencion: 'Evitar actividades con riesgo de traumatismo'
  },
  {
    situacion: 'Embarazo (confirmado o sospecha)',
    nivel_riesgo: 'alto', // Cambiado de "especial"
    acciones_inmediatas: [
      'Suspender warfarina inmediatamente (teratogénica)',
      'Cambiar a HBPM a dosis terapéuticas',
      'Control ginecológico urgente',
      'Manejo multidisciplinar (hematólogo-obstetra)'
    ],
    seguimiento: 'Monitorización fetal estricta',
    prevencion: 'Anticoncepción efectiva en edad fértil'
  },
  {
    situacion: 'Accidente isquémico cerebral agudo',
    nivel_riesgo: 'alto', // Cambiado de "complejo"
    acciones_inmediatas: [
      'Evaluar ventana terapéutica para trombólisis',
      'Reversión anticoagulación si INR elevado',
      'Neuroimagen urgente (TAC/RM difusión-perfusión)',
      'Manejo en unidad de ictus'
    ],
    seguimiento: 'Reiniciar anticoagulación a las 2-4 semanas según evolución',
    prevencion: 'Control óptimo de INR en rango terapéutico'
  },
  {
    situacion: 'Interacción medicamentosa aguda',
    nivel_riesgo: 'medio', // Cambiado de "variable"
    acciones_inmediatas: [
      'Suspender fármaco interactuante si posible',
      'Control INR en 24h',
      'Ajustar dosis warfarina según necesidad',
      'Documentar interacción para futuras prescripciones'
    ],
    seguimiento: 'Monitorización frecuente hasta estabilización',
    prevencion: 'Revisar sistemáticamente nueva medicación'
  },
  {
    situacion: 'Cirugía mayor no programada',
    nivel_riesgo: 'alto', // Cambiado de "crítico"
    acciones_inmediatas: [
      'Administrar PCC/vitamina K según INR y urgencia',
      'Coordinar con anestesista y cirujano',
      'Considerar puente con HBPM post-quirúrgico',
      'Monitorizar sangrado intraoperatorio'
    ],
    seguimiento: 'Reinicio anticoagulación cuando riesgo hemorrágico controlado',
    prevencion: 'Portar identificación de paciente anticoagulado'
  },
  {
    situacion: 'Caída con impacto significativo',
    nivel_riesgo: 'medio-alto', // Cambiado de "alto"
    acciones_inmediatas: [
      'Evaluación traumatológica completa',
      'Control INR urgente',
      'Neuroimagen si síntomas neurológicos',
      'Observación 24h por riesgo sangrado tardío'
    ],
    seguimiento: 'Repetir TAC a las 24h si inicial negativo con alta sospecha',
    prevencion: 'Modificación entorno domiciliario para prevenir caídas'
  }
];

export{
    datos,
    situaciones
};