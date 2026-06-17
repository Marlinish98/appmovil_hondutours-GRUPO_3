import { useContext, useState } from "react"
import { usuarioContext } from "../Context/UsuarioContext"
import { View } from "../Models/View"

export default function UsuarioProvider(props: View) {

  const [usuario, setUsuario] = useState(null)

  let url = "https://wldg3rx3-8080.use2.devtunnels.ms"

  const iniciarSesion = async (correo:string, contrasenia:string) => {
    try {
      const res = await fetch(`${url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo,
          contrasenia: contrasenia,
        }),
      })

      const text = await res.text()

      let data = null
      try {
        data = text ? JSON.parse(text) : null
      } catch (e) {
        console.log('ERROR JSON LOGIN:', text)
        return false
      }

      if (!res.ok) return false

      setUsuario(data)
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }

  const cerrarSesion = () => {
    setUsuario(null)
  }

  return (
    <usuarioContext.Provider value={{
      usuario,
      iniciarSesion,
      cerrarSesion
    }}>
      {props.children}
    </usuarioContext.Provider>
  )
}

export const useContextUsuario = () => {
  return useContext(usuarioContext)
}