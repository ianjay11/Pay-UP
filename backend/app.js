import { connectDatabase } from "./pool.js";
import bodyParser from "body-parser";
import express from "express";
import {
  registerUser,
  loginUser,
  verify,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "./Routes/login.js";
import { auth } from "./middleware/auth.js";
import { accept, balance, cashIn, getTransaction, received, withdraw } from "./Routes/transactions.js";
import {
  deal,
  editDeal,
  getDealsByUser,
  showAlldDeals,
  getBuyerDeal,
  deleteDeal,
  updateDealStatus,
} from "./Routes/deal.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const pool = connectDatabase();
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  })
);

//all about users and their info
app.post("/register", registerUser);
app.delete("/users/:id", deleteUser); //admin
app.post("/login", loginUser);
app.put("/users/me", auth, updateUser);
app.get("/users/me", auth, getUserById);
app.get("/users", auth, getUsers);
app.get("/verify", auth, verify);

//all about deals
app.post("/deal", auth, deal);
app.put("/deal/:id", auth, editDeal);
app.delete("/deal/:id", auth, deleteDeal);
app.get("/me/deal", auth, getBuyerDeal);
app.get("/dealme/:status", auth, getDealsByUser);
app.put("/me/deal_status/:id", auth, updateDealStatus);
app.get("/deal", auth, showAlldDeals); //admin

//all about transactions
app.post("/cashIn", auth, cashIn);
app.post("/withdraw", auth, withdraw);
app.get("/balance", auth, balance);
app.post("/receive/:deal_id", auth, received); 
app.post("/accept/:deal_id", auth, accept);
app.get("/transactions", auth, getTransaction)

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server has started on http://localhost:${PORT}`);
    });
  }
});
