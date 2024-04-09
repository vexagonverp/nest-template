export const configuration = () => ({
  port: parseInt(process.env.SERVER_PORT, 10),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  client: {
    clientUrl: (process.env.CLIENT_URL || 'http://localhost:3000').split(','),
  },
});
