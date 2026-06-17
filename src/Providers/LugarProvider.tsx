import { useContext, useState } from "react"
import { LugarContexto } from "../Context/LugarContext"
import { View } from "../Models/View"
import { Lugar } from "../Models/Lugar"

export const LugarProvider = (props: View) => {

  const [lugares, setLugares] = useState<Lugar[]>([])
  const [lugarSeleccionado, setLugarSeleccionado] = useState<Lugar | null>(null)

  const url = "https://wldg3rx3-8080.use2.devtunnels.ms"

  // GET TODOS
  const obtenerLugares = async () => {
    try {
      const res = await fetch(`${url}/lugares`)
      const text = await res.text()

      const data = text ? JSON.parse(text) : null
      setLugares(data?.data || [])
    } catch (error) {
      console.log(error)
    }
  }

  // GET POR ID
  const obtenerLugarPorId = async (id: number) => {
    try {
      const res = await fetch(`${url}/lugares/${id}`)
      const text = await res.text()

      const data = text ? JSON.parse(text) : null
      setLugarSeleccionado(data?.data || null)
    } catch (error) {
      console.log(error)
    }
  }

  // CREATE
  const agregarLugar = async (lugar: Lugar) => {
    try {
      await fetch(`${url}/lugares`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lugar)
      })

      obtenerLugares()
    } catch (error) {
      console.log(error)
    }
  }

  // UPDATE
  const actualizarLugar = async (id: number, lugar: Lugar) => {
    try {
      await fetch(`${url}/lugares/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lugar)
      })

      obtenerLugares()
    } catch (error) {
      console.log(error)
    }
  }

  // DELETE
  const eliminarLugar = async (id: number) => {
    try {
      await fetch(`${url}/lugares/${id}`, {
        method: "DELETE"
      })

      obtenerLugares()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LugarContexto.Provider value={{
      lugares,
      lugarSeleccionado,
      obtenerLugares,
      obtenerLugarPorId,
      agregarLugar,
      actualizarLugar,
      eliminarLugar
    }}>
      {props.children}
    </LugarContexto.Provider>
  )
}

export function useLugarContext(){
    return useContext(LugarContexto)
}