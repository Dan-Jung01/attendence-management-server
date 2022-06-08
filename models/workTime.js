module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    "Worktime",
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
        // primaryKey: true,
        type: DataTypes.STRING(100),
        comment: "오늘날짜",
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(60),
        comment: "이름",
        allowNull: false,
      },
      on_work: {
        type: DataTypes.TIME,
        comment: "근무시작시간",
        allowNull: false,
      },
      off_work: {
        type: DataTypes.TIME,
        comment: "근무종료시간",
      },
      total_work: {
        type: DataTypes.STRING(72),
        comment: "하루근무시간",
      },
      state_late: {
        type: DataTypes.INTEGER,
        comment: "지각",
      },
      state_absence: {
        type: DataTypes.INTEGER,
        comment: "결근",
      },
      state_miss_check: {
        type: DataTypes.INTEGER,
        comment: "퇴근미체크",
      },
      state_early_check: {
        type: DataTypes.INTEGER,
        comment: "조기퇴근",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "workTime", // 테이블 이름
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
