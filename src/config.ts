import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    maxPoolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'test';
const MONGO_HOST = process.env.MONGO_URL || 'localhost:27017/rujkastats';

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const logs = {
    debugPath: process.env.DEBUG_LOG_FILE_PATH || './logs/debug.log',
    errorPath: process.env.ERROR_LOG_FILE_PATH || './logs/error.log',
    fullPath: process.env.FULL_LOG_FILE_PATH || './logs/full.log',
}

const config = {
    mongo: MONGO,
    server: SERVER,
    isDebug: true,
    isDevMode: process.env.DEV_MODE === 'true',
    debug: process.env.DEBUG === 'true',
    logs,
};

export default config;
