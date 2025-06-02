import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {
    cron.schedule("*/30 * * * *", async () => {
        try {
            const oneDayAge = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const borrowers = await Borrow.find({
                dueDate: {
                    $lt: oneDayAge,
                },
                returnDate: null,
                notified: false,
            });
            for (const element of borrowers) {
                if (element.user && element.user.email) {
                    sendEmail({
                        email: element.user.email,
                        subject: "Book return reminder.",
                        message: `Hello ${element.user.name},\n\n This is the reminder that the book you borrowed  is due for return today.Please return the book to the library as soon as possible.\n\nThank you.`
                    });
                    element.notified = true,
                        await element.save();
                    console.log(`Email sent to ${element.user.name}`)
                }
            }
        } catch (error) {
            console.error("Some error occured while notifying users.", error);
        }
    })
    // message: Hello ${element.user.name},\n\n This is the reminder that the book you borrowed  is due for return today. Please return the book to the library as soon as possible.\n\nThank you.
}