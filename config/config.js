const config = {
    host: process.env.HOST,
    secretKey: process.env.SECRET_KEY,
    db1: process.env.DB1,

    emailTransporter: {
        host: process.env.EMAILHOST,
        port: process.env.EMAILPORT,
        secure: process.env.EMAILSECURE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD,
        },
    },
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
