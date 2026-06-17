export interface Usuario {
    idUsuarios: number;
    nombre_Usuario: string;
    correo: string;
    contrasenia: string;
    rol: 'ADMIN' | 'CLIENTE';
}