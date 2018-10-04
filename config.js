module.exports = {
  port: process.env.PORT || 3000,
  db_url: process.env.MONGO_URL || "mongodb://admin:admin12345@ds117623.mlab.com:17623/db-example",
  jwt_expiration_time: 30, // In Seconds
  jwt_encryption_method: 'HS512',
  jwt_secret_key: 'my-secret-password',
  jwt_user_name: 'admin-full-stack',
  jwt_user_password: 'password-full-stack'
}