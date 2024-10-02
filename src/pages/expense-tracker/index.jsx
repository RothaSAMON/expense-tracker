import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transaction, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);

      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1>{name}'s Expense Tracker</h1>
          <div>
            <h3>Your balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>

          <div>
            <div>
              <h4>Income</h4>
              <p>${income}</p>
            </div>

            <div>
              <h4>Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Desciption"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
        {profilePhoto ? (
          <div>
            <img src={profilePhoto} alt="User profile" />
          </div>
        ) : (
          <p>No profile photo available</p>
        )}
        <button onClick={signUserOut}>Sign Out</button>
      </div>

      <div>
        <h3>Transaction</h3>

        <ul>
          {transaction.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;

            return (
              <li>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} <label>{transactionType}</label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ExpenseTracker;
