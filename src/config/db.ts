import {Sequelize} from 'sequelize-typescript';
require('dotenv').config();

const DB_NAME    = process.env.DB_NAME;
const DB_USER    = process.env.DB_USER;
const DB_PSW     = process.env.DB_PSW;
const DB_HOST    = process.env.DB_HOST;

const db = new Sequelize(DB_NAME,DB_USER,DB_PSW, {
    host: DB_HOST,
    dialect: 'postgres' ,
    models:[__dirname + '/../models/**/*.ts'],
    logging:false
  });

export default db  
  