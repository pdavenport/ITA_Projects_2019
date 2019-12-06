/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Authors = sequelize.define('authors', {
    authorID: {
      type: DataTypes.INTEGER(11),
      
      primaryKey: true,
      autoIncrement: true
    },
    authName: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'authors',
    timestamps: false
  });
  Authors.associate = (models) => {
    Authors.hasMany(models.books);
    Authors.hasMany(models.bookauth);
  };
  return Authors
};
