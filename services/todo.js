const controllers = require('../controllers');

const getAll = (request, response) => {
    controllers.todoListController.findAll().then(todoLists => {
        return response.status(200).json(todoLists);
    }).catch(error => {
        return response.status(500).json({
            code: 500,
            message: 'We are fixing this problem, try later.'
        });
    });
};

const createTodo = (request, response) => {
    const todo = request.body;

    controllers.todoListController.createTodoList(todo).then(() => {
        return response.status(200).json({
            code: 1001,
            message: 'Todo List created'
        });
    }).catch(error => {
        return response.status(500).json({
            code: 500,
            message: 'We are fixing this problem, try later.'
        });
    });

    
};

const createTask = async (request, response) => {
    const todoId = request.params.todoId;
    const todo = await controllers.todoListController.findTodoList(todoId);
    const task = request.body.task;
    todo.tasks = [...todo.tasks, task];
    controllers
        .todoListController
        .updateTodoList(todo)
        .then(() => {
            return response.status(200).json({
                code: 2001,
                message: 'A task was created',
                data: todo
            });
        })
        .catch(error => {
            return response.status(500).json({
                code: 500,
                message: 'We are fixing this problem, try later.'
            });
        });
};

const doTask = async (request, response) => {
    const todoId = request.params.todoId;
    const taskId = request.params.taskId;
    const checked = request.body.checked;

    let todo = await controllers.todoListController.findTodoList(todoId);
    todo.tasks = todo.tasks.map(task => {
        if(task._id == taskId) task.is_done = checked;
        return task;
    });

    controllers
        .todoListController
        .updateTodoList(todo)
        .then(() => {
            return response.status(200).json({
                code: 2003,
                message: 'A task was checked/unchecked'
            });
        })
        .catch(error => {
            return response.status(500).json({
                code: 500,
                message: 'We are fixing this problem, try later.'
            });
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

const _findTaskbyId = (todo, taskId) => {
    return {
        description: '',
        checked: false
    };
};


module.exports = {getAll, createTodo, createTask, doTask, deleteTodo, deleteTask};
