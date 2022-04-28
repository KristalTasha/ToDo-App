import './styles/home.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Todos from './todos'


function Home() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false);
  // const [loadingg, setLoadingg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState(false);
  const theUser = JSON.parse(window.localStorage.getItem('logged'))

  const addTodo = async () => {
    try {
      setLoading(true)
      

      const add = await axios.post(`http://localhost:8000/api/todos/add-todo/${theUser.userId}`, {
        todo: input
      }, {withCredentials: true })

      setInput('');

      console.log(add.data)

      setLoading(false);

    } catch (error) {
      setError(true)
      setErrorMsg(error.message);
      setLoading(false)
      console.log(error);
    }
  }

  const deleteTodos = async (id) => {
    try {
      setLoading(true)
      const todo = await axios.delete(`http://localhost:8000/api/todos/${id}`, 
      {withCredentials: true })

      console.log(todo);
      setLoading(false)

    } catch (error) {
      setError(true)
      setErrorMsg(error.message);
      console.log(error);
    }


    // const remnant = todos.filter(todo => todo.id !== id)
    // setTodos([...remnant]);
  }

  const update = async (id) => {

    try {
      setLoading(true);
      const todo = await axios.get(`http://localhost:8000/api/todos/${id}`, {withCredentials: true });

      const { data } = todo;

      if (data.status === "Pending") {
        await axios.put(`http://localhost:8000/api/todos/${data._id}`, {
          status: "Done",
        }, {withCredentials: true });
      } else {
        await axios.put(`http://localhost:8000/api/todos/${data._id}`, {
          status: "Pending",
        },
        {withCredentials: true });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    // const mapped = todos.map(item => {
    //   return item.id === id ? { ...item, status: item.status === "Pending" ? "Done" : "Pending"} : {...item}
    // })
    // setTodos([...mapped])


  }

  function Counter(status) {
    const counting = todos.filter(done => {
      return (done.status === status)

    })
    setCount(counting.length)
    console.log(counting)
  }

  useEffect(() => {
    Counter('Done')
    console.log(count)

    const fetchTodos = async () => {
      const todos = await axios.get(`http://localhost:8000/api/user/todos/${theUser.userId}`, {withCredentials: true });
      console.log('the todos', todos)

      const { data } = todos;

      setTodos(data)
    }

    fetchTodos()
  }, [loading, count]);


  function Tracker() {
    if (todos.length > 0) {
      return <p>{count}/{todos.length} {count > 1 ? 'tasks' : 'task'} completed</p>
    } else {
      return <p></p>
    }
  }





  return (
    <div className='page'>
   
     

      <div className='list'>
        <h4>My To-Do List</h4>
        <div className='add-item'>
          <input className='new' type="text" placeholder='Add a to-do item'
            value={input}
            onChange={(e) => setInput(e.target.value)} />
          <button className='add' onClick={addTodo} disabled={!input}>Add a to-do item</button>
        </div>
        <Tracker />
        {loading &&
          <p>Refreshing... {loading}</p>}
        {error && <p>{errorMsg}</p>}
        <Todos todos={todos} deleteTodos={deleteTodos} update={update} />
      </div>
      <div className='space'>

      </div>
    </div>
  );


}

export default Home;
