import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import Interactions from '../Styles/InteractionStyles';
import {initializeDatabase} from '../Database/initDatabase'; // Asegúrate de que la ruta sea correcta

const InteractionsScreen = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroRiesgo, setFiltroRiesgo] = useState('todos');
  const [interacciones, setInteracciones] = useState([]);
  const [interaccionesFiltradas, setInteraccionesFiltradas] = useState([]);


  // Cargar todos los datos al iniciar
  useEffect(() => {
    initializeDatabase();
    cargarInteracciones();
  }, []);

  const cargarInteracciones = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM interacciones',
        [],
        (_, {rows}) => {
          const datos = rows.raw();
          setInteracciones(datos);
          setInteraccionesFiltradas(datos);
        },
        error => console.log('Error al cargar interacciones: ', error),
      );
    });
  };

  // Aplicar filtros cuando cambia la búsqueda o los filtros
  useEffect(() => {
    let resultados = interacciones;

    // Filtrar por tipo
    if (filtroTipo !== 'todos') {
      resultados = resultados.filter(item => item.tipo === filtroTipo);
    }

    // Filtrar por riesgo
    if (filtroRiesgo !== 'todos') {
      resultados = resultados.filter(item => item.riesgo === filtroRiesgo);
    }

    // Filtrar por texto de búsqueda
    if (busqueda) {
      const textoBusqueda = busqueda.toLowerCase();
      resultados = resultados.filter(item => 
        item.nombre.toLowerCase().includes(textoBusqueda) || 
        item.descripcion.toLowerCase().includes(textoBusqueda)
      );
    }

    setInteraccionesFiltradas(resultados);
  }, [busqueda, filtroTipo, filtroRiesgo, interacciones]);

  const renderItem = ({item}) => (
    <View style={Interactions.itemContainer}>
      <Text style={Interactions.nombre}>{item.nombre}</Text>
      <Text style={Interactions.tipo}>{item.tipo.toUpperCase()}</Text>
      <Text style={Interactions.descripcion}>{item.descripcion}</Text>
      {item.riesgo && (
        <Text style={[Interactions.riesgo, {color: getColorRiesgo(item.riesgo)}]}>
          Riesgo: {item.riesgo.toUpperCase()}
        </Text>
      )}
      {item.accion_recomendada && (
        <Text style={Interactions.accion}>Acción recomendada: {item.accion_recomendada}</Text>
      )}
    </View>
  );

  const getColorRiesgo = (riesgo) => {
    switch(riesgo) {
      case 'alto': return 'red';
      case 'medio': return 'orange';
      case 'bajo': return 'green';
      default: return 'gray';
    }
  };

  return (
    <View style={Interactions.container}>
      {/* Barra de búsqueda */}
      <TextInput
        style={Interactions.buscador}
        placeholder="Buscar alimento, medicamento o situación..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* Filtros */}
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

      {/* Lista de resultados */}
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