/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Books = sequelize.define('books', {
    bookID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gBookID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    subTitle: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    authorID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'authors',
        key: 'authorID'
      }
    },
    publisherID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'publishers',
        key: 'publisherID'
      }
    }
  }, {
    tableName: 'books',
    timestamps: false
  });
  
  Books.associate = (models) => {
    Books.belongsTo(models.authors);
    Books.belongsTo(models.publishers);
  };

  return Books
};