const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModelHasRole extends Model {
    static associate(models) {

    }
  }
  ModelHasRole.init({
    model_type: {
      type: DataTypes.STRING,
    },
    model_id: {
      type: DataTypes.UUID,
    },
    role_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'model_has_roles',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });

  return ModelHasRole;
};
