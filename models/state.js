module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    "State",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        // primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: "ORDER & PAGINATION",
      },
      user_id: {
        primaryKey: true,
        type: DataTypes.STRING(100),
        comment: "아이디",
        // unique: true,
      },
      state_late: {
        type: DataTypes.INTEGER(100),
        comment: "지각",
      },
      state_absence: {
        type: DataTypes.INTEGER(100),
        comment: "결근",
      },
      state_miss_check: {
        type: DataTypes.INTEGER(100),
        comment: "퇴근미체크",
      },
      state_early_check: {
        type: DataTypes.INTEGER(100),
        comment: "조기퇴근",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "state", // 테이블 이름
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
