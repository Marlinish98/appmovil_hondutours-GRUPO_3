import React, { useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from "react-native"
import { useLugarContext } from "../Providers/LugarProvider"
import { useFavoritosContext } from "../Providers/FavoritosProvider"
import MapaLugar from "../Componentes/MapaLugar"
import { MaterialIcons } from '@expo/vector-icons';

export default function DetalleLugar() {
  const { lugarSeleccionado } = useLugarContext();
  const { favoritos, alternarFavorito, cargarFavoritos } = useFavoritosContext();
  
  const idUsuario = 1;
  useEffect(() => {
    cargarFavoritos(idUsuario);
  }, []);

  const esFavorito = favoritos.some(
    (fav) => fav.Info_Lugar?.idInfo_Lugar === lugarSeleccionado?.idInfo_Lugar
  );

  const handleToggleFavorito = () => {
  if (!lugarSeleccionado) {
    console.log("No se ejecutó");
    return;
  }
  
  const favoritoData = {
    idFavoritos: 0,
    Usuarios_idUsuarios: idUsuario,
    Info_Lugar: lugarSeleccionado,
  };
  alternarFavorito(favoritoData, idUsuario);
};

  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      <ScrollView contentContainerStyle={styles.contenidoScroll} showsVerticalScrollIndicator={false}>


        <View style={styles.filaEncabezado}>
          <View style={styles.contenedorTextoEncabezado}>
            <Text style={styles.tituloPrincipal}>{lugarSeleccionado?.nombre_Lugar}</Text>
            <Text style={styles.textoDescripcion}>{lugarSeleccionado?.departamento_HN}</Text>
            <View style={styles.contenedorCalificacion}>
              <MaterialIcons name="star" size={16} color="#FBBF24" />
              <Text style={styles.textoCalificacion}>4.7 Calificación</Text>
            </View>
          </View>
          <View style={styles.contenedorImagenPequena}>
            <Image
              source={{ uri: lugarSeleccionado?.imagen_Lugar }}
              style={styles.imagenTarjeta}
              resizeMode="cover"
            />
          </View>
        </View>


        <View style={styles.contenedorSeccion}>
          <Text style={styles.tituloSeccion}>Detalles del lugar</Text>
          <Text style={styles.textoDescripcion}>{lugarSeleccionado?.descripcion}</Text>
        </View>

       <View style={styles.insigniaCategoria}>
              <Text style={styles.textoCategoria}>Categoria: {lugarSeleccionado?.categoria?.nombre_categoria|| 'Sin Categoria'}</Text>
            </View>

        <View style={styles.contenedorSeccion}>
          <Text style={styles.tituloSeccion}>Nuestros Beneficios</Text>
          <View style={styles.filaBeneficios}>
            <View style={styles.insigniaBeneficio}>
              <MaterialIcons name="directions-bus" size={16} color="#334155" style={styles.iconoBeneficio} />
              <Text style={styles.textoBeneficio}>Transporte</Text>
            </View>
            <View style={styles.insigniaBeneficio}>
              <MaterialIcons name="restaurant" size={16} color="#334155" style={styles.iconoBeneficio} />
              <Text style={styles.textoBeneficio}>Comida</Text>
            </View>
            <View style={styles.insigniaBeneficio}>
              <MaterialIcons name="hotel" size={16} color="#334155" style={styles.iconoBeneficio} />
              <Text style={styles.textoBeneficio}>Alojamiento</Text>
            </View>
          </View>
        </View>

        <View style={styles.contenedorMapa}>
          <MapaLugar />
        </View>

        <View style={styles.contenedorSeccion}>
          <Text style={styles.tituloSeccion}>Más información</Text>
          <View style={styles.contenedorFila}>
            <View style={styles.cuadroInfo}>
              <Text style={styles.etiqueta}>Precio</Text>
              <Text style={styles.valorTexto}>L. {lugarSeleccionado?.precio}</Text>
            </View>
            <View style={styles.cuadroInfo}>
              <Text style={styles.etiqueta}>Cupos</Text>
              <Text style={styles.valorTexto}>{lugarSeleccionado?.personas_disponibilidad}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.barraReserva}>
        <TouchableOpacity 
          style={styles.botonFavoritos} 
          activeOpacity={0.8}
          onPress={handleToggleFavorito}
        >
          <Text style={styles.textoBoton}>
            {esFavorito ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  contenedorCarga: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  textoCarga: {
    fontSize: 16,
    color: "#64748B",
  },
  contenidoScroll: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  filaEncabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 24,
  },
  contenedorTextoEncabezado: {
    flex: 1,
    paddingRight: 16,
  },
  tituloPrincipal: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  contenedorCalificacion: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoCalificacion: {
    fontSize: 14,
    color: "#94A3B8",
    marginLeft: 4,
  },
  contenedorImagenPequena: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  imagenTarjeta: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  contenedorSeccion: {
    marginBottom: 10,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  textoDescripcion: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
  },
  filaBeneficios: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  insigniaBeneficio: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  insigniaCategoria:{
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding:50,
    marginBottom:10

  },
  textoCategoria:{
    fontWeight:600,
    fontSize:16
  },
  iconoBeneficio: {
    marginRight: 6,
  },
  textoBeneficio: {
    fontSize: 12,
    color: "#334155",
    fontWeight: "500",
  },
  contenedorMapa: {
    width: "100%",
    height: 240,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#E2E8F0",
  },
  contenedorFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  cuadroInfo: {
    width: "48%",
    backgroundColor: "#009c91",
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: "center",
  },
  etiqueta: {
    fontSize: 12,
    color: "#ffffff",
    marginBottom: 1,
  },
  valorTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  barraReserva: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    height: 64,
    backgroundColor: "#d3000b",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  botonFavoritos: {
    paddingVertical: 10,
  },
  textoBoton: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
})