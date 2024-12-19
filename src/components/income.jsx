import React, { useEffect, useState } from 'react';
import axios from "axios";
import './../style/income.css'

const Income = () => {
    const [form, setForm] = useState({ amount: '', description: '', category: '', date: '' });
    const [income, setIncome] = useState([]);
    const [editId, setEditId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/income/${editId}.json`, form);
                setEditId(null);
            } else {
                await axios.post('https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/income.json', form);
            }
            setForm({ amount: '', description: '', category: '', date: '' });
            getIncome();
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/income/${id}.json`);
            getIncome();
        } catch (error) {
            console.log(error.message);
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

    const getIncome = async () => {
        try {
            let res = await axios.get('https://react-evaluation-ec0f0-default-rtdb.firebaseio.com/income.json');
            let arr = [];
            for (let key in res.data) {
                arr.push({ id: key, ...res.data[key] });
            }
            setIncome([...arr]);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getIncome();
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="heading">{editId ? 'Edit Income' : 'Add Income'}</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className="input"
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        required
                    />
                    <br />
                    <input
                        className="input"
                        type="text"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                    />
                    <br />
                    <input
                        className="input"
                        type="text"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        required
                    />
                    <br />
                    <input
                        className="input"
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        required
                    />
                    <br />
                    <button className="button" type="submit">
                        {editId ? 'Update Income' : 'Add Income'}
                    </button>
                </form>
            </div>

            <h1>Income List</h1>
            <div className='list-main'>
                {income.map((i) => (
                    <div key={i.id} className="list">
                        <div>
                        <h4>{i.amount}</h4>
                        <p>{i.description}</p>
                        <p>{i.category}</p>
                        <p>{i.date}</p>
                        <button onClick={() => handleEdit(i)}>Edit</button>
                        <button onClick={() => handleDelete(i.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Income;