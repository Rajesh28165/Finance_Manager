import { useState } from 'react'
import './App.css'
import Home from './components/home'
import Income from './components/income'
import Expense from './components/expenses'
import Savings from './components/savings'
import Transactions from './components/transactions'
import Navbar from './components/navbar.jsx'
import {Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/income" element={<Income/>}/>
      <Route path="/expenses" element={<Expense/>}/>
      <Route path="/savings" element={<Savings/>}/>
      <Route path="/transactions" element={<Transactions/>}/>
    </Routes>
    </>
  );
}

export default App;
