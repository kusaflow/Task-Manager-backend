const express = require('express');
const router = express.Router();

const { gettasks, getsingletask, addtask, updatetask, deletetask } = require('../controllers/taskController');

router.route('/').get(gettasks).post(addtask);
router.route('/:id').put(updatetask).delete(deletetask).get(getsingletask);


module.exports = router;