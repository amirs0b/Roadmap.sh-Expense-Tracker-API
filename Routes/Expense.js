import express from "express";
import isAdmin from "../Middlewares/isAdmin.js";
import {
    createExpense,
    deleteExpense,
    getAllExpenses,
    getAllExpensesFilter,
    updateExpense
} from "../Controllers/ExpenseCn.js";
import isLogin from "../Middlewares/IsLogin.js";

const expenseRoutes = express.Router();
expenseRoutes.route("/").get(isAdmin,getAllExpenses).post(isLogin, createExpense)
expenseRoutes.route("/my-expenses").get(isLogin, getAllExpensesFilter);
expenseRoutes.route("/:id").patch(isLogin, updateExpense).delete(isLogin, deleteExpense);


export default expenseRoutes;