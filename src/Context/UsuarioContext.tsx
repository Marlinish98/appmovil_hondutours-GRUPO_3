import { createContext } from "react";
import { Usuario } from "../Models/Usuario";

export const usuarioContext = createContext({
        usuario: null as Usuario | null,
        iniciarSesion:(correo: string,contrasenia: string) => {},
        cerrarSesion: () => { }

    });