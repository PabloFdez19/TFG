// aplicacion-pacientes-anticoagulados/components/AuthContext.js

import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [caregiverIsLoggedIn, setCaregiverIsLoggedIn] = useState(false);
  const [pinIsSet, setPinIsSet] = useState(false);
  const [hasOptedOut, setHasOptedOut] = useState(false);
  // ✅ NUEVO ESTADO: Guardamos la hora de finalización de la sesión
  const [sessionEndTime, setSessionEndTime] = useState(null);

  const checkAuthState = useCallback(async () => {
    try {
      const pin = await AsyncStorage.getItem('caregiverPin');
      const optedOut = await AsyncStorage.getItem('caregiverPinOptOut');
      const loginTimestamp = await AsyncStorage.getItem('caregiverSessionTimestamp');
      
      const isPinCurrentlySet = pin !== null;
      setPinIsSet(isPinCurrentlySet);
      
      const userHasOptedOut = optedOut === 'true';
      setHasOptedOut(userHasOptedOut);

      if (userHasOptedOut) {
        setCaregiverIsLoggedIn(true);
        setSessionEndTime(null); // No hay sesión con tiempo límite
        return;
      }

      if (isPinCurrentlySet && loginTimestamp) {
        const startTime = parseInt(loginTimestamp, 10);
        const endTime = startTime + SESSION_DURATION;
        const timeElapsed = Date.now() - startTime;

        if (timeElapsed < SESSION_DURATION) {
          setCaregiverIsLoggedIn(true);
          setSessionEndTime(endTime); // Establecemos el tiempo de finalización
        } else {
          setCaregiverIsLoggedIn(false);
          await AsyncStorage.removeItem('caregiverSessionTimestamp');
          setSessionEndTime(null);
        }
      } else {
        setCaregiverIsLoggedIn(false);
        setSessionEndTime(null);
      }
    } catch (e) {
      console.error("Error en checkAuthState:", e);
      setCaregiverIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  const login = async (pin) => {
    const storedPin = await AsyncStorage.getItem('caregiverPin');
    if (pin === storedPin) {
      const now = new Date().getTime();
      await AsyncStorage.setItem('caregiverSessionTimestamp', now.toString());
      setSessionEndTime(now + SESSION_DURATION); // Establecemos el tiempo de finalización
      setCaregiverIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('caregiverSessionTimestamp');
    setCaregiverIsLoggedIn(false);
    setSessionEndTime(null); // Limpiamos el tiempo
  };
  
  const setupPin = async (pin) => {
    await AsyncStorage.setItem('caregiverPin', pin);
    await AsyncStorage.removeItem('caregiverPinOptOut');
    setPinIsSet(true);
    setHasOptedOut(false);
    await login(pin);
  };
  
  const skipPinSetup = async () => {
    await AsyncStorage.setItem('caregiverPinOptOut', 'true');
    await AsyncStorage.removeItem('caregiverPin');
    await AsyncStorage.removeItem('caregiverSessionTimestamp');
    setPinIsSet(false);
    setHasOptedOut(true);
    setCaregiverIsLoggedIn(true);
    setSessionEndTime(null);
  };

  const removePin = async () => {
    await AsyncStorage.removeItem('caregiverPin');
    await AsyncStorage.setItem('caregiverPinOptOut', 'true');
    await AsyncStorage.removeItem('caregiverSessionTimestamp');
    setPinIsSet(false);
    setHasOptedOut(true);
    setSessionEndTime(null);
  };

  const preparePinSetup = async () => {
    await AsyncStorage.removeItem('caregiverPin');
    await AsyncStorage.removeItem('caregiverPinOptOut');
    await AsyncStorage.removeItem('caregiverSessionTimestamp');
    setPinIsSet(false);
    setHasOptedOut(false);
    setCaregiverIsLoggedIn(false);
    setSessionEndTime(null);
  };

  const exitCaregiverMode = () => {
    setCaregiverIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        caregiverIsLoggedIn,
        pinIsSet,
        hasOptedOut,
        sessionEndTime, // ✅ Exportamos el nuevo estado
        login,
        logout,
        setupPin,
        skipPinSetup,
        removePin,
        checkAuthState,
        preparePinSetup,
        exitCaregiverMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};