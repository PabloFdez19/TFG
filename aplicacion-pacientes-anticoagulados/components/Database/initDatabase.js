import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'anticoagulados.db', location: 'default'});

const insertarDatosIniciales = () => {
  const interaccionesIniciales = [
    {
      nombre: 'Vitamina K (espinacas, brócoli)',
      tipo: 'alimento',
      descripcion: 'Puede disminuir el efecto del anticoagulante',
      riesgo: 'medio',
      accion_recomendada: 'Mantener un consumo consistente, no variar bruscamente la ingesta',
    },
    {
      nombre: 'Ibuprofeno',
      tipo: 'medicamento',
      descripcion: 'Aumenta el riesgo de sangrado',
      riesgo: 'alto',
      accion_recomendada: 'Evitar su uso. Consultar alternativas con su médico',
    },
    {
      nombre: 'Extracción dental',
      tipo: 'situacion',
      descripcion: 'Riesgo de sangrado prolongado',
      riesgo: 'alto',
      accion_recomendada: 'Informar al dentista sobre la medicación anticoagulante',
    },
    // ... más datos
  ];

  db.transaction(tx => {
    interaccionesIniciales.forEach(item => {
      tx.executeSql(
        'INSERT INTO interacciones (nombre, tipo, descripcion, riesgo, accion_recomendada) VALUES (?, ?, ?, ?, ?)',
        [item.nombre, item.tipo, item.descripcion, item.riesgo, item.accion_recomendada],
        () => console.log('Dato insertado'),
        error => console.log('Error al insertar: ', error),
      );
    });
  });
};
const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS interacciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        tipo TEXT NOT NULL,  // 'alimento', 'medicamento' o 'situacion'
        descripcion TEXT,
        riesgo TEXT,         // 'alto', 'medio', 'bajo'
        accion_recomendada TEXT
      );`,
      [],
      () => console.log('Tabla creada exitosamente'),
      error => console.log('Error al crear tabla: ', error),
    );
    insertarDatosIniciales();
  });
};

export default initializeDatabase;