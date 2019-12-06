/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Bookauth = sequelize.define('bookauth', {
    bookauthID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authorID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'authors',
        key: 'authorID'
      }
    },
    bookID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'books',
        key: 'bookID'
      }
    }
  }, {
    tableName: 'bookauth',
    timestamps: false
  });

  Bookauth.associate = (models) => {
    Bookauth.belongsTo(models.authors);
    Bookauth.belongsTo(models.books);
  };
  return Bookauth
};
