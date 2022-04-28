const express = require('express');
const { authUser } = require('../authentication/auth');
const { addTodo, fetchTodos, fetchTodo, deleteTodo, updateTodo, todoByUser } = require('../controller/todo_controller')

const router = express.Router()

//saving a todo
router.post('/add-todo/:id', authUser, addTodo);

//fetching from the db/server
router.get('/', fetchTodos)

//fetching a todo
router.get('/:id', authUser, fetchTodo)

//fetching todo and the user details of that todo
router.get('/user/:todoId', todoByUser)

//deleting a todo
router.delete('/:id', authUser, deleteTodo)

//updating a todo
router.put('/:id', authUser, updateTodo)


module.exports = router;