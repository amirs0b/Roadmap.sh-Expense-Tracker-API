import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    amount: {type: Number, required: [true, "Amount is required"]},
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Groceries", "Leisure", "Electronics", "Utilities", "Clothing", "Health", "Other"]
    },
    description: {type: String},
    date: {type: Date, required: [true, "Date is required"]},
}, {timestamps: true});


const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;