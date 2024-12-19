import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../style/home.css'

const Home = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const incomeRes = await axios.get('https://react-evaluation-6bc78-default-rtdb.firebaseio.com/income.json');
        const expenseRes = await axios.get('https://react-evaluation-6bc78-default-rtdb.firebaseio.com/expense.json');

        const incomeData = incomeRes.data ? Object.values(incomeRes.data) : [];
        const expenseData = expenseRes.data ? Object.values(expenseRes.data) : [];

        setIncome(incomeData);
        setExpense(expenseData);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  const totalIncome = income.reduce((acc, item) => acc + Number(item.amount), 0);
  const totalExpense = expense.reduce((acc, item) => acc + Number(item.amount), 0);
  const currentSavings = totalIncome - totalExpense;
  const savingsProgress = savingsGoal ? ((currentSavings / savingsGoal) * 100).toFixed(2) : 0;

  return (
    <div className='HomeDiv' >
      <h1 className='heading'>Dashboard</h1>
      <div>
        <h3>Financial Summary</h3>
        <p>Total Income: ₹{totalIncome}</p>
        <p>Total Expenses: ₹{totalExpense}</p>
        <p>Current Savings: ₹{currentSavings}</p>
        <p>Savings Goal Progress: {savingsProgress}%</p>
      </div>
    </div>
  );
};

export default Home;