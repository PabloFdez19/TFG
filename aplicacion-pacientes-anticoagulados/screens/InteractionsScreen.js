import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Interactions from '../Styles/InteractionStyles.js';
import * as SQLite from 'expo-sqlite';

const FiltroPopup = ({ 
  label, 
  selectedValue, 
  onValueChange, 
  items,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={Interactions.pickerContainer}>
      <Text style={Interactions.label}>{label}</Text>
      
      <TouchableOpacity 
        style={[
          Interactions.button,
          { 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={Interactions.buttonText}>
          {items.find(item => item.value === selectedValue)?.label || 'Seleccionar'}
        </Text>
        <Icon name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={Interactions.modalOverlay}>
          <View style={Interactions.modalContainer}>
            <Text style={Interactions.modalTitle}>Seleccionar {label}</Text>
            
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  Interactions.optionButton,
                  selectedValue === item.value && Interactions.optionButtonSelected
                ]}
                onPress={() => {
                  onValueChange(item.value);
                  setModalVisible(false);
                }}
              >
                <Text style={[
                  Interactions.optionText,
                  selectedValue === item.value && Interactions.optionTextSelected
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={Interactions.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={Interactions.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const InteractionsScreen = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroRiesgo, setFiltroRiesgo] = useState('todos');
  const [interacciones, setInteracciones] = useState([]);
  const [interaccionesFiltradas, setInteraccionesFiltradas] = useState([]);
  const [situaciones, setSituaciones] = useState([]);
  const [situacionesFiltradas, setSituacionesFiltradas] = useState([]);

  const tipos = [
    { label: 'Todos', value: 'todos' },
    { label: 'Alimentos', value: 'alimento' },
    { label: 'Medicamentos', value: 'medicamento' },
    { label: 'Situaciones', value: 'situacion' }
  ];

  const riesgos = [
    { label: 'Todos', value: 'todos' },
    { label: 'Alto', value: 'alto' },
    { label: 'Medio-alto', value: 'medio-alto' },
    { label: 'Medio', value: 'medio' },
    { label: 'Bajo-medio', value: 'bajo-medio' },
    { label: 'Bajo', value: 'bajo' }
  ];

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('anticoagulados.db');
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
            <Text style={[Interactions.base, Interactions.accionInmediata]}>
              !!Acciones inmediatas!!: {item.acciones_inmediatas}
            </Text>
          )}
          {item.seguimiento && (
            <Text style={[Interactions.base, Interactions.seguimiento]}>
              Seguimiento: {item.seguimiento}
            </Text>
          )}
          {item.prevencion && (
            <Text style={[Interactions.base, Interactions.prevencion]}>
              Prevención: {item.prevencion}
            </Text>
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
        placeholder="Buscar"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* Contenedor de filtros más compacto */}
      <View style={[Interactions.pickersRow, { marginTop: -8 }]}>
        <FiltroPopup
          label="Tipo"
          selectedValue={filtroTipo}
          onValueChange={setFiltroTipo}
          items={tipos}
        />

        <FiltroPopup
          label="Riesgo"
          selectedValue={filtroRiesgo}
          onValueChange={setFiltroRiesgo}
          items={riesgos}
        />
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