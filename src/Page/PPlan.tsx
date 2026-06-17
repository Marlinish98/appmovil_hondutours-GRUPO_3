import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { usePlanContext } from '../Providers/PlanProvider';
import { useLugarContext } from '../Providers/LugarProvider';
import { Lugar } from '../Models/Lugar';
import { CrearPlan } from '../Models/CrearPlan';
import { PlanDetalle } from '../Models/PlanDetalle';

export default function Plan() {
  const { lugares, obtenerLugares } = useLugarContext();
  const { planes, agregarPlan, actualizarPlan, eliminarPlan, obtenerPlanes } = usePlanContext();

  const [vista, setVista] = useState<'lista' | 'formulario'>('lista');
  const [detalleEditandoId, setDetalleEditandoId] = useState<number | null>(null);
  const [planEditandoId, setPlanEditandoId] = useState<number | null>(null);

  const [nombrePlan, setNombrePlan] = useState('');
  const [diasPlan, setDiasPlan] = useState('3');
  const [capacidadPersonas, setCapacidadPersonas] = useState('2');
  const [fechaVisita, setFechaVisita] = useState('');
  const [lugarSeleccionado, setLugarSeleccionado] = useState<Lugar | null>(null);

  const [date, setDate] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useEffect(() => {
    obtenerLugares();
    obtenerPlanes(); 
  }, []);

  const alCambiarFecha = (event: DateTimePickerEvent, fechaSeleccionada?: Date) => {
    setMostrarCalendario(false);
    if (fechaSeleccionada) {
      setDate(fechaSeleccionada);
      const anio = fechaSeleccionada.getFullYear();
      const mes = String(fechaSeleccionada.getMonth() + 1).padStart(2, '0');
      const dia = String(fechaSeleccionada.getDate()).padStart(2, '0');
      setFechaVisita(`${anio}-${mes}-${dia}`);
    }
  };

  const handleEditar = (plan: CrearPlan, detalle: PlanDetalle) => {
    setNombrePlan(plan.nombre_plan || '');
    setDiasPlan(plan.dias_plan ? plan.dias_plan.toString() : '');
    setCapacidadPersonas(plan.capacidad_personas ? plan.capacidad_personas.toString() : '');
    
    if (plan.idCreacion_Plan) {
      setPlanEditandoId(plan.idCreacion_Plan);
    }

    if (detalle.Info_Lugar) {
      setLugarSeleccionado(detalle.Info_Lugar);
    }

    if (detalle.fecha_visita) {
      const fechaLimpia = detalle.fecha_visita.split('T')[0];
      setFechaVisita(fechaLimpia);
      setDate(new Date(`${fechaLimpia}T12:00:00`));
    }

    if (detalle.idPlan_Detalles) {
      setDetalleEditandoId(detalle.idPlan_Detalles);
      setVista('formulario');
    }
  };

  const handleGuardar = async () => {
    const dias = parseInt(diasPlan);
    const personas = parseInt(capacidadPersonas);

    if (!nombrePlan.trim() || !fechaVisita.trim() || !lugarSeleccionado || isNaN(dias)) {
      Alert.alert('Error', 'Por favor completa todos los campos con datos válidos.');
      return;
    }

    try {
      if (detalleEditandoId) {
        // ✅ Corregido el nombre de la variable y enviando el objeto completo
        await actualizarPlan(detalleEditandoId, {
          idCreacion_Plan: planEditandoId,
          nombre_plan: nombrePlan,
          dias_plan: dias,
          capacidad_personas: personas,
          Info_Lugar_idInfo_Lugar: lugarSeleccionado.idInfo_Lugar,
          fecha_visita: fechaVisita
        });
        Alert.alert("Éxito", "Plan actualizado correctamente");
      } else {
        const nuevoPlan: CrearPlan = {
          nombre_plan: nombrePlan,
          dias_plan: dias,
          capacidad_personas: personas,
          Usuarios_idUsuarios: 1, 
          PlanLugares: [
            {
              Info_Lugar_idInfo_Lugar: lugarSeleccionado.idInfo_Lugar,
              fecha_visita: fechaVisita
            }
          ]
        };
        await agregarPlan(nuevoPlan);
        Alert.alert("Éxito", "Plan creado correctamente");
      }
      cerrarFormulario();
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema, revisa tu conexión.");
    }
  };

  const cerrarFormulario = () => {
    setNombrePlan('');
    setDiasPlan('3');
    setCapacidadPersonas('2');
    setFechaVisita('');
    setLugarSeleccionado(null);
    setDetalleEditandoId(null);
    setPlanEditandoId(null);
    setDate(new Date());
    setVista('lista');
    obtenerPlanes(); 
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      {vista === 'lista' ? (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.contenedorScroll}>
            <View style={styles.encabezado}>
              <Text style={styles.titulo}>Mis Planes de Viaje</Text>
              <Text style={styles.subtitulo}>Organiza tus viajes con HonduTours</Text>
            </View>

            {planes.filter(p => p.PlanLugares && p.PlanLugares.length > 0).length === 0 ? (
              <View style={styles.contenedorVacio}>
                <MaterialIcons name="event-note" size={50} color="#94A3B8" />
                <Text style={styles.textoVacio}>Organiza tus planes de viaje</Text>
              </View>) :
              (
                planes.map((plan: CrearPlan) => {
                  if (!plan.PlanLugares || plan.PlanLugares.length === 0) return null;
                  return (
                    <View key={plan.idCreacion_Plan} style={styles.contenedorPlan}>
                      {plan.PlanLugares.map((detalle: PlanDetalle) => (
                        <View key={detalle.idPlan_Detalles} style={styles.tarjetaPlan}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.tituloPlanGrupo}>Titulo: {plan.nombre_plan}</Text>
                            <Text style={styles.lugarPlan}>📍{detalle.Info_Lugar?.nombre_Lugar}</Text>
                            <Text style={styles.dptoPlan}>{detalle.Info_Lugar?.departamento_HN}</Text>
                            <Text style={styles.fechaPlan}>Fecha de Viaje {detalle.fecha_visita ? detalle.fecha_visita.split('T')[0] : 'Sin fecha'}</Text>
                          </View>
                          <View style={styles.contenedorAcciones}>
                            <TouchableOpacity style={styles.btnIconoEditar} onPress={() => handleEditar(plan, detalle)}>
                              <MaterialIcons name="edit" size={18} color="#009c91" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnIconoEliminar} onPress={() => {
                              Alert.alert(
                                "Eliminar Destino",
                                "¿Estás seguro de que quieres eliminar este destino de tu plan?",
                                [
                                  { text: "Cancelar", style: "cancel" },
                                  {
                                    text: "Eliminar",
                                    style: "destructive",
                                    onPress: () => {
                                      if (detalle.idPlan_Detalles) {
                                        eliminarPlan(detalle.idPlan_Detalles)
                                      }
                                    }
                                  }]);
                            }}>
                              <MaterialIcons name="delete" size={18} color="#EF4444" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  );
                })
              )}
          </ScrollView>

          <TouchableOpacity style={styles.botonFlotante} onPress={() => setVista('formulario')}>
            <MaterialIcons name="add" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.contenedorScroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.btnRegresar} onPress={cerrarFormulario}>
            <Text style={styles.textoBtnRegresar}>Volver a la lista</Text>
          </TouchableOpacity>

          <View style={styles.encabezado}>
            <Text style={styles.titulo}>{detalleEditandoId ? 'Editar Plan' : 'Planear Nuevo Viaje'}</Text>
          </View>

          <View style={styles.tarjetaFormulario}>
            <Text style={styles.etiqueta}>Nombre del Plan de viaje</Text>
            <TextInput style={styles.entrada} value={nombrePlan} onChangeText={setNombrePlan} />

            <View style={styles.filaEntradas}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.etiqueta}>Días de duración</Text>
                <TextInput style={styles.entrada} keyboardType="numeric" value={diasPlan} onChangeText={setDiasPlan} />
              </View>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.etiqueta}>Personas</Text>
                <TextInput style={styles.entrada} keyboardType="numeric" value={capacidadPersonas} onChangeText={setCapacidadPersonas} />
              </View>
            </View>

            <Text style={styles.etiqueta}>Fecha de Viaje</Text>
            <TouchableOpacity style={styles.contenedorTextoFecha} onPress={() => setMostrarCalendario(true)}>
              <MaterialIcons name="calendar-today" size={18} color="#009c91" style={{ marginRight: 6 }} />
              <Text style={[styles.textoPlanoFecha, !fechaVisita && { color: '#94A3B8' }]}>
                {fechaVisita ? fechaVisita : 'Seleccionar fecha'}
              </Text>
            </TouchableOpacity>

            {mostrarCalendario && (
              <DateTimePicker value={date} mode="date" display="default" minimumDate={new Date()} onChange={alCambiarFecha} />
            )}

            <Text style={styles.etiqueta}>Selecciona el destino:</Text>
            {lugarSeleccionado ? (
              <View style={styles.elementoLugarSeleccionado}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tituloLugarSeleccionado}>📍 {lugarSeleccionado.nombre_Lugar}</Text>
                  <Text style={styles.subLugarSeleccionado}>{lugarSeleccionado.departamento_HN}</Text>
                </View>
                <TouchableOpacity onPress={() => setLugarSeleccionado(null)}>
                  <MaterialIcons name="cancel" size={22} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.contenedorListaSeleccion}>
                <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 120 }}>
                  {lugares.map((lugar: Lugar) => (
                    <TouchableOpacity key={lugar.idInfo_Lugar} style={styles.opcionFilaLugar} onPress={() => setLugarSeleccionado(lugar)}>
                      <Text style={styles.textoFilaLugar}>➔ {lugar.nombre_Lugar}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <TouchableOpacity style={styles.btnPrincipalGuardar} onPress={handleGuardar}>
              <Text style={styles.textoBtnPrincipal}>{detalleEditandoId ? 'Actualizar Plan' : 'Guardar Plan'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F5F9FA'
  },
  contenedorScroll: {
    padding: 20,
    paddingBottom: 90
  },
  contenedorVacio: {
    alignItems: 'center',
    marginTop: 50,
    gap: 8
  },
  encabezado: {
    marginBottom: 15
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B'
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3
  },
  contenedorPlan: {
    marginBottom: 20
  },
  tarjetaTituloPlan: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#40D3D3'
  },
  tituloPlanGrupo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B'
  },
  tarjetaPlan: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1
  },
  lugarPlan: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A'
  },
  dptoPlan: {
    fontSize: 12,
    color: '#009c91',
    fontWeight: '500',
    marginTop: 1
  },
  fechaPlan: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 5
  },
  contenedorAcciones: {
    flexDirection: 'row',
    gap: 8
  },
  btnIconoEditar: {
    backgroundColor: '#E0F2F1',
    padding: 7,
    borderRadius: 8
  },
  btnIconoEliminar: {
    backgroundColor: '#FEE2E2',
    padding: 7,
    borderRadius: 8
  },
  tarjetaFormulario: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  etiqueta: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 5,
    marginTop: 12
  },
  entrada: {
    backgroundColor: '#F0F7F9',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  filaEntradas: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contenedorListaSeleccion: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    backgroundColor: '#F0F7F9',
    overflow: 'hidden'
  },
  opcionFilaLugar: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  textoFilaLugar: {
    fontSize: 13,
    color: '#334155'
  },
  elementoLugarSeleccionado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#40D3D3'
  },
  tituloLugarSeleccionado: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A'
  },
  subLugarSeleccionado: {
    fontSize: 11,
    color: '#009c91'
  },
  btnPrincipalGuardar: {
    backgroundColor: '#40D3D3',
    borderRadius: 10,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  textoBtnPrincipal: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold'
  },
  btnRegresar: {
    alignSelf: 'flex-start',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12
  },
  textoBtnRegresar: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 12
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#40D3D3',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  contenedorTextoFecha: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 4
  },
  textoPlanoFecha: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    textDecorationLine: 'underline'
  },
  textoVacio: {
    color: '#64748B',
    fontSize: 14
  }
});