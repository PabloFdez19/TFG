import * as SQLite from 'expo-sqlite';
import {datos, situaciones} from './datos';

const RESET_DB_ON_START = true;


const initializeDatabase = async () => {
  try {
    // Abrir la base de datos de forma asíncrona
    const db = await SQLite.openDatabaseAsync('anticoagulados.db');

    // if (RESET_DB_ON_START) {
    //     await db.execAsync(`DROP TABLE IF EXISTS interacciones`);
    //     await db.execAsync(`DROP TABLE IF EXISTS situaciones`);
    // }
    
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
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS situaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        situacion TEXT NOT NULL,
        tipo TEXT NOT NULL,
        riesgo TEXT NOT NULL,
        acciones_inmediatas TEXT NOT NULL,
        seguimiento TEXT NOT NULL,
        prevencion TEXT NOT NULL
      );
    `);
    
    // Verificar si hay datos existentes
    const result = await db.getFirstAsync('SELECT COUNT(*) as total FROM interacciones');
    const total = result.total;
    
    // Insertar datos iniciales si la tabla está vacía
    if (total === 0) {
      for (const item of datos) {
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
    const result2 = await db.getFirstAsync('SELECT COUNT(*) as total FROM situaciones');
    const total2 = result2.total;
    
    // Insertar datos iniciales si la tabla está vacía
    if (total2 === 0) {
      for (const item of situaciones) {
        await db.runAsync(
          `INSERT INTO situaciones
          (situacion, tipo, riesgo, acciones_inmediatas, seguimiento, prevencion) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [
            item.situacion,
            'situacion',
            item.nivel_riesgo,
            item.acciones_inmediatas,
            item.seguimiento,
            item.prevencion,
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