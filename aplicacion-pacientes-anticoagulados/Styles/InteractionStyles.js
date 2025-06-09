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
    fontSize: 16,
    backgroundColor: 'white',
  },
  filtrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filtro: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 8,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  tipo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  riesgo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  accion: {
    fontSize: 16,
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