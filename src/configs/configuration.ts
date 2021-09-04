export default () => ({
  port: process.env.PORT || 3000,
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'test',
    password: process.env.POSTGRES_PASSWORD || 'test',
    database: process.env.POSTGRES_DB || 'test',
    autoLoadEntities: true,
    synchronize: true,
  },
  JWT: {
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: { expiresIn: '5m' },
  },
  hash: {
    salt: process.env.HASH_SALT || 10, // not used
  },
});
