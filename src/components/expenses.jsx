import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './../style/income.css'


const Expense = () => {
    const [form, setForm] = useState({ amount: '', description: '', category: '', date: '' });
    const [Expense, setExpense] = useState([])
    const [editId, setEditId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editId) {
                await axios.put(`https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/expense/${editId}.json`, form);
                setEditId(null);
            } else {
                await axios.post('https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/expense.json', form)
            }
            setForm({ amount: '', description: '', category: '', date: '' });
            getExpense();
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleEdit = (item) => {
        setForm({
            amount: item.amount,
            description: item.description,
            category: item.category,
            date: item.date,
        });
        setEditId(item.id);
    };

    async function getExpense() {
        try {
            let res = await axios.get('https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/expense.json');
            let arr = [];
            for (let key in res.data) {
                arr.push({ id: key, ...res.data[key] })
            }
            setExpense([...arr]);
            console.log(arr, Expense)
        } catch (error) {
        }
    }
    useEffect(() => {
        getExpense();
    }, []);
    return (
        <>
            <div className="container">
                <h1 className="heading">{editId ? 'Edit Expense' : 'Add Expense'}</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input className="input" type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required /> <br />
                    <input className="input" type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /> <br />
                    <input className="input" type="text" placeholder="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required /> <br />
                    <input className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /> <br />
                    <button className="button" type="submit">{editId ? 'Update Expense' : 'Add Expense'}</button>
                </form>
            </div>
            <h1>Expense List</h1>
            <div className='list-main'>
                {Expense.map((i) => (
                    <div key={i.id} className="list">
                        <h4>{i.amount}</h4>
                        <p>{i.description}</p>
                        <p>{i.category}</p>
                        <p>{i.date}</p>
                        <button onClick={() => handleEdit(i)}>Edit ✍🏻</button>
                        <button onClick={() => handleDelete(i.id)}>Delete 🗑️</button>

                    </div>
                ))}
            </div>
        </>
    )
}

export default Expense