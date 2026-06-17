import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useLugarContext } from '../Providers/LugarProvider';
import { Lugar } from '../Models/Lugar';
import { MaterialIcons } from '@expo/vector-icons';

export default function Admin() {
    const { lugares, obtenerLugares, actualizarLugar } = useLugarContext();

    const [lugarEditando, setLugarEditando] = useState<Lugar | null>(null);
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [cupos, setCupos] = useState('');
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        obtenerLugares();
    }, []);

    const seleccionarParaEditar = (lugar: Lugar) => {
        setLugarEditando(lugar);
        setDescripcion(lugar.descripcion || '');
        setPrecio(lugar.precio?.toString() || '0');
        setCupos(lugar.personas_disponibilidad?.toString() || '0');
    };

    const handleGuardar = async () => {
        if (!lugarEditando) return;
        if (!descripcion.trim() || !precio.trim() || !cupos.trim()) {
            Alert.alert("Campos vacíos", "Por favor, llena toda la información.");
            return;
        }

        setGuardando(true);

        const datosActualizados: Lugar = {
            ...lugarEditando,
            descripcion: descripcion,
            precio: parseFloat(precio),
            personas_disponibilidad: parseInt(cupos, 10),
        };

        await actualizarLugar(lugarEditando.idInfo_Lugar, datosActualizados);

        setGuardando(false);
        Alert.alert("¡Éxito!", "Tour actualizado correctamente.");
        setLugarEditando(null);
    };

    return (
        <SafeAreaView style={styles.contenedor}>
            {lugarEditando ? (
                <ScrollView contentContainerStyle={styles.contenedorScroll} keyboardShouldPersistTaps="handled">

                    <TouchableOpacity style={styles.btnVolver} onPress={() => setLugarEditando(null)}>
                        <Text style={styles.textoBtnVolver}>Volver a la lista</Text>
                    </TouchableOpacity>

                    <View style={styles.encabezado}>
                        <Text style={styles.titulo}>Modificar Tour</Text>
                        <Text style={styles.subtitulo}>Editando: {lugarEditando.nombre_Lugar}</Text>
                    </View>

                    <View style={styles.tarjetaFormulario}>
                        <Text style={styles.etiqueta}>Descripción</Text>
                        <TextInput
                            style={[styles.entrada, styles.areaTexto]}
                            multiline
                            numberOfLines={4}
                            value={descripcion}
                            onChangeText={setDescripcion}
                        />

                        <View style={styles.fila}>
                            <View style={styles.columna}>
                                <Text style={styles.etiqueta}>Precio ($)</Text>
                                <TextInput
                                    style={styles.entrada}
                                    keyboardType="numeric"
                                    value={precio}
                                    onChangeText={setPrecio}
                                />
                            </View>

                            <View style={styles.columna}>
                                <Text style={styles.etiqueta}>Cupos Disponibles</Text>
                                <TextInput
                                    style={styles.entrada}
                                    keyboardType="number-pad"
                                    value={cupos}
                                    onChangeText={setCupos}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.btnGuardar, guardando && styles.btnDeshabilitado]}
                            onPress={handleGuardar}
                            disabled={guardando}
                        >
                            {guardando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBoton}>Guardar Cambios</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <ScrollView contentContainerStyle={styles.contenedorScroll}>
                    <View style={styles.encabezado}>
                        <Text style={styles.titulo}>Panel de Administrador</Text>
                        <Text style={styles.subtitulo}>Selecciona el tour que deseas modificar:</Text>
                    </View>

                    {lugares.length === 0 ? (
                        <ActivityIndicator size="large" color="#40D3D3" style={{ marginTop: 20 }} />
                    ) : (
                        lugares.map((lugar: Lugar) => (
                            <TouchableOpacity
                                key={lugar.idInfo_Lugar}
                                style={styles.tarjetaLugar}
                                onPress={() => seleccionarParaEditar(lugar)}
                            >
                                <View style={{ flex: 1, paddingRight: 10 }}>
                                    <Text style={styles.nombreLugar}>{lugar.nombre_Lugar}</Text>
                                    <Text style={styles.metaLugar}>
                                        Precio: L. {lugar.precio} | Cupos: {lugar.personas_disponibilidad}
                                    </Text>

                                    <MaterialIcons name="place" size={16} color="#009c91" />
                                    <Text style={styles.dptoLugar}>{lugar.departamento_HN}</Text>
                                </View>
                                <Text style={styles.flecha}>➔</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contenedor: { 
        flex: 1, 
        backgroundColor: '#F4F9FA' 
    },
    contenedorScroll: { 
        padding: 20 
    },
    encabezado: { 
        marginBottom: 20 
    },
    titulo: { 
        fontSize: 26, 
        fontWeight: 'bold', 
        color: '#1E293B' 
    },
    subtitulo: { 
        fontSize: 14, 
        color: '#64748B', 
        marginTop: 4 
    },
    tarjetaFormulario: { 
        backgroundColor: '#FFF', 
        borderRadius: 20, 
        padding: 20, 
        elevation: 3 
    },
    etiqueta: { 
        fontSize: 14, 
        fontWeight: '600', 
        color: '#334155', 
        marginBottom: 6, 
        marginTop: 10 
    },
    entrada: { 
        backgroundColor: '#EDF7F9', 
        borderRadius: 12, 
        paddingHorizontal: 14, 
        height: 48, 
        fontSize: 15, 
        color: '#333', 
        borderWidth: 1, 
        borderColor: '#E2E8F0' 
    },
    areaTexto: { 
        height: 90, 
        textAlignVertical: 'top', 
        paddingTop: 10 
    },
    fila: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 10 
    },
    columna: { 
        width: '48%' 
    },
    btnGuardar: { 
        backgroundColor: '#40D3D3', 
        borderRadius: 12, 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 25 
    },
    btnDeshabilitado: { 
        backgroundColor: '#94A3B8' 
    },
    textoBoton: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    tarjetaLugar: { 
        backgroundColor: '#FFF', 
        padding: 16, 
        borderRadius: 14, 
        marginBottom: 12, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#E2E8F0', 
        elevation: 1 
    },
    nombreLugar: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#0F172A' 
    },
    metaLugar: { 
        fontSize: 13, 
        color: '#64748B', 
        marginTop: 4 
    },
    dptoLugar: { 
        fontSize: 12, 
        color: '#009c91', 
        marginTop: 2, 
        fontWeight: '500' 
    },
    flecha: { 
        fontSize: 18, 
        color: '#40D3D3', 
        fontWeight: 'bold' 
    },
    btnVolver: { 
        alignSelf: 'flex-start', 
        backgroundColor: '#EDF7F9', 
        paddingHorizontal: 14, 
        paddingVertical: 8, 
        borderRadius: 10, 
        marginBottom: 15 
    },
    textoBtnVolver: { 
        color: '#009c91', 
        fontWeight: 'bold', 
        fontSize: 14 
    }
});