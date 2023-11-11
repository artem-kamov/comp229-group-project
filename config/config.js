// Alert: For production environment never expose your connection string AND secret keys.
require('dotenv').config()

module.exports = {
  "SECRETKEY": process.env.JWT_SECRET_KEY,
  "ATLAS_DB" : process.env.ATLAS_DB
}