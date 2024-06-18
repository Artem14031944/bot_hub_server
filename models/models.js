import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(40), unique: true },
    username: { type: DataTypes.STRING(30), unique: true },
    password: { type: DataTypes.STRING(120) },
    is_admin: { type: DataTypes.INTEGER, defaultValue: 0 },  
    is_activated: { type: DataTypes.INTEGER, defaultValue: 0 },
    activation_link: { type: DataTypes.STRING(150) },
});

const Book = sequelize.define('book', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(80) },
    author: { type: DataTypes.STRING(40) },
    genres: { type: DataTypes.STRING(40) },
    user_id: { type: DataTypes.INTEGER },
});

const Token = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    refreshToken: { type: DataTypes.STRING },
});

User.hasMany(Book);
Book.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

export { User, Book, Token };