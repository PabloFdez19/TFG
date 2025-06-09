import * as SQLite from 'expo-sqlite';

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
];

const initializeDatabase = async () => {
  try {
    // Abrir la base de datos de forma asíncrona
    const db = await SQLite.openDatabaseAsync('anticoagulados.db');
    
    // Ejecutar las operaciones SQL de forma asíncrona
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS interacciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        tipo TEXT NOT NULL,
        descripcion TEXT,
        riesgo TEXT,
        accion_recomendada TEXT
      );
    `);
    
    // Verificar si hay datos existentes
    const result = await db.getFirstAsync('SELECT COUNT(*) as total FROM interacciones');
    const total = result.total;
    
    // Insertar datos iniciales si la tabla está vacía
    if (total === 0) {
      for (const item of interaccionesIniciales) {
        await db.runAsync(
          `INSERT INTO interacciones 
          (nombre, tipo, descripcion, riesgo, accion_recomendada) 
          VALUES (?, ?, ?, ?, ?)`,
          [
            item.nombre,
            item.tipo,
            item.descripcion,
            item.riesgo,
            item.accion_recomendada,
          ]
        );
      }
    }
    
    return db;
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    throw error;
  }
};

export default initializeDatabase;