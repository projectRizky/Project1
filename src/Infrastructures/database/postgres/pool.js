require('dotenv').config();
const { Sequelize } = require('sequelize');

const config = {
  test: {
    database: process.env.PGDATABASE_TEST,
    username: process.env.PGUSER_TEST,
    password: process.env.PGPASSWORD_TEST,
    options: {
      logging: false,
      // logging: process.env.DEBUG === true ? (...msg) => console.log(msg) : '',
      // logging: process.env.DEBUG === 'true' ? (...msg) => console.log(msg) : false,
      host: process.env.PGHOST_TEST,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
  prod: {
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    options: {
      host: process.env.PGHOST,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
};

const env = process.env.NODE_ENV || 'test';
const connection = env === 'test' ? config.test : config.prod;

const sequelize = new Sequelize(
  connection.database,
  connection.username,
  connection.password,
  { ...connection.options },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../../sequelize/models/User')(sequelize, Sequelize);
db.ModelHasRole = require('../../sequelize/models/ModelHasRole')(sequelize, Sequelize);
db.Role = require('../../sequelize/models/Role')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// const { User } = db;

// (async () => {
//   await User.sync({ force: true });
// })();

// const {
//   Tag, Image, User, Role,
// } = db;

// (async () => {
//   const newTag = await Tag.create(
//     {
//       name: 'tag1',
//     },
//   );
//   // console.log('newTag', newTag);
// })();

// (async () => {
//   const newUser = await User.create({ email: 'hajaraswad@gmail.com' });
//   await newUser.addRole(8);
//   console.log('Role', 8);
//   console.log('Role', 8);
// })();

module.exports = db;
