// components/DatabaseContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SQLite from 'expo-sqlite';
import initializeDatabase from './Database/initDatabase'; // Importamos la función que ya tienes

// 1. Creamos el contexto
export const DatabaseContext = createContext(null);

// 2. Creamos un "Proveedor" que manejará la conexión
export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let database;
    const setupDatabase = async () => {
      try {
        // Llamamos a tu función de inicialización una sola vez
        database = await initializeDatabase();
        setDb(database);
      } catch (error) {
        console.error("Error fatal al inicializar la base de datos en el contexto:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setupDatabase();

    // Opcional: Cierra la base de datos cuando la app se desmonta
    return () => {
      if (database) {
        database.closeAsync();
      }
    };
  }, []);

  // Pasamos la conexión a la base de datos y el estado de carga a los hijos
  return (
    <DatabaseContext.Provider value={{ db, isLoading }}>
      {children}
    </DatabaseContext.Provider>
  );
};

// 3. Creamos un hook personalizado para usar la base de datos fácilmente
export const useDatabase = () => {
  return useContext(DatabaseContext);
};