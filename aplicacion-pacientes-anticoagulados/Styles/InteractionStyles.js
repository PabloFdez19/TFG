import {StyleSheet} from 'react-native';
const Interactions = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  buscador: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 20,
    backgroundColor: 'white',
  },
  filter_container: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 16, // Más grande
    color: '#555',
    marginBottom: 8,
    fontWeight: '600', // Más negrita
  },
  button: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10, // Bordes más redondeados
    paddingVertical: 14, // Más alto
    paddingHorizontal: 12,
    justifyContent: 'center',
    minHeight: 50, // Altura mínima más grande
  },
  buttonText: {
    fontSize: 18, // Texto más grande
    color: '#333',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
   pickersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 0, // Reducimos el padding horizontal
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 4, // Reducimos el margen entre botones
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  optionButtonSelected: {
    backgroundColor: '#4a90e2',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },  
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nombre: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  tipo: {
    fontSize: 20,
    color: '#666',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 18,
    marginBottom: 8,
    color: '#444',
  },
  riesgo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  accion: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default Interactions;