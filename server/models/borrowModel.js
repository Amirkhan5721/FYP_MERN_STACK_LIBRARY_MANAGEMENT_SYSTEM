import mongoose from "mongoose";

const borrowSchema = mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    price: {
        type: Number,
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true,
    },
    borrowDate: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        default: null,
    },
    fine: {
        type: Number,
        default: 0,
    },
    notified: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
    }
);

export const Borrow = mongoose.model("borrow", borrowSchema);