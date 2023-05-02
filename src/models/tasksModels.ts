const conn = require('./connections');

const getAllTasks = async () => {
  const task = await conn.execute('SELECT * FROM user');
}