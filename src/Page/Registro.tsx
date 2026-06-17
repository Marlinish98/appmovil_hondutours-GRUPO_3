import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';

export default function Registro({ navigation }: any) {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [cargando, setCargando] = useState(false);

  const urlBase = "https://wldg3rx3-8080.use2.devtunnels.ms"; 

  const handleRegistro = async () => {
    if (!nombreUsuario.trim() || !correo.trim() || !contrasenia.trim()) {
      Alert.alert("Campos vacíos", "Por favor, completa todos los campos.");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(`${urlBase}/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tunnel-Skip-Anti-Phishing-Page': 'true' 
        },
        body: JSON.stringify({
          nombre_Usuario: nombreUsuario, 
          correo: correo,
          contrasenia: contrasenia      
        })
      });

      const json = await respuesta.json();

      if (respuesta.ok) {
        Alert.alert("¡Bienvenido!", `Usuario ${json.nombre_Usuario} registrado con éxito.`);
        
        setNombreUsuario('');
        setCorreo('');
        setContrasenia('');
      } else {
        Alert.alert("Error", json.message || "No se pudo realizar el registro.");
      }

    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      <ScrollView contentContainerStyle={styles.contenidoScroll} keyboardShouldPersistTaps="handled">
        
        <View style={styles.contenedorEncabezado}>
          <Text style={styles.titulo}>Crear Cuenta</Text>
          <Text style={styles.subtitulo}>Regístrate para guardar tus lugares favoritos</Text>
        </View>

        <View style={styles.contenedorFormulario}>
          <Text style={styles.etiqueta}>Nombre de Usuario</Text>
          <TextInput 
            style={styles.entradaTexto}
            placeholder="Introduce tu nombre"
            placeholderTextColor="#94A3B8"
            value={nombreUsuario}
            onChangeText={setNombreUsuario}
          />

          <Text style={styles.etiqueta}>Correo Electrónico</Text>
          <TextInput 
            style={styles.entradaTexto}
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={correo}
            onChangeText={setCorreo}
          />

          <Text style={styles.etiqueta}>Contraseña</Text>
          <TextInput 
            style={styles.entradaTexto}
            placeholder="Crea una contraseña"
            placeholderTextColor="#94A3B8"
            secureTextEntry={true}
            autoCapitalize="none"
            value={contrasenia}
            onChangeText={setContrasenia}
          />

          <TouchableOpacity 
            style={[styles.botonRegistro, cargando && styles.botonDeshabilitado]} 
            onPress={handleRegistro}
            disabled={cargando}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBoton}>
              {cargando ? "Registrando..." : "Registrarse"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footerRegisterContainer}>
            <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signUpText}> Inicia Sesion</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contenidoScroll: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  contenedorEncabezado: {
    marginBottom: 32,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  contenedorFormulario: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginTop: 12,
  },
  entradaTexto: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 12,
  },
  botonRegistro: {
    backgroundColor: '#40D3D3',
    borderRadius: 20,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#40D3D3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  botonDeshabilitado: {
    backgroundColor: '#94A3B8',
  },
  textoBoton: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerRegisterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  signUpText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#40D3D3',
  },
});