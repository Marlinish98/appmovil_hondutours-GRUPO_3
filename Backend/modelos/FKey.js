const Usuario = require('./Usuarios');
const Categoria = require('./Categoria');
const InfoLugar = require('./InfoLugar');
const Favoritos = require('./Favoritos');
const CreacionPlan = require('./CreacionPlan');
const PlanDetalles = require('./PlanDetalles');

Categoria.hasMany(InfoLugar, {
  foreignKey: 'Categoria_idCategoria',
  as: 'lugares'
});

InfoLugar.belongsTo(Categoria, {
  foreignKey: 'Categoria_idCategoria',
  as: 'categoria'
});

Usuario.hasMany(Favoritos, {
  foreignKey: 'Usuarios_idUsuarios'
});

Favoritos.belongsTo(Usuario, {
  foreignKey: 'Usuarios_idUsuarios'
});

InfoLugar.hasMany(Favoritos, {
  foreignKey: 'Info_Lugar_idInfo_Lugar'
});

Favoritos.belongsTo(InfoLugar, {
  foreignKey: 'Info_Lugar_idInfo_Lugar'
});

Usuario.hasMany(CreacionPlan, {
  foreignKey: 'Usuarios_idUsuarios'
});

CreacionPlan.belongsTo(Usuario, {
  foreignKey: 'Usuarios_idUsuarios'
});

CreacionPlan.hasMany(PlanDetalles, {
  foreignKey: 'Creacion_Plan_idCreacion_Plan',
  as: 'PlanLugares'
});

PlanDetalles.belongsTo(CreacionPlan, {
  foreignKey: 'Creacion_Plan_idCreacion_Plan'
});

InfoLugar.hasMany(PlanDetalles, {
  foreignKey: 'Info_Lugar_idInfo_Lugar'
});

PlanDetalles.belongsTo(InfoLugar, {
  foreignKey: 'Info_Lugar_idInfo_Lugar'
});

module.exports = {
  Usuario,
  Categoria,
  InfoLugar,
  Favoritos,
  CreacionPlan,
  PlanDetalles
};