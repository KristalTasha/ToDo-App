const { findById } = require("../model/user_model");
const User = require("../model/user_model");
const { Todo } = require("./../model/todo_model")

const addTodo = async (req, res) => {
    const { id } = req.params;
    const { todo } = req.body;

    const data = {
        todo
    }

    const fullData = { ...data, user: id }

    try{
        const dataToStore = new Todo(fullData);
        const saveData = await dataToStore.save();
        const fetchUser = await User.findById(id);
        // console.log(fetchUser)
        // res.send(fetchUser)
    
        fetchUser.todos.push(saveData);
        await fetchUser.save()
        res.json(fetchUser)

    } catch(error){
        console.log(error)
    }

   

}

// const addTodo = async (req, res) => {
//     const { todo } = req.body;

//     const data = {
//         todo
//     };

//     const dataToStore = new Todo(data);

//     const saveData = await dataToStore.save();

//     res.status(201).json(saveData);
// };

const fetchTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos)
    } catch (error) {
        console.log(error.message);
    }
}

const fetchTodo = async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
}

const deleteTodo = async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findByIdAndDelete(id)
    res.status(200).json({message: `${todo} deleted successfully`})
}

const updateTodo = async (req, res) => {
    try{
        const { status } = req.body;
        const { id } = req.params;

        const update = {
            status
        }

        const todo = await Todo.updateOne({_id: id }, update);

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({err: error.message})
        console.log(error.message);
    }
}

 const todoByUser = async (req, res) =>{
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId).populate('user');
    res.send(todo)
    console.log('user who set todo--- ', todo.user.email)
 }

module.exports = {
    addTodo,
    fetchTodos,
    fetchTodo,
    deleteTodo ,
    updateTodo, 
    todoByUser
}
