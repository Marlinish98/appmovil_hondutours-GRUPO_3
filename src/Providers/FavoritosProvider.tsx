import { useContext, useState } from "react";
import { FavoritoContext } from "../Context/FavoritoContext";
import { View } from "../Models/View";
import { Favorito } from "../Models/Favoritos";

export const FavoritosProvider = (props: View) => {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const limpiarFavoritos = () => setFavoritos([]);
  const url = "https://wldg3rx3-8080.use2.devtunnels.ms"; 
    
  const cargarFavoritos = async (idUsuario: number) => {
    try {
      const res = await fetch(`${url}/favoritos/${idUsuario}`, {
        headers: { 'Accept': 'application/json', 'X-Tunnel-Skip-Anti-Phishing-Page': 'true' }
      });
      const json = await res.json();
      setFavoritos(json.data || []); 
    } catch (error) {
      console.error(error);
    }
  };

  const alternarFavorito = async (favorito: Favorito, idUsuario: number): Promise<boolean> => {
    const existe = favoritos.find(
      (f) => f.Info_Lugar?.idInfo_Lugar === favorito.Info_Lugar?.idInfo_Lugar
    );

    try {
      if (existe) {
        const res = await fetch(`${url}/favorito/${existe.idFavoritos}`, { 
          method: 'DELETE',
          headers: { 'X-Tunnel-Skip-Anti-Phishing-Page': 'true' }
        });
        
        if (res.ok) {
          setFavoritos((prev) => prev.filter((f) => f.idFavoritos !== existe.idFavoritos));
          return true;
        }
      } else {
        const res = await fetch(`${url}/favorito`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Tunnel-Skip-Anti-Phishing-Page': 'true'
          },
          body: JSON.stringify({
            Info_Lugar_idInfo_Lugar: favorito.Info_Lugar.idInfo_Lugar,
            Usuarios_idUsuarios: idUsuario
          })
        });

        if (res.ok) {
          const json = await res.json();
          // CORRECCIÓN: En lugar de cargarFavoritos(), agregamos el objeto que el servidor nos devolvió
          setFavoritos((prev) => [...prev, json.data]); 
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error al alternar favorito:", error);
      return false;
    }
  };

  return (
    <FavoritoContext.Provider value={{ favoritos, alternarFavorito, cargarFavoritos, limpiarFavoritos }}>
      {props.children}
    </FavoritoContext.Provider>
  );
};

export function useFavoritosContext() {
  return useContext(FavoritoContext);
}