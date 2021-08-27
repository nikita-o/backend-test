export default () => ({
    port: process.env.PORT || 3000,
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST                 || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10)   || 5433,
        username: process.env.DATABASE_USERNAME         || 'test',
        password: process.env.DATABASE_PASSWORD         || 'test',
        database: process.env.DATABASE_DATABASE         || 'test',
        autoLoadEntities: true,
        synchronize: true,
    },
    JWT: {
        secret: 'secret',
        signOptions: { expiresIn: '120s' }
    }
});