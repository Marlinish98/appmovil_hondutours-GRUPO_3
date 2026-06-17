import { useContext, useState } from "react";
import { PlanContext } from "../Context/PlanContext"; 
import { CrearPlan } from "../Models/CrearPlan";
import { View } from "../Models/View"; 

export const PlanProvider = (props: View) => {
  const [planes, setPlanes] = useState<CrearPlan[]>([]);
  const [cargando, setCargando] = useState(false); 
  
  const url = "https://wldg3rx3-8080.use2.devtunnels.ms";

  const obtenerPlanes = async () => {
    try {
      const response = await fetch(`${url}/plan`);
      const data = await response.json();
      setPlanes(data.planes || []); 
    } catch (error) {
      setPlanes([]); 
    }
  };

  const agregarPlan = async (plan: CrearPlan) => {
    try {
      const respuesta = await fetch(`${url}/plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tunnel-Skip-Anti-Phishing-Page": "true",
        },
        body: JSON.stringify(plan),
      });

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      await obtenerPlanes(); 
      return true; 
    } catch (error) {
      return false; 
    }
  };

  const actualizarPlan = async (idDetalle: number, planData: any) => {
    try {
      const res = await fetch(`${url}/plan/${idDetalle}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'X-Tunnel-Skip-Anti-Phishing-Page': 'true' 
        },
        body: JSON.stringify(planData)
      });

      if (res.ok) {
        await obtenerPlanes();
      }
    } catch (error) {}
  };

  const eliminarPlan = async (id: number) => {
    try {
      const res = await fetch(`${url}/plan/${id}`, {
        method: 'DELETE',
        headers: { 'X-Tunnel-Skip-Anti-Phishing-Page': 'true' }
      });

      if (res.ok) {
        await obtenerPlanes();
      }
    } catch (error) {}
  };

  return (
    <PlanContext.Provider value={{ planes, obtenerPlanes, agregarPlan, actualizarPlan, eliminarPlan }}>
      {props.children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  return useContext(PlanContext);
};