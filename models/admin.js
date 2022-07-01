module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      user_id: {
        type: DataTypes.STRING(100),
        comment: "아이디",
      },
      user_pwd: {
        type: DataTypes.STRING(60),
        comment: "비밀번호",
      },
      user_name: {
        type: DataTypes.STRING(100),
        comment: "이름",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "admin", // 테이블 이름
    }
  );

  return Admin;
};
