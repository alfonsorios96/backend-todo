const getAll = (request, response) => {
    return response.status(200).json({
        data: ['mi lista']
    });
};

const createTodo = (request, response) => {
    const todo = request.body;

    return response.status(200).json({
        code: 1001,
        message: 'Todo List created'
    });
};

const createTask = (request, response) => {
    const todoId = request.query.todoId;
    const todo = _findTODObyId(todoId);
    const task = request.body.task;
    todo.tasks = [...todo.tasks, task];
    _saveTODOList(todo);

    return response.status(200).json({
        code: 2001,
        message: 'A task was created'
    });

};

const doTask = (request, response) => {
    const todoId = request.query.todoId;
    const taskId = request.query.taskId;
    const checked = request.body.checked;

    let todo = _findTODObyId(todoId);
    const task = _findTaskbyId(todo, taskId);
    task.checked = checked;
    todo = _saveTask(todo, task);
    _saveTODOList(todo);

    return response.status(200).json({
        code: 2003,
        message: 'A task was checked'
    });
};

const deleteTodo = (request, response) => {
    const todoId = request.query.todoId;
    _deleteTODOListById(todoId);

    return response.status(200).json({
        code: 1002,
        message: 'The TODO list was deleted'
    });
};

const deleteTask = (request, response) => {
    const todoId = request.query.todoId;
    const taskId = request.query.taskId;

    let todo = _findTODObyId(todoId);
    const task = _findTaskbyId(todo, taskId);
    todo = _deleteTask(todo, task);
    _saveTODOList(todo);

    return response.status(200).json({
        code: 2002,
        message: 'A task was deleted'
    });
};

const _findTODObyId = (todoId) => {
    return {
        name: '',
        description: '',
        tasks: []
    };
};

const _saveTODOList = (todo) => {
    return true;
};

const _findTaskbyId = (todo, taskId) => {
    return {
        description: '',
        checked: false
    };
};

const _saveTask = (todo, task) => {
    return todo;
};

const _deleteTODOListById = (todoId) => {
    return true;
};

const _deleteTask = (todo, task) => {
    return true;
};

module.exports = {getAll, createTodo, createTask, doTask, deleteTodo, deleteTask};
