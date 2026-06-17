import { ICategoria } from "./ICategoria";

export interface Lugar{
    idInfo_Lugar:number;
    nombre_Lugar:string;
    descripcion:string;
    latitud:number;
    longitud:number;
    direccion_Lugar:string;
    departamento_HN:string;
    imagen_Lugar:string;
    precio:number;
    personas_disponibilidad:number;
    categoria:ICategoria;

}