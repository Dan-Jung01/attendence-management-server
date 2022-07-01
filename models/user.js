module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: "ORDER & PAGINATION",
      },
      user_id: {
        primaryKey: true,
        type: DataTypes.STRING(100),
        comment: "아이디",
        allowNull: false,
        unique: true,
      },
      user_pwd: {
        type: DataTypes.CHAR(60),
        comment: "비밀번호",
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(100),
        comment: "이름",
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(100),
        comment: "전화번호",
        allowNull: false,
      },
      start_date: {
        type: DataTypes.STRING(100),
        comment: "입사일",
        allowNull: false,
      },
      break_cnt: {
        type: DataTypes.INTEGER,
        comment: "연차개수",
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "user", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
    }
  );

  table.associate = (models) => {
    table.hasMany(models.Worktime, {
      foreignKey: "user_id",
      as: "work_times",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    table.hasMany(models.Break, {
      foreignKey: "user_id",
      as: "breaks",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // table.hasMany(models.State, {
    //   foreignKey: "user_id",
    //   as: "state",
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
  };

  return table;
};
