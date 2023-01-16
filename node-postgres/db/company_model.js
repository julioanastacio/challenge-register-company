const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'companies',
  table: 'companies',
  password: 'password',
  port: 5432,
});

const getCompanies = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM companies ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const createCompany = (body) => {
  return new Promise(function (resolve, reject) {
    const { cnpj, razao_social, nome_fantasia, email, telefone, logradouro } =
      body;
    pool.query(
      'INSERT INTO companies (cnpj, razao_social, nome_fantasia, email, telefone, logradouro) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [cnpj, razao_social, nome_fantasia, email, telefone, logradouro],
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(`A new company has been added added: ${results}`);
      },
    );
  });
};
const deleteCompany = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query(
      'DELETE FROM companies WHERE id = $1',
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Company deleted with ID: ${id}`);
      },
    );
  });
};

module.exports = {
  getCompanies,
  createCompany,
  deleteCompany,
};
