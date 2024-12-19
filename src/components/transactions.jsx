import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../style/transactions.css';

const Transactions = () => {
    const [transactions, setTranscations] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('date');

    useEffect(()=> {
        async function fetchingData() {
            try {
                const incomeRes = await axios.get(`https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/income.json`);
                const expenseRes = await axios.get(`https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/expenses.json`);

                const incomeData = incomeRes.data ? Object.values(incomeRes.data).map((item)=> ({...item, type:'Income'})) : [];
                const expenseData = expenseRes.data ? Object.values(expenseRes.data).map((item)=> ({...item, type:'Expense'})) : [];
                    
                setTranscations([...incomeData, ...expenseData]);
            } catch(error) {
                console.error(error.message);
            }
        }
        fetchingData();
    },[]);

    const filteredTransactions = transactions.filter((tran) => 
        filter ? tran.type === filter:true
    );

    const sortedTransactions = [...filteredTransactions].sort((a,b) => 
        sortKey === 'amount'? b.amount - a.amount : new Date(b.date) - new Date(a.date)
    );

    return (
        <div className="transactions-container">
            <h1>Transactions</h1>
            <div className="filters">
                <div>
                    <label>Filter:</label>
                    <select onChange={(e)=>setFilter(e.target.value)}>
                        <option value=""></option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label>Sort:</label>
                    <select onChange={(e)=>setSortKey(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>
            </div>
            <div className = "transaction-list">
                {sortedTransactions.map((tran,index) => (
                    <div key={index} className = "transaction-item">
                        <div>
                        <h3>{tran.description}</h3>
                        <p>{tran.amount}-{tran.type}</p>
                        <p>{tran.date}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Transactions;