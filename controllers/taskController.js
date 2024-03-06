const asyncHandler = require('express-async-handler');
const Task = require('../models/tasksModel');


//@dec get all tasks
//routes GET /api/task
//access private
const gettasks = asyncHandler(async (req, res) => {
    const _tasks = await Task.find({user_id: req.user.id});
    res.status(200).json(_tasks); 
});

//@dec get single task
//routes GET /api/task/:id
//access private
const getsingletask = asyncHandler(async (req, res) => {
    const _task = await Task.findById(req.params.id);

    if(!_task){
        res.status(404);
        throw new Error('Task not found');
    }
    res.status(200).json(_task);
    
});

//@dec add task
//routes POST /api/task
//access private
const addtask = asyncHandler(async (req, res) => {
    //add task
    const {task, tag} = req.body;

    //validate
    if(!task || !tag){
        res.status(400);
        throw new Error('Please add a task');
    }

    const _task = await Task.create({
        user_id: req.user.id,
        task,
        tag
    });

    
    await _task.save();
    res.status(200).json(_task); 
 
});

//@dec update task
//routes PUT /api/task/:id
//access private
const updatetask = asyncHandler(async (req, res) => {
    const {task, completed, status, important, tag} = req.body;

    const newTask = await Task.findById(req.params.id);

    if(newTask.user_id.toString() !== req.user.id){
        res.status(401).json({error: "Not authorized"});
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
        task,
        completed,
        status,
        important,
        tag
    }, {new:true});


    res.status(200).json(updatedTask); 
});

//@dec delete task
//routes DELETE /api/task/:id
//access private
const deletetask = asyncHandler(async (req, res) => {

    const newTask = await Task.findById(req.params.id);

    if(newTask.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("Not authorized");
    }

    const deletededTask = await Task.findByIdAndDelete(req.params.id);
    if(!deletededTask){
        res.status(404);
        throw new Error("Task not found");
    }

    res.status(200).json(deletededTask); 
    
});

module.exports = {gettasks, getsingletask, addtask, updatetask, deletetask};