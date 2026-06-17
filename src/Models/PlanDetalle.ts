import { Lugar } from "./Lugar";

export interface PlanDetalle {
  idPlan_Detalles?: number;
  Creacion_Plan_idCreacion_Plan?: number;
  Info_Lugar_idInfo_Lugar: number;
  fecha_visita?: string;

  Info_Lugar?: Lugar; 
}