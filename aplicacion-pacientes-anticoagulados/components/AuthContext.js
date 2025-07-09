// src/components/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

export const AuthContext = createContext();

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [caregiverIsLoggedIn, setCaregiverIsLoggedIn] = useState(false);
  const [pinIsSet, setPinIsSet] = useState(false);

  // Esta función es la que comprueba y decide el estado de login
  const checkAuthState = useCallback(async () => {
    setIsLoading(true);
    try {
      const pin = await AsyncStorage.getItem('caregiverPin');
      const optedOut = await AsyncStorage.getItem('caregiverPinOptOut');
      const loginTimestamp = await AsyncStorage.getItem('loginTimestamp');
      
      const isPinCurrentlySet = pin !== null;
      setPinIsSet(isPinCurrentlySet);

      if (optedOut === 'true') {
        setCaregiverIsLoggedIn(true);
        setIsLoading(false);
        return; // Salimos de la función aquí
      }

      if (isPinCurrentlySet && loginTimestamp) {
        const timeElapsed = Date.now() - parseInt(loginTimestamp, 10);
        if (timeElapsed < SESSION_DURATION) {
          setCaregiverIsLoggedIn(true);
        } else {
          setCaregiverIsLoggedIn(false);
          await AsyncStorage.removeItem('loginTimestamp');
        }
      } else {
        setCaregiverIsLoggedIn(false);
      }
    } catch (e) {
      console.error("Error en checkAuthState:", e);
      setCaregiverIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (pin) => {
    const storedPin = await AsyncStorage.getItem('caregiverPin');
    if (pin === storedPin) {
      const now = new Date().getTime();
      await AsyncStorage.setItem('caregiverSessionTimestamp', now.toString());
      setCaregiverIsLoggedIn(true); // Esto hará que App.js cambie a las pantallas de cuidador
      return true;
    }
    return false;
  };
  
  const logout = async () => {
    await AsyncStorage.removeItem('caregiverSessionTimestamp');
    setCaregiverIsLoggedIn(false); // Esto hará que App.js vuelva a las pantallas públicas
  };
  
  const setupPin = async (pin) => {
    await AsyncStorage.setItem('caregiverPin', pin);
    await AsyncStorage.removeItem('caregiverPinOptOut');
    setPinIsSet(true);
    await login(pin); // Inicia sesión directamente al configurar
  };
  
  const skipPinSetup = async () => {
    await AsyncStorage.setItem('caregiverPinOptOut', 'true');
    await AsyncStorage.removeItem('caregiverPin');
    await AsyncStorage.removeItem('caregiverSessionTimestamp');
    setPinIsSet(false);
    setCaregiverIsLoggedIn(true);
  };

  const removePin = async () => {
    await AsyncStorage.removeItem('caregiverPin');
    await AsyncStorage.setItem('caregiverPinOptOut', 'true');
    await AsyncStorage.removeItem('caregiverSessionTimestamp');
    setPinIsSet(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        caregiverIsLoggedIn,
        pinIsSet,
        login,
        logout,
        setupPin,
        skipPinSetup,
        removePin,
        checkAuthState // La mantenemos por si la necesitas en otro sitio
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};