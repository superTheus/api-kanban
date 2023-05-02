const connectionUser = require('./connections');

interface User {
  id?: number;
  user: string;
  name: string;
  password: string;
}

interface error {
  code: string,
  errno: number,
  sqlState: string,
  sqlMessage: string,
  sql: string
}

interface UserData {
  id: number,
  USER: string,
  NAME: string,
  PASSWORD: string
}

const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    connectionUser.query('SELECT * FROM users', (err: error, rows: UserData[]) => {
      if (err) {
        resolve({
          status: 'error',
          error: true,
          message: err.sqlMessage,
        })
      } else {
        resolve({
          status: 'success',
          error: false,
          data: rows,
        });
      }
    });
  });
}

const getUserById = async (id: number) => {
  return new Promise((resolve, reject) => {
    connectionUser.query('SELECT * FROM users WHERE id = ?', [id], (err: error, rows: UserData[]) => {
      if (err) {
        resolve({
          status: 'error',
          error: true,
          message: err.sqlMessage,
        })
      } else {
        resolve({
          status: 'success',
          error: false,
          data: rows[0],
        });
      }
    });
  });
}

const insertUser = async (user: User) => {
  return new Promise((resolve, reject) => {
    connectionUser.query('INSERT INTO users (user, NAME, PASSWORD) VALUES (?, ?, MD5(?))', [
      user.user,
      user.name,
      user.password
    ], (err: any, rows: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}

const updateUserById = async (user: UserData) => {
  return new Promise((resolve, reject) => {
    connectionUser.query('UPDATE users S SET S.`USER` = ?, S.NAME = ?, S.`PASSWORD` = MD5(?) WHERE S.id = ?',
      [user.USER, user.NAME, user.PASSWORD, user.id], (err: error, rows: UserData[]) => {
        if (err) {
          resolve({
            status: 'error',
            error: true,
            message: err.sqlMessage,
          })
        } else {
          resolve({
            status: 'success',
            error: false,
            data: 'Data updated successfully',
          });
        }
      });
  });
}

const deleteUserById = async (id: number) => {
  return new Promise((resolve, reject) => {
    connectionUser.query('DELETE FROM users WHERE id = ?', [id], (err: error, rows: UserData[]) => {
      if (err) {
        resolve({
          status: 'error',
          error: true,
          message: err.sqlMessage,
        })
      } else {
        resolve({
          status: 'success',
          error: false,
          data: 'User deleted successfully',
        });
      }
    });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  updateUserById,
  deleteUserById
}