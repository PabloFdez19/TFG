import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Interactions from '../Styles/InteractionStyles.js';
import * as SQLite from 'expo-sqlite';

const InteractionsScreen = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroRiesgo, setFiltroRiesgo] = useState('todos');
  const [interacciones, setInteracciones] = useState([]);
  const [interaccionesFiltradas, setInteraccionesFiltradas] = useState([]);
  const [situaciones, setSituaciones] = useState([]);
  const [situacionesFiltradas, setSituacionesFiltradas] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('anticoagulados.db');
        setDb(database);
        await cargarInteracciones(database);
      } catch (err) {
        console.error('Error al inicializar DB:', err);
      }
    };

    initDB();
  }, []);

  const cargarInteracciones = async (database) => {
    if (!database) return;

    try {
      const interacciones = await database.getAllAsync('SELECT * FROM interacciones');
      const situaciones = await database.getAllAsync('SELECT * FROM situaciones');
      const results = [...interacciones, ...situaciones];
      setInteracciones(results.filter(item => item.tipo !== 'situacion'));
      setInteraccionesFiltradas(results.filter(item => item.tipo !== 'situacion'));
      setSituaciones(results.filter(item => item.tipo === 'situacion'));
      setSituacionesFiltradas(results.filter(item => item.tipo === 'situacion'));
    } catch (error) {
      console.log('Error al cargar interacciones: ', error);
    }
  };

  useEffect(() => {
    if ((!interacciones || interacciones.length === 0)&&(!situaciones || situaciones.length === 0)) return;

    let resultados = [...interacciones, ...situaciones];

    if (filtroTipo !== 'todos') {
      resultados = resultados.filter(item => item.tipo === filtroTipo);
    }

    if (filtroRiesgo !== 'todos') {
      resultados = resultados.filter(item => item.riesgo === filtroRiesgo);
    }

    if (busqueda) {
      const textoBusqueda = busqueda.toLowerCase();
      resultados = resultados.filter(item =>
        (item.nombre && item.nombre.toLowerCase().includes(textoBusqueda)) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(textoBusqueda)) ||
        (item.situacion && item.situacion.toLowerCase().includes(textoBusqueda))
      );
    }

    setInteraccionesFiltradas(resultados.filter(item => item.tipo !== 'situacion'));
    setSituacionesFiltradas(resultados.filter(item => item.tipo === 'situacion'));
  }, [busqueda, filtroTipo, filtroRiesgo, interacciones, situaciones]);

  const getColorRiesgo = (riesgo) => {
    switch (riesgo) {
      case 'alto': return 'red';
      case 'medio-alto': return 'darkorange';
      case 'medio': return 'orange';
      case 'bajo-medio': return 'green';
      case 'bajo': return 'lightgreen';
      default: return 'gray';
    }
  };

  const renderItem = ({ item }) => (
  <View style={Interactions.itemContainer}>
    {item.tipo === 'situacion' ? (
      <>
        <Text style={Interactions.nombre}>{item.situacion}</Text>

        {item.riesgo && (
          <Text style={[Interactions.riesgo, { color: getColorRiesgo(item.riesgo) }]}>
            Riesgo: {item.riesgo.toUpperCase()}
          </Text>
        )}
        {item.acciones_inmediatas && (
          <Text style={Interactions.accion}>!!Acciones inmediatas!!: {item.acciones_inmediatas}</Text>
        )}
        {item.seguimiento && (
          <Text style={Interactions.accion}>Seguimiento: {item.seguimiento}</Text>
        )}
        {item.prevencion && (
          <Text style={Interactions.accion}>Prevencion: {item.prevencion}</Text>
        )}
      </>
    ) : (
      <>
        <Text style={Interactions.nombre}>{item.nombre}</Text>
        <Text style={Interactions.tipo}>{item.tipo.toUpperCase()}</Text>
        <Text style={Interactions.descripcion}>{item.descripcion}</Text>
        {item.riesgo && (
          <Text style={[Interactions.riesgo, { color: getColorRiesgo(item.riesgo) }]}>
            Riesgo: {item.riesgo.toUpperCase()}
          </Text>
        )}
        {item.accion_recomendada && (
          <Text style={Interactions.accion}>Acción recomendada: {item.accion_recomendada}</Text>
        )}
      </>
    )}
  </View>
);

  return (
    <View style={Interactions.container}>
      <TextInput
        style={Interactions.buscador}
        placeholder="Buscar alimento, medicamento o situación..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <View style={Interactions.filtrosContainer}>
        <Picker
          selectedValue={filtroTipo}
          style={Interactions.filtro}
          onValueChange={setFiltroTipo}>
          <Picker.Item label="Todos los tipos" value="todos" />
          <Picker.Item label="Alimentos" value="alimento" />
          <Picker.Item label="Medicamentos" value="medicamento" />
          <Picker.Item label="Situaciones" value="situacion" />
        </Picker>

        <Picker
          selectedValue={filtroRiesgo}
          style={Interactions.filtro}
          onValueChange={setFiltroRiesgo}>
          <Picker.Item label="Todos los riesgos" value="todos" />
          <Picker.Item label="Alto riesgo" value="alto" />
          <Picker.Item label="Medio-alto riesgo" value="medio-alto" />
          <Picker.Item label="Medio riesgo" value="medio" />
          <Picker.Item label="Bajo-medio riesgo" value="bajo-medio" />
          <Picker.Item label="Bajo riesgo" value="bajo" />
        </Picker>
      </View>

      <FlatList
        data={[...interaccionesFiltradas, ...situacionesFiltradas]}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}-${item.tipo}`}
        ListEmptyComponent={
          <Text style={Interactions.emptyText}>No se encontraron resultados</Text>
        }
      />
    </View>
  );
};

export default InteractionsScreen;