import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Picker,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormulacionScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [funcion, setFuncion] = useState('');
  const [textura, setTextura] = useState('');
  const [publico, setPublico] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [evitar, setEvitar] = useState('');
  const [notas, setNotas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    if (!nombre || !tipo || !funcion) {
      Alert.alert('Error', 'Por favor completa los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const id = Date.now().toString();
      const nuevaFormulacion = {
        id,
        nombre,
        tipo,
        funcion,
        textura,
        publico,
        ingredientes,
        evitar,
        notas,
        fecha: new Date().toISOString(),
      };

      const formulacionesData = await AsyncStorage.getItem('formulaciones');
      const formulaciones = formulacionesData ? JSON.parse(formulacionesData) : [];
      formulaciones.push(nuevaFormulacion);
      await AsyncStorage.setItem('formulaciones', JSON.stringify(formulaciones));

      Alert.alert('Éxito', 'Formulación guardada correctamente', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
            setLoading(false);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al guardar');
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Información Básica</Text>

        <Text style={styles.label}>Nombre del Producto *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Shampoo Hidratante"
          value={nombre}
          onChangeText={setNombre}
          editable={!loading}
        />

        <Text style={styles.label}>Tipo de Producto *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipo}
            onValueChange={setTipo}
            enabled={!loading}
          >
            <Picker.Item label="Selecciona tipo" value="" />
            <Picker.Item label="Shampoo" value="Shampoo" />
            <Picker.Item label="Crema" value="Crema" />
            <Picker.Item label="Gel" value="Gel" />
            <Picker.Item label="Serum" value="Serum" />
            <Picker.Item label="Mascarilla" value="Mascarilla" />
            <Picker.Item label="Tónico" value="Tónico" />
          </Picker>
        </View>

        <Text style={styles.label}>Función del Producto *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Hidratar cabello"
          value={funcion}
          onChangeText={setFuncion}
          editable={!loading}
        />

        <Text style={styles.sectionTitle} style={{ marginTop: 20 }}>
          Especificaciones
        </Text>

        <Text style={styles.label}>Textura</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={textura} onValueChange={setTextura} enabled={!loading}>
            <Picker.Item label="Selecciona textura" value="" />
            <Picker.Item label="Líquido" value="Líquido" />
            <Picker.Item label="Gel" value="Gel" />
            <Picker.Item label="Crema" value="Crema" />
            <Picker.Item label="Espuma" value="Espuma" />
          </Picker>
        </View>

        <Text style={styles.label}>Público Objetivo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Mujeres 25-40 años"
          value={publico}
          onChangeText={setPublico}
          editable={!loading}
        />

        <Text style={styles.sectionTitle} style={{ marginTop: 20 }}>
          Ingredientes
        </Text>

        <Text style={styles.label}>Ingredientes Deseados</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Ej: Aceite de argán, vitamina E, proteína de seda"
          value={ingredientes}
          onChangeText={setIngredientes}
          multiline
          numberOfLines={4}
          editable={!loading}
        />

        <Text style={styles.label}>Ingredientes a Evitar</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Ej: Sulfatos, parabenos, alcohol"
          value={evitar}
          onChangeText={setEvitar}
          multiline
          numberOfLines={4}
          editable={!loading}
        />

        <Text style={styles.label}>Notas Adicionales</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Ej: Aroma frutal, textura ligera..."
          value={notas}
          onChangeText={setNotas}
          multiline
          numberOfLines={3}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
          onPress={handleGuardar}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Guardando...' : 'Guardar Formulación'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.buttonSecondaryText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#000',
  },
  textarea: {
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonPrimary: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: '#0066cc',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondaryText: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default FormulacionScreen;
