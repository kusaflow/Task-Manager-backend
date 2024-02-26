const asyncHandler = require('express-async-handler');


//@dec get all tasks
//routes GET /api/task
//access private
const gettasks = asyncHandler(async (req, res) => {
    res.status(200).json("Getting all tasks"); 
});

//@dec get single task
//routes GET /api/task/:id
//access private
const getsingletask = asyncHandler(async (req, res) => {
    res.status(200).json("Getting single task"); 
});

//@dec add task
//routes POST /api/task
//access private
const addtask = asyncHandler(async (req, res) => {
    res.status(200).json("Adding a task"); 
});

//@dec update task
//routes PUT /api/task/:id
//access private
const updatetask = asyncHandler(async (req, res) => {
    res.status(200).json("Updating a task"); 
});

//@dec delete task
//routes DELETE /api/task/:id
//access private
const deletetask = asyncHandler(async (req, res) => {
    res.status(200).json("Deleting a task"); 
});

module.exports = {gettasks, getsingletask, addtask, updatetask, deletetask};