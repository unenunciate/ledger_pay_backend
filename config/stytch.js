module.exports = ({ env }) => ({
    project_id: env('STYTCH_PROJECT_ID'),
    secret_key: env('STYTCH_SECRET_KEY'),

});