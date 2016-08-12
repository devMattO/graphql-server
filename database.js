const humps = require('humps');

module.exports = (pool) => ({
  getUserById(userId) {
    return pool.query(`
      select * from person
      where id = $1
    `, [userId]).then(result => humps.camelizeKeys(result.rows[0]));
  },
  getUsers() {
    return pool.query(`
      select * from person
    `).then(result => humps.camelizeKeys(result.rows));
  }
});

//read pg docs for $