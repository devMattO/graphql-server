const humps = require('humps');

module.exports = (pool) => ({
  getUsersByIds(userIds) {
    return pool.query(`
      select *
      from person
      where id = ANY($1)
    `, [userIds]).then(result => humps.camelizeKeys(result.rows)); //using sequelize instead of pg
  },
  getUsers() {
    return pool.query(`
      select * from person
    `).then(result => humps.camelizeKeys(result.rows));
  }
});

//read pg docs for $