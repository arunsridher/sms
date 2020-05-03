//environment file to store sensitive information and other env related details
const development = {
  port: 8000,
  db: "sms",
  session_secret_key: "secret-key",
};

module.exports = development;
