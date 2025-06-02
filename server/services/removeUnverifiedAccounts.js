import cron from "node-cron";
import { User } from "../models/userModel.js";

export const removeUnverifiedAccounts = () => {
    cron.schedule("*/5 * * * *", async () => {
        const thirtyMinuteAge = new Date(Date.now() - 30 * 60 * 1000);
        await User.deleteMany({
            accountVarified: false,
            createdAt: {$lt: thirtyMinuteAge},
        })
    })
};