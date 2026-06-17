import React, { useState, useContext } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { usuarioContext } from '../Context/UsuarioContext';

export default function Login() {
  const { iniciarSesion } = useContext(usuarioContext);
  const navigation = useNavigation<any>();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const IniciarApp = async () => {
    if (!correo.trim() || !contrasena.trim()) {
      Alert.alert("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    const resultado = await iniciarSesion(correo, contrasena);

    if (!resultado) {
      Alert.alert(
        "Usuario no encontrado",
        "!Crea una cuenta para empezar tu aventura!"
      );
      return;
    }
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView contentContainerStyle={styles.contenedorScroll} bounces={false}>

        <View style={styles.contenedorImagen}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/30219384/pexels-photo-30219384.jpeg' }}
            style={styles.imagenIlustracion}
            resizeMode="cover"
          />
        </View>

        <View style={styles.contenedorFormulario}>
          <Text style={styles.textoTitulo}>Bienvenido</Text>
          <Text style={styles.textoSubtitulo}>Tu aventura inicia con HonduTour</Text>

           <Text style={styles.etiqueta}>Correo Electrónico</Text>
          <View style={styles.contenedorInput}>
            <TextInput 
              style={styles.entradaTexto}
              placeholder="Ingrese su Correo"
              placeholderTextColor="#A5C7CC"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
         <Text style={styles.etiqueta}>Contraseña</Text>
          <View style={styles.contenedorInput}>
            <TextInput
              style={styles.entradaTexto}
              placeholder="Ingrese su Contraseña"
              placeholderTextColor="#A5C7CC"
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.botonIniciarSesion} onPress={IniciarApp}>
            <Text style={styles.textoBoton}>Iniciar Sesion</Text>
          </TouchableOpacity>

          <View style={styles.contenedorFooter}>
            <Text style={styles.textoFooter}>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.textoRegistro}> Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contenedorScroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
  },
  contenedorImagen: {
    width: '100%',
    height: '45%',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
  },
  imagenIlustracion: {
    width: '100%',
    height: '100%',
  },
  contenedorFormulario: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
  textoTitulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  textoSubtitulo: {
    fontSize: 16,
    color: '#A5C7CC',
    marginBottom: 28,
  },
  contenedorInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF7F9',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 16,
  },
  entradaTexto: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  botonIniciarSesion: {
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
    marginBottom: 28,
  },
  textoBoton: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contenedorFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFooter: {
    fontSize: 14,
    color: '#555',
  },
  textoRegistro: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#40D3D3',
  },
   etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 5,
    marginTop: 1,
  },
});