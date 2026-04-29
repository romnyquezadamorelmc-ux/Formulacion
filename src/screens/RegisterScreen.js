import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nombre || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 4) {
      Alert.alert('Error', 'La contraseña debe tener al menos 4 caracteres');
      return;
    }

    setLoading(true);
    try {
      const usuarios = await AsyncStorage.getItem('usuarios');
      const usuariosArray = usuarios ? JSON.parse(usuarios) : [];

      const usuarioExistente = usuariosArray.find((u) => u.email === email);
      if (usuarioExistente) {
        Alert.alert('Error', 'Este email ya está registrado');
        setLoading(false);
        return;
      }

      const nuevoUsuario = { nombre, email, password };
      usuariosArray.push(nuevoUsuario);
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuariosArray));

      Alert.alert('Éxito', 'Cuenta creada correctamente', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login');
            setLoading(false);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al registrar');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Crear Cuenta</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#999"
            value={nombre}
            onChangeText={setNombre}
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.buttonSecondaryText}>Volver al Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  buttonPrimary: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: '#0066cc',
    padding: 15,
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

export default RegisterScreen;
