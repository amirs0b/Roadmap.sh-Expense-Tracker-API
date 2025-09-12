import Expense from "./models/ExpenseMd.js";
import ApiFeatures, {catchAsync, HandleERROR} from "vanta-api";


export const createExpense = catchAsync(async (req, res, next) => {
    const {amount, category, description, date} = req.body;
    if (!amount || !category || !date) {
        return next(new HandleERROR("Amount, Category and Date are required", 400));
    }
    const expense = await Expense.create({
        userId: req.userId, amount, category, description, date
    });
    res.status(201).json({
        status: "success", data: expense
    });
});

export const getAllExpenses = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Expense, req.query, req.role)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const expenses = await features.execute();
    res.status(200).json({
        status: "success", data: expenses
    });
});


export const getAllExpensesFilter = catchAsync(async (req, res, next) => {
    if (req.role !== "admin" && req.userId !== req.params.id) {
        return next(new HandleERROR("You are not authorized to view these expenses", 403));
    }
    const features = new ApiFeatures(Expense, req.query, req.role)
        .addManualFilters(req.role === "admin" ? {} : {userId: req.userId})
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const expenses = await features.execute();
    res.status(200).json({
        status: "success", data: expenses
    });

});


export const updateExpense = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const expense = await Expense.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
    return res.status(200).json({
        status: "success", data: expense, message: "Expense has been updated successfully"
    });
});

export const deleteExpense = catchAsync(async (req, res, next) => {
    if (req.role !== "admin" && req.userId !== req.params.id) {
        return next(new HandleERROR("You are not authorized to delete expenses", 403));
    }
    const {id} = req.params;
    await Expense.findByIdAndDelete(id);
    return res.status(204).json({
        status: "success", data: null
    });
});

