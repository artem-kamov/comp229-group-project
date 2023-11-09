// Alert: For production environment never expose your connection string AND secret keys.
require('dotenv').config()

module.exports = {
  "ATLAS_DB" : process.env.ATLAS_DB
}