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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('test@cosmetics.com');
  const [password, setPassword] = useState('1234');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const usuarios = await AsyncStorage.getItem('usuarios');
      const usuariosArray = usuarios ? JSON.parse(usuarios) : [];
      
      const usuarioEncontrado = usuariosArray.find(
        (u) => u.email === email && u.password === password
      );

      if (usuarioEncontrado || (email === 'test@cosmetics.com' && password === '1234')) {
        await AsyncStorage.setItem('usuarioLogged', JSON.stringify({
          email,
          nombre: 'Usuario SC RD',
        }));
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Error', 'Email o contraseña incorrectos');
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={styles.logo}>FormulaRD</Text>
          <Text style={styles.subtitle}>Ecosistema SC RD</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>

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

          <TouchableOpacity
            style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate('Register')}
            disabled={loading}
          >
            <Text style={styles.buttonSecondaryText}>Crear Nueva Cuenta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Usuario de prueba:</Text>
          <Text style={styles.infoCode}>Email: test@cosmetics.com</Text>
          <Text style={styles.infoCode}>Contraseña: 1234</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#c0c0c0',
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
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 15,
  },
  infoContainer: {
    backgroundColor: '#c0c0c0',
    borderRadius: 8,
    padding: 15,
    marginTop: 30,
  },
  infoText: {
    color: '#001f3f',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoCode: {
    color: '#001f3f',
    fontSize: 12,
    fontFamily: 'Courier New',
  },
});

export default LoginScreen;
