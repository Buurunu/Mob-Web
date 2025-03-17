import mysql from 'mysql2/promise';

let connection;

export const createConnection = async () => {
    if (!connection) {
        console.log('Conectando ao banco de dados com as seguintes configurações:', {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_NAME,
            password: process.env.MYSQL_PASSWORD,
            port: process.env.MYSQL_PORT,
        });

        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_NAME,
            password: process.env.MYSQL_PASSWORD,
            port: parseInt(process.env.MYSQL_PORT),
        });
    }

    return connection;
};