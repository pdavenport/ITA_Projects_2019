/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Publishers = sequelize.define('publishers', {
    publisherID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pubName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'publishers',
    timestamps: false
  });
  Publishers.associate = (models) => {
    Publishers.hasMany(models.books);
  };
  return Publishers
};
