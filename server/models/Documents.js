/**
   * Defines Document model
   * @param {object} sequelize - use sequelize.define to
   * define Document schema
   * @param {object} DataTypes - show the type of data for
   * each field.
   * @return {object} - returns instance of the Document model
   */
export default (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    access: {
      defaultValue: 'public',
      type: DataTypes.ENUM('public', 'private', 'role')
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
        as: 'roleId'
      }
    }
  });
  Documents.associate = (models) => {
    Documents.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Documents.belongsTo(models.Roles, {
      foreignKey: 'roleId'
    });
  };
  return Documents;
};
