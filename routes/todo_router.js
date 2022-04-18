const express = require('express')
const { addTodo, fetchTodos, fetchTodo, deleteTodo, updateTodo } = require('../controller/todo_controller')

const router = express.Router()

//saving a todo
router.post('/', addTodo);

//fetching from the db/server
router.get('/', fetchTodos)

//fetching a todo
router.get('/:id', fetchTodo)

//deleting a todo
router.delete('/:id', deleteTodo)

//updating a todo
router.put('/:id', updateTodo)


module.exports = router;