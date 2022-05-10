import { Sequelize } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    "Break",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: "ORDER & PAGINATION",
      },
      user_id: {
        // primaryKey: true,
        type: DataTypes.STRING(100),
        comment: "아이디",
        // unique: true,
      },
      today_date: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "오늘날짜",
      },
      start_date: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "연차시작날짜",
      },
      end_date: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "연차종료날짜",
      },
      user_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        comment: "이름",
      },
      reason: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "연차사유",
      },
      status: {
        type: Sequelize.ENUM("APPROVED", "DEFER", "REJECTED", "CHECKING"),
        allowNull: true,
        comment: "요청상태",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "break", // 테이블 이름
      timestamps: false,
    }
  );

  table.associate = (models) => {
    table.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return table;
};
