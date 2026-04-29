import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarPerfil();
    });
    cargarPerfil();
    return unsubscribe;
  }, [navigation]);

  const cargarPerfil = async () => {
    try {
      setLoading(true);
      const usuarioData = await AsyncStorage.getItem('usuarioLogged');
      if (usuarioData) {
        setUsuario(JSON.parse(usuarioData));
      }

      const formulacionesData = await AsyncStorage.getItem('formulaciones');
      if (formulacionesData) {
        const formulas = JSON.parse(formulacionesData);
        const tipos = {};
        formulas.forEach((f) => {
          tipos[f.tipo] = (tipos[f.tipo] || 0) + 1;
        });
        setEstadisticas({
          total: formulas.length,
          tipos,
          ultimaFecha: formulas.length > 0 ? formulas[formulas.length - 1].fecha : null,
        });
      } else {
        setEstadisticas({ total: 0, tipos: {}, ultimaFecha: null });
      }
    } catch (error) {
      console.log('Error cargando perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarSesion = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', [
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

  const handleEliminarDatos = () => {
    Alert.alert(
      'Eliminar Todos los Datos',
      '¿Estás seguro? No se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            await AsyncStorage.removeItem('formulaciones');
            cargarPerfil();
            Alert.alert('Éxito', 'Todos los datos han sido eliminados');
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{usuario?.nombre || 'Usuario'}</Text>
          <Text style={styles.userEmail}>{usuario?.email}</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>📊 Estadísticas</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{estadisticas?.total || 0}</Text>
            <Text style={styles.statLabel}>Formulaciones</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {Object.keys(estadisticas?.tipos || {}).length}
            </Text>
            <Text style={styles.statLabel}>Tipos Distintos</Text>
          </View>
        </View>
      </View>

      {Object.keys(estadisticas?.tipos || {}).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧴 Desglose por Tipo</Text>
          {Object.entries(estadisticas.tipos).map(([tipo, cantidad]) => (
            <View key={tipo} style={styles.typeRow}>
              <Text style={styles.typeLabel}>{tipo}</Text>
              <Text style={styles.typeCount}>{cantidad}</Text>
            </View>
          ))}
        </View>
      )}

      {estadisticas?.ultimaFecha && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Última Actividad</Text>
          <Text style={styles.lastDate}>
            {new Date(estadisticas.ultimaFecha).toLocaleDateString('es-RD', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Información</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>🏢 Ecosistema SC RD</Text>
          <Text style={styles.infoSubtext}>Aplicación de Formulación Cosmética</Text>
          <Text style={styles.infoVersion}>v1.0.0</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.buttonDanger} onPress={handleEliminarDatos}>
          <Text style={styles.buttonDangerText}>🗑️ Eliminar Todos los Datos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLogout} onPress={handleCerrarSesion}>
          <Text style={styles.buttonLogoutText}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userCard: {
    backgroundColor: '#0066cc',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#c0c0c0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 13,
    color: '#c0c0c0',
    marginTop: 4,
  },
  statsSection: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 8,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 8,
    padding: 15,
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  typeLabel: {
    fontSize: 14,
    color: '#333',
  },
  typeCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066cc',
    backgroundColor: '#f0f5ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  lastDate: {
    fontSize: 14,
    color: '#666',
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
    padding: 12,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#001f3f',
  },
  infoSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  infoVersion: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  actionButtons: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  buttonDanger: {
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDangerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonLogout: {
    backgroundColor: '#c0c0c0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonLogoutText: {
    color: '#001f3f',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PerfilScreen;
