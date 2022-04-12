const { Todo } = require("./../model/todo_model")

const addTodo = async (req, res) => {
    const { todo } = req.body;

    const data = {
        todo
    };

    const dataToStore = new Todo(data);

    const saveData = await dataToStore.save();

    res.status(201).json(saveData);
};

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

module.exports = {
    addTodo,
    fetchTodos,
    fetchTodo,
    deleteTodo ,
    updateTodo
}
