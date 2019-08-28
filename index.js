const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// define model
const Model = Sequelize.Model;
class User extends Model {}
User.init({
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  },
  nickName: {
    type: Sequelize.STRING,
    field: 'alias'
  },
  alias: {
    type: Sequelize.VIRTUAL,
    get: () => 'some name',
  }
}, {
  sequelize,
  modelName: 'user'
});

const mockData = [
  {
    firstName: 'rafael',
    lastName: 'van der vart',
    nickName: 'random'
  },

  {
    firstName: 'edwin',
    lastName: 'van der sar',
    nickName: 'random'
  },
];

const createUsers = () => {
  User.sync({ force: true })
    .then(() => {
      return User.bulkCreate(mockData)
        .then(res => {
          console.log('added', res)
        });
    })
};

createUsers();



