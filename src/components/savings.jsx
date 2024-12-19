import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../style/saving.css'

const Savings = () => {
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const incomeRes = await axios.get('https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/income.json');
        const expenseRes = await axios.get('https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/expense.json');

        setIncome(incomeRes.data ? Object.values(incomeRes.data) : []);
        setExpense(expenseRes.data ? Object.values(expenseRes.data) : []);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  const totalIncome = income.reduce((acc, item) => acc + Number(item.amount), 0);
  const totalExpense = expense.reduce((acc, item) => acc + Number(item.amount), 0);
  const currentSavings = totalIncome - totalExpense;
  const progress = savingsGoal ? ((currentSavings / savingsGoal) * 100).toFixed(2) : 0;

  return (
    <div className="savings-container">
    <h1>Savings</h1>
    <div className="savings-info">
      <p>Total Income: ₹{totalIncome}</p>
      <p>Total Expenses: ₹{totalExpense}</p>
      <p>Current Savings: ₹{currentSavings}</p>
      <div className="progress">
        <p>Progress: <span>{progress}%</span></p>
      </div>
    </div>
    <div className="savings-goal">
      <h3>Set Savings Goal</h3>
      <input
        type="number"
        placeholder="Enter goal amount"
        value={savingsGoal}
        onChange={(e) => setSavingsGoal(e.target.value)}
      />
    </div>
  </div>
);
};

export default Savings;

