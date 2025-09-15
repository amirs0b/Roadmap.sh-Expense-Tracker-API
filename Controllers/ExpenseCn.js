import Expense from "../Models/ExpenseMd.js";
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
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) {
        return next(new HandleERROR("Expense not found", 404));
    }

    if (req.role !== 'admin' && expense.userId.toString() !== req.userId) {
        return next(new HandleERROR("You are not authorized to delete this expense", 403));
    }
    await Expense.findByIdAndDelete(id);
    return res.status(204).json({
        status: "success",message:"deleted successfully" ,data: null
    });
});

