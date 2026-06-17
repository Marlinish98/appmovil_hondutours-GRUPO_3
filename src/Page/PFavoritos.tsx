import React, { useEffect, useState } from "react";
import { View, Text, FlatList,  StyleSheet, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFavoritosContext } from "../Providers/FavoritosProvider";

export default function Favoritos() {
  const { favoritos, cargarFavoritos, alternarFavorito } = useFavoritosContext();
  const [cargando, setCargando] = useState(true);
  
  // ID estático para pruebas (luego vendrá de tu Auth)
  const idUsuario = 1; 

  // Cargamos los datos al montar el componente de manera asíncrona
  useEffect(() => {
    const inicializarFavoritos = async () => {
      await cargarFavoritos(idUsuario);
      setCargando(false);
    };
    inicializarFavoritos();
  }, []);

  // Si está cargando los datos de la API, muestra el spinner
  if (cargando) {
    return (
      <SafeAreaView style={styles.contenedorCarga}>
        <ActivityIndicator size="large" color="#009c91" />
        <Text style={styles.textoCarga}>Cargando tus favoritos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      <Text style={styles.titulo}>Mis Favoritos</Text>

      {favoritos.length === 0 ? (
        <View style={styles.contenedorVacio}>
          <MaterialIcons name="favorite-border" size={64} color="#94A3B8" />
          <Text style={styles.textoVacio}>Aún no tienes lugares guardados.</Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.idFavoritos.toString()}
          contentContainerStyle={styles.listaFavoritos}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.tarjetaFavorito}>
              

              <Image 
                source={{ uri: item.Info_Lugar.imagen_Lugar }} 
                style={styles.imagenTarjeta} 
              />
              
              <View style={styles.contenedorInfo}>
         
                <View style={styles.filaArriba}>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.nombreLugar}>{item.Info_Lugar.nombre_Lugar}</Text>
                    <Text style={styles.distancia}>{item.Info_Lugar.departamento_HN}</Text>
                  </View>
                  

                  <View style={styles.badgeCalificacion}>
                    <MaterialIcons name="star" size={14} color="#FFF" />
                    <Text style={styles.textoCalificacion}>4.7</Text>
                  </View>
                </View>


                <View style={styles.filaInferior}>
                  <Text style={styles.precio}>
                    Desde <Text style={styles.precioNegrita}>L. {item.Info_Lugar.precio}</Text>
                  </Text>
                  
            
                  <TouchableOpacity 
                    onPress={() => alternarFavorito(item, idUsuario)}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="favorite" size={28} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
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
    marginTop: 10,
    fontSize: 16,
    color: "#64748B",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "#0F172A",
  },
  listaFavoritos: {
    padding: 20,
  },
  tarjetaFavorito: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  imagenTarjeta: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
  },
  contenedorInfo: {
    padding: 10,
  },
  filaArriba: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nombreLugar: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },
  distancia: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
  },
  filaInferior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  precio: {
    fontSize: 14,
    color: "#94A3B8",
  },
  precioNegrita: {
    fontWeight: "bold",
    color: "#0F172A",
    fontSize: 16,
  },
  badgeCalificacion: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#009c91", // Cambiado al color branding de tus cuadros de info
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  textoCalificacion: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 4,
    fontSize: 12,
  },
  contenedorVacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  textoVacio: {
    color: "#64748B",
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
});