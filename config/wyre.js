module.exports = ({ env }) => ({
    wyre_secret_key: env('WYRE_SECRET_KEY', ""),
    wyre_api_key: env('WYRE_API_KEY', ""),
    wyre_account_id: env('WYRE_ACCOUNT_ID', "")

});