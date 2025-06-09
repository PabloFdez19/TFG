import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Interactions from '../Styles/InteractionStyles.js';
import initializeDatabase from '../components/Database/initDatabase.js';

const InteractionsScreen = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroRiesgo, setFiltroRiesgo] = useState('todos');
  const [interacciones, setInteracciones] = useState([]);
  const [interaccionesFiltradas, setInteraccionesFiltradas] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await initializeDatabase();
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
      const results = await database.getAllAsync('SELECT * FROM interacciones');
      setInteracciones(results);
      setInteraccionesFiltradas(results);
    } catch (error) {
      console.log('Error al cargar interacciones: ', error);
    }
  };

  useEffect(() => {
    if (!interacciones || interacciones.length === 0) return;

    let resultados = [...interacciones];

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
        (item.descripcion && item.descripcion.toLowerCase().includes(textoBusqueda))
      );
    }

    setInteraccionesFiltradas(resultados);
  }, [busqueda, filtroTipo, filtroRiesgo, interacciones]);

  const getColorRiesgo = (riesgo) => {
    switch (riesgo) {
      case 'alto': return 'red';
      case 'medio': return 'orange';
      case 'bajo': return 'green';
      default: return 'gray';
    }
  };

  const renderItem = ({ item }) => (
    <View style={Interactions.itemContainer}>
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
          <Picker.Item label="Medio riesgo" value="medio" />
          <Picker.Item label="Bajo riesgo" value="bajo" />
        </Picker>
      </View>

      <FlatList
        data={interaccionesFiltradas}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={Interactions.emptyText}>No se encontraron resultados</Text>
        }
      />
    </View>
  );
};

export default InteractionsScreen;