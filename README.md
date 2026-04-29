# 🧴 FormulaRD SC

Aplicación móvil de formulación cosmética desarrollada con **React Native** para el ecosistema **SC RD** (Santo Criterio República Dominicana).

## 🎨 Características

- ✅ **Sistema de Autenticación** - Login y registro de usuarios
- ✅ **Formulación Cosmética** - Crear formulaciones con detalles completos
- ✅ **Historial Sincronizado** - Acceso a todas tus formulaciones guardadas
- ✅ **Almacenamiento Local** - Datos guardados en el dispositivo
- ✅ **Perfil de Usuario** - Estadísticas y gestión de cuenta
- ✅ **Compartir Formulaciones** - Exporta y comparte tus creaciones
- ✅ **Diseño SC RD** - Colores corporativos: Azul, Negro y Plateado

## 🚀 Instalación Rápida

### Requisitos
- Node.js 14+
- npm o yarn
- Expo CLI: `npm install -g expo-cli`

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/romnyquezadamorelmc-ux/Formulacion.git
cd Formulacion

# 2. Instalar dependencias
npm install

# 3. Iniciar la aplicación
npm start

# 4. Escanear con tu teléfono
# - Descarga Expo Go desde App Store o Play Store
# - Escanea el código QR que aparece en la terminal
```

## 👤 Usuario de Prueba

Para probar la aplicación, usa:

- **Email:** `test@cosmetics.com`
- **Contraseña:** `1234`

## 📁 Estructura del Proyecto

```
Formulacion/
├── src/
│   └── screens/
│       ├── LoginScreen.js
│       ├── RegisterScreen.js
│       ├── HomeScreen.js
│       ├── FormulacionScreen.js
│       ├── HistorialScreen.js
│       ├── DetallesScreen.js
│       └── PerfilScreen.js
├── App.js
├── app.json
├── package.json
└── README.md
```

## 🎯 Flujo de la App

1. **Login/Registro** - Autenticación del usuario
2. **Home** - Dashboard principal con estadísticas
3. **Nueva Formulación** - Crear formulación cosmética
4. **Historial** - Ver todas las formulaciones guardadas
5. **Detalles** - Ver información completa y compartir
6. **Perfil** - Estadísticas y configuración de usuario

## 🎨 Colores SC RD

- **Azul Primario:** `#0066cc`
- **Negro:** `#001f3f`
- **Plateado:** `#c0c0c0`

## 📱 Compatibilidad

- ✅ iOS 12+
- ✅ Android 5.0+

## 🔄 Sincronización de Datos

Todos los datos se guardan localmente en el dispositivo usando `AsyncStorage`. Los datos persisten entre sesiones.

## 📦 Dependencias Principales

- React Native
- Expo
- React Navigation
- AsyncStorage
- Expo Secure Store

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, abre un issue primero para discutir qué te gustaría cambiar.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Soporte

Para soporte, contacta al equipo de SC RD o abre un issue en el repositorio.

---

**Desarrollado para Ecosistema SC RD** 🇩🇴
