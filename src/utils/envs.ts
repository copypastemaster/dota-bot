import dotenv from "dotenv";

dotenv.config()

const OPEN_DOTA_BASE_URL = process.env.OPEN_DOTA_BASE_URL || "";

/** SECONDS  */
const SHORT_TERM_RATE_LIMIT = process.env.SHORT_TERM_RATE_LIMIT || "";
const DAILY_RATE_LIMIT = process.env.DAILY_RATE_LIMIT || "";
const MONTHLY_RATE_LIMIT = process.env.MONTHLY_RATE_LIMIT || "";

const PORT = process.env.PORT || 3000;

export {
    OPEN_DOTA_BASE_URL,
    SHORT_TERM_RATE_LIMIT,
    DAILY_RATE_LIMIT,
    MONTHLY_RATE_LIMIT,
    PORT,
}
