// src/components/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

export const AuthContext = createContext();

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  // El estado de login AHORA SIEMPRE EMPIEZA EN FALSE
  const [caregiverIsLoggedIn, setCaregiverIsLoggedIn] = useState(false);
  const [pinIsSet, setPinIsSet] = useState(false);
  
  // Función que se ejecuta al cargar la app o al volver a ella
  const checkAuthState = useCallback(async () => {
    try {
      const pin = await AsyncStorage.getItem('caregiverPin');
      const loginTimestamp = await AsyncStorage.getItem('loginTimestamp');
      
      const isPinConfigured = pin !== null;
      setPinIsSet(isPinConfigured);

      // Si hay un PIN configurado y una sesión iniciada, comprobamos si ha expirado
      if (isPinConfigured && loginTimestamp) {
        const timeElapsed = Date.now() - parseInt(loginTimestamp, 10);
        if (timeElapsed >= SESSION_DURATION) {
          // Si la sesión ha expirado, forzamos el logout.
          await logout();
        } else {
          // Si la sesión sigue activa, mantenemos el estado de login
          setCaregiverIsLoggedIn(true);
        }
      }
    } catch (e) {
      console.error("Error cargando estado de autenticación", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthState();
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkAuthState();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [checkAuthState]);

  // ---- FUNCIONES DE AUTENTICACIÓN (LLAMADAS POR LAS PANTALLAS) ----

  const login = async (pin) => {
    try {
        const storedPin = await AsyncStorage.getItem('caregiverPin');
        if (pin === storedPin) {
        // COMENTARIO: Si el PIN es correcto, guardamos el timestamp del login.
        const now = new Date().getTime();
        await AsyncStorage.setItem('caregiverSessionTimestamp', now.toString());
        
        setCaregiverIsLoggedIn(true);
        return true; // Login exitoso
        }
        return false; // PIN incorrecto
    } catch (e) {
        console.error("Error en el login:", e);
        return false;
    }
    };

  const logout = async () => {
    await AsyncStorage.removeItem('loginTimestamp');
    setCaregiverIsLoggedIn(false);
  };

  const setupPin = async (pin) => {
    await AsyncStorage.setItem('caregiverPin', pin);
    await AsyncStorage.removeItem('caregiverPinOptOut');
    await AsyncStorage.setItem('loginTimestamp', Date.now().toString());
    setPinIsSet(true);
    setCaregiverIsLoggedIn(true);
  };

  const skipPinSetup = async () => {
    await AsyncStorage.setItem('caregiverPinOptOut', 'true');
    await AsyncStorage.removeItem('caregiverPin');
    await AsyncStorage.removeItem('loginTimestamp');
    setPinIsSet(false);
    setCaregiverIsLoggedIn(true); // Se loguea sin PIN y sin temporizador
  };

  const removePin = async () => {
    await AsyncStorage.removeItem('caregiverPin');
    await AsyncStorage.setItem('caregiverPinOptOut', 'true');
    await AsyncStorage.removeItem('loginTimestamp');
    setPinIsSet(false);
    // El estado de login no cambia al quitar el pin, la sesión continúa sin tiempo límite
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};