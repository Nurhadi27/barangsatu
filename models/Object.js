module.exports = (sequelize, DataTypes) => {
    const Object = sequelize.define ('Object', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull:false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull:false
          }
    }, {
        tableName: 'objects'
    });

    return Object;
}
