const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    summary:{
      type: DataTypes.TEXT
    },
    score:{
      type: DataTypes.INTEGER,
    },
    healthScore:{
      type: DataTypes.INTEGER,
    },
    steps:{
      type: DataTypes.TEXT
    }
  });
};

//ID: *
// Nombre *
// Resumen del plato *
// Puntuación
// Nivel de "comida saludable"
// Paso a paso
