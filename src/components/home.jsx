import './styles/home.css';
import { useState, useEffect } from 'react';
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

  const addTodo = async (e) => {
    try {
      e.preventDefault()

      setLoading(true)


      const add = await axios.post(`/todos/add-todo/${theUser.userId}`, {
        todo: input
      })

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
      const todo = await axios.delete(`/todos/delete/${id}/${theUser.userId}`)

      console.log(todo);
      setLoading(false)

    } catch (error) {
      setError(true)
      setErrorMsg(error.message);
      console.log(error);
    }

  }


  const update = async (id) => {

    try {
      setLoading(true);
      const todo = await axios.get(`/todos/fetch-todo/${id}`);

      const { data } = todo;
      console.log('todo json response from api', todo);
      console.log('data', data);


      if (data.status === "Pending") {

      
        await axios.put(`/todos/update/${data._id}`, {
          status: "Done",
        });
   

      } else {

     
        await axios.put(`/todos/update/${data._id}`, {
          status: "Pending",
        });

      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

  }

  const fetchTodos = async () => {
     
    const theTodos = await axios.get(`/user/todos/${theUser.userId}`);
    console.log('the todos', theTodos)

    const { data } = theTodos;

    setTodos(data)
   
  }

  
  function Counter(stat) {
    let counting = todos.filter(done => {
      return (done.status === stat)

    })
    setCount(counting.length)
    console.log('counting length', counting.length)
    console.log('done todos', counting)
  }

  function Tracker() {
    if (todos.length > 0) {
      return <p>{count}/{todos.length} {count > 1 ? 'tasks' : 'task'} completed</p>
    } else {
      return <p></p>
    }
  }


  useEffect(() => {
    fetchTodos()
    Counter('Done')
    Tracker()
    console.log('the count', count)

    
  }, [loading, count]);


  





  return (
    <div className='page'>



      <div className='list'>
        {/* <h4>My To-Do List</h4> */}
        <form className='add-item'>
          <input className='new' type="text" placeholder='Add a to-do item'
            value={input}
            onChange={(e) => setInput(e.target.value)} />
          <button className='add' onClick={addTodo} disabled={!input}> + </button>
        </form>
        {/* <Tracker /> */}

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
