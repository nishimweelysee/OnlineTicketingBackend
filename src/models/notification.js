const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Notification.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'NO ACTION',
      });
    }
  }
  Notification.init({
    receiver: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    isRead: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};
