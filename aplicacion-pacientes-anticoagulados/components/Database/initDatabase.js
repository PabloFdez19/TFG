import * as SQLite from 'expo-sqlite';
import { datos, situaciones } from './datos';

// CORRECCIÓN: Creamos una variable para mantener la promesa de la base de datos.
let dbPromise = null;

const setupDatabase = async () => {
  try {
    // Abre la conexión.
    const db = await SQLite.openDatabaseAsync('anticoagulados.db');
    
    // Ejecuta las operaciones SQL para crear las tablas si no existen.
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS interacciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, tipo TEXT NOT NULL,
        descripcion TEXT, riesgo TEXT, accion_recomendada TEXT
      );
    `);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS situaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT, situacion TEXT NOT NULL, tipo TEXT NOT NULL,
        riesgo TEXT NOT NULL, acciones_inmediatas TEXT NOT NULL, seguimiento TEXT NOT NULL, prevencion TEXT NOT NULL
      );
    `);
    
    // Inserta datos iniciales solo si las tablas están vacías.
    const interaccionesCount = await db.getFirstAsync('SELECT COUNT(*) as count FROM interacciones');
    if (interaccionesCount.count === 0) {
      console.log("Poblando tabla 'interacciones'...");
      for (const item of datos) {
        await db.runAsync(
          `INSERT INTO interacciones (nombre, tipo, descripcion, riesgo, accion_recomendada) VALUES (?, ?, ?, ?, ?)`,
          [item.nombre, item.tipo, item.descripcion, item.riesgo, item.accion_recomendada]
        );
      }
    }

    const situacionesCount = await db.getFirstAsync('SELECT COUNT(*) as count FROM situaciones');
    if (situacionesCount.count === 0) {
        console.log("Poblando tabla 'situaciones'...");
      for (const item of situaciones) {
        await db.runAsync(
          `INSERT INTO situaciones (situacion, tipo, riesgo, acciones_inmediatas, seguimiento, prevencion) VALUES (?, ?, ?, ?, ?, ?)`,
          [item.situacion, 'situacion', item.nivel_riesgo, item.acciones_inmediatas, item.seguimiento, item.prevencion]
        );
      }
    }
    
    console.log("✅ Base de datos lista.");
    return db;
  } catch (error) {
    console.error("❌ Error fatal durante la inicialización de la base de datos:", error);
    throw error;
  }
};

// CORRECCIÓN: Esta es la función que exportaremos.
// Se asegura de que `setupDatabase` solo se llame una vez.
const initializeDatabase = () => {
  if (!dbPromise) {
    console.log("🚀 Iniciando conexión con la base de datos por primera vez...");
    dbPromise = setupDatabase();
  }
  return dbPromise;
};

export default initializeDatabase;