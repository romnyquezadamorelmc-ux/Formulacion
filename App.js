import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pantallas
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import FormulacionScreen from './src/screens/FormulacionScreen';
import HistorialScreen from './src/screens/HistorialScreen';
import DetallesScreen from './src/screens/DetallesScreen';
import PerfilScreen from './src/screens/PerfilScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    try {
      const usuario = await AsyncStorage.getItem('usuarioLogged');
      if (usuario) {
        setIsLogged(true);
      }
    } catch (error) {
      console.log('Error verificando login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLogged ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
              listeners={{
                focus: () => setIsLogged(false),
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: 'Crear Cuenta',
                headerStyle: {
                  backgroundColor: '#0066cc',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'FormulaRD SC',
                headerStyle: {
                  backgroundColor: '#0066cc',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
              listeners={{
                focus: () => setIsLogged(true),
              }}
            />
            <Stack.Screen
              name="Formulacion"
              component={FormulacionScreen}
              options={{
                title: 'Nueva Formulación',
                headerStyle: {
                  backgroundColor: '#0066cc',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Historial"
              component={HistorialScreen}
              options={{
                title: 'Historial',
                headerStyle: {
                  backgroundColor: '#0066cc',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Detalles"
              component={DetallesScreen}
              options={{
                title: 'Detalles',
                headerStyle: {
                  backgroundColor: '#0066cc',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Perfil"
              component={PerfilScreen}
              options={{
                title: 'Mi Perfil',
                headerStyle: {
                  backgroundColor: '#0066cc',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
