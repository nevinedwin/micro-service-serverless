import { Client } from "pg";

export const DBClient = async () => {

    return new Client({
        host: "127.0.0.1",
        user: "root",
        password: "root",
        database: "user_service",
        port: 5432
    });
};