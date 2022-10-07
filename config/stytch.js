module.exports = ({ env }) => ({
  project_id: env("STYTCH_PROJECT_ID", ""),
  secret_key: env("STYTCH_SECRET_KEY", ""),
  stytch_magic_link_url: env("STYTCH_MAGIC_LINK_URL", ""),
});
