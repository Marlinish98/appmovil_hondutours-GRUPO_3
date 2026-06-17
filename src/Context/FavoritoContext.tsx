import { createContext } from "react";
import { Favorito } from "../Models/Favoritos";

export const FavoritoContext = createContext({
    favoritos: [] as Favorito[],
    alternarFavorito: (favorito: Favorito, idUsuario: number) => {},
    cargarFavoritos: (idUsuario: number) => {},
    limpiarFavoritos: () => {}
});