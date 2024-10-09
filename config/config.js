const config = {
    host: process.env.HOST,
    adminKey:
        '06e8761890e863be2ab5cafd55bb50d4270f9156a274473cdb78e76aa3c9a5c3',
    openaiKey: process.env.OPENAIKEY,
    // Dev-specific configuration
    development: {},

    // Production-specific configuration
    production: {},
};

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

// Merge the common and environment-specific configurations
const finalConfig = { ...config, ...environmentConfig };

module.exports = finalConfig;
