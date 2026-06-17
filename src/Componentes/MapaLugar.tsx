import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import { useLugarContext } from '../Providers/LugarProvider'

export default function MapaLugar() {
  const { lugarSeleccionado } = useLugarContext()
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        Alert.alert('Error', 'Permission to access location was denied')
        return
      }
      let currentPosition = await Location.getCurrentPositionAsync({})
      setLocation(currentPosition)
    })()
  }, [])

  if (!lugarSeleccionado) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>No hay ningún lugar seleccionado</Text>
      </View>
    )
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    )
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
      </View>
    )
  }

  const latitudDestino = Number(lugarSeleccionado.latitud)
  const longitudDestino = Number(lugarSeleccionado.longitud)

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitudDestino,
          longitude: longitudDestino,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitudDestino,
            longitude: longitudDestino,
          }}
          title={lugarSeleccionado.nombre_Lugar}
          description={lugarSeleccionado.departamento_HN}
          pinColor="red"
        />

        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Mi Ubicación"
          description="Origen"
          pinColor="blue"
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
  },
  loadingText: {
    fontSize: 14,
    color: '#64748B',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
  },
})