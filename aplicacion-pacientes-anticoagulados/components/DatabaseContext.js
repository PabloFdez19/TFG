import React, { createContext, useState, useEffect, useContext } from 'react';
import initializeDatabase from './Database/initDatabase'; // Importamos la nueva función

export const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDatabase = async () => {
      try {
        // CORRECCIÓN: Llamamos a la función que nos devuelve la promesa única.
        const database = await initializeDatabase();
        setDb(database);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadDatabase();

    // CORRECCIÓN: La limpieza de la conexión ya no es necesaria aquí,
    // ya que la conexión debe persistir durante toda la vida de la app.
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, isLoading, error }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  return useContext(DatabaseContext);
};