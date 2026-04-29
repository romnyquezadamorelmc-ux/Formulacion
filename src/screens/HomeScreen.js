import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [formulaciones, setFormulaciones] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarDatos();
    });
    cargarDatos();
    return unsubscribe;
  }, [navigation]);

  const cargarDatos = async () => {
    try {
      const usuarioData = await AsyncStorage.getItem('usuarioLogged');
      if (usuarioData) {
        setUsuario(JSON.parse(usuarioData));
      }

      const formulacionesData = await AsyncStorage.getItem('formulaciones');
      if (formulacionesData) {
        const formulas = JSON.parse(formulacionesData);
        setFormulaciones(formulas.slice(-5));
      }
    } catch (error) {
      console.log('Error cargando datos:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        onPress: async () => {
          await AsyncStorage.removeItem('usuarioLogged');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
        style: 'destructive',
      },
    ]);
  };

  const renderFormulacion = ({ item }) => (
    <TouchableOpacity
      style={styles.formulacionCard}
      onPress={() => navigation.navigate('Detalles', { formulacion: item })}
    >
      <Text style={styles.formulacionNombre}>{item.nombre}</Text>
      <Text style={styles.formulacionTipo}>{item.tipo}</Text>
      <Text style={styles.formulacionFecha}>
        {new Date(item.fecha).toLocaleDateString('es-RD')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.bienvenida}>¡Bienvenido!</Text>
          <Text style={styles.usuario}>{usuario?.nombre || 'Usuario'}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{formulaciones.length}</Text>
            <Text style={styles.statLabel}>Formulaciones</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#001f3f' }]}>
            <Text style={[styles.statNumber, { color: '#0066cc' }]}>SC RD</Text>
            <Text style={[styles.statLabel, { color: '#c0c0c0' }]}>Ecosistema</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonLarge}
            onPress={() => navigation.navigate('Formulacion')}
          >
            <Text style={styles.buttonLargeText}>+ Nueva Formulación</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.buttonSmall, { flex: 1, marginRight: 10 }]}
              onPress={() => navigation.navigate('Historial')}
            >
              <Text style={styles.buttonSmallText}>Historial</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonSmall, { flex: 1 }]}
              onPress={() => navigation.navigate('Perfil')}
            >
              <Text style={styles.buttonSmallText}>Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {formulaciones.length > 0 && (
          <View style={styles.ultinosContainer}>
            <Text style={styles.ultinosTitle}>Últimas Formulaciones</Text>
            <FlatList
              data={formulaciones}
              renderItem={renderFormulacion}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#0066cc',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bienvenida: {
    fontSize: 14,
    color: '#c0c0c0',
  },
  usuario: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonLarge: {
    backgroundColor: '#0066cc',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonLargeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonSmall: {
    backgroundColor: '#001f3f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSmallText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ultinosContainer: {
    paddingHorizontal: 20,
  },
  ultinosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 12,
  },
  formulacionCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
    borderRadius: 6,
    padding: 15,
    marginBottom: 10,
  },
  formulacionNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001f3f',
  },
  formulacionTipo: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  formulacionFecha: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#c0c0c0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#001f3f',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
