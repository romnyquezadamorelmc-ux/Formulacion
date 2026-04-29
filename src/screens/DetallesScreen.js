import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';

const DetallesScreen = ({ route }) => {
  const { formulacion } = route.params;

  const handleCompartir = async () => {
    try {
      const mensaje = `📋 Formulación: ${formulacion.nombre}\n\n` +
        `Tipo: ${formulacion.tipo}\n` +
        `Función: ${formulacion.funcion}\n` +
        `Textura: ${formulacion.textura || 'No especificada'}\n` +
        `Público: ${formulacion.publico || 'No especificado'}\n\n` +
        `🧴 Ingredientes deseados:\n${formulacion.ingredientes || 'No especificados'}\n\n` +
        `⚠️ Ingredientes a evitar:\n${formulacion.evitar || 'No especificados'}\n\n` +
        `📝 Notas:\n${formulacion.notas || 'Sin notas'}\n\n` +
        `Fecha: ${new Date(formulacion.fecha).toLocaleDateString('es-RD')}\n` +
        `Ecosistema SC RD`;

      await Share.share({
        message: mensaje,
        title: `Formulación: ${formulacion.nombre}`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{formulacion.nombre}</Text>
        <Text style={styles.tipo}>{formulacion.tipo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información General</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Función:</Text>
          <Text style={styles.value}>{formulacion.funcion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Textura:</Text>
          <Text style={styles.value}>{formulacion.textura || 'No especificada'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Público objetivo:</Text>
          <Text style={styles.value}>{formulacion.publico || 'No especificado'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Fecha de creación:</Text>
          <Text style={styles.value}>
            {new Date(formulacion.fecha).toLocaleDateString('es-RD', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>

      {formulacion.ingredientes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧴 Ingredientes Deseados</Text>
          <Text style={styles.content}>{formulacion.ingredientes}</Text>
        </View>
      )}

      {formulacion.evitar && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Ingredientes a Evitar</Text>
          <Text style={styles.content}>{formulacion.evitar}</Text>
        </View>
      )}

      {formulacion.notas && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Notas Adicionales</Text>
          <Text style={styles.content}>{formulacion.notas}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.shareButton} onPress={handleCompartir}>
        <Text style={styles.shareButtonText}>📤 Compartir Formulación</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#0066cc',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  tipo: {
    fontSize: 14,
    color: '#c0c0c0',
    marginTop: 8,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 13,
    color: '#666',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 13,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  content: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  shareButton: {
    backgroundColor: '#0066cc',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetallesScreen;
