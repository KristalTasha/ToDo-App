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

//former
// const deleteTodo = async (req, res) => {
//     const { id } = req.params
//     const todo = await Todo.findByIdAndDelete(id)
//     res.status(200).json({message: `${todo} deleted successfully`})
// }

//trying to delete from TodoSchema and UserSchema together
const deleteTodo = async (req, res) => {
    const { id } = req.params
    const uId = req.params.userId

    const todo = await Todo.findByIdAndDelete(id)
    res.status(200).json({message: `${todo} deleted successfully`})
    
    //finding user of todos to be deleted
    const user = await User.findById(uId)
    
    
    user.todos.filter(theTodo => {

        console.log('user todo before if statement--', theTodo.valueOf(), 'todoId--', id)
        if(theTodo.valueOf() === id){
            //console.log('theTodo', theTodo.valueOf())

            let theIndex = user.todos.indexOf(theTodo.valueOf())
           // console.log('the index', theIndex)
            user.todos.splice(theIndex, 1);
            user.save();
            console.log('user todos modified successfully')

        } 
    })

   
}


const updateTodo = async (req, res) => {
    try{
        const { status } = req.body;
        const { id } = req.params;

        const update = {
            status
        }

        const todo = await Todo.updateOne({_id: id }, update);
        console.log('todo await response', todo)
        console.log('update object', update)

        res.status(200).json(todo);
        // res.status(200).json(update);
        // res.json(update);

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
