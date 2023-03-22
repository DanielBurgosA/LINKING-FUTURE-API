const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("donation",
        {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement:true
            },
            monto: {
              type: DataTypes.STRING,
              allowNull: true,
            },
          },
          { timestamps: true }
    )
}