import { Sequelize } from "sequelize";

const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "";
const DB_PORT = process.env.DB_PORT || "";

const sequelize = new Sequelize(`postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`);

async function main() {
    try {
        await sequelize.authenticate();
        console.log("Connected!");
    } catch(e) {
        console.error("Failed to connect:", e);
        console.log({
            DB_NAME,
            DB_PASSWORD,
            DB_USER,
            DB_PORT
        })
    }
}

main();