import React, { useEffect } from "react"
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useLugarContext } from "../Providers/LugarProvider"

export default function MenuPrincipal() {
  const navigation = useNavigation<any>()
  
  const {
    lugares,
    obtenerLugares,
    obtenerLugarPorId
  } = useLugarContext()

  useEffect(() => {
    obtenerLugares()
  }, [])

  const handleSeleccionarLugar = async (id: number) => {
    await obtenerLugarPorId(id)
    navigation.navigate("DetalleLugar")
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Turismo en Honduras</Text>
      </View>

      <FlatList
        data={lugares}
        keyExtractor={(item) => item.idInfo_Lugar.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => handleSeleccionarLugar(item.idInfo_Lugar)}
          >
            <Image
              source={{ uri: item.imagen_Lugar }}
              style={styles.cardImage}
            />
            
            <View style={styles.textOverlay}>
              <Text style={styles.placeName}>{item.nombre_Lugar}</Text>
              <Text style={styles.placeLocation}>❯ {item.departamento_HN}</Text>
            </View>

            <View style={styles.blueBadge}>
              <Text style={styles.badgeArrow}>❯</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {

    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#40D3D3',
    marginBottom:5
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerIcon: {
    fontSize: 20,
    color: '#1A1A1A',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  card: {
    width: '100%',
    height: 180,
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 40,
    paddingLeft: 21,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    borderBottomLeftRadius: 24,
  },
  placeName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  placeLocation: {
    color: '#E0E0E0',
    fontSize: 14,
    paddingLeft: 10,
  },
  blueBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 46,
    backgroundColor: '#40D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  badgeArrow: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
})