import { createContext } from "react";
import { Lugar } from "../Models/Lugar";

export const LugarContexto = createContext({
    lugares: [] as Lugar[],
    lugarSeleccionado: null as Lugar | null,
    obtenerLugares: () => {},
    obtenerLugarPorId: (id: number) => {},
    agregarLugar: (lugar: Lugar) => {},
    actualizarLugar: (id: number,lugar: Lugar) => {},
    eliminarLugar: (id: number) => {}

});