const { Pool } = require('pg')
require('dotenv').config();


const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

const getUsers = async () => {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM users')
    return result.rows.map(row => ({
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        address: row.address,
        birthDate: row.birth_date,
        zipCode: row.zip_code,
        city: row.city,
      }))
  } finally {
    client.release()
  }
}

module.exports = {
  getUsers
}