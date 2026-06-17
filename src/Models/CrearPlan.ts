import { PlanDetalle } from "./PlanDetalle";

export interface CrearPlan {
  idCreacion_Plan?: number;
  nombre_plan: string;
  fecha_plan?: string;
  dias_plan: number;
  capacidad_personas: number;
  Usuarios_idUsuarios: number;
  PlanLugares: PlanDetalle[]; 
}