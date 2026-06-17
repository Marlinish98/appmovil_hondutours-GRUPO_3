import { createContext } from "react";
import { CrearPlan } from "../Models/CrearPlan"; 

export const PlanContext = createContext({
planes: [] as CrearPlan[],
  obtenerPlanes: () => {}, 
  agregarPlan: (plan: CrearPlan) => {},
  actualizarPlan: (id: number, planData: any) => {}, 
  eliminarPlan: (id: number) => {}
});