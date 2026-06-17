import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { usuarioContext } from '../Context/UsuarioContext';

export default function Perfil() {
  const { usuario, cerrarSesion } = useContext(usuarioContext);

  const confirmarCierreSesion = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas salir de HonduTours?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, salir", 
          onPress: () => cerrarSesion(),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={style.contenedor}>

      <View style={style.encabezadoPerfil}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={style.fotoPerfil}
        />
        <Text style={style.nombreUsuario}>{usuario?.nombre_Usuario || 'Usuario Invitado'}</Text>
        <Text style={style.correoUsuario}>{usuario?.correo || 'Sin correo registrado'}</Text>
      </View>


      <View style={style.seccionAcciones}>
        <TouchableOpacity style={style.botonCerrarSesion} onPress={confirmarCierreSesion}>
          <Text style={style.textoCerrarSesion}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const style = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  encabezadoPerfil: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#40D3D3',
  },
  nombreUsuario: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  correoUsuario: {
    fontSize: 16,
    color: '#666',
  },
  seccionAcciones: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  botonCerrarSesion: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#FF4C4C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  textoCerrarSesion: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});