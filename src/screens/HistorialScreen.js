import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistorialScreen = ({ navigation }) => {
  const [formulaciones, setFormulaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarFormulaciones();
    });
    cargarFormulaciones();
    return unsubscribe;
  }, [navigation]);

  const cargarFormulaciones = async () => {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem('formulaciones');
      if (data) {
        const formulas = JSON.parse(data);
        const ordenadas = formulas.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );
        setFormulaciones(ordenadas);
      }
    } catch (error) {
      console.log('Error cargando historial:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = (id) => {
    Alert.alert('Eliminar', '¿Estás seguro de que quieres eliminar esta formulación?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            const data = await AsyncStorage.getItem('formulaciones');
            const formulas = JSON.parse(data);
            const filtradas = formulas.filter((f) => f.id !== id);
            await AsyncStorage.setItem('formulaciones', JSON.stringify(filtradas));
            cargarFormulaciones();
            Alert.alert('Éxito', 'Formulación eliminada');
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderFormulacion = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detalles', { formulacion: item })}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitulo}>{item.nombre}</Text>
          <Text style={styles.cardTipo}>{item.tipo}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleEliminar(item.id)}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cardFuncion}>{item.funcion}</Text>
      <Text style={styles.cardFecha}>
        {new Date(item.fecha).toLocaleDateString('es-RD', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {formulaciones.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {formulaciones.length} Formulación{formulaciones.length !== 1 ? 'es' : ''}
            </Text>
          </View>
          <FlatList
            data={formulaciones}
            renderItem={renderFormulacion}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay formulaciones guardadas</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('Formulacion')}
          >
            <Text style={styles.createButtonText}>+ Crear Nueva</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderLeftWidth: 5,
    borderLeftColor: '#0066cc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001f3f',
  },
  cardTipo: {
    fontSize: 12,
    color: '#0066cc',
    marginTop: 4,
  },
  cardFuncion: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  cardFecha: {
    fontSize: 11,
    color: '#999',
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HistorialScreen;
